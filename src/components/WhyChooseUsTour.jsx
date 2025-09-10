import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaHeadset, FaAward } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';

const WhyChooseUsTour = () => {
  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your safety is our priority with certified guides and insurance coverage"
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you throughout your journey"
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Expert Guides",
      description: "Professional and experienced guides with deep local knowledge"
    },
    {
      icon: <MdExplore className="w-8 h-8" />,
      title: "Unique Experiences",
      description: "Handpicked destinations and activities for unforgettable memories"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing exceptional travel experiences with unmatched service and attention to detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-yellow-500 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsTour;
