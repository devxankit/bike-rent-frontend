import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar'
import GoogleMapsLoader from '../../components/taxi-components/GoogleMapsLoader'
import TaxiBookingForm from '../../components/taxi-components/TaxiBookingForm'
import TaxiRunningBanner from '../../components/taxi-components/TaxiRunningBanner'
import WhyChooseUsTaxi from '../../components/WhyChooseUsTaxi'
import TaxiFeatureBar from '../../components/taxi-components/TaxiFeatureBar'
import WhyTaxiRent from '../../components/taxi-components/WhyTaxiRent'
import ExploreTaxi from '../../components/taxi-components/ExploreTaxi'
import TaxiFAQ from '../../components/taxi-components/TaxiFAQ'
import FooterTaxi from '../../components/FooterTaxi'
import AOS from 'aos'
import 'aos/dist/aos.css'

const TaxiHome = () => {

  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true,    // only animate once
    });
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Book a Taxi in Your City | BookYourRide - Best Taxi Service</title>
        <meta name="title" content="Book a Taxi in Your City | BookYourRide - Best Taxi Service" />
        <meta name="description" content="BookYourRide.in offers reliable taxi services for local and outstation travel. Book your ride with our premium taxi service featuring comfortable vehicles, professional drivers, and transparent pricing." />
        <meta name="keywords" content="taxi booking, cab service, taxi rental, taxi hire, outstation taxi, airport taxi, local taxi service" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/taxi" />
        <meta property="og:title" content="Book a Taxi in Your City | BookYourRide - Best Taxi Service" />
        <meta property="og:description" content="BookYourRide.in offers reliable taxi services for local and outstation travel. Book your ride with our premium taxi service featuring comfortable vehicles, professional drivers, and transparent pricing." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/taxi" />
        <meta property="twitter:title" content="Book a Taxi in Your City | BookYourRide - Best Taxi Service" />
        <meta property="twitter:description" content="BookYourRide.in offers reliable taxi services for local and outstation travel. Book your ride with our premium taxi service featuring comfortable vehicles, professional drivers, and transparent pricing." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/taxi" />
      </Helmet>
      
      <GoogleMapsLoader />
      <TaxiNavBar />
      <TaxiRunningBanner />

      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 z-[1000]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-[-99]"
          style={{ backgroundImage: "url('/images/taxi-bg-1.png')" }}
        ></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Booking Form on Top (mobile), Left (desktop) */}
            <div className="order-1 lg:order-1 flex justify-center" data-aos="fade-up">
              <TaxiBookingForm />
            </div>
            
            {/* Hero Text below form (mobile), Right (desktop) */}
            <div className="order-2 lg:order-2 text-white lg:pl-12 flex flex-col items-center lg:items-start z-[-2] text-center lg:text-left" data-aos="fade-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" data-aos="fade-up" data-aos-delay="100">
                Your <span className='text-yellow-400'>Ride.</span> <br />
                Your City.
              </h1>
              <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-gray-300 max-w-lg" data-aos="fade-up" data-aos-delay="200">
                Travel your way with our premium taxi service.
              </p>
            </div>
          </div>
        </div>
      </section>
     
     
      {/* Features Section */}
      <div data-aos="fade-up">
        <TaxiFeatureBar />
      </div>


      {/* Why Choose Us Section */}
      <div data-aos="fade-up">
        <WhyChooseUsTaxi />
      </div>
   
   
      {/* Why TaxiRent Section */}
      <div data-aos="fade-up">
        <WhyTaxiRent />
      </div>

      {/* Explore Taxi Section */}
      <div data-aos="fade-up">
        <ExploreTaxi />
      </div>

      {/* FAQ Section */}
      <div data-aos="fade-up">
        <TaxiFAQ />
      </div>

      {/* Footer Section */}
      <FooterTaxi />

    </>
  )
}

export default TaxiHome