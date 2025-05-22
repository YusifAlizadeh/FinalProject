import "./assets/TwoCards.css";
import hatImage from "./assets/img/bigshop-image-12.png"; 
import shoesImage from "./assets/img/bigshop-image-13.png"; 
import { useLang } from "./local/LanguageContext";

const text = {
  discount: {
    en: "Save up to 30% off",
    az: "30%-dək qənaət et",
  },
  title: {
    en: "Fashion Sale",
    az: "Moda Endirimi",
  },
  button: {
    en: "Shop Now",
    az: "İndi Al",
  },
};

function TwoCards() {
  const { language } = useLang();

  return (
    <div className="cards-wrapper">
      <div className="card" style={{ backgroundColor: "#0047AB" }}>
        <div className="card-content">
          <p className="discount">{text.discount[language]}</p>
          <h2 className="title">{text.title[language]}</h2>
          <button className="shop-button">{text.button[language]}</button>
        </div>
        <img src={hatImage} alt="Fashion hat" className="card-image" />
      </div>

      <div className="card" style={{ backgroundColor: "#252525" }}>
        <div className="card-content">
          <p className="discount">{text.discount[language]}</p>
          <h2 className="title">{text.title[language]}</h2>
          <button className="shop-button">{text.button[language]}</button>
        </div>
        <img src={shoesImage} alt="Fashion shoes" className="card-image" />
      </div>
    </div>
  );
}

export default TwoCards;
