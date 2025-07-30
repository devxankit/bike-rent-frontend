import React from "react";
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
