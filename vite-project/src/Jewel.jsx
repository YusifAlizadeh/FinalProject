import "./assets/Jewel.css";
import img1 from "./assets/img/bigshop-image-16.png"
import img2 from "./assets/img/product-20-500x500.png"
import img3 from "./assets/img/product-14-500x500.png"
import img4 from "./assets/img/product-03-500x500.png"
import img5 from "./assets/img/product-18-500x500.png"
import img6 from "./assets/img/product-17-500x500.png"
import img7 from "./assets/img/product-13-500x500.png"
import img8 from "./assets/img/product-19-500x500.png"
import img9 from "./assets/img/product-15-500x500.png"
import img10 from "./assets/img/product-16-500x500.png"

const Jewel = () => {
  return (
    <div className="containerx">
      <div className="left-panel">
        <img src={img1} alt="" className="jewel-image"/>
        <h2>Best Jewelry Collection</h2>
        <button className="view-btn">View Collection</button>
      </div>
      <div className="right-panel">
        <div className="product-grid">
          <div className="product">
            <img src={img2} alt="black leather belt" />
            <p>black leather belt</p>
            <span className="price">$50.00</span>
          </div>
          <div className="product">
            <img src={img3} alt="High Heel Shoes" />
            <p>High Heel Shoes</p>
            <span className="price">$70.00</span>
          </div>
          <div className="product">
            <img src={img4} alt="Men's leather shoes" />
            <p>Men's leather...</p>
            <span className="old-price">$122.00</span>
            <span className="price">$116.00</span>
          </div>
          <div className="product">
            <img src={img5} alt="handbag" />
            <p>handbag</p>
            <span className="old-price">$150.00</span>
            <span className="price">$120.00</span>
          </div>
          <div className="product">
            <img src={img6} alt="sporty shoes" />
            <p>sporty shoes</p>
            <span className="old-price">$250.00</span>
            <span className="price">$128.98</span>
          </div>
          <div className="product">
            <img src={img7} alt="Women's hats" />
            <p>Women's hats</p>
            <span className="price">$129.50</span>
          </div>
          <div className="product">
            <img src={img8} alt="bracelet emerald" />
            <p>bracelet emerald</p>
            <span className="old-price">$1,450.00</span>
            <span className="price">$1,250.00</span>
          </div>
          <div className="product">
            <img src={img9}alt="green gem stone earrings" />
            <p>green gem stone...</p>
            <span className="old-price">$6,550.00</span>
            <span className="price">$5,200.00</span>
          </div>
          <div className="product">
            <img src={img10} alt="luxury necklace" />
            <p>luxury necklace</p>
            <span className="price">$7,500.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jewel;
