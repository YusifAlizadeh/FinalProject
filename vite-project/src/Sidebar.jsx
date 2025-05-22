import { Laptop, Sofa, Shirt, Gamepad2, ShoppingBag, Watch, Glasses } from "lucide-react";
import "./assets/Sidebar.css";
import { useLang } from "./local/LanguageContext"; 

const categories = [
  { en: "Electronics", az: "Elektronika", icon: Laptop },
  { en: "Furniture", az: "Mebel", icon: Sofa },
  { en: "Fashion", az: "Dəb", icon: Shirt },
  { en: "Toys", az: "Oyunlar", icon: Gamepad2 },
  { en: "Bags", az: "Çantalar", icon: ShoppingBag },
  { en: "Watches", az: "Saatlar", icon: Watch },
  { en: "Accessories", az: "Aksesuarlar", icon: Glasses },
];

const App = () => {
  const { language } = useLang();

  return (
    <div className="container">
      <div className="sidebar">
        <h3 className="sideb">{language === "az" ? "TREND KATEQORİYALARI" : "TREND'S CATEGORIES"}</h3>
        <ul className="sideka">
          {categories.map((category) => (
            <li className="category-item" key={category.en}>
              <category.icon className="icon menka" /> {category[language]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
