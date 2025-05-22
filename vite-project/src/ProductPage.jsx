import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import supabase from "./helper/supabaseClient";
import { generateSlug } from "./utils/slugify";
import { toggleWishlist } from "./store/redux/wishlistSlice";
import { addToCart } from "./store/redux/cartSlice";
import "./assets/ProductPage.css";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Add to Wishlist");
  const [isAdding, setIsAdding] = useState(false);
  const [cartBtnText, setCartBtnText] = useState("Add to Cart");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("final-unec").select("*");
      if (error) {
        console.error("Ошибка при загрузке продуктов:", error.message);
        setLoading(false);
        return;
      }

      const found = data.find((p) => generateSlug(p.title) === slug);
      setProduct(found);
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleAddToWishlist = () => {
    if (product && !isAdding) {
      dispatch(toggleWishlist(product));
      setButtonText("Added");
      setIsAdding(true);
      setTimeout(() => navigate("/wishlist"), 2000);
    }
  };

  const handleAddToBasket = () => {
    if (product) {
      dispatch(addToCart(product));
      setCartBtnText("Added");
      setTimeout(() => navigate("/basket"), 2000);
    }
  };

  if (loading) return <div className="text-center p-4">Загрузка...</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="product-page">
      <div className="product-glass">
        <div className="product-image-box">
          <img src={product.img} alt={product.title} className="product-image" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.desc}</p>

          <div className="product-extra-info">
            <p><strong>Category:</strong> {product.category || "Uncategorized"}</p>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Availability:</strong> In stock</p>
          </div>

          <div className="product-bottom">
            <span className="product-price">${product.price}</span>
            <div className="product-buttons">
              <button
                className="glass-button"
                onClick={handleAddToWishlist}
                disabled={isAdding}
              >
                {buttonText}
              </button>
              <button
                className="glass-button"
                onClick={handleAddToBasket}
              >
                {cartBtnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
