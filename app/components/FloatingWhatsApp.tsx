'use client';

import { motion } from 'framer-motion';

export function FloatingWhatsApp() {
  const whatsappNumber = '593XXXXXXXXX'; // Replace with actual number

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulsing ring animation */}
        <motion.div
          animate={{ scale: [1, 1.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-nexia-cyan opacity-20"
        />
        {/* Main button */}
        <div className="relative w-14 h-14 bg-nexia-cyan rounded-full flex items-center justify-center shadow-glow-cyan">
          <svg
            className="w-7 h-7 text-nexia-dark-bg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371 0-.57 0-.198 0-.52.149-.792.364-.272.215-.1.67-.015.945.086.276.413.634.879 1.09.466.456.76.576 1.058.676.298.099.573.05.798-.226.223-.275.858-.976 1.075-1.317.217-.34.434-.306.692-.235.257.071.823.412 1.07.735.247.323.248.762.173.953-.074.19-.241.27-.498.369m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-.356.213-.823.427-1.396.427C3.9 8.784 3 7.884 3 6.771 3 5.16 4.335 3.92 6.025 3.92c1.59 0 2.927 1.055 3.385 2.945.884-.144 1.666.766 1.666 1.814 0 .987-.796 1.794-1.779 1.794" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
