import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/Login.css";
import successSound from "./assets/sounds/success-1-6297.mp3";
import errorSound from "./assets/sounds/fail-144746.mp3";


const text = {
  en: {
    loginTitle: "Login",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    noAccount: "Do not have an account?",
    register: "Register",
    loginFailed: "Login failed:",
  },
  az: {
    loginTitle: "Daxil Olun",
    email: "E-Poçt",
    password: "Şifrə",
    signIn: "Daxil Ol",
    noAccount: "Hesabınız yoxdur?",
    register: "Qeydiyyatdan keçin",
    loginFailed: "Giriş alınmadı:",
  },
};

function Login() {
  const { language } = useLang();
  const t = text[language];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
  
    if (error) {
      toast.error(`${t.loginFailed} ${error.message}`);
      playSound(errorSound);
    } else {
      toast.success("✅ Login successful!");
      playSound(successSound);
      setTimeout(() => navigate("/"), 2000);
    }
  };
  

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <form className="register-form" onSubmit={handleLogin}>
        <h1 className="register-title">{t.loginTitle}</h1>

        <div className="login-input-group">
          <label htmlFor="email">{t.email}</label>
          <input
            type="email"
            name="email"
            placeholder={t.email}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-input-group">
          <label htmlFor="password">{t.password}</label>
          <input
            type="password"
            name="password"
            placeholder={t.password}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          {t.signIn}
        </button>

        <p className="login-footer">
          {t.noAccount} <Link to="/log-reg">{t.register}</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
