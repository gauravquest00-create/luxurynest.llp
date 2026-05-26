import HeroBanner from '../components/home/HeroBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Testimonials from '../components/home/Testimonials';


export default function Home() {
  return (
    <main className="home-page">
      <HeroBanner />
      <WhyChooseUs />
      <FeaturedProperties />
      <Testimonials />
    </main>
  );
}