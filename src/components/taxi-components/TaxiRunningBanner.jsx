import React from 'react';

const messages = [
  '🚕 50% OFF on your first taxi ride! Book now!',
  '🚗 Professional drivers & comfortable vehicles!',
  '🌟 24/7 support & instant booking confirmation!',
  '🚙 200+ taxis available in your city!',
  '💸 No hidden charges. Transparent pricing!',
  '🛡️ All vehicles fully sanitized & insured!',
  '🎉 Refer a friend and earn free rides!',
  '📱 Book on mobile, pick up in minutes!',
  '✈️ Airport transfers & outstation trips!',
  '🏨 Hotel pickups & drop-offs available!',
  '👨‍👩‍👧‍👦 Family-friendly vehicles & child seats!',
  '💼 Corporate bookings & business travel!',
];

// Repeat messages for seamless loop
const bannerText = messages.concat(messages).join('   •   ');

export default function TaxiRunningBanner() {
  return (
    <div className="w-full h-[25px] bg-gradient-to-r from-[#FDB813] to-[#FDB813] flex items-center overflow-hidden relative shadow-sm z-0">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ background: 'linear-gradient(to right, #FDB813 0%, #FDB813 80%, transparent 100%)' }} />
      <div className="whitespace-nowrap animate-marquee text-white text-[15px] flex items-center h-full px-4" style={{ fontFamily: 'Fira Mono, JetBrains Mono, Menlo, monospace', fontWeight: 400, letterSpacing: '0.04em' }}>
        {bannerText}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          min-width: 200%;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
