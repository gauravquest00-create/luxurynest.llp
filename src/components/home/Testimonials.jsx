import testimonials from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real experiences from happy homeowners</p>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <p className="author-name">{t.name}</p>
                <p className="author-role">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}