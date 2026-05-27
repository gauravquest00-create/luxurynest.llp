import { useNavigate } from 'react-router-dom';

const services = [
  { name: "Resale", icon: "🏠", query: { type: "sale" } },
  { name: "Rent", icon: "🔑", query: { type: "rent" } },
  { name: "Plot", icon: "📐", query: { bhk: "0" } },
  { name: "Builder Floor", icon: "🏢", query: { search: "Builder Floor" } },
];

export default function Services() {
  const navigate = useNavigate();

  const handleClick = (query) => {
    const params = new URLSearchParams(query).toString();
    navigate(`/properties?${params}`);
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
              onClick={() => handleClick(service.query)}
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