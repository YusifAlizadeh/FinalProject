import "./assets/ShopDropdown.css"; 

const ShopDropdown = () => {
  return (
    <div className="shop-dropdown">
      <div className="shop-column">
        <h4>SMART PHONE</h4>
        <ul>
          <li>Xiaomi</li>
          <li>Apple</li>
          <li>Sony <span className="tag new">NEW</span></li>
          <li>Huawei</li>
          <li>Pioneer</li>
          <li>Beats</li>
          <li>Samsung</li>
          <li>Haylou</li>
          <li>Microsoft</li>
          <li>Lenovo</li>
          <li>LG</li>
        </ul>
      </div>

      <div className="shop-column">
        <h4>SMART WATCH</h4>
        <ul>
          <li>Xiaomi</li>
          <li>Apple</li>
          <li>Sony</li>
          <li>Huawei</li>
          <li>Beats</li>
          <li>Pioneer</li>
          <li>LG</li>
          <li>Microsoft</li>
          <li>Samsung</li>
          <li>Haylou</li>
          <li>Lenovo</li>
        </ul>
      </div>

      <div className="shop-column">
        <h4>RESTAURANT</h4>
        <ul>
          <li>Xiaomi <span className="tag hot">HOT</span></li>
          <li>Sony</li>
          <li>Huawei</li>
          <li>Beats</li>
          <li>Haylou</li>
          <li>Pioneer</li>
          <li>Apple</li>
          <li>Samsung</li>
          <li>Lenovo</li>
          <li>LG</li>
          <li>Microsoft</li>
        </ul>
      </div>

      <div className="shop-column">
        <h4>FASHION</h4>
        <ul>
          <li>Xiaomi</li>
          <li>Apple <span className="tag sale">SALE</span></li>
          <li>Sony</li>
          <li>Huawei</li>
          <li>Beats</li>
          <li>Samsung</li>
          <li>Haylou</li>
          <li>Microsoft <span className="tag best">BEST</span></li>
          <li>Lenovo</li>
          <li>LG</li>
          <li>Pioneer</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopDropdown;
