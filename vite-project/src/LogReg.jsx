import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./assets/LogReg.css";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successSound from "./assets/sounds/success-1-6297.mp3";
import errorSound from "./assets/sounds/fail-144746.mp3";

const text = {
  registerTitle: { az: "Hesab yaradın", en: "Create an account" },
  alreadyHave: { az: "Əgər artıq hesabınız varsa, zəhmət olmasa", en: "If you already have an account" },
  loginHere: { az: "daxil olun", en: "log in" },
  personalDetails: { az: "Şəxsi məlumatlarınız", en: "Your personal details" },
  firstName: { az: "Ad", en: "First Name" },
  lastName: { az: "Soyad", en: "Last Name" },
  email: { az: "E-Poçt", en: "Email" },
  passwordTitle: { az: "Şifrəniz", en: "Your Password" },
  password: { az: "Şifrə", en: "Password" },
  newsletter: { az: "Xəbərlərə abunə olun", en: "Subscribe to newsletter" },
  privacy: { az: "Mən oxudum və razıyam", en: "I have read and agree to the" },
  privacyPolicy: { az: "Məxfilik siyasəti", en: "Privacy Policy" },
  continue: { az: "Davam et", en: "Continue" },
  registrationSuccess: { az: "Qeydiyyat uğurla başa çatdı! Zəhmət olmasa e-poçtunuzu yoxlayın.", en: "Registration successful! Please check your email." },
  registrationFailed: { az: "Qeydiyyat alınmadı:", en: "Registration failed:" },
  emailExists: { az: "Bu e-poçt ünvanı ilə artıq hesab mövcuddur.", en: "An account with this email already exists." },
  agreeToPrivacy: { az: "Məxfilik siyasətinə razı olmalısınız.", en: "You must agree to the privacy policy." },
  unexpectedError: { az: "Gözlənilməz xəta baş verdi.", en: "An unexpected error occurred." }
};

function RegisterForm() {
  const { language } = useLang();
  const navigate = useNavigate();

  const t = Object.fromEntries(
    Object.entries(text).map(([key, val]) => [key, val[language]])
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newsletter: false,
    privacyPolicy: false,
  });

  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play().catch((e) => {
      console.warn("Audio play failed:", e);
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.privacyPolicy) {
      toast.error(t.agreeToPrivacy);
      playSound(errorSound);
      return;
    }
  
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            newsletter: formData.newsletter,
          },
        },
      });
  
      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
          toast.error(t.emailExists);
        } else {
          toast.error(`${t.registrationFailed} ${signUpError.message}`);
        }
        playSound(errorSound);
      } else {
        toast.success(t.registrationSuccess);
        playSound(successSound);
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error(t.unexpectedError);
      playSound(errorSound);
    }
  };
  

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="register-form">
        <h1 className="register-title">{t.registerTitle}</h1>

        <p className="login-text">
          {t.alreadyHave} <Link to="/login">{t.loginHere}</Link>
        </p>

        <div className="form-section">
          <h2 className="section-title">{t.personalDetails}</h2>

          <div className="form-group">
            <label htmlFor="firstName">
              <span className="required">*</span> {t.firstName}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder={t.firstName}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              <span className="required">*</span> {t.lastName}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder={t.lastName}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span className="required">*</span> {t.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">{t.passwordTitle}</h2>

          <div className="form-group">
            <label htmlFor="password">
              <span className="required">*</span> {t.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={t.password}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">{t.newsletter}</h2>

          <div className="toggle-group">
            <label className="toggle-label">{t.newsletter}</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="privacy-policy">
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleChange}
              required
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="policy-text">
            {t.privacy} <a href="#privacy">{t.privacyPolicy}</a>
          </span>
        </div>

        <div className="form-actions">
          <button type="submit" className="continue-btn" onClick={handleSubmit}>
            {t.continue}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
