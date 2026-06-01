// src/pages/NotFound.jsx - Styled version
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary opacity-10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl md:text-7xl mb-4">🔍</div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Page Not Found
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <p className="text-gray-600 mb-6 text-lg">
            The page you're looking for seems to have vanished into thin air.
            Maybe it was sold out or never existed!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              🏠 Back to Home
            </Link>
            
            <Link
              to="/properties"
              className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              🔍 Browse Properties
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-500 animate-pulse">
          Redirecting to home in 5 seconds...
        </div>
      </div>
    </div>
  );
};

export default NotFound;
