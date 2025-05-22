import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Навбар будет на всех страницах */}
      <main><Outlet /></main> {/* Основная часть для Shop */}
      <Footer /> {/* Футер будет на всех страницах */}
    </div>
  );
};

export default Layout;
