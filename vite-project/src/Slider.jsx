import { useState, useEffect } from "react";
import { useLang } from "./local/LanguageContext";
import "./assets/Slider.css";
import im1 from "./assets/img/bigshop-banner-08.jpg";
import im2 from "./assets/img/bigshop-banner-15.jpg";
import watchImg from "./assets/img/bigshop-banner-11.jpg";

const slides = [
  {
    title: { en: "Virtual Reality Headset", az: "Virtual Reallıq Eynəyi" },
    subtitle: { en: "Enjoy Virtual Reality", az: "Virtual aləmdən həzz al" },
    buttonText: { en: "Shop Now", az: "İndi Al" },
    imgSrc: im1,
    bgColor: "#fdb597",
  },
  {
    title: { en: "Modern Living Room", az: "Müasir Qonaq Otağı" },
    subtitle: { en: "Discover & Find Your New Product", az: "Yeni məhsullarını kəşf et" },
    buttonText: { en: "Shop Now", az: "İndi Al" },
    imgSrc: im2,
    bgColor: "#e7e7e7",
  },
];

const watchBanner = {
  title: { en: "Good Moment", az: "Yaxşı Anda" },
  subtitle: { en: "In Great Time", az: "Həm Zamanda" },
  buttonText: { en: "Read more", az: "Daha Çox Oxu" },
};

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <div className="slide-content">
              <h3>{slide.title[language]}</h3>
              <h2>{slide.subtitle[language]}</h2>
              <button className="slide-button">{slide.buttonText[language]}</button>
            </div>
            <img className="slide-image" src={slide.imgSrc} alt={slide.title[language]} />
          </div>
        ))}
      </div>

      <div className="watch-banner">
        <div className="watch-content">
          <h3 className="titwa">{watchBanner.title[language]}</h3>
          <h2 className="titsa">{watchBanner.subtitle[language]}</h2>
          <button className="watch-button">{watchBanner.buttonText[language]}</button>
        </div>
        <img className="watch-image" src={watchImg} alt="Luxury Watch" />
      </div>
    </div>
  );
};

export default Slider;
