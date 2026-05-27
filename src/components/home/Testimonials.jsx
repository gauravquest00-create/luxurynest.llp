import { useEffect } from 'react';
import testimonials from '../../data/testimonials';


const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="star filled">★</span>
      ))}
      {halfStar && <span className="star half">½</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className="star empty">★</span>
      ))}
    </div>
  );
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function Testimonials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real experiences from happy homeowners</p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar" aria-label={t.name}>
                  {t.avatar || getInitials(t.name)}
                </div>
                <div className="author-info">
                  <p className="author-name">{t.name}</p>
                  <p className="author-role">{t.role}</p>
                </div>
              </div>
              <Stars rating={t.rating || 5} />
              <div className="quote-icon">“</div>
              <p className="testimonial-text">"{t.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}