import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Ride</h1>
        <p className="text-lg mb-8">Rent bikes easily in your city. Connect directly with owners via WhatsApp!</p>
      </motion.div>
    </section>
  );
} 