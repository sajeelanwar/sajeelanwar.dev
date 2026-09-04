import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => (
  <motion.div
    key="preloader"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50"
  >
    {/* ── Brand logo ── */}
    <div className="relative flex items-center justify-center mb-10">
      {/* Pulsing halo ring */}
      <motion.span
        animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-24 h-24 rounded-[28px] bg-indigo-300"
      />

      {/* Logo square */}
      <motion.div
        animate={{ scale: [0.9, 1.08, 1] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-20 h-20 rounded-[22px] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-300/60"
      >
        <span
          style={{ fontFamily: 'Arial, sans-serif' }}
          className="text-white text-5xl font-black leading-none select-none"
        >
          S
        </span>
      </motion.div>
    </div>

    {/* ── Progress bar ── */}
    <div className="w-40 h-[3px] bg-indigo-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full bg-indigo-500 rounded-full"
      />
    </div>

    {/* ── Label ── */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-5 text-xs font-semibold tracking-[0.2em] uppercase text-indigo-400"
    >
      Loading…
    </motion.p>
  </motion.div>
);

export default Preloader;
