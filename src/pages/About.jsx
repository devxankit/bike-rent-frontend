import Navbar from '../components/Navbar';
export default function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-6 text-center">About Bike Rent</h1>
        <section className="mb-8">
          <p className="text-lg text-gray-800 mb-4">
            <strong>Bike Rent</strong> is more than just a bike rental platform—it's a movement to transform the way people experience urban mobility. Founded with a vision to make transportation accessible, sustainable, and enjoyable, Bike Rent empowers individuals to explore cities, commute efficiently, and embrace adventure, all with the freedom of two wheels.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Our journey began in Indore, but our passion for mobility knows no bounds. We believe that everyone deserves a convenient, affordable, and reliable way to get around, whether it's for daily commutes, weekend getaways, or spontaneous city explorations. With a growing fleet of well-maintained bikes and a user-friendly digital platform, we make it easy for you to find, book, and ride—anytime, anywhere.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Our Mission</h2>
          <p className="text-lg text-gray-800 mb-4">
            At Bike Rent, our mission is simple: <span className="font-semibold">to make urban mobility simple, sustainable, and accessible for everyone</span>. We are committed to reducing traffic congestion, lowering carbon footprints, and promoting a healthier lifestyle by encouraging more people to choose bikes over cars for their daily journeys.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            We strive to deliver an exceptional rental experience, backed by top-notch customer support, transparent pricing, and a seamless digital interface. Our team works tirelessly to ensure that every ride is safe, enjoyable, and memorable.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">What We Offer</h2>
          <ul className="list-disc pl-6 text-lg text-gray-800 space-y-2 mb-4">
            <li>Hourly, daily, and weekly bike rentals for maximum flexibility</li>
            <li>A diverse fleet of premium, well-maintained bikes to suit every need</li>
            <li>Easy online booking and secure payment options</li>
            <li>24/7 roadside assistance and customer support</li>
            <li>Guided city tours and curated riding experiences</li>
            <li>Corporate rental solutions for businesses and events</li>
            <li>Special packages for tourists, students, and long-term renters</li>
          </ul>
          <p className="text-lg text-gray-800 mb-4">
            Whether you're a local resident, a student, a tourist, or a business traveler, Bike Rent is your trusted partner for all your mobility needs. Our platform is designed to be intuitive and hassle-free, so you can focus on enjoying the ride.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-lg text-gray-800 space-y-2 mb-4">
            <li><span className="font-semibold">Customer First:</span> We put our riders at the heart of everything we do, ensuring their safety, comfort, and satisfaction.</li>
            <li><span className="font-semibold">Sustainability:</span> We are passionate about reducing our environmental impact and promoting green transportation.</li>
            <li><span className="font-semibold">Innovation:</span> We embrace technology and creativity to deliver the best possible rental experience.</li>
            <li><span className="font-semibold">Community:</span> We support local communities and foster connections through shared mobility.</li>
            <li><span className="font-semibold">Integrity:</span> We operate with transparency, honesty, and respect for all our users and partners.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Our Vision for the Future</h2>
          <p className="text-lg text-gray-800 mb-4">
            As we look to the future, Bike Rent aims to expand our reach to more cities, introduce electric and eco-friendly bikes, and develop innovative solutions that make urban travel even more convenient. We envision a world where bikes are the preferred mode of transport for millions, contributing to cleaner air, healthier communities, and vibrant city life.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Join us on this journey—choose Bike Rent for your next ride and experience the freedom, joy, and possibilities that come with every journey on two wheels.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Thank You for Trusting Us</h2>
          <p className="text-lg text-gray-800">
            We are grateful for the trust and support of our growing community of riders. Your feedback and enthusiasm inspire us to keep improving and innovating. If you have any questions, suggestions, or stories to share, we would love to hear from you. Welcome to the Bike Rent family!
          </p>
        </section>
      </div>
    </>
  );
} 
