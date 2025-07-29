import React, { useState, useEffect } from 'react';
import { ChevronUp, FileText, Bike, Shield, CreditCard, AlertTriangle, Phone, Clock, MapPin, Users, Scale, Wrench } from 'lucide-react';
import Navbar from '../components/Navbar';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: FileText, color: 'blue' },
    { id: 'rental-terms', title: 'Rental Terms', icon: Bike, color: 'green' },
    { id: 'payment', title: 'Payment & Pricing', icon: CreditCard, color: 'purple' },
    { id: 'responsibilities', title: 'User Responsibilities', icon: Users, color: 'orange' },
    { id: 'liability', title: 'Liability & Insurance', icon: Shield, color: 'red' },
    { id: 'maintenance', title: 'Maintenance & Repairs', icon: Wrench, color: 'indigo' },
    { id: 'prohibited', title: 'Prohibited Uses', icon: AlertTriangle, color: 'yellow' },
    { id: 'termination', title: 'Termination', icon: Scale, color: 'pink' },
    { id: 'contact', title: 'Contact Information', icon: Phone, color: 'teal' }
  ];

  const getColorClasses = (color) => {
    // All theme colors set to yellow
    const colorMap = {
      blue: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      green: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      purple: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      orange: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      red: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      indigo: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      pink: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      },
      teal: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: 'text-yellow-600',
        button: 'bg-yellow-100 hover:bg-yellow-200',
        active: 'bg-yellow-100 border-yellow-500'
      }
    };
    return colorMap[color] || colorMap.yellow;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
    
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Navigation Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {navigationItems.map(({ id, title, icon: Icon, color }) => {
              const colors = getColorClasses(color);
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    activeSection === id ? colors.active : `${colors.bg} ${colors.border} hover:${colors.button}`
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${colors.icon}`} />
                  <p className={`text-sm font-medium ${colors.text}`}>{title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section id="overview" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <FileText className="w-8 h-8 mr-3" />
                Terms & Conditions Overview
              </h2>
            </div>
            <div className="p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to Bike Rent! These Terms and Conditions ("Terms") govern your use of our bike rental services operated by Bike Rent ("we," "our," or "us") located in Madhya Pradesh, India. By accessing our website at{' '}
                  <a href="https://bike-rent-frontend.vercel.app/" className="text-blue-600 hover:text-blue-800 underline">
                    https://bike-rent-frontend.vercel.app/
                  </a>{' '}
                  or using our services, you agree to be bound by these Terms.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Notice</h3>
                  <p className="text-blue-700">
                    Please read these Terms carefully before using our service. Your access to and use of our bike rental service is conditioned on your acceptance of and compliance with these Terms. If you disagree with any part of these terms, you may not access our service.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Rental Terms */}
          <section id="rental-terms" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Bike className="w-8 h-8 mr-3" />
                Bike Rental Terms
              </h2>
            </div>
            <div className="p-8">
              <div className="grid gap-6">
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Rental Duration & Booking
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>• Minimum rental period: 1 hour</p>
                    <p>• Maximum rental period: 30 days (for long-term rentals)</p>
                    <p>• Advance booking required for rentals exceeding 24 hours</p>
                    <p>• Late returns will incur additional charges at hourly rates</p>
                    <p>• Cancellations must be made at least 2 hours before scheduled pickup</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-2" />
                    Pickup & Return Locations
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>• Primary location: Satna, Madhya Pradesh, India</p>
                    <p>• Home delivery available within 10km radius (additional charges apply)</p>
                    <p>• Bikes must be returned to the same location unless prior arrangement</p>
                    <p>• Operating hours: 6:00 AM to 10:00 PM daily</p>
                    <p>• Emergency contact available 24/7 for breakdown assistance</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Eligibility Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-gray-700">
                      <p>• Minimum age: 18 years</p>
                      <p>• Valid government-issued photo ID required</p>
                      <p>• Valid driving license (for motorized bikes)</p>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p>• Security deposit required</p>
                      <p>• Credit/debit card for payment</p>
                      <p>• Contact verification mandatory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment & Pricing */}
          <section id="payment" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <CreditCard className="w-8 h-8 mr-3" />
                Payment & Pricing Policy
              </h2>
            </div>
            <div className="p-8">
              <div className="grid gap-6">
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Pricing Structure</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border border-purple-300 p-3 text-left">Bike Type</th>
                          <th className="border border-purple-300 p-3 text-left">Hourly Rate</th>
                          <th className="border border-purple-300 p-3 text-left">Daily Rate</th>
                          <th className="border border-purple-300 p-3 text-left">Security Deposit</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr>
                          <td className="border border-purple-300 p-3">Standard Bicycle</td>
                          <td className="border border-purple-300 p-3">₹50</td>
                          <td className="border border-purple-300 p-3">₹300</td>
                          <td className="border border-purple-300 p-3">₹1,000</td>
                        </tr>
                        <tr className="bg-purple-25">
                          <td className="border border-purple-300 p-3">Electric Bicycle</td>
                          <td className="border border-purple-300 p-3">₹100</td>
                          <td className="border border-purple-300 p-3">₹600</td>
                          <td className="border border-purple-300 p-3">₹2,000</td>
                        </tr>
                        <tr>
                          <td className="border border-purple-300 p-3">Mountain Bike</td>
                          <td className="border border-purple-300 p-3">₹80</td>
                          <td className="border border-purple-300 p-3">₹500</td>
                          <td className="border border-purple-300 p-3">₹1,500</td>
                        </tr>
                        <tr className="bg-purple-25">
                          <td className="border border-purple-300 p-3">Premium/Sports Bike</td>
                          <td className="border border-purple-300 p-3">₹150</td>
                          <td className="border border-purple-300 p-3">₹1,000</td>
                          <td className="border border-purple-300 p-3">₹3,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Payment Methods</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Credit/Debit Cards (Visa, MasterCard, RuPay)</p>
                      <p>• UPI Payments (GPay, PhonePe, Paytm)</p>
                      <p>• Net Banking</p>
                      <p>• Digital Wallets</p>
                      <p>• Cash payments (at pickup location only)</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Additional Charges</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Late return: ₹50 per hour</p>
                      <p>• Home delivery: ₹100-300 (distance based)</p>
                      <p>• Cleaning fee: ₹200 (if excessively dirty)</p>
                      <p>• Fuel charges: ₹5 per km (for electric bikes)</p>
                      <p>• Damage assessment: As per repair costs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section id="responsibilities" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Users className="w-8 h-8 mr-3" />
                User Responsibilities
              </h2>
            </div>
            <div className="p-8">
              <div className="grid gap-6">
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4">Pre-Rental Inspection</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="font-medium mb-2">You must inspect and report:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Visible damage or scratches</li>
                        <li>• Tire condition and pressure</li>
                        <li>• Brake functionality</li>
                        <li>• Chain and gear operation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Check for accessories:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Helmet (if provided)</li>
                        <li>• Lock and keys</li>
                        <li>• Lights and reflectors</li>
                        <li>• Water bottle holder</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4">During Rental Period</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-orange-300">
                        <h4 className="font-semibold text-orange-700 mb-2">Safety Requirements</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Wear helmet at all times</li>
                          <li>• Follow traffic rules</li>
                          <li>• Use designated bike lanes</li>
                          <li>• Avoid riding under influence</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-orange-300">
                        <h4 className="font-semibold text-orange-700 mb-2">Care & Maintenance</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Keep bike clean and dry</li>
                          <li>• Secure when parked</li>
                          <li>• Report issues immediately</li>
                          <li>• Avoid overloading</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-orange-300">
                        <h4 className="font-semibold text-orange-700 mb-2">Usage Restrictions</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• No modifications allowed</li>
                          <li>• Single rider only</li>
                          <li>• No commercial use</li>
                          <li>• Stay within city limits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Liability & Insurance */}
          <section id="liability" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                Liability & Insurance Coverage
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Important Liability Notice
                  </h3>
                  <p className="text-red-700">
                    Users assume full responsibility for their safety while using our bikes. Bike Rent provides equipment in good working condition but cannot be held liable for accidents, injuries, or damages resulting from user negligence or external factors.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">What We Cover</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Mechanical breakdowns due to normal wear</li>
                      <li>• Flat tire repairs during rental</li>
                      <li>• Emergency roadside assistance</li>
                      <li>• Replacement bike for mechanical failures</li>
                      <li>• Third-party property damage (up to ₹50,000)</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">What You're Responsible For</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Personal injury and medical expenses</li>
                      <li>• Damage due to misuse or negligence</li>
                      <li>• Theft or loss of the bicycle</li>
                      <li>• Traffic violations and fines</li>
                      <li>• Third-party claims exceeding coverage</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Insurance Recommendations</h3>
                  <p className="text-gray-700 mb-3">
                    We strongly recommend that users have personal accident insurance or travel insurance that covers cycling activities. 
                  </p>
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Optional:</strong> Extended coverage insurance available for ₹50/day covering personal accident up to ₹1,00,000 and theft protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maintenance & Repairs */}
          <section id="maintenance" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Wrench className="w-8 h-8 mr-3" />
                Maintenance & Repair Policy
              </h2>
            </div>
            <div className="p-8">
              <div className="grid gap-6">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">Emergency Procedures</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-3">In Case of Breakdown:</h4>
                      <ol className="space-y-2 text-gray-700 list-decimal ml-6">
                        <li>Stop riding immediately and move to safety</li>
                        <li>Call our emergency helpline: +91-9876543210</li>
                        <li>Provide your location and rental ID</li>
                        <li>Wait for assistance (average response: 30 minutes)</li>
                        <li>Do not attempt repairs yourself</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-3">Common Issues Covered:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Flat tires and punctures</li>
                        <li>• Chain problems</li>
                        <li>• Brake adjustments</li>
                        <li>• Gear shifting issues</li>
                        <li>• Electrical problems (e-bikes)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">Damage Assessment</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-indigo-100">
                          <th className="border border-indigo-300 p-3 text-left">Damage Type</th>
                          <th className="border border-indigo-300 p-3 text-left">Repair Cost</th>
                          <th className="border border-indigo-300 p-3 text-left">User Liability</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr>
                          <td className="border border-indigo-300 p-3">Minor scratches</td>
                          <td className="border border-indigo-300 p-3">₹200-500</td>
                          <td className="border border-indigo-300 p-3">100% if due to negligence</td>
                        </tr>
                        <tr className="bg-indigo-25">
                          <td className="border border-indigo-300 p-3">Wheel damage</td>
                          <td className="border border-indigo-300 p-3">₹800-2000</td>
                          <td className="border border-indigo-300 p-3">Full cost</td>
                        </tr>
                        <tr>
                          <td className="border border-indigo-300 p-3">Frame damage</td>
                          <td className="border border-indigo-300 p-3">₹2000-5000</td>
                          <td className="border border-indigo-300 p-3">Full cost + penalties
                        </td>
                        </tr>
                        <tr className="bg-indigo-25">
                          <td className="border border-indigo-300 p-3">Electrical issues (e-bikes)</td>
                          <td className="border border-indigo-300 p-3">₹1000-3000</td>
                          <td className="border border-indigo-300 p-3">Full cost</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section id="prohibited" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                Prohibited Uses
              </h2>
            </div>
            <div className="p-8">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Restricted Activities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-3">Strictly Prohibited:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Riding under influence of alcohol/drugs</li>
                      <li>• Carrying more than one passenger</li>
                      <li>• Performing stunts or tricks</li>
                      <li>• Commercial use without authorization</li>
                      <li>• Racing or speed competitions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-700 mb-3">Restricted Areas:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Highways and expressways</li>
                      <li>• Construction zones</li>
                      <li>• Protected forest areas</li>
                      <li>• Private property without permission</li>
                      <li>• Areas beyond 50km radius from pickup</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Consequences of Violation</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-yellow-300">
                    <h4 className="font-semibold text-yellow-700 mb-2">Immediate Actions</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Rental termination</li>
                      <li>• Confiscation of bike</li>
                      <li>• Security deposit forfeited</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-300">
                    <h4 className="font-semibold text-yellow-700 mb-2">Financial Penalties</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• ₹500-2000 fine</li>
                      <li>• Full cost of damages</li>
                      <li>• Legal fee reimbursement</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-300">
                    <h4 className="font-semibold text-yellow-700 mb-2">Account Restrictions</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Temporary suspension</li>
                      <li>• Permanent ban</li>
                      <li>• Legal proceedings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section id="termination" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Scale className="w-8 h-8 mr-3" />
                Termination Policy
              </h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                  <h3 className="text-xl font-semibold text-pink-800 mb-4">By Bike Rent</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>We may terminate your rental agreement immediately if:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Violation of prohibited uses</li>
                      <li>• Failure to pay rental fees</li>
                      <li>• Providing false information</li>
                      <li>• Using bike for illegal activities</li>
                      <li>• Significant damage to equipment</li>
                    </ul>
                    <p className="mt-3">Termination notice will be provided via registered email and SMS.</p>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                  <h3 className="text-xl font-semibold text-pink-800 mb-4">By User</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>You may terminate the agreement by:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Returning bike before scheduled time</li>
                      <li>• Paying early termination fee: 50% of remaining rental value</li>
                      <li>• Notifying us at least 2 hours in advance</li>
                    </ul>
                    <div className="mt-4 bg-pink-100 p-4 rounded-lg">
                      <p className="text-pink-800 text-sm">
                        <strong>Note:</strong> Security deposit will be refunded within 7 business days after termination, minus any applicable charges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Phone className="w-8 h-8 mr-3" />
                Contact Information
              </h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">Customer Support</h3>
                  <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-teal-700">Phone Support</h4>
                          <p className="text-gray-700">+91-9876543210 (24/7)</p>
                          <p className="text-gray-700">+91-0123456789 (Office hours)</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-teal-700">Operating Hours</h4>
                          <p className="text-gray-700">Monday-Sunday: 6:00 AM - 10:00 PM</p>
                          <p className="text-gray-700">Emergency support: 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-teal-700">Office Address</h4>
                          <p className="text-gray-700">123 Cycling Road</p>
                          <p className="text-gray-700">Satna, Madhya Pradesh 485001</p>
                          <p className="text-gray-700">India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-teal-800 mb-4">Online Support</h3>
                  <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-teal-700 mb-2">Email Support</h4>
                        <p className="text-gray-700 mb-1">General inquiries:</p>
                        <a href="mailto:info@bikerent.in" className="text-blue-600 hover:underline">info@bikerent.in</a>
                        
                        <p className="text-gray-700 mt-3 mb-1">Support:</p>
                        <a href="mailto:support@bikerent.in" className="text-blue-600 hover:underline">support@bikerent.in</a>
                      </div>
                      <div>
                        <h4 className="font-medium text-teal-700 mb-2">Website & Social</h4>
                        <div className="flex space-x-4">
                          <a href="#" className="text-blue-600 hover:text-blue-800">Website</a>
                          <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                          <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
                          <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex overflow-x-auto p-2 space-x-2">
          {navigationItems.map(({ id, title, icon: Icon, color }) => {
            const colors = getColorClasses(color);
            return (
              <button
                key={id}
                onClick={() => toggleSection(id)}
                className={`flex-shrink-0 p-3 rounded-lg flex flex-col items-center ${
                  expandedSection === id ? `${colors.bg} ${colors.border} border-2` : 'text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${expandedSection === id ? colors.icon : 'text-gray-500'}`} />
                <span className={`text-xs font-medium ${expandedSection === id ? colors.text : 'text-gray-700'}`}>
                  {title}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Expanded Section Content */}
        {expandedSection && (
          <div className="bg-white p-4 max-h-60 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              {expandedSection === 'overview' && (
                <p>Welcome to Bike Rent! These Terms govern your use of our bike rental services in Madhya Pradesh, India.</p>
              )}
              {expandedSection === 'rental-terms' && (
                <ul>
                  <li>• Minimum rental: 1 hour</li>
                  <li>• Maximum rental: 30 days</li>
                  <li>• Home delivery available</li>
                </ul>
              )}
              {expandedSection === 'payment' && (
                <ul>
                  <li>• Hourly rates: ₹50-150</li>
                  <li>• Daily rates: ₹300-1000</li>
                  <li>• Security deposit: ₹1000-3000</li>
                </ul>
              )}
              {expandedSection === 'responsibilities' && (
                <ul>
                  <li>• Pre-rental inspection required</li>
                  <li>• Wear helmet at all times</li>
                  <li>• Follow traffic rules</li>
                </ul>
              )}
              {expandedSection === 'liability' && (
                <ul>
                  <li>• We cover mechanical breakdowns</li>
                  <li>• You're responsible for personal injury</li>
                  <li>• Optional insurance available</li>
                </ul>
              )}
              {expandedSection === 'maintenance' && (
                <ul>
                  <li>• Emergency helpline: +91-9876543210</li>
                  <li>• Do not attempt repairs yourself</li>
                  <li>• Common issues covered</li>
                </ul>
              )}
              {expandedSection === 'prohibited' && (
                <ul>
                  <li>• No riding under influence</li>
                  <li>• No carrying passengers</li>
                  <li>• Restricted areas apply</li>
                </ul>
              )}
              {expandedSection === 'termination' && (
                <ul>
                  <li>• We may terminate for violations</li>
                  <li>• You may terminate early with fee</li>
                  <li>• Deposit refund in 7 days</li>
                </ul>
              )}
              {expandedSection === 'contact' && (
                <ul>
                  <li>• Phone: +91-9876543210</li>
                  <li>• Email: info@bikerent.in</li>
                  <li>• Address: Haldwani, MP</li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TermsAndConditions;