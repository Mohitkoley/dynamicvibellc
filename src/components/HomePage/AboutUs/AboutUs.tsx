import React from 'react';
import { motion } from 'framer-motion';
import luxuryCar from "../../../assets/images/Car7.png";
import luxuryInterior from '../../../assets/images/Car6.png';

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section id="aboutus" className="min-h-screen py-20 relative overflow-hidden bg-custom-gradient-2">
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
            About Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            {...fadeInUp}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-lora text-white mb-8">
                More than <span className="text-gradient font-bold animate-pulse">100+</span> luxury collection of cars
              </h3>
              
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
                At DV Limousines, we believe in making your special moments unforgettable. 
                Specializing in luxury car rentals for weddings and parties, we take pride 
                in offering an exquisite fleet of premium vehicles that blend elegance, 
                style, and comfort.
              </p>
              
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                From classic vintage rides to sleek modern luxury cars, our collection is 
                curated to suit every occasion and taste.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Top Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={luxuryCar}
                alt="Luxury Car"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>

            {/* Bottom Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl lg:-ml-12"
            >
              <img
                src={luxuryInterior}
                alt="Luxury Interior"
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: "100+", label: "Luxury Cars" },
            { number: "1000+", label: "Happy Clients" },
            { number: "50+", label: "Premium Brands" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
            >
              <h4 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</h4>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
