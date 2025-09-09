import React, { useState, useEffect } from 'react';
import { ChevronUp, Mail, Shield, Eye, Users, FileText, Globe, Lock, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar';
import FooterTaxi from '../../components/FooterTaxi';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TaxiPrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tableOfContents = [
    { id: 'interpretation', title: 'Interpretation and Definitions', icon: FileText },
    { id: 'collecting', title: 'Collecting and Using Your Personal Data', icon: Shield },
    { id: 'children', title: 'Children\'s Privacy', icon: Users },
    { id: 'links', title: 'Links to Other Websites', icon: Globe },
    { id: 'changes', title: 'Changes to this Privacy Policy', icon: AlertCircle },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | BookYourRide Taxi Services</title>
        <meta name="description" content="Learn how BookYourRide protects your privacy and handles your personal data when using our taxi services. Read our comprehensive privacy policy." />
        <meta name="keywords" content="privacy policy, taxi service privacy, data protection, BookYourRide privacy" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.bookyourride.in/taxi/privacy-policy" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <TaxiNavBar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/taxi-bg-1.png')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
              Privacy <span className="text-yellow-400">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our taxi services.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-lg p-6" data-aos="fade-right">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-yellow-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center ${
                            activeSection === item.id
                              ? 'bg-yellow-100 text-yellow-700 font-semibold'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                          {item.title}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-left">
                
                {/* Introduction */}
                <div className="mb-8" data-aos="fade-up">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-yellow-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">Privacy Protection</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    At BookYourRide, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our taxi services, 
                    website, and mobile applications.
                  </p>
                </div>

                {/* Interpretation and Definitions */}
                <section id="interpretation" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-yellow-600" />
                    Interpretation and Definitions
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      <strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual, 
                      including but not limited to name, phone number, email address, location data, and payment information.
                    </p>
                    <p>
                      <strong>Service:</strong> Our taxi booking and transportation services provided through our platform.
                    </p>
                    <p>
                      <strong>Usage Data:</strong> Data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.
                    </p>
                  </div>
                </section>

                {/* Collecting and Using Personal Data */}
                <section id="collecting" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-yellow-600" />
                    Collecting and Using Your Personal Data
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Types of Data We Collect</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li><strong>Account Information:</strong> Name, email address, phone number, and profile picture</li>
                        <li><strong>Booking Information:</strong> Pickup and destination locations, travel times, and preferences</li>
                        <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely)</li>
                        <li><strong>Location Data:</strong> Real-time location for ride tracking and safety purposes</li>
                        <li><strong>Communication Data:</strong> Messages, calls, and feedback you provide</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">How We Use Your Data</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>To provide and maintain our taxi services</li>
                        <li>To process bookings and payments</li>
                        <li>To communicate with you about your rides</li>
                        <li>To improve our services and customer experience</li>
                        <li>To ensure safety and security</li>
                        <li>To comply with legal obligations</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-yellow-600" />
                    Children's Privacy
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our Service is not intended for children under the age of 13. We do not knowingly collect personally identifiable 
                    information from children under 13. If you are a parent or guardian and you are aware that your child has provided 
                    us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children 
                    without verification of parental consent, we take steps to remove that information from our servers.
                  </p>
                </section>

                {/* Links to Other Websites */}
                <section id="links" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-yellow-600" />
                    Links to Other Websites
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, 
                    you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. 
                    We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                  </p>
                </section>

                {/* Data Security */}
                <section className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-yellow-600" />
                    Data Security
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal data against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
                    or electronic storage is 100% secure.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 font-semibold">
                      We use industry-standard encryption and security protocols to protect your data, but we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                {/* Changes to Privacy Policy */}
                <section id="changes" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2 text-yellow-600" />
                    Changes to this Privacy Policy
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                    on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. 
                    Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </section>

                {/* Contact Us */}
                <section id="contact" className="mb-8" data-aos="fade-up">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-yellow-600" />
                    Contact Us
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700"><strong>Email:</strong> privacy@taxirent.com</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +91 9368584334</p>
                    <p className="text-gray-700"><strong>Address:</strong> Malla Gorakhpur, Heera Nagar, Haldwani, Uttarakhand 263139</p>
                  </div>
                </section>

                {/* Last Updated */}
                <div className="border-t border-gray-200 pt-6" data-aos="fade-up">
                  <p className="text-sm text-gray-500">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            data-aos="fade-up"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <FooterTaxi />
    </>
  );
};

export default TaxiPrivacyPolicy;
