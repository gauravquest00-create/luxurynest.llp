
const features = [
  { title: "RERA Registered", description: "Fully compliant with RERA, ensuring transparency.", icon: "🏢" },
  { title: "12+ Years Experience", description: "Deep knowledge of Dwarka's real estate market.", icon: "📅" },
  { title: "500+ Families Served", description: "Happy homeowners and investors trust us.", icon: "🏠" },
  { title: "Best Price Guarantee", description: "We help you get the best deal possible.", icon: "💰" },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="why-container">
        <h2 className="section-title">Why Choose Sharma Properties?</h2>
        <p className="section-subtitle">Your trusted partner in real estate since 2012</p>
        <div className="features-grid">
          {features.map((f, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}