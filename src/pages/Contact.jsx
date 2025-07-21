import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <>
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
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
              Get in Touch With <span className="text-yellow-400">Bike Rent</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Have questions about our bike and scooty rentals? Need help with booking or want to know more about our services? We're here to help! Reach out to us using the contact information below. Our friendly team is ready to assist you and make your journey smooth and memorable.
            </p>
            <div className="space-y-4 text-base text-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-xl">📞</span>
                <span><span className="font-semibold">Phone:</span> +91 97987 74681</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-xl">✉️</span>
                <span><span className="font-semibold">Email:</span> support@bikerent.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-xl">📍</span>
                <span><span className="font-semibold">Location:</span> Indore, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 text-xl">⏰</span>
                <span><span className="font-semibold">Working Hours:</span> 24/7 Service Available</span>
              </div>
            </div>
          </div>
          {/* Right: Why Choose Us or Additional Info */}
          <div className="bg-gray-50 rounded-xl shadow p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose Bike Rent?</h3>
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
      </section>
    </>
  );
} 