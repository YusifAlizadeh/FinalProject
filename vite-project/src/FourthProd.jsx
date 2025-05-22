import { useEffect, useState } from "react";
import { ShoppingCart, RefreshCcw, Heart } from "lucide-react";
import supabase from "./helper/supabaseClient";
import { useLang } from "./local/LanguageContext";
import { useCurrency } from "./local/CurrencyContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "./store/redux/wishlistSlice";
import { addToCart } from "./store/redux/cartSlice";
import { Link } from "react-router-dom";
import "./assets/FourthProd.css";

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

const FourthProd = ({ limit = 4, skip = 15 }) => {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);
  const { language } = useLang();
  const { currency } = useCurrency();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

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

  const handleWishlistClick = (product) => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="third-prod-container">
      <h2 className="section-subtitle">{translations[language].sectionSubtitle}</h2>
      <h1 className="section-title">{translations[language].sectionTitle}</h1>
      <div className="products-arrow-wrapper">
        <div className="products-grid">
          {products.map((product) => {
            const discount = product.discountPercentage || 0;
            const hasDiscount = discount > 0;

            const newPrice = product.price;
            const oldPrice = hasDiscount
              ? newPrice * (1 + discount / 100)
              : null;

            const convertedNewPrice = convertPrice(newPrice, currency);
            const convertedOldPrice = hasDiscount
              ? convertPrice(oldPrice, currency)
              : null;

            const symbol =
              currency === "AZN" ? "₼" : currency === "EUR" ? "€" : "$";
            const isWishlisted = wishlist.some(
              (item) => item.id === product.id
            );

            return (
              <div
                className="product-card"
                key={product.id}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {hasDiscount && (
                  <span className="discount">-{Math.round(discount)}%</span>
                )}

                <img
                  className="product-image"
                  src={product.img}
                  alt={product.title}
                />
                <h3 className="product-name">{product.title}</h3>

                {hasDiscount && (
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

                {hovered === product.id && (
                  <div className="hover-menu">
                    <Link to="/basket">
                      <button
                        className="menu-btn"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </Link>
                    <button className="menu-btn">
                      <RefreshCcw size={20} />
                    </button>
                    <button
                      className="menu-btn"
                      onClick={() => handleWishlistClick(product)}
                    >
                      <Heart
                        size={20}
                        color={isWishlisted ? "red" : "black"}
                        fill={isWishlisted ? "red" : "none"}
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FourthProd;
