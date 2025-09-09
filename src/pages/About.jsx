import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About BookYourRide | Your Trusted Bike Rental Partner</title>
        <meta name="title" content="About BookYourRide | Your Trusted Bike Rental Partner" />
        <meta name="description" content="Discover BookYourRide reliable, affordable bike rentals in Uttarakhand. Learn our story, values, and commitment to safe, hassle-free journeys for all riders." />
        <meta name="keywords" content="about BookYourRide, bike rental company, motorcycle rental service, scooter rental Uttarakhand, bike rent company history, trusted bike rental" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/about" />
        <meta property="og:title" content="About BookYourRide | Your Trusted Bike Rental Partner" />
        <meta property="og:description" content="Discover BookYourRide reliable, affordable bike rentals in Uttarakhand. Learn our story, values, and commitment to safe, hassle-free journeys for all riders." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/about" />
        <meta property="twitter:title" content="About BookYourRide | Your Trusted Bike Rental Partner" />
        <meta property="twitter:description" content="Discover BookYourRide reliable, affordable bike rentals in Uttarakhand. Learn our story, values, and commitment to safe, hassle-free journeys for all riders." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/about" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About BookYourRide | Your Trusted Bike Rental Partner",
            "description": "Discover BookYourRide reliable, affordable bike rentals in Uttarakhand. Learn our story, values, and commitment to safe, hassle-free journeys for all riders.",
            "url": "https://www.bookyourride.in/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "description": "BookYourRide is more than just a bike rental platform—it's a movement to transform the way people experience urban mobility. Founded with a vision to make transportation accessible, sustainable, and enjoyable.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service"
              },
              "foundingDate": "2020",
              "numberOfEmployees": "25+",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 30.0668,
                  "longitude": 79.0193
                },
                "geoRadius": "200000"
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide text-center drop-shadow-lg">ABOUT US</h1>
        </div>
        {/* Wavy White Overlay */}
        <svg className="absolute bottom-0 left-0 w-full h-16 md:h-24 z-20" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M0,80 C360,120 1080,0 1440,80 L1440,100 L0,100 Z" /></svg>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-white z-30 py-8 md:py-16 px-4 md:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-500 mb-6">About Bike Rent</h2>
            
            <section className="space-y-4">
              <p className="text-base leading-relaxed text-gray-700">
                <strong className="text-gray-900">Bike Rent</strong> is more than just a bike rental platform—it's a movement to transform the way people experience urban mobility. Founded with a vision to make transportation accessible, sustainable, and enjoyable, Bike Rent empowers individuals to explore cities, commute efficiently, and embrace adventure, all with the freedom of two wheels.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-3">Our Mission</h3>
              <p className="text-base leading-relaxed text-gray-700">
                At Bike Rent, our mission is simple: <span className="font-semibold text-gray-900">to make urban mobility simple, sustainable, and accessible for everyone</span>. We are committed to reducing traffic congestion, lowering carbon footprints, and promoting a healthier lifestyle by encouraging more people to choose bikes over cars for their daily journeys.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-3">What We Offer</h3>
              <ul className="list-disc pl-5 text-base text-gray-700 space-y-1.5 leading-relaxed">
                <li>Hourly, daily, and weekly bike rentals for maximum flexibility</li>
                <li>A diverse fleet of premium, well-maintained bikes to suit every need</li>
                <li>Easy online booking and secure payment options</li>
                <li>24/7 roadside assistance and customer support</li>
                <li>Guided city tours and curated riding experiences</li>
              </ul>
              <p className="text-base leading-relaxed text-gray-700 mt-4">
                Whether you're a local resident, a student, a tourist, or a business traveler, Bike Rent is your trusted partner for all your mobility needs. Our platform is designed to be intuitive and hassle-free, so you can focus on enjoying the ride.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-3">Our Values</h3>
              <ul className="list-disc pl-5 text-base text-gray-700 space-y-2 leading-relaxed">
                <li><span className="font-semibold text-gray-900">Customer First:</span> We put our riders at the heart of everything we do, ensuring their safety, comfort, and satisfaction.</li>
                <li><span className="font-semibold text-gray-900">Sustainability:</span> We are passionate about reducing our environmental impact and promoting green transportation.</li>
                <li><span className="font-semibold text-gray-900">Innovation:</span> We embrace technology and creativity to deliver the best possible rental experience.</li>
                <li><span className="font-semibold text-gray-900">Community:</span> We support local communities and foster connections through shared mobility.</li>
                <li><span className="font-semibold text-gray-900">Integrity:</span> We operate with transparency, honesty, and respect for all our users and partners.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <p className="text-base leading-relaxed text-gray-700">
                Join us on this journey—choose Bike Rent for your next ride and experience the freedom, joy, and possibilities that come with every journey on two wheels.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-yellow-500 mb-3">Thank You for Trusting Us</h3>
              <p className="text-base leading-relaxed text-gray-700">
                We are grateful for the trust and support of our growing community of riders. Your feedback and enthusiasm inspire us to keep improving and innovating. If you have any questions, suggestions, or stories to share, we would love to hear from you. Welcome to the Bike Rent family!
              </p>
            </section>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center items-center">
            <img src="/images/haldwani.jpeg" alt="Bike rental" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-8 md:py-12 mt-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 px-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-4xl md:text-5xl font-extrabold text-white">35+</span>
            <span className="text-lg text-gray-300 mt-1">Bikes For Rent</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-4xl md:text-5xl font-extrabold text-white">250+</span>
            <span className="text-lg text-gray-300 mt-1">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-4xl md:text-5xl font-extrabold text-white">1000+</span>
            <span className="text-lg text-gray-300 mt-1">Positive Google Reviews</span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 
