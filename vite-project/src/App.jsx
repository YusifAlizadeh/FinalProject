import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./Layout";
import LayFAQ from "./LayFAQ";
import LayCon from "./LayCon";
import LayReg from "./LayReg";
import FAQ from "./FAQ";
import FirstProd from "./FirstProd";
import SecondProd from "./SecondProd";
import Info from "./Info";
import ThirdProd from "./ThirdProd";
import Travel from "./Travel";
import FourthProd from "./FourthProd";
import TwoCards from "./TwoCards";
import Jewel from "./Jewel";
import Blog from "./Blog";
import Contact from "./Contact";
import LogReg from "./LogReg";
import Shop from "./Shop";
import LayShop from "./LayShop";
import Login from "./Login";
import LayLog from "./LayLog";
import { generateSlug, slugToTitle } from "./utils/slugify";
import Wishlist from "./Wishlist";
import LayWish from "./LayWish";
import PaymentModal from "./PaymentModal";
import LayPay from "./LayPay";
import NotFound from "./NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "./AdminPanel";
import LayAdmin from "./LayAdmin";
import AdminRoute from "./AdminRoute";

import { Provider } from "react-redux";
import store from "./store/store";

import { UserProvider } from "./UserContext";
import { LanguageProvider } from "./local/LanguageContext";
import { CurrencyProvider } from "./local/CurrencyContext";
import { ThemeProvider } from "./local/ThemeContext";
import LayBlog from "./LayBlog"
import EvilBlog from "./EvilBlog"
import ProductPage from "./ProductPage";
import Basket from "./Basket";
import LayBas from "./LayBas"
import Checkout from "./CheckOut";
import LayCheck from "./LayCheck"

function RedirectToHome() {

  if (performance.navigation.type === 1) {
    window.location.href = "/";
  }

  const navigate = useNavigate();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (!hasRefreshed) {
      setHasRefreshed(true);
      if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
        navigate("/");
      }
    }
  }, [navigate, hasRefreshed]);

  return null;
  
}

function AppContent() {
  return (
    <Router>
      <RedirectToHome />
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <FirstProd />
                <SecondProd />
                <Info />
                <ThirdProd />
                <Travel />
                <FourthProd />
                <TwoCards />
                <Jewel />
                <Blog />
              </>
            }
          />
        </Route>

        {/* Shop */}
        <Route path="/shop" element={<LayShop />}>
          <Route index element={<Shop />} />
        </Route>

        {/* FAQ */}
        <Route path="/faq" element={<LayFAQ />}>
          <Route index element={<FAQ />} />
        </Route>

        {/* Contact */}
        <Route path="/contact" element={<LayCon />}>
          <Route index element={<Contact />} />
        </Route>

        {/* Registration / Login */}
        <Route path="/log-reg" element={<LayReg />}>
          <Route index element={<LogReg />} />
        </Route>

        <Route path="/login" element={<LayLog />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/product/:slug" element={<ProductPage />} />

        <Route path="/blog" element={<LayBlog />}>
          <Route index element={<EvilBlog />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<LayWish />}>
            <Route index element={<Wishlist />} />
          </Route>

          <Route path="/checkout" element={<LayCheck />}>
            <Route index element={<Checkout />} />
          </Route>

          <Route path="/basket" element={<LayBas />}>
            <Route index element={<Basket />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
  <Route path="/admin" element={<LayAdmin />}>
    <Route index element={<AdminPanel />} />
  </Route>
</Route>



        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <CurrencyProvider>
          <UserProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </UserProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
