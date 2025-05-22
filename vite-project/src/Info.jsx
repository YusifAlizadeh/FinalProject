import "./assets/Info.css"; 
import { useLang } from "./local/LanguageContext";

// Импорт логотипов
import Brother from "./assets/img/brother.png";
import Discover from "./assets/img/discover.png";
import Sandisk from "./assets/img/sandisk.png";
import Lenovo from "./assets/img/lenovo.png";

// Импорт изображений товаров
import DroneImage from "./assets/img/bigshop-image-08.png";
import WatchImage from "./assets/img/bigshop-image-06.png";
import HeadphonesImage from "./assets/img/bigshop-image-05.png";

const text = {
  droneTitle: {
    en: "Modern White Drone",
    az: "Müasir Ağ Dron",
  },
  droneDiscount: {
    en: "Up to 15% Discount",
    az: "15%-dək Endirim",
  },
  shopNow: {
    en: "Shop Now",
    az: "Alış-veriş et",
  },
  watchCategory: {
    en: "Wristwatch",
    az: "Bilək saatı",
  },
  watchTitle: {
    en: "Chronograph Black Watch",
    az: "Qara Xronoqraf Saat",
  },
  headphonesCategory: {
    en: "Beats Solo Air",
    az: "Beats Solo Air",
  },
  headphonesTitle: {
    en: "Red wireless headphones",
    az: "Qırmızı Simsiz Qulaqlıqlar",
  },
};

const DroneBanner = () => {
  const { language } = useLang();

  return (
    <div className="banner-container">
      {/* Блок брендов */}
      <div className="brands">
        <img src={Brother} alt="Brother" />
        <img src={Discover} alt="Discover" />
        <img src={Sandisk} alt="Sandisk" />
        <img src={Lenovo} alt="Lenovo" />
        <img src={Brother} alt="Brother" />
        <img src={Discover} alt="Discover" />
        <img src={Sandisk} alt="Sandisk" />
        <img src={Lenovo} alt="Lenovo" />
      </div>

      {/* Блок баннера с дроном */}
      <div className="drone-banner">
        <div className="banner-content">
          <h2>{text.droneTitle[language]}</h2>
          <p>{text.droneDiscount[language]}</p>
          <button className="shop-button">{text.shopNow[language]} →</button>
        </div>
        <img src={DroneImage} alt="Drone" className="drone-image" />
      </div>

      {/* Блок с товарами: часы и наушники */}
      <div className="products-banner">
        <div className="products-banner-wrapper">
          <div className="banner-item">
            <img src={WatchImage} alt="Watch" className="banner-img" />
            <div className="banner-info">
              <p className="banner-category">{text.watchCategory[language]}</p>
              <h3 className="banner-title">{text.watchTitle[language]}</h3>
              <button className="banner-button">{text.shopNow[language]}</button>
            </div>
          </div>

          <div className="banner-item">
            <img src={HeadphonesImage} alt="Headphones" className="banner-img" />
            <div className="banner-info">
              <p className="banner-category">{text.headphonesCategory[language]}</p>
              <h3 className="banner-title">{text.headphonesTitle[language]}</h3>
              <button className="banner-button">{text.shopNow[language]}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneBanner;
