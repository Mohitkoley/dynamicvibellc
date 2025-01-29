import { useRef } from 'react';
import HomeIntro from "../../components/HomePage/HomeIntro/HomeIntro";
import AboutUs from '../../components/HomePage/AboutUs/AboutUs';
import Services from '../../components/HomePage/Services/Services';
import Footer from '../../components/Footer/Footer';
import logo from "../../assets/images/logo.png";


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
        <section id='Home' className='pt-6 mb-16 overflow-x-hidden flex flex-col items-center justify-center' >
            <div className="w-full h-1/5 text-white  flex flex-col justify-center items-center gap-2 mb-16">
            <img src={logo} alt="Logo" className="logo w-40 h-32" />
                {/* <div className='tagline text-lg font-light'>Space for tagline</div> */}

            </div>
            <div className="w-full text-center lg:text-6xl text-4xl text-white m-4 mb-12 ">
                <p className='m-2'>Arrive in <span className="text-gradient">Style</span></p>
                <p>Make Memories That Last</p>
            </div>
            <div className="flex justify-center m-auto lg:gap-8 gap-4 md:flex-row flex-col">
                <a className="btn bg-button-bg" href='https://dvlimousines.com/'><span className="lg:text-2xl text-xl">Car Rentals</span></a>
                <a className="btn bg-button-bg" href='https://dvpartyrentals.com/'><span className="lg:text-2xl text-xl">Party Rentals</span></a>
            </div>
        </section>
      </div>
       <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <Footer scrollToSection={scrollToSection} aboutUsRef={aboutUsRef} servicesRef={servicesRef} homeIntroRef={homeIntroRef} />
    </div>
  );
};

export default Home;
