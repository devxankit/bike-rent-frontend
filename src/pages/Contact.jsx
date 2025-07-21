import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const SKY_BLUE = '#12B6FA';
const NAVY_BLUE = '#1B314D';

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-500 mb-3 text-center">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto text-center">
            Bike Rent is your trusted partner for convenient, affordable, and reliable bike rentals in Indore and beyond. Our mission is to make urban mobility simple and accessible for everyone. If you have any questions, need support, or want to know more about our services, feel free to reach out!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div>
              <h2 className="text-xl font-bold text-yellow-500 mb-4">Contact Details</h2>
              <ul className="space-y-5 text-base text-gray-800">
                <li className="flex items-start gap-3">
                  <PhoneIcon className="w-6 h-6 text-yellow-500 mt-1" />
                  <span><span className="font-semibold">Phone:</span> +91 97987 74681</span>
                </li>
                <li className="flex items-start gap-3">
                  <EnvelopeIcon className="w-6 h-6 text-yellow-500 mt-1" />
                  <span><span className="font-semibold">Email:</span> support@bikerent.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-6 h-6 text-yellow-500 mt-1" />
                  <span><span className="font-semibold">Location:</span> Indore, Madhya Pradesh, India</span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="w-6 h-6 text-yellow-500 mt-1" />
                  <span><span className="font-semibold">Working Hours:</span> 24/7 Service Available</span>
                </li>
              </ul>
            </div>
            {/* Why Choose Us */}
            <div>
              <h2 className="text-xl font-bold text-yellow-500 mb-4">Why choose Bike Rent?</h2>
              <ul className="list-disc pl-6 text-base text-gray-800 space-y-2">
                <li>4.8/5 Customer Rating</li>
                <li>10K+ Happy Users</li>
                <li>Hourly, Daily & Weekly Packages</li>
                <li>Premium Bike Collection</li>
                <li>24/7 Roadside Assistance</li>
                <li>Guided City Tours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 