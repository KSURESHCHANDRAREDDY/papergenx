import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true }));
// Handle preflight for all routes
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const dbName = process.env.DB_NAME || "papergenx";
const db = client.db(dbName);
const collect = db.collection("userdata");

// Frontend base URL for redirects (OAuth)
const FRONTEND = process.env.FRONTEND_URL || process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// 🩺 Health route for Render sanity checks
app.get("/", (req, res) => res.send("✅ Backend running"));

// 🔐 Auth middleware
function gate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    // Temporary diagnostics (safe to leave in logs)
    console.warn("Auth gate: No token cookie", {
      origin: req.headers.origin,
      referer: req.headers.referer,
      path: req.path,
      method: req.method,
      cookieKeys: Object.keys(req.cookies || {}),
      nodeEnv: process.env.NODE_ENV,
    });
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// 🧾 Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await collect.findOne({ email });
    if (existingUser) return res.sendStatus(409);

    const hashedPassword = await bcrypt.hash(password, 10);
    await collect.insertOne({
      name,
      email,
      password: hashedPassword,
      freeCount: 5,
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 🔑 Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await collect.findOne({ email });
    if (!user) return res.sendStatus(409);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.sendStatus(401);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      name: user.name,
      email: user.email,
      freeCount: user.freeCount,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 🔁 Get logged-in user
app.get("/me", gate, async (req, res) => {
  try {
    const user = await collect.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      freeCount: user.freeCount,
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

// 📄 Generate Paper (Axios + Gemini API)
app.post("/genpaper", gate, async (req, res) => {
  try {
    const { topic, classLevel, totalMarks, difficulty, pattern } = req.body;

    // ❌ you were checking for 'subject' (which no longer exists)
    if (!topic || !classLevel || !totalMarks || !difficulty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await collect.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.freeCount <= 0) {
      return res.status(403).json({ message: "No free generations left" });
    }

    // 🧠 Updated prompt for topic-based question paper
   const prompt = `
You are an expert exam paper generator.

Generate a ${difficulty}-level question paper for Class ${classLevel} on the topic "${topic}".
Total marks: ${totalMarks}.
Paper pattern: ${pattern || "Mixed"}.

${
  pattern === "Only Objective"
    ? `🟩 Only include **Multiple Choice Questions (MCQs)**.
Each question should have four options (A, B, C, D) and an empty space for the answer.
Do NOT include sections like Short, Long, or Essay questions.`
    : `Include:
- Instructions
- Section A (Short Questions)
- Section B (Long Questions)
- Section C (Essay/Application)
Format clearly and realistically.`
}
`;


    // ✅ Gemini 2.0 Flash API call using Axios
    const data = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.GEMINI_API_KEY,
      },
      data,
    };

    const response = await axios.request(config);

    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No content generated.";

    await collect.updateOne(
      { email: req.user.email },
      { $inc: { freeCount: -1 } }
    );

    const updatedUser = await collect.findOne({ email: req.user.email });

    res.status(200).json({
      paper: aiText,
      freeCount: updatedUser.freeCount,
    });
  } catch (err) {
    console.error(
      "❌ Error generating paper:",
      err.response?.data || err.message
    );
    res.status(500).json({ message: "Failed to generate paper" });
  }
});
// 🚪 Logout
app.post("/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProd ? 'None' : 'Lax',
    secure: isProd,
  });
  res.sendStatus(200);
});

// 🔐 Google OAuth 2.0

app.get("/auth/google", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5173/auth/google/callback",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing authorization code");

    // Exchange code for tokens
    const tokenResp = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResp.data.access_token;
    const idToken = tokenResp.data.id_token;

    // Fetch user profile
    const profileResp = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { email, name } = profileResp.data || {};
    if (!email) return res.status(400).send("Failed to retrieve user email");

    // Upsert user
    let user = await collect.findOne({ email });
    if (!user) {
      await collect.insertOne({
        name: name || email.split("@")[0],
        email,
        password: null,
        freeCount: 5,
        provider: "google",
      });
      user = await collect.findOne({ email });
    }

    // Issue JWT cookie
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect back to app
    res.redirect(FRONTEND);
  } catch (err) {
    console.error("Google OAuth error:", err.response?.data || err.message);
    res.redirect(`${FRONTEND}/login?error=google_auth_failed`);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
