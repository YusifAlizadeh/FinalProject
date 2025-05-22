import { useState } from "react";
import "./assets/Contact.css";
import { useLang } from "./local/LanguageContext";

const text = {
  title: {
    en: "Back in stock this week",
    az: "Bu həftə yenidən stokda",
  },
  subtitle: {
    en: "Finally, these fast-selling products are back in stock",
    az: "Nəhayət, bu sürətli satılan məhsullar yenidən stokdadır",
  },
  name: {
    en: "Your Name",
    az: "Adınız",
  },
  email: {
    en: "E-Mail Address",
    az: "E-Mail Ünvanı",
  },
  enquiry: {
    en: "Enquiry",
    az: "Sorğu",
  },
  submit: {
    en: "Submit",
    az: "Göndər",
  },
};

export default function BackInStockForm() {
  const { language } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="containerka">
      <div className="form-section">
        <h1>{text.title[language]}</h1>
        <div className="divider"></div>
        <p className="subtitle">{text.subtitle[language]}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <span className="required">*</span> {text.name[language]}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span className="required">*</span> {text.email[language]}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="enquiry">
              <span className="required">*</span> {text.enquiry[language]}
            </label>
            <textarea
              id="enquiry"
              name="enquiry"
              value={formData.enquiry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group submit-container">
            <button type="submit" className="submit-button">
              {text.submit[language]}
            </button>
          </div>
        </form>
      </div>

      <div className="map-section">
        <iframe
          title="Dubai Map"
          width="100%"
          height="610"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d144302.20715127063!2d55.1175634860021!3d25.276987156785636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6ee3010411c1%3A0x96ec7e118975b78e!2sDubai!5e0!3m2!1sen!2sae!4v1678312569069!5m2!1sen!2sae"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
