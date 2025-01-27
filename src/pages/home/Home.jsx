import React, { useRef } from 'react';
import HomeIntro from '../../components/HomePage/HomeIntro/HomeIntro';
import AboutUs from '../../components/HomePage/AboutUs/AboutUs';
import Services from '../../components/HomePage/Services/Services';
import Footer from '../../components/Footer/Footer';
import TestimonialSwiper from '../../components/PartyRentalsPage/TestimonialSwiper';


const Home = () => {
  const aboutUsRef = useRef(null);
  const servicesRef = useRef(null);
  const homeIntroRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-custom-gradient w-screen min-h-screen overflow-hidden">
      <div ref={homeIntroRef}>
      <HomeIntro />
      </div>
       <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <div>
        <TestimonialSwiper />
      </div>
      <Footer scrollToSection={scrollToSection} aboutUsRef={aboutUsRef} servicesRef={servicesRef} homeIntroRef={homeIntroRef} />
    </div>
  );
};

export default Home;
