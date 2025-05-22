import { useEffect, useState } from "react";
import { ShoppingCart, RefreshCw, Heart } from "lucide-react";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import { useCurrency } from "./local/CurrencyContext"; 
import "./assets/FirstProd.css";
import { useDispatch, useSelector } from "react-redux"; // ✅ только один импорт
import { toggleWishlist } from "./store/redux/wishlistSlice";
import PaymentModal from "./PaymentModal";
import { Link } from "react-router-dom";
import { addToCart } from "./store/redux/cartSlice"; // ✅ без повторов


const convertPrice = (price, currency) => {
  switch (currency) {
    case "AZN":
      return price * 1.7;
    case "EUR":
      return price * 0.93;
    default:
      return price; 
  }
};


const ProductCard = ({ product, isHovered, onMouseEnter, onMouseLeave, currency }) => {
  const [showModal, setShowModal] = useState(false);
  const convertedNewPrice = convertPrice(product.price, currency);
  const convertedOldPrice = convertPrice(product.price * 1.1, currency);
  const symbol = currency === "AZN" ? "₼" : currency === "EUR" ? "€" : "$";

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div
      className="product-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ opacity: isHovered ? 0.9 : 1 }}
    >
      {product.discountPercentage && (
        <span className="discount">-{Math.round(product.discountPercentage)}%</span>
      )}
      <img src={product.img} alt={product.title} className="product-image" />
      <h3 className="product-name">{product.title}</h3>
      <p className="price">
        <span className="old-price">
          {symbol}
          {convertedOldPrice.toFixed(2)}
        </span>
        <span className="new-price">
          {symbol}
          {convertedNewPrice.toFixed(2)}
        </span>
      </p>

      <div className="icon-container">
        <Link to="/basket">
        <button
  className="menu-btn"
  onClick={() => dispatch(addToCart(product))}
>
  <ShoppingCart size={20} />
</button>
        </Link>

        {showModal && (
          <PaymentModal product={product} onClose={() => setShowModal(false)} />
        )}

        <button className="menu-btn" onClick={handleWishlistClick}>
          <Heart
            size={20}
            color={isWishlisted ? "red" : "black"}
            fill={isWishlisted ? "red" : "none"}
          />
        </button>

        <button className="menu-btn">
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
};

export default function LatestElectronics() {
  const { language } = useLang();
  const { currency } = useCurrency(); 
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const translations = {
    az: {
      newPopularItems: "Yeni populyar məhsullar",
      latestElectronics: "Ən son elektronika",
      all: "HAMISI",
      specials: "XÜSUSİ",
    },
    en: {
      newPopularItems: "New popular items",
      latestElectronics: "Latest Electronics",
      all: "ALL",
      specials: "SPECIALS",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("final-unec")
        .select("*")
        .limit(8);

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h3 className="subtitle">{translations[language]["newPopularItems"]}</h3>
        <h2 className="title">{translations[language]["latestElectronics"]}</h2>
        <div className="filter-options">
          <span>{translations[language]["all"]}</span>
          <span>{translations[language]["specials"]}</span>
        </div>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            isHovered={hoveredProduct === product.id}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          />
        ))}
      </div>
    </div>
  );
}
