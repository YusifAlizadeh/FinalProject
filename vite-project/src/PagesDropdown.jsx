import "./assets/PagesDropdown.css";
import post4 from "./assets/img/iphone-headset-03.png";

export default function DropdownMenu() {

  return (
    <div className="dropdown-menu">
      <div className="menu-rows">
        <div className="menu-row">
          <div className="menu-column">
            <h3>SMART PHONE</h3>
            <ul>
              <li>Xiaomi</li>
              <li>Apple</li>
              <li>Sony</li>
              <li>Huawei</li>
              <li>Samsung</li>
            </ul>
          </div>
          <div className="menu-column">
            <h3>SMART WATCH</h3>
            <ul>
              <li>Apple Series 8</li>
              <li>Xiaomi Mi Band 8</li>
              <li>Haylou RT2</li>
              <li>Galaxy Watch 5</li>
              <li>Amazfit Bip 3 Pro</li>
            </ul>
          </div>
          <div className="menu-column">
            <h3>FASHION</h3>
            <ul>
              <li>Xiaomi</li>
              <li>Apple</li>
              <li>Sony</li>
              <li>Huawei</li>
              <li>Samsung</li>
            </ul>
          </div>
        </div>
        <div className="menu-row">
          <div className="menu-column">
            <h3>SPEAKER</h3>
            <ul>
              <li>JBL Professional</li>
              <li>Harman</li>
              <li>Klipsch</li>
              <li>Sony</li>
              <li>Pioneer</li>
            </ul>
          </div>
          <div className="menu-with-image">
            <div className="menu-column manka">
              <h3>HEADSET</h3>
              <ul>
                <li>Beats</li>
                <li>Samsung</li>
                <li>Sony</li>
                <li>Sennheiser</li>
                <li>Apple</li>
              </ul>
            </div>
            <img className="menu-image" src={post4} alt="Earphones" />
          </div>
        </div>
      </div>
    </div>
  );
}
