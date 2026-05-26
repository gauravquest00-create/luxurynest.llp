// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Force scroll to top on every route change (including query params)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want animation
    });
    // Also try to scroll the main container if any
    const mainContent = document.querySelector("main");
    if (mainContent) mainContent.scrollTop = 0;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname, search]);

  return null;
}