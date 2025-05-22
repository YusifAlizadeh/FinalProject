import { useEffect, useState } from "react";
import { ShoppingCart, RefreshCcw, Heart } from "lucide-react";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import { useCurrency } from "./local/CurrencyContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "./store/redux/wishlistSlice";
import { Link } from "react-router-dom";
import "./assets/ThirdProd.css";
import { addToCart } from "./store/redux/cartSlice";

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

const ProductCard = ({ product, currency, isHovered, onMouseEnter, onMouseLeave }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const convertedNewPrice = convertPrice(product.price, currency);
  const convertedOldPrice = convertPrice(product.price * 1.13, currency);
  const symbol = currency === "AZN" ? "₼" : currency === "EUR" ? "€" : "$";

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
      {product.discountPercentage && <span className="discount">-14%</span>}
      <img className="product-image" src={product.img} alt={product.title} />
      <h3 className="product-name">{product.title}</h3>
      {product.discountPercentage && (
        <p className="old-price">
          {symbol}
          {convertedOldPrice.toFixed(2)}
        </p>
      )}
      <p className="new-price">
        {symbol}
        {convertedNewPrice.toFixed(2)}
      </p>
      <p className="product-description">{product.description}</p>

      <div className="hover-menu">
        <Link to="/basket">
          <button className="menu-btn" onClick={() => dispatch(addToCart(product))}>
            <ShoppingCart size={20} />
          </button>
        </Link>

        {showModal && (
          <PaymentModal product={product} onClose={() => setShowModal(false)} />
        )}

        <button className="menu-btn">
          <RefreshCcw size={20} />
        </button>
        <button className="menu-btn" onClick={handleWishlistClick}>
          <Heart
            size={20}
            color={isWishlisted ? "red" : "black"}
            fill={isWishlisted ? "red" : "none"}
          />
        </button>
      </div>
    </div>
  );
};


const ThirdProd = ({ limit = 4, skip = 11 }) => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { language } = useLang();
  const { currency } = useCurrency();

  const translations = {
    az: {
      sectionSubtitle: "Evinizdə ehtiyac duyduğunuz",
      sectionTitle: "Ev alətləri",
    },
    en: {
      sectionSubtitle: "What you need in",
      sectionTitle: "Home Appliances",
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("final-unec")
        .select("*")
        .range(skip, skip + limit - 1);
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [limit, skip]);

  return (
    <div className="third-prod-container">
      <h2 className="section-subtitle">{translations[language].sectionSubtitle}</h2>
      <h1 className="section-title">{translations[language].sectionTitle}</h1>
      <div className="products-arrow-wrapper">
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
    </div>
  );
};

export default ThirdProd;
