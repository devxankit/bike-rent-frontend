import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Car, Clock, Shield, MapPin } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TaxiFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const faqs = [
    {
      question: "What is TaxiRent's pricing?",
      answer: "Our pricing varies based on distance, time, and vehicle type. We offer competitive rates starting from ₹15/km with transparent pricing, no hidden charges, and special discounts for long-distance rides."
    },
    {
      question: "What are the benefits of using TaxiRent?",
      answer: "TaxiRent offers convenience, safety, and reliability. Professional drivers, sanitized vehicles, 24/7 availability, real-time tracking, and instant booking make your travel experience seamless and comfortable."
    },
    {
      question: "What vehicle options are available?",
      answer: "We have a diverse fleet including sedans, SUVs, luxury cars, and minivans to suit different needs. All vehicles are well-maintained, sanitized, and equipped with modern amenities for your comfort."
    },
    {
      question: "Where is TaxiRent currently operational?",
      answer: "We currently operate in 15+ major cities across India with 200+ vehicles in our fleet. Check our locations page for the nearest service area to you, and we're expanding to more cities regularly."
    },
    {
      question: "How do I book a taxi?",
      answer: "Booking is simple! Just enter your pickup and destination locations, select your preferred vehicle type, choose your ride time, and confirm your booking. You'll receive instant confirmation with driver details."
    },
    {
      question: "Is it safe to travel with TaxiRent?",
      answer: "Absolutely! All our drivers are background verified, vehicles are regularly sanitized, and we provide 24/7 customer support. You can track your ride in real-time and share your journey details with family."
    }
  ];

  return (
    <section className="py-16 bg-white" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top FAQ's</h2>
          <p className="text-gray-600 text-lg">
            Booking a taxi made simple • Explore our FAQs for quick answers
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    {index === 0 && <Car className="w-5 h-5 text-yellow-600" />}
                    {index === 1 && <Shield className="w-5 h-5 text-yellow-600" />}
                    {index === 2 && <Car className="w-5 h-5 text-yellow-600" />}
                    {index === 3 && <MapPin className="w-5 h-5 text-yellow-600" />}
                    {index === 4 && <Clock className="w-5 h-5 text-yellow-600" />}
                    {index === 5 && <Shield className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <span className="font-semibold text-gray-800 text-lg group-hover:text-yellow-600 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openFAQ === index ? (
                    <ChevronUp className="h-6 w-6 text-yellow-600 transition-transform" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 group-hover:text-yellow-600 transition-colors" />
                  )}
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-5 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="700">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Contact Support
              </button>
              <button className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center">
                <Car className="w-5 h-5 mr-2" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxiFAQ;
