import "./assets/Footer.css";
import logo from "./assets/img/bigshop-logo.png";
import { Truck, Gift, Headphones, Wallet, Twitter, Facebook, Send, PhoneCall } from "lucide-react";
import { useLang } from "./local/LanguageContext";

const text = {
  shipping: { en: "Free Shipping", az: "Pulsuz Çatdırılma" },
  shippingDesc: { en: "Free Shipping On All Order", az: "Bütün sifarişlərə pulsuz çatdırılma" },
  discount: { en: "Member Discount", az: "Üzv Endirimi" },
  discountDesc: { en: "For order over $1500.00", az: "$1500.00-dan yuxarı sifarişlər üçün" },
  support: { en: "Online Support 24/7", az: "24/7 Onlayn Dəstək" },
  supportDesc: { en: "Technical Support 24/7", az: "24/7 Texniki Dəstək" },
  payment: { en: "Online Payment", az: "Onlayn Ödəniş" },
  paymentDesc: { en: "100% Secure Payment", az: "100% Təhlükəsiz Ödəniş" },
  contactText: {
    en: "If you have any questions, please contact us at",
    az: "Hər hansı sualınız varsa, bizimlə əlaqə saxlayın",
  },
  callUs: { en: "Call us 24/7", az: "Bizi 24/7 zəng edin" },
  myAccount: { en: "My Account", az: "Hesabım" },
  myOrder: { en: "My Order", az: "Sifarişlərim" },
  affiliate: { en: "Affiliate", az: "Tərəfdaşlıq" },
  return: { en: "Return", az: "Qaytarmaq" },
  wishlist: { en: "Wishlist", az: "İstək Siyahısı" },
  quickLinks: { en: "Quick Links", az: "Tez Keçidlər" },
  blog: { en: "Blog", az: "Bloq" },
  special: { en: "Special", az: "Xüsusi" },
  sitemap: { en: "Site Map", az: "Sayt Xəritəsi" },
  compare: { en: "Compare", az: "Müqayisə Et" },
  information: { en: "Information", az: "Məlumat" },
  about: { en: "About Us", az: "Haqqımızda" },
  privacy: { en: "Privacy Policy", az: "Məxfilik Siyasəti" },
  terms: { en: "Terms & Conditions", az: "Qaydalar və Şərtlər" },
  contactUs: { en: "Contact Us", az: "Bizimlə Əlaqə" },
  workingHours: { en: "Working Hours", az: "İş Saatları" },
  monSat: { en: "Monday - Saturday", az: "Bazar ertəsi - Şənbə" },
  sunday: { en: "Sunday", az: "Bazar günü" },
  rights: { en: "© Barana, all rights reserved. Designed by Retrina", az: "© Barana, bütün hüquqlar qorunur. Dizayn: Retrina" },
};

const Footer = () => {
  const { language } = useLang();

  return (
    <footer className="footer">
      <div className="top-section">
        <div className="feature">
          <Truck size={24} />
          <h4>{text.shipping[language]}</h4>
          <p>{text.shippingDesc[language]}</p>
        </div>
        <div className="feature">
          <Gift size={24} />
          <h4>{text.discount[language]}</h4>
          <p>{text.discountDesc[language]}</p>
        </div>
        <div className="feature">
          <Headphones size={24} />
          <h4>{text.support[language]}</h4>
          <p>{text.supportDesc[language]}</p>
        </div>
        <div className="feature">
          <Wallet size={24} />
          <h4>{text.payment[language]}</h4>
          <p>{text.paymentDesc[language]}</p>
        </div>
      </div>

      <div className="middle-section">
        <div className="contact">
          <img src={logo} alt="Barana" className="logo" />
          <p>{text.contactText[language]}</p>
          <a href="mailto:Email@example.com">Email@example.com</a>
          <button className="contact-btn">
            <PhoneCall size={16} /> (+0)123456700 - {text.callUs[language]}
          </button>
        </div>
        <div className="links">
          <h4>{text.myAccount[language]}</h4>
          <ul>
            <li>{text.myOrder[language]}</li>
            <li>{text.affiliate[language]}</li>
            <li>{text.return[language]}</li>
            <li>{text.wishlist[language]}</li>
          </ul>
        </div>
        <div className="links">
          <h4>{text.quickLinks[language]}</h4>
          <ul>
            <li>{text.blog[language]}</li>
            <li>{text.special[language]}</li>
            <li>{text.sitemap[language]}</li>
            <li>{text.compare[language]}</li>
          </ul>
        </div>
        <div className="links">
          <h4>{text.information[language]}</h4>
          <ul>
            <li>{text.about[language]}</li>
            <li>{text.privacy[language]}</li>
            <li>{text.terms[language]}</li>
            <li>{text.contactUs[language]}</li>
          </ul>
        </div>
        <div className="working-hours">
          <h4>{text.workingHours[language]}</h4>
          <p>{text.monSat[language]}: <span className="highlight">08 AM - 06 PM</span></p>
          <p>{text.sunday[language]}: <span className="highlight">08 AM - 04 PM</span></p>
          <p>Example Address 487, New York</p>
          <p>(+0)123456700</p>
        </div>
      </div>

      <div className="bottom-section">
        <p>{text.rights[language]}</p>
        <div className="social-icons">
          <Twitter size={24} />
          <Facebook size={24} />
          <Send size={24} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
