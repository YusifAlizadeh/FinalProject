import React from "react";
import "./ShopItem.css";

function ShopItem({ item }) {
  return (
    <div className="shop-item">
      <img src={item.itemImage} alt={item.itemName} className="shop-image" />
      <h3 className="shop-name">{item.itemName}</h3>
      <p className="shop-cost">
        {item.discountRate ? (
          <>
            <span className="old-cost">${item.itemCost.toFixed(2)}</span>
            <span className="discounted-cost">
              ${(item.itemCost * (1 - item.discountRate / 100)).toFixed(2)}
            </span>
          </>
        ) : (
          <span>${item.itemCost.toFixed(2)}</span>
        )}
      </p>
    </div>
  );
}

export default ShopItem;
