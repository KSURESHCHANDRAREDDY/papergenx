import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// 🆕 Signup
export async function signup(userdata) {
  try {
    const response = await axios.post(`${API_URL}/signup`, userdata);
    if (response.status === 200) return { status: 200 };
  } catch (error) {
    if (error.response && error.response.status === 409)
      return { status: 409 };
    return { status: "Server Down. Please Try Later!" };
  }
}

// 🆕 Login (⚡ now returns freeCount)
export async function login(userdata) {
  try {
    const response = await axios.post(`${API_URL}/login`, userdata);
    if (response.status === 200) {
      return {
        status: 200,
        token: response.data.token,
        name: response.data.name,
        email: response.data.email,
        freeCount: response.data.freeCount, // <-- added
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) return { status: 409 };
      if (error.response.status === 401) return { status: 401 };
      return { status: error.response.status };
    } else {
      return { status: "Server Down. Please Try Later!" };
    }
  }
}

// 🆕 Logout
export async function logoutAPI() {
  try {
    await axios.post(`${API_URL}/logout`);
    return { status: 200 };
  } catch {
    return { status: 500 };
  }
}
