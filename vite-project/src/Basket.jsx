import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from "./store/redux/cartSlice";
import { motion } from "framer-motion";
import "./assets/Basket.css";
import { Link } from "react-router-dom";


const Basket = () => {
  const items = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="basket-container">
      <h1 className="basket-title"><FaShoppingCart /> Your Basket</h1>
      {items.length === 0 ? (
        <EmptyBasket />
      ) : (
        <div className="basket-items">
          {items.map((item) => (
            <div key={item.id} className="basket-item">
              <img src={item.img || item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <button className="delete-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="basket-summary">
        <h2>Total: ${total.toFixed(2)}</h2>
        <Link to="/checkout" className="checkout-btn">
  Proceed to Checkout
</Link>
      </div>
    </div>
  );
};

const EmptyBasket = () => {
  return (
    <motion.div
      className="empty-basket"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="icon-wrapper"
        initial={{ rotate: -10 }}
        animate={{ rotate: [ -10, 10, -10 ] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FaShoppingCart size={60} color="#999" />
      </motion.div>
      <h2 className="empty-text">Your basket is empty</h2>
      <p className="empty-subtext">Looks like you haven’t added anything yet 🛍️</p>
    </motion.div>
  );
};

export default Basket;
