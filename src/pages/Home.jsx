import HeroBanner from '../components/home/HeroBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Services from '../components/home/Services';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';      // new import


export default function Home() {
  return (
    <main className="home-page">
      <HeroBanner />
      <WhyChooseUs />
      <Services />   
      <FeaturedProperties />
      <Testimonials />
            <CTA />            {/* added here */}

    </main>
  );
}