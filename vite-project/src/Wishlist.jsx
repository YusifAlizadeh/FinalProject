import { useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { useCurrency } from "./local/CurrencyContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "./local/LanguageContext";
import "./assets/Wishlist.css";

const text = {
  en: {
    title: "My Wishlist",
    empty: "Your wishlist is feeling a little lonely...",
    add: "Add some favorites to make it happy!",
    view: "View details",
  },
  az: {
    title: "İstək Siyahım",
    empty: "İstək siyahınız bir az tənha görünür...",
    add: "Ən sevdiklərinizi əlavə edin və onu sevindirin!",
    view: "Ətraflı bax",
  },
};

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

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { currency } = useCurrency();
  const { language } = useLang();
  const t = text[language];
  const symbol = currency === "AZN" ? "₼" : currency === "EUR" ? "€" : "$";

  const [modalProduct, setModalProduct] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">{t.title}</h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <Heart size={40} strokeWidth={1.5} />
          <p>{t.empty}</p>
          <span>{t.add}</span>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => {
            const newPrice = convertPrice(product.price, currency);
            const oldPrice = convertPrice(product.price * 1.1, currency);

            return (
              <div className="wishlist-card" key={product.id}>
                {product.discountPercentage && (
                  <span className="discount-badge">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
                <img
                  src={product.img}
                  alt={product.title}
                  className="wishlist-image"
                />
                <h3 className="wishlist-name">{product.title}</h3>
                <p className="wishlist-prices">
                  <span className="old-price">
                    {symbol}
                    {oldPrice.toFixed(2)}
                  </span>
                  <span className="new-price">
                    {symbol}
                    {newPrice.toFixed(2)}
                  </span>
                </p>
                <div className="wishlist-actions">
                  <button className="view-btn" onClick={() => setModalProduct(product)}>
                    {t.view}
                  </button>
                  <button className="card-btn" onClick={() => navigate("/payment")}>
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalProduct && (
        <div className="shop-modal-overlay" onClick={() => setModalProduct(null)}>
          <div className="shop-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="shop-modal-close"
              onClick={() => setModalProduct(null)}
            >
              ×
            </button>
            <img
              src={modalProduct.img || "/placeholder.svg"}
              alt={modalProduct.title}
              className="shop-modal-img"
            />
            <h2>{modalProduct.title}</h2>
            <p className="shop-modal-price">
              {symbol}
              {convertPrice(modalProduct.price, currency).toFixed(2)}
            </p>
            <p>{modalProduct.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
