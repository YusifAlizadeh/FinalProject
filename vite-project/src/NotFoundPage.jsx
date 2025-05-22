import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import "./assets/NotFoundPage.css";

const NotFound = () => {
  return (
    <div className="nf-wrapper">
      <div className="nf-box">
        <AlertTriangle size={64} className="nf-icon" />
        <h1 className="nf-title">404</h1>
        <p className="nf-subtitle">Oops! Page not found</p>
        <p className="nf-text">The page you are looking for might have been removed or moved elsewhere.</p>
        <Link to="/" className="nf-btn">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
