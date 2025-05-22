import "./assets/Navbar.css";
import { IoEarth } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { User, LogOut } from "lucide-react";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoIosCall } from "react-icons/io";
import { LuHandshake } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import logo from "./assets/img/bigshop-logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaToolsSolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./local/LanguageContext";
import { FaQuestion } from "react-icons/fa";
import {
  Smartphone,
  Home,
  Sparkles,
  Shirt,
  Watch,
  Utensils,
  Glasses,
  ShoppingBag,
  BookOpen,
  Car,
  Laptop,
  ChevronRight,
} from "lucide-react";
import ShopDropdown from "./ShopDropdown";
import BlogDropdown from "./BlogDropdown";
import PagesDropdown from "./PagesDropdown";
import { Link } from "react-router-dom";
import supabase from "./helper/supabaseClient";
import { useCurrency } from "./local/CurrencyContext";
import { useTheme } from "./local/ThemeContext"; 
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md"; 
import { generateSlug } from "./utils/slugify";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { userData, setUserData } = useUser() || {}; 
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      const { data, error } = await supabase
  .from("final-unec")
  .select("id, title, img") 
  .ilike("title", `%${searchQuery}%`);

  
      if (!error) {
        setSearchResults(data);
      }
    };
  
    fetchResults();
  }, [searchQuery]);
  


  const [isLanguageHovered, setIsLanguageHovered] = useState(false);
  const [isCurrencyHovered, setIsCurrencyHovered] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isBlogHovered, setIsBlogHovered] = useState(false);
  const [isPagesHovered, setIsPagesHovered] = useState(false);

  const { language, toggleLanguage, t } = useLang();
  const { currency, setCurrency } = useCurrency();
  const { isDarkMode, toggleTheme } = useTheme();

  const categories = [
    { name: language === "az" ? "Smartfonlar" : "Smartphones", icon: Smartphone },
    { name: language === "az" ? "Dekor" : "Decor", icon: Home },
    { name: language === "az" ? "Aksesuarlar" : "Accessories", icon: Sparkles },
    { name: language === "az" ? "Dəblər" : "Fashion", icon: Shirt },
    { name: language === "az" ? "Saatlar" : "Watches", icon: Watch },
    { name: language === "az" ? "Restoran" : "Restaurant", icon: Utensils },
    { name: language === "az" ? "Eynəklər" : "Eyewear", icon: Glasses },
    { name: language === "az" ? "Çantalar və Ayaqqabılar" : "Bags & Shoes", icon: ShoppingBag },
    { name: language === "az" ? "Kitablar" : "Books", icon: BookOpen },
    { name: language === "az" ? "Avtomobillər" : "Cars", icon: Car },
    { name: language === "az" ? "Noutbuklar" : "Laptops", icon: Laptop },
  ];

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  
  const wishlist = useSelector((state) => state.wishlist);
  const wishlistCount = wishlist.length;

  return (
    <header className={`navbar ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="containerr">
        <div className="top-bar">
          <div className="left">
            <div
              className="language"
              onMouseEnter={() => setIsLanguageHovered(true)}
              onMouseLeave={() => setIsLanguageHovered(false)}
            >
              <IoEarth /> {t("language")}
              {isLanguageHovered && (
                <div className="language-options">
                  <a onClick={() => toggleLanguage("az")}>AZ</a>
                  <a onClick={() => toggleLanguage("en")}>EN</a>
                </div>
              )}
            </div>
            <div
              className="currency"
              onMouseEnter={() => setIsCurrencyHovered(true)}
              onMouseLeave={() => setIsCurrencyHovered(false)}
            >
              💲 {t("currency")}
              {isCurrencyHovered && (
                <div className="currency-options">
                  <a onClick={() => setCurrency("AZN")}>AZN</a>
                  <a onClick={() => setCurrency("EUR")}>EUR</a>
                </div>
              )}
            </div>
            <div className="social-icons">
              <span><i className="bi bi-facebook"></i></span>
              <span><i className="bi bi-twitter"></i></span>
              <span><i className="bi bi-linkedin"></i></span>
              <span><i className="bi bi-telegram"></i></span>
            </div>
          </div>
          <div className="theme-toggle">
            <button onClick={toggleTheme} className="theme-btn">
              {isDarkMode ? (
                <BsFillSunFill className="jut"  /> 
              ) : (
                <BsFillMoonStarsFill className="jut"  /> 
              )}
            </button>
          </div>
          <div className="right">
            <span><SlEnvolopeLetter /> {t("newsletter")}</span>
            <span><IoIosCall /> {t("contact")}</span>
            <span><LuHandshake /> {t("affiliate")}</span>
          </div>
        </div>

        <div className="main-bar">
          <div className="logo">
            <img src={logo} alt="BigShop Logo" />
          </div>
          <div className="search-bar">
  <input
    type="text"
    placeholder={t("searchPlaceholder")}
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setShowSuggestions(true);
    }}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    onFocus={() => setShowSuggestions(true)}
  />
  <button className="search-btn"><CiSearch /></button>

  {showSuggestions && searchResults.length > 0 && (
  <div className="search-suggestions">
    {searchResults.map((item) => (
      <Link key={item.id} to={`/product/${generateSlug(item.title)}`} className="suggestion-item">
        <img src={item.img} alt={item.title} className="suggestion-img" />
        <div className="suggestion-text">{item.title}</div>
      </Link>
    ))}
  </div>
)}


</div>

          <div className="support">
            <span className="bi bi-phone phone"></span>
            <div className="support-text">
              <span className="sup">{t("support")}</span>
              <span className="num">+9945500000</span>
            </div>
          </div>
          <div className="cart">
            <span className="bi bi-basket bas"></span>
            <div className="cart-text">
              <span style={{ color: "#D4121A" }}>$0.00</span>
              <span style={{ color: "gray",  fontWeight: "normal" }}>{t("items")} (0)</span>
            </div>
          </div>
        </div>

        <nav className="bottom-bar">
          <span className="burger"><RxHamburgerMenu style={{ fontSize: "18px", color: "white", strokeWidth: "1" }} /></span>
          <motion.span
            className="categories"
            onMouseEnter={() => setIsCategoriesHovered(true)}
            onMouseLeave={() => setIsCategoriesHovered(false)}
            initial={{ width: "150px" }}
            animate={{ width: isCategoriesHovered ? "310px" : "250px" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="name">{t("categories")}</p>

            <AnimatePresence>
              {isCategoriesHovered && (
                <motion.div
                  className="dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {categories.map(({ name, icon: Icon }) => (
                    <a href="#" key={name} className="dropdown-item">
                      <Icon className="icon" /> {name} <ChevronRight className="arrow" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.span>

          <span className="drop"><IoIosArrowDown /></span>
          <div className={`yes ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div
              className="nav-item shop-container"
              onMouseEnter={() => {
                if (window.innerWidth > 768) setIsShopHovered(true);
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 768) setIsShopHovered(false);
              }}
            >
              <Link to="/shop" className="shop-link">
                <span>
                  <i className="trup bi bi-shop-window"></i> {t("shop")}
                  <span className="huh">
                    <IoIosArrowDown />
                  </span>
                </span>
              </Link>
              {isShopHovered && window.innerWidth > 768 && <ShopDropdown />}
            </div>

            <div
  className="nav-item blog-container"
  onMouseEnter={() => {
    if (window.innerWidth > 768) setIsBlogHovered(true);
  }}
  onMouseLeave={() => {
    if (window.innerWidth > 768) setIsBlogHovered(false);
  }}
>
  <Link to="/blog" className="nav-link">
    <span>
      <i className="trup bi bi-card-text"></i> {t("blog")}
      <span className="huh">
        <IoIosArrowDown />
      </span>
    </span>
  </Link>
  {isBlogHovered && window.innerWidth > 768 && <BlogDropdown />}
</div>

<div
  className="nav-item pages-container"
  onMouseEnter={() => {
    if (window.innerWidth > 768) setIsPagesHovered(true);
  }}
  onMouseLeave={() => {
    if (window.innerWidth > 768) setIsPagesHovered(false);
  }}
>
  <Link to="/" className="nav-link">
    <span>
      <i className="trup bi bi-book"></i> {t("pages")}
      <span className="huh">
        <IoIosArrowDown />
      </span>
    </span>
  </Link>

  {isPagesHovered && window.innerWidth > 768 && <PagesDropdown />}
</div>


            <Link to="/contact" className="link-style">
              <i className=" trup bi bi-telephone"></i> {t("contact")}
            </Link>

            <Link className="faq" to="/faq">
              <FaQuestion className="trup"  /> {t("faq")}
            </Link>
          </div>

          {userData && userData.email === 'admin@gmail.com' && (
            <Link to="/admin" className="admin-link">
              <MdAdminPanelSettings className="admin-icon" />
              <span className="adminka">Admin Panel</span>
            </Link>
          )}

          <div className="diff">
            {userData ? (
              <div className="user-display">
                <User size={20} style={{ marginRight: "5px" }} />
                {userData.first_name} {userData.last_name}
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={20} style={{ marginLeft: "10px" }} />
                </button>
              </div>
            ) : (
              <Link to="/log-reg" className="auth">{t("login")}</Link>
            )}

            <Link to="/wishlist" className="wishlist">
              <IoMdHeartEmpty  style={{ fontSize: "16px" }} />
              {t("wishlist")} ({wishlistCount})
            </Link>

            <Link to="/basket" className="basket compare flex items-center gap-2">
  <FaShoppingCart size={16} />
  {t("BASKET")}
</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
