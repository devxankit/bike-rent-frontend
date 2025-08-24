import React from "react";
import { Helmet } from 'react-helmet-async';
import Navbar from "../components/Navbar";

const terms = [
  {
    title: "Driving License",
    content:
      "The hirer must hold a valid driving license, and a true copy of the license must be submitted.",
  },
  {
    title: "Original Documents",
    content:
      "Customers must carry their original documents when picking up the vehicle.",
  },
  {
    title: "International Visitors",
    content:
      "A valid driving license from the home country, an International Driving Permit, and a valid Visa are required.",
  },
  {
    title: "Helmet Provision",
    content:
      "Two helmets are provided free of charge. Additional helmets are available for ₹30 per day.",
  },
  {
    title: "Vehicle Security",
    content:
      "The rentee is responsible for the vehicle's condition and security during the rental period. In case of theft or loss, the rentee will bear the full cost of the vehicle.",
  },
  {
    title: "Clutch Plate Damage",
    content:
      "Any clutch plate damage (burning) is the renter’s responsibility, including full payment of repair costs and labor.",
  },
  {
    title: "Fuel Provision",
    content:
      "Minimal fuel is provided at pick-up. Additional fuel costs during use or return are borne by the rentee.",
  },
  {
    title: "Drop Time",
    content:
      "The default drop-off time is 10:00 AM. Delays may incur additional charges.",
  },
  {
    title: "Late Return Penalty",
    content:
      "Delayed returns beyond the agreed time will result in a penalty equivalent to one day’s rent. Prior extensions must be confirmed to avoid penalties.",
  },
  {
    title: "Speed and Distance Limitations",
    content:
      "Speeding over 2000 km or misuse of the bike (e.g., riding on off-road terrains) will incur a penalty of ₹1000.",
  },
  {
    title: "Tripping",
    content:
      "Tripping activities are not allowed.",
  },
  {
    title: "Damaged Parts",
    content:
      "All damaged parts must be replaced by the rentee at a nearby showroom, or the rentee will pay the full repair costs.",
  },
  {
    title: "Company Liability",
    content:
      "The company is not liable for any external fuel expenses or additional costs.",
  },
  {
    title: "Booking Cancellation",
    content:
      "Cancellations after the booking period are non-refundable.",
  },
];

export default function TermsAndConditions() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Terms & Conditions | BookYourRide – Safe & Clear Rentals</title>
        <meta name="title" content="Terms & Conditions | BookYourRide – Safe & Clear Rentals" />
        <meta name="description" content="Explore BookYourRide's terms and conditions. Know rental policies, rider responsibilities, and safety rules for a smooth and secure bike booking experience." />
        <meta name="keywords" content="terms and conditions, bike rental terms, motorcycle rental policies, rental agreement, bike rent rules, safety guidelines" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/TermsAndConditions" />
        <meta property="og:title" content="Terms & Conditions | BookYourRide – Safe & Clear Rentals" />
        <meta property="og:description" content="Explore BookYourRide's terms and conditions. Know rental policies, rider responsibilities, and safety rules for a smooth and secure bike booking experience." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/TermsAndConditions" />
        <meta property="twitter:title" content="Terms & Conditions | BookYourRide – Safe & Clear Rentals" />
        <meta property="twitter:description" content="Explore BookYourRide's terms and conditions. Know rental policies, rider responsibilities, and safety rules for a smooth and secure bike booking experience." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/TermsAndConditions" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms & Conditions | BookYourRide – Safe & Clear Rentals",
            "description": "Explore BookYourRide's terms and conditions. Know rental policies, rider responsibilities, and safety rules for a smooth and secure bike booking experience.",
            "url": "https://www.bookyourride.in/TermsAndConditions",
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
    <div className="min-h-screen bg-white p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Our Terms & Conditions</h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        {terms.map((term, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md hover:bg-yellow-100 transition-colors duration-300"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{term.title}</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{term.content}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
