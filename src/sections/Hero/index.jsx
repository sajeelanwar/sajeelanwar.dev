import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaArrowRight, FaFileDownload } from 'react-icons/fa';
import profilePhoto from '../../assets/images/profile.png';

/* ─── Animation Variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Stat Pill ──────────────────────────────────────────── */
const StatPill = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm shadow-indigo-100"
  >
    <span className="text-xl font-extrabold text-indigo-700 leading-none">{value}</span>
    <span className="text-[11px] text-gray-500 font-medium mt-0.5 whitespace-nowrap">{label}</span>
  </motion.div>
);

/* ─── Hero ───────────────────────────────────────────────── */
const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-24 bg-[#FAFAFA] overflow-hidden"
    >
      {/* ── Background blobs ── */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-20 pointer-events-none bg-indigo-300" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full blur-3xl opacity-20 pointer-events-none bg-indigo-200" />

      {/* ── Dot-grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }}
      />

      {/*
        ── Main layout container ──
        Mobile:  single column, image stacked above text
        Desktop: two columns side-by-side
        px-4 on mobile ensures nothing ever touches the screen edge.
      */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ══ Image column — comes first in DOM, shown on top on mobile ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2"
          >
            {/*
              Image wrapper:
              - Fixed pixel width on mobile so it never overflows (max-w-[260px])
              - Grows to 360px on sm, 420px on lg
              - overflow-visible is intentional: lets badges peek outside the blob
                but the SECTION has overflow-hidden so they can't escape the page.
              - Floating tech tags are hidden on mobile (lg:block) to keep
                the mobile view clean and uncluttered.
            */}
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[420px]">

              {/* Glow ring */}
              <div className="absolute inset-[-10px] bg-indigo-100 blur-2xl rounded-full opacity-60 pointer-events-none" />
              {/* Gradient border behind blob */}
              <div className="absolute inset-[-3px] bg-gradient-to-br from-indigo-200 via-violet-100 to-indigo-50 opacity-60 blob-frame pointer-events-none" />

              {/* Floating blob image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative blob-frame overflow-hidden bg-indigo-50 shadow-2xl shadow-indigo-200/50 border-[3px] border-white"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={profilePhoto}
                  alt="Sajeel Anwar — Full Stack Developer"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              {/* Experience badge — bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-4 left-0 shimmer-badge border border-indigo-100 rounded-2xl px-3 py-2 shadow-lg shadow-indigo-100"
              >
                <p className="text-[10px] text-gray-500 font-medium">Experience</p>
                <p className="text-sm font-extrabold text-indigo-700 leading-tight">3+ Years</p>
              </motion.div>

              {/* Available-for-work badge — top-right */}
              <motion.div
                initial={{ opacity: 0, x: 16, scale: 0.88 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-3 right-0 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-lg shadow-gray-100 flex items-center gap-1.5"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-semibold text-gray-700 whitespace-nowrap">Available for work</span>
              </motion.div>

              {/*
                Floating tech tags — HIDDEN on mobile/tablet (lg:block).
                Keeps the 375px view clean. Positioned relative to the image
                container so they never escape overflow-hidden on the section.
              */}
              {[
                { label: 'React', angle: 215, r: 1.1 },
                { label: 'Node.js', angle: 315, r: 1.1 },
                { label: 'MongoDB', angle: 160, r: 1.05 },
              ].map(({ label, angle, r }, i) => {
                const rad = (angle * Math.PI) / 180;
                const tx = Math.cos(rad) * 50 * r;
                const ty = Math.sin(rad) * 50 * r;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                    style={{ left: `calc(50% + ${tx}%)`, top: `calc(50% + ${ty}%)` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 hidden lg:block"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className="px-3 py-1.5 bg-white border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-600 shadow-sm shadow-indigo-100 whitespace-nowrap"
                    >
                      {label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ══ Text column ══ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 tracking-[0.18em] uppercase">
                <span className="w-5 h-px bg-indigo-400 inline-block" />
                Salaam, I&apos;m
              </span>
            </motion.div>

            {/* Name — responsive text scale */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.06] tracking-tight mb-3 break-words"
            >
              Sajeel{' '}
              <span className="relative inline-block text-indigo-600">
                Anwar
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-indigo-400 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              variants={itemVariants}
              className="text-base md:text-xl h-8 md:h-10 mb-5 text-indigo-500 font-semibold"
            >
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Developer',
                    'MERN Stack Developer',
                    'Scalable Architecture Builder',
                    'Professional Dev Trainer',
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: 'typewriter-text',
                  cursorClassName: 'typewriter-cursor text-indigo-400',
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-7"
            >
              I build{' '}
              <strong className="text-gray-700 font-semibold">scalable web architectures</strong>{' '}
              using the MERN stack — from robust Node.js APIs to polished React interfaces. Beyond
              shipping products, I&apos;m passionate about{' '}
              <strong className="text-gray-700 font-semibold">professional developer training</strong>,
              helping teams level up their craft and write better software.
            </motion.p>

            {/* Stat pills — shrink on mobile so all 3 fit in one row */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-2 md:gap-4 mb-7"
            >
              <StatPill value="3+" label="Yrs Experience" delay={0.75} />
              <StatPill value="20+" label="Projects Shipped" delay={0.85} />
              <StatPill value="100+" label="Devs Trained" delay={0.95} />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              <motion.a
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(67,56,202,0.22)' }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-200 transition-shadow"
              >
                Let&apos;s Work Together
                <FaArrowRight className="text-xs" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04, borderColor: '#4338ca', color: '#4338ca' }}
                whileTap={{ scale: 0.97 }}
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-semibold text-sm bg-white/70 backdrop-blur-sm transition-colors"
              >
                <FaFileDownload className="text-base" />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-3"
            >
              {[
                { icon: <FaGithub />, url: 'https://github.com/sajeelanwar', label: 'GitHub' },
                { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/sajeel-anwar-69b97124b', label: 'LinkedIn' },
                { icon: <FaWhatsapp />, url: 'https://wa.me/923017268016', label: 'WhatsApp' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, backgroundColor: '#eef2ff', color: '#4338ca' }}
                  whileTap={{ scale: 0.92 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 text-base md:text-lg shadow-sm transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;