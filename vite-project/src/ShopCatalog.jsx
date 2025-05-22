import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopItem from "./ShopItem";
import "./assets/ShopCatalog.css";

function ShopCatalog() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=8")
      .then((response) => setItems(response.data.products))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-sidebar">
        <h2>Best Jewelry Collection</h2>
        <button className="view-button">View Collection</button>
      </div>
      <div className="shop-grid">
        {items.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ShopCatalog;
