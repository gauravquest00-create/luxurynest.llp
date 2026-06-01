import { useNavigate } from 'react-router-dom';

const services = [
  { name: "Resale", icon: "🏠", query: { type: "sale" }, path: "/properties" },
  { name: "Rent", icon: "🔑", query: { type: "rent" }, path: "/properties" },
  { name: "Plot", icon: "📐", query: { bhk: "0" }, path: "/properties" },
  { name: "Builder Floor", icon: "🏢", query: { search: "Builder Floor" }, path: "/properties" },
  { name: "New Launches", icon: "🚀", query: {}, path: "/new-launches" },
];

export default function Services() {
  const navigate = useNavigate();

  const handleClick = (service) => {
    if (service.path === "/new-launches") {
      // Redirect to New Launches page
      navigate("/new-launches");
    } else {
      // Redirect to properties with filters
      const params = new URLSearchParams(service.query).toString();
      navigate(`/properties?${params}`);
    }
  };

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">Explore properties by category</p>
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.name}
              className="service-card"
              onClick={() => handleClick(service)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
