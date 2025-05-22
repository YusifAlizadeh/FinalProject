import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Здесь будет меняться содержимое страниц */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
