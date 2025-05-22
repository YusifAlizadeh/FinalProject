import { useState, useEffect } from "react";
import { debounce } from "lodash";
import supabase from "./helper/supabaseClient";
import "./assets/Shop.css";
import { FaHeart, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "./store/redux/wishlistSlice";
import { useCurrency } from "./local/CurrencyContext";
import { addToCart } from "./store/redux/cartSlice";
import { useNavigate } from "react-router-dom";


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



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories] = useState(["Jewelry", "Furniture", "Electronics", "Clothes"]);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { currency } = useCurrency();
  const symbol = currency === "AZN" ? "₼" : currency === "EUR" ? "€" : "$";

  const navigate = useNavigate();
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("final-unec").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  const applyFilters = () => {
    let tempProducts = [...products];

    tempProducts = tempProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (categoryFilter) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredProducts(tempProducts);
  };

  const applyFiltersDebounced = debounce(applyFilters, 500);

  useEffect(() => {
    applyFiltersDebounced();
  }, [priceRange, categoryFilter]);

  return (
    <div className="shop-page-main">
      <div className="shop-sidebar">
        <div className="shop-filters-panel">
          <h3>Filters</h3>

          <div className="shop-category-filter">
            <label>Category</label>
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="shop-price-filter">
            <label>Price Range</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="10"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
            <div className="shop-price-range">
              <span>{symbol}{convertPrice(priceRange[0], currency).toFixed(2)}</span> - <span>{symbol}{convertPrice(priceRange[1], currency).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-product-item" key={product.id}>
              <img src={product.img || "/placeholder.svg"} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="shop-product-price">
                {symbol}
                {convertPrice(product.price, currency).toFixed(2)}
              </p>
              <p className="shop-product-description">{product.desc}</p>
              <button
                className="shop-view-btn"
                onClick={() => setModalProduct(product)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="shop-no-products">
            No products found. Try adjusting the filters.
          </p>
        )}
      </div>

      {/* Modal */}
      {modalProduct && (
        <div className="shop-modal-overlay" onClick={() => setModalProduct(null)}>
          <div
            className="shop-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="shop-modal-close"
              onClick={() => setModalProduct(null)}
            >
              <FaTimes />
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
            <div className="shop-modal-buttons">
            <button
  className="shop-add-cart-btn"
  onClick={() => {
    dispatch(addToCart(modalProduct));
    setTimeout(() => navigate("/basket"), 1500);
  }}
>
  🛒 Add to Cart
</button>

  <button
    className="shop-add-cart-btn"
    onClick={() => dispatch(toggleWishlist(modalProduct))}
  >
    <FaHeart style={{ marginRight: "8px" }} />
    {wishlist.find((item) => item.id === modalProduct.id)
      ? "Remove from Wishlist"
      : "Add to Wishlist"}
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
