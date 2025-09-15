import React from "react";
import { Helmet } from 'react-helmet-async';
import TourNavbar from "../../components/TourNavbar";
import Footer from "../../components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TourTermsAndConditions = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile for better performance
    });
  }, []);

  const terms = [
    {
      title: "Tour Booking and Confirmation",
      content:
        "All tour bookings must be confirmed through our official channels. Bookings are subject to availability and guide confirmation.",
    },
    {
      title: "Valid Identification",
      content:
        "Travelers must carry valid government-issued identification when using our tour services. International visitors must carry passport and visa documents.",
    },
    {
      title: "Payment Terms",
      content:
        "Payment can be made in cash, through digital wallets, UPI, or credit/debit cards. All payments must be completed before or immediately after the tour.",
    },
    {
      title: "Cancellation Policy",
      content:
        "Cancellations made 48 hours before scheduled departure are free. Cancellations within 48 hours may incur charges based on tour package and arrangements made.",
    },
    {
      title: "Guide and Vehicle Safety",
      content:
        "All our guides are licensed and experienced. Vehicles are regularly maintained. Travelers are responsible for their own safety and must follow safety instructions.",
    },
    {
      title: "Luggage and Belongings",
      content:
        "Travelers are responsible for their luggage and personal belongings. We are not liable for any loss or damage to personal items during the tour.",
    },
    {
      title: "Tour Itinerary",
      content:
        "Guides will follow the planned itinerary unless weather or safety conditions require changes. Additional charges may apply for itinerary modifications or extra stops.",
    },
    {
      title: "Waiting Time",
      content:
        "Free waiting time is 15 minutes from scheduled departure time. Additional waiting charges apply beyond this period at ₹5 per minute.",
    },
    {
      title: "Late Arrival",
      content:
        "If the guide is late due to traffic or other circumstances, we will notify you immediately. No charges apply for guide delays.",
    },
    {
      title: "Emergency Situations",
      content:
        "In case of emergencies, travelers should contact local authorities immediately. Our guides are trained to handle emergency situations professionally.",
    },
    {
      title: "Service Areas",
      content:
        "Our tour services are available in designated areas only. Outstation tours require advance booking and may have different terms and pricing.",
    },
    {
      title: "Traveler Conduct",
      content:
        "Travelers must maintain respectful behavior towards guides and other travelers. Any misconduct may result in service termination.",
    },
    {
      title: "Vehicle Condition",
      content:
        "Travelers must report any vehicle issues immediately. Damages caused by travelers will be charged according to repair costs.",
    },
    {
      title: "Insurance Coverage",
      content:
        "All our vehicles are insured. Travelers are covered under our insurance policy during the tour duration.",
    },
    {
      title: "Feedback and Complaints",
      content:
        "We encourage feedback to improve our services. Complaints should be reported within 24 hours of the tour for proper investigation.",
    },
    {
      title: "Force Majeure",
      content:
        "We are not liable for delays or cancellations due to circumstances beyond our control, including natural disasters, strikes, or government restrictions.",
    },
    {
      title: "Data Privacy",
      content:
        "We collect and use traveler data in accordance with our Privacy Policy. Personal information is protected and not shared with third parties without consent.",
    },
    {
      title: "Modification of Terms",
      content:
        "These terms and conditions may be updated periodically. Continued use of our services constitutes acceptance of the modified terms.",
    },
    {
      title: "Dispute Resolution",
      content:
        "Any disputes will be resolved through mutual discussion. If unresolved, disputes will be subject to the jurisdiction of local courts.",
    },
    {
      title: "Contact Information",
      content:
        "For any queries regarding these terms, contact us at support@tourrent.com or call +91 9368584334. Our customer service is available 24/7.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms and Conditions | BookYourRide Tour Services</title>
        <meta name="description" content="Read the terms and conditions for using BookYourRide tour services. Understand your rights and responsibilities when booking our tour packages." />
        <meta name="keywords" content="terms and conditions, tour service terms, booking terms, BookYourRide tour terms" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.bookyourride.in/tours/terms-and-conditions" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <TourNavbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/tour-bg.jpeg')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
              Terms & <span className="text-yellow-400">Conditions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" >
              Please read these terms and conditions carefully before using our tour services. 
              By booking a tour, you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Service Agreement</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These terms and conditions govern your use of BookYourRide tour services. 
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12" data-aos="fade-up" >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700">
                    These terms constitute a legally binding agreement between you and BookYourRide Tours. 
                    Please ensure you understand all terms before using our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terms and Conditions Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {terms.map((term, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  data-aos="fade-up"
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-yellow-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                      {term.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Additional Information</h2>
              <p className="text-lg text-gray-600">
                Important details about our service policies and your rights as a customer.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-8" data-aos="fade-up">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Service Guarantee</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  We are committed to providing safe, reliable, and memorable tour experiences. 
                  Our guides are professionally trained and vehicles are regularly maintained 
                  to ensure the highest standards of service.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8" data-aos="fade-up">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Traveler Rights</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to safe transportation, transparent pricing, professional service, 
                  and timely resolution of any issues. We respect your privacy and protect your personal information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6" data-aos="fade-up">
              Questions About Our Terms?
            </h2>
            <p className="text-lg text-black mb-8" data-aos="fade-up" >
              If you have any questions or need clarification about these terms and conditions, 
              our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" >
              <a 
                href="mailto:support@tourrent.com"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Email Support
              </a>
              <a 
                href="tel:+919368584334"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Call Us: +91 9368584334
              </a>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600" data-aos="fade-up">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm text-gray-500 mt-2" data-aos="fade-up" >
              These terms and conditions are effective immediately upon posting and apply to all tour services provided by BookYourRide.
            </p>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default TourTermsAndConditions;
