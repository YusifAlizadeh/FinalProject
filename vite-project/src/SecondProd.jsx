import React, { useEffect, useState } from "react";
import { ShoppingCart, RefreshCw, Heart } from "lucide-react";
import supabase from "./helper/supabaseClient";
import { useCurrency } from "./local/CurrencyContext";
import "./assets/SecondProd.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "./store/redux/wishlistSlice";
import { Link } from "react-router-dom";
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
      <span className="discount">-12%</span>
      <div className="product-content">
        <img className="product-image" src={product.img} alt={product.title} />
        <h3 className="product-name">{product.title}</h3>
        <p className="old-price">{symbol}{convertedOldPrice.toFixed(2)}</p>
        <p className="new-price">{symbol}{convertedNewPrice.toFixed(2)}</p>
        <p className="product-description">{product.desc}</p>
      </div>
      <div className="hover-menu2">
        <Link to="/basket">
          <button
            className="menu-btn2"
            onClick={() => dispatch(addToCart(product))}
          >
            <ShoppingCart size={20} />
          </button>
        </Link>
        <button className="menu-btn2">
          <RefreshCw size={20} />
        </button>
        <button className="menu-btn2" onClick={handleWishlistClick}>
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


const BackInStock = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { currency } = useCurrency();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("final-unec")
        .select("*")
        .range(8, 11);

      if (error) {
        console.log("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="section-subtitle">Fast-selling products are back in stock</h2>
      <h1 className="section-title">Back in stock this week</h1>
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
};

export default BackInStock;
