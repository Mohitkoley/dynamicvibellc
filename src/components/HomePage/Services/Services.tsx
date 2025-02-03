import { motion } from 'framer-motion';
import party from "../../../assets/images/party.jpg";
import car from "../../../assets/images/carride.jpg";

const Services = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section id="Services" className="min-h-screen py-20 relative overflow-hidden bg-custom-gradient-2">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-lora font-bold text-gradient mb-8 tracking-tight">
            Services
          </h2>
        </motion.div>

        {/* Car Ride Service */}
        <div className="service-container flex flex-col md:flex-row items-center md:items-start mb-12">
          <motion.div {...fadeInUp} className="image-container transition-all duration-500 p-1 md:w-1/2">
            <img src={car} alt="Car Ride Service" className="w-full h-[300px] object-cover rounded-2xl shadow-2xl" />
          </motion.div>
          <motion.div
            {...fadeInUp}
            className="text-container md:w-1/2 md:pl-8 mt-6 md:mt-0 text-center md:text-left"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Car Ride Service</h2>
            <p className="text-lg leading-relaxed text-gray-200">
              Enjoy a safe and comfortable ride with our top-rated car service. Our professional drivers ensure a smooth and reliable journey to your destination.
            </p>
          </motion.div>
        </div>

        {/* Party Service */}
        <div className="service-container flex flex-col md:flex-row items-center md:items-start">
          <motion.div {...fadeInUp} className="text-container md:w-1/2 md:pr-8 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4 text-white">Party Service</h2>
            <p className="text-lg leading-relaxed text-gray-200">
              Make your celebrations unforgettable with our premium party services. From transportation to event planning, we’ve got you covered for a memorable experience.
            </p>
          </motion.div>
          <motion.div {...fadeInUp} className="image-container transition-all duration-500 p-1 md:w-1/2">
            <img src={party} alt="Party Service" className="w-full h-[300px] object-cover rounded-2xl shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
