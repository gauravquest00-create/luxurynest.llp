// src/pages/NotFound.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-number-container">
          <h1 className="notfound-number">404</h1>
          <div className="notfound-icon-wrapper">
            <div className="notfound-icon">
              <div>🔍</div>
              <h2 className="notfound-title">Page Not Found</h2>
            </div>
          </div>
        </div>

        <div className="notfound-card">
          <p className="notfound-message">
            The page you're looking for seems to have vanished into thin air.
            Maybe it was sold out or never existed!
          </p>
          
          <div className="notfound-buttons">
            <Link to="/" className="btn-home">
              🏠 Back to Home
            </Link>
            
            <Link to="/properties" className="btn-properties">
              🔍 Browse Properties
            </Link>
          </div>
        </div>

        <div className="redirect-text">
          Redirecting to home in 5 seconds...
        </div>
      </div>
    </div>
  );
};

export default NotFound;
