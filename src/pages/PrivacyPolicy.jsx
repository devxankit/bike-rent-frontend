import React, { useState, useEffect } from 'react';
import { ChevronUp, Mail, Shield, Eye, Users, FileText, Globe, Lock, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

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
        {/* Primary Meta Tags */}
        <title>Privacy Policy | BookYourRide – Your Data, Our Promise</title>
        <meta name="title" content="Privacy Policy | BookYourRide – Your Data, Our Promise" />
        <meta name="description" content="Read BookYourRide's Privacy Policy. We respect your privacy learn how we protect your data and ensure transparency in our bike rental services across Uttarakhand." />
        <meta name="keywords" content="privacy policy, data protection, bike rental privacy, personal information, data security, privacy terms" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/PrivacyPolicy" />
        <meta property="og:title" content="Privacy Policy | BookYourRide – Your Data, Our Promise" />
        <meta property="og:description" content="Read BookYourRide's Privacy Policy. We respect your privacy learn how we protect your data and ensure transparency in our bike rental services across Uttarakhand." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/PrivacyPolicy" />
        <meta property="twitter:title" content="Privacy Policy | BookYourRide – Your Data, Our Promise" />
        <meta property="twitter:description" content="Read BookYourRide's Privacy Policy. We respect your privacy learn how we protect your data and ensure transparency in our bike rental services across Uttarakhand." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/PrivacyPolicy" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy | BookYourRide – Your Data, Our Promise",
            "description": "Read BookYourRide's Privacy Policy. We respect your privacy learn how we protect your data and ensure transparency in our bike rental services across Uttarakhand.",
            "url": "https://www.bookyourride.in/PrivacyPolicy",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service"
              }
            }
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-yellow-200">
          <div className="max-w-5xl mx-auto px-2 py-6 md:px-6 md:py-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Shield className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-yellow-700">Privacy Policy</h1>
                <p className="text-yellow-600 mt-2">Last updated: July 29, 2025</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-2 py-8 md:px-6 md:py-10 flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Table of Contents - Sidebar */}
          <div className="hidden lg:block w-72">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg p-5 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-yellow-500" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map(({ id, title, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        activeSection === id
                          ? 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500'
                          : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-yellow-200 overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                {/* Introduction */}
                <div className="border-b border-yellow-200 pb-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the{' '}
                    
                  </p>
                </div>

                {/* Interpretation and Definitions */}
                <section id="interpretation">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-yellow-500" />
                    Interpretation and Definitions
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-800 mb-3">Interpretation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-yellow-800 mb-4">Definitions</h3>
                      <p className="text-gray-700 mb-4">For the purposes of this Privacy Policy:</p>
                      <div className="bg-yellow-50 rounded-lg p-6">
                        <div className="grid gap-4">
                          {[
                            { term: 'Account', definition: 'means a unique account created for You to access our Service or parts of our Service.' },
                            { term: 'Affiliate', definition: 'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' },
                            { term: 'Company', definition: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to bike rent.' },
                            { term: 'Cookies', definition: 'are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.' },
                            { term: 'Country', definition: 'refers to: Madhya Pradesh, India' },
                            { term: 'Device', definition: 'means any device that can access the Service such as a computer, a cellphone or a digital tablet.' },
                            { term: 'Personal Data', definition: 'is any information that relates to an identified or identifiable individual.' },
                            { term: 'Service', definition: 'refers to the Website.' },
                            { term: 'Service Provider', definition: 'means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service.' },
                            { term: 'Third-party Social Media Service', definition: 'refers to any website or any social network website through which a User can log in or create an account to use the Service.' },
                            { term: 'Usage Data', definition: 'refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).' },
                            { term: 'Website', definition: 'refers to bike rent, accessible from https://bike-rent-frontend.vercel.app/' },
                            { term: 'You', definition: 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.' }
                          ].map(({ term, definition }) => (
                            <div key={term} className="border-l-4 border-blue-500 pl-4">
                              <strong className="text-gray-900">{term}:</strong> <span className="text-gray-700">{definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Collecting and Using Your Personal Data */}
                <section id="collecting" className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-yellow-500" />
                    Collecting and Using Your Personal Data
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-800 mb-4">Types of Data Collected</h3>
                      <div className="space-y-6">
                        <div className="bg-yellow-100 rounded-lg p-6 border border-yellow-200">
                          <h4 className="text-lg font-semibold text-yellow-800 mb-3">Personal Data</h4>
                          <p className="text-gray-700 mb-4">
                            While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {['Email address', 'First name and last name', 'Phone number', 'Address, State, Province, ZIP/Postal code, City', 'Usage Data'].map(item => (
                              <div key={item} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-300">
                          <h4 className="text-lg font-semibold text-yellow-700 mb-3">Usage Data</h4>
                          <p className="text-gray-700 mb-4">Usage Data is collected automatically when using the Service.</p>
                          <p className="text-gray-700 mb-4">
                            Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                          </p>
                          <p className="text-gray-700">
                            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                          </p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-400">
                          <h4 className="text-lg font-semibold text-yellow-700 mb-3">Information from Third-Party Social Media Services</h4>
                          <p className="text-gray-700 mb-4">
                            The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            {['Google', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(service => (
                              <span key={service} className="px-3 py-2 bg-white rounded-lg border border-purple-300 text-purple-700 font-medium">
                                {service}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-700">
                            If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Use of Your Personal Data</h3>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-700 mb-4">The Company may use Personal Data for the following purposes:</p>
                        <div className="space-y-3">
                          {[
                            'To provide and maintain our Service, including to monitor the usage of our Service',
                            'To manage Your Account: to manage Your registration as a user of the Service',
                            'For the performance of a contract: the development, compliance and undertaking of the purchase contract',
                            'To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication',
                            'To provide You with news, special offers and general information about other goods, services and events',
                            'To manage Your requests: To attend and manage Your requests to Us',
                            'For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring',
                            'For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends'
                          ].map((purpose, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-yellow-200">
                              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-yellow-600 text-sm font-bold">{index + 1}</span>
                              </div>
                              <p className="text-gray-700 flex-1">{purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section id="children" className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-yellow-500" />
                    Children's Privacy
                  </h2>
                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                      <div>
                        <p className="text-gray-700 mb-4">
                          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
                        </p>
                        <p className="text-gray-700">
                          If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Links to Other Websites */}
                <section id="links" className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-yellow-500" />
                    Links to Other Websites
                  </h2>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site.
                    </p>
                    <p className="text-gray-700">
                      We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                    </p>
                  </div>
                </section>

                {/* Changes to this Privacy Policy */}
                <section id="changes" className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-3 text-yellow-500" />
                    Changes to this Privacy Policy
                  </h2>
                  <div className="bg-yellow-100 rounded-lg p-6 border border-yellow-200">
                    <p className="text-gray-700 mb-4">
                      We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                    </p>
                    <p className="text-gray-700 mb-4">
                      We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                    </p>
                    <p className="text-gray-700">
                      You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </p>
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact" className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-yellow-500" />
                    Contact Us
                  </h2>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                    <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>
                    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-yellow-300">
                      <Mail className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">By email:</span>
                      <a href="mailto:support@bikerent.com" className="text-yellow-600 hover:text-yellow-800 font-medium underline">
                        support@bikerent.com
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default PrivacyPolicy;