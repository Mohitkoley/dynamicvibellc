import HomeIntro from "../components/HomePage/HomeIntro/HomeIntro";
import AboutUs from "../components/HomePage/AboutUs/AboutUs";
import Services from "../components/HomePage/Services/Services";
import Footer from "../components/Footer/Footer";
import TestimonialsSwiper from '@/components/HomePage/Reviews/TestimonialsSwiper';

const Home = () => {
  return (
    <div className="min-h-screen bg-custom-gradient-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HomeIntro />
        <AboutUs />
        <Services />
        <TestimonialsSwiper />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
