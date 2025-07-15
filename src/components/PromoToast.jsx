import React, { useEffect, useState, useRef } from 'react';

const promoMessages = [
  '🚴 50% OFF ends soon!',
  '🔥 Book now, get perks!',
  '⏰ Free helmet today!',
  '🌟 Best bikes, low prices!',
];

const SHOW_DURATION = 2500; // 2.5 seconds
const HIDE_DURATION = 17500; // 17.5 seconds

const PromoToast = () => {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [beating, setBeating] = useState(true);
  const closedRef = useRef(false);

  useEffect(() => {
    if (closedRef.current) return;
    let showTimeout, hideTimeout;
    if (visible) {
      // Hide after SHOW_DURATION
      showTimeout = setTimeout(() => setVisible(false), SHOW_DURATION);
    } else {
      // Show next message after HIDE_DURATION
      hideTimeout = setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % promoMessages.length);
        setBeating(false);
        setTimeout(() => setBeating(true), 100); // retrigger animation
        setVisible(true);
      }, HIDE_DURATION);
    }
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [visible]);

  const handleClose = () => {
    closedRef.current = true;
    setVisible(false);
  };

  if (!visible || closedRef.current) return null;

  return (
    <div className="fixed left-2 bottom-2 z-50 w-[220px] sm:w-[220px] md:w-[240px] lg:w-[260px]">
      <div
        className={`bg-white shadow-lg rounded-lg px-3 py-2 flex items-center gap-2 border border-gray-200 select-none transition-transform duration-300 ${beating ? 'animate-pulse-beat' : ''}`}
        style={{ animationDuration: '0.7s' }}
      >
        <span className="text-sm font-semibold text-gray-800 text-left flex-1 leading-tight" style={{ fontFamily: 'cursive, sans-serif' }}>
          {promoMessages[msgIndex]}
        </span>
        <button onClick={handleClose} className="ml-1 text-gray-400 hover:text-gray-700 p-1 rounded focus:outline-none" aria-label="Close promo toast">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.415L11.414 10l4.95 4.95a1 1 0 01-1.414 1.415L10 11.414l-4.95 4.95a1 1 0 01-1.415-1.415L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" /></svg>
        </button>
      </div>
      <style>{`
        @keyframes pulse-beat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.08); }
          40% { transform: scale(0.97); }
          60% { transform: scale(1.04); }
          80% { transform: scale(0.98); }
        }
        .animate-pulse-beat {
          animation: pulse-beat 0.7s;
        }
      `}</style>
    </div>
  );
};

export default PromoToast; 