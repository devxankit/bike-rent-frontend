import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Us | BookYourRide - Get in Touch for Bike Rentals</title>
        <meta name="title" content="Contact Us | BookYourRide - Get in Touch for Bike Rentals" />
        <meta name="description" content="Contact BookYourRide for bike rental inquiries, support, or bookings. Reach out to our customer service team for assistance with motorcycle and scooter rentals across Uttarakhand." />
        <meta name="keywords" content="contact BookYourRide, bike rental contact, motorcycle rental support, customer service, bike rent help, rental inquiries" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/contact" />
        <meta property="og:title" content="Contact Us | BookYourRide - Get in Touch for Bike Rentals" />
        <meta property="og:description" content="Contact BookYourRide for bike rental inquiries, support, or bookings. Reach out to our customer service team for assistance with motorcycle and scooter rentals across Uttarakhand." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/contact" />
        <meta property="twitter:title" content="Contact Us | BookYourRide - Get in Touch for Bike Rentals" />
        <meta property="twitter:description" content="Contact BookYourRide for bike rental inquiries, support, or bookings. Reach out to our customer service team for assistance with motorcycle and scooter rentals across Uttarakhand." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/contact" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us | BookYourRide - Get in Touch for Bike Rentals",
            "description": "Contact BookYourRide for bike rental inquiries, support, or bookings. Reach out to our customer service team for assistance with motorcycle and scooter rentals across Uttarakhand.",
            "url": "https://www.bookyourride.in/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service",
                "availableLanguage": "English, Hindi"
              }
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-[320px] md:min-h-[400px] flex items-center justify-center bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/bg-3.png')" }} />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Heading */}
        <div className="relative z-20 w-full flex flex-col items-center justify-center pt-16 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide text-center drop-shadow-lg">CONTACT US</h1>
        </div>
        {/* Wavy White Overlay */}
        <svg className="absolute bottom-0 left-0 w-full h-16 md:h-24 z-20" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M0,80 C360,120 1080,0 1440,80 L1440,100 L0,100 Z" /></svg>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-white z-30 py-8 md:py-16 px-4 md:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Contact Info and Welcome */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Get in Touch With <span className="text-yellow-400">Bike Rent</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Have questions about our bike and scooty rentals? Need help with booking or want to know more about our services? We're here to help! Reach out to us using the contact information below. Our friendly team is ready to assist you and make your journey smooth and memorable.
            </p>
            <div className="space-y-5 text-base md:text-lg text-gray-800">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-yellow-500 text-2xl">📞</span>
                <span><span className="font-semibold text-gray-900">Phone:</span> +91 97987 74681</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-yellow-500 text-2xl">✉️</span>
                <span><span className="font-semibold text-gray-900">Email:</span> support@bikerent.com</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-yellow-500 text-2xl">📍</span>
                <span><span className="font-semibold text-gray-900">Location:</span> Indore, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-yellow-500 text-2xl">⏰</span>
                <span><span className="font-semibold text-gray-900">Working Hours:</span> 24/7 Service Available</span>
              </div>
            </div>
          </div>
          {/* Right: Why Choose Us or Additional Info */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 flex flex-col justify-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">Why Choose Bike Rent?</h3>
            <ul className="list-none text-base md:text-lg text-gray-800 space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-lg">⭐</span>
                <span>4.8/5 Customer Rating</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-lg">👥</span>
                <span>10K+ Happy Users</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-purple-500 text-lg">📦</span>
                <span>Hourly, Daily & Weekly Packages</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500 text-lg">🏍️</span>
                <span>Premium Bike Collection</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500 text-lg">🛠️</span>
                <span>24/7 Roadside Assistance</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-500 text-lg">🗺️</span>
                <span>Guided City Tours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
} 