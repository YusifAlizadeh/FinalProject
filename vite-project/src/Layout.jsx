import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"
import Slider from "./Slider"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content"> 
          <Sidebar /> 
          <Slider />
        </div>
      <main>
        <Outlet /> {/* Здесь будет меняться содержимое страниц */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
