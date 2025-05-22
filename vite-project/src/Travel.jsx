import "./assets/Travel.css";
import hella from "./assets/img/bigshop-image-02.jpg";
import { useLang } from "./local/LanguageContext";

const text = {
  subtitle: {
    en: "BigShop Product Collection",
    az: "BigShop Məhsul Kolleksiyası",
  },
  title: {
    en: "Travel Still Life Pack",
    az: "Səyahət Həyat Stili Paketi",
  },
  description: {
    en: "Save when you shop the Best Buy Outlet for clearance, open-box, refurbished and pre-owned items. Save more with coupons and 70% off. Super value deals 2024.",
    az: "Endirimli, açıq qutulu, təmir olunmuş və əvvəl istifadə olunmuş məhsullarla Best Buy Outlet-də alış-veriş edərək qənaət edin. Kuponlarla və 70%-dək endirimlə daha çox qazanın. Super fürsətlər 2024.",
  },
  button: {
    en: "View All Product >",
    az: "Bütün Məhsullara Bax >",
  },
};

const TravelStillLifePack = () => {
  const { language } = useLang();

  return (
    <div className="travel-pack">
      <div className="image-section">
        <img src={hella} alt="Travel Pack" className="background-image" />
        <div className="hotspots">
          <div className="hotspot" style={{ top: "15%", left: "25%" }}></div>
          <div className="hotspot" style={{ top: "20%", left: "55%" }}></div>
          <div className="hotspot" style={{ top: "35%", left: "75%" }}></div>
          <div className="hotspot" style={{ top: "50%", left: "30%" }}></div>
          <div className="hotspot" style={{ top: "65%", left: "60%" }}></div>
          <div className="hotspot" style={{ top: "80%", left: "40%" }}></div>
        </div>
      </div>
      <div className="text-section">
        <div className="text-main">
          <h5>{text.subtitle[language]}</h5>
          <h1>{text.title[language]}</h1>
          <p>{text.description[language]}</p>
        </div>
        <button className="cta-button">{text.button[language]}</button>
      </div>
    </div>
  );
};

export default TravelStillLifePack;
