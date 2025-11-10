import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginData, logout } from "./redux/authslice";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GenPaper from './pages/GenPaper';
import Pricing from './pages/Pricing';
import About from './pages/About';
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API}/me`, { withCredentials: true });
        const user = res.data;
        dispatch(setLoginData({ user }));
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        dispatch(logout());
        localStorage.removeItem("user");
      }
    };
    checkAuth();
  }, [dispatch, API]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/genpaper" element={<GenPaper />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
