

# PaperGenX

PaperGenX is an AI‑powered question paper generator that creates customized assessments from topic and difficulty inputs, complete with professional PDF export and secure user management.

## Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Backend Framework**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB]

## Features

- **Full-Stack Architecture**: Built a secure MERN application using React, Redux, Express, and MongoDB.  
- **AI Integration**: Integrated Google Gemini for controlled, pattern-based question generation.  
- **Question Configuration**: Supports MCQ, Descriptive, and Mixed paper formats with topic and difficulty inputs.  
- **Authentication & Security**: Implemented Google OAuth 2.0, JWT cookie sessions, and environment-aware CORS with credentials.  
- **PDF Export**: Delivered professional-grade PDF generation using jsPDF and autoTable for clean, structured layouts.  
- **Freemium Model**: Designed a smart usage-based freemium system using `freeCount` with real-time UI indicators.  


## Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/papergenx.git
cd papergenx

# 2️⃣ Install and run the server
cd server
npm install
cp .env.example .env   # Add environment variables (Mongo URI, Gemini API key, Google OAuth credentials)
npm run dev

# 3️⃣ Install and run the client
cd ../client
npm install
npm start

# 4️⃣ Access the app
# Open your browser at http://localhost:3000
