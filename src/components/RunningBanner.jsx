import React from 'react';

const messages = [
  '🚴 50% OFF on your first ride! Book now!',
  '🛵 Rent a bike in seconds, ride anywhere!',
  '🌟 24/7 support & instant booking confirmation!',
  '🏍️ 500+ bikes available in your city!',
  '💸 No hidden charges. Pay as you ride!',
  '🛡️ All bikes fully sanitized & insured!',
  '🎉 Refer a friend and earn free rides!',
  '📱 Book on mobile, pick up in minutes!',
];

// Repeat messages for seamless loop
const bannerText = messages.concat(messages).join('   •   ');

export default function RunningBanner() {
  return (
    <div className="w-full h-[25px] bg-gradient-to-r from-yellow-400 to-yellow-400 flex items-center overflow-hidden relative shadow-sm z-0">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ background: 'linear-gradient(to right, #fde047 0%, #fde047 80%, transparent 100%)' }} />
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
          animation: marquee 22s linear infinite;
        }
      `}</style>
    </div>
  );
} 