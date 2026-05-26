import "./LoadingSpinner.css";
import siteConfig from "../../data/siteConfig";

export default function AnimatedLoader() {
  return (
    <div className="animated-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-text">GA</span>
        </div>
        <h3 className="loader-name">{siteConfig.businessName}</h3>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}