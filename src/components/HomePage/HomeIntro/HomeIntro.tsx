import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/logo.png"

const HomeIntro = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm -z-10" />
      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="animate-fade-in-down">
          <img 
            src={logo}
            alt="Logo" 
            className="w-48 h-40 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-lora text-white tracking-tight">
            Arrive in <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium">Style</span>
          </h1>
          <p className="text-3xl md:text-5xl lg:text-6xl font-lora text-white/90">
            Make Memories That Last
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <a
            href="https://dvlimousines.com/"
            className="group relative px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-black/10" />
            <div className="relative flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl font-medium text-white">Car Rentals</span>
            </div>
          </a>
          <a
            href="https://dvpartyrentals.com/"
            className="group relative px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium  shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:bg-black/10" />
            <div className="relative flex items-center justify-center gap-2">
              <span className="text-xl md:text-2xl font-medium text-white">Party Rentals</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
