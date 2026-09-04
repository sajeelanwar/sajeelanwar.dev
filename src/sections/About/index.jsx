import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaServer, FaDatabase, FaPalette,
  FaGraduationCap, FaCheckCircle,
} from 'react-icons/fa';

/* ─── Skill Cards data ───────────────────────────────────── */
const SKILL_CARDS = [
  {
    icon: FaCode,
    title: 'Frontend',
    desc: 'React, Tailwind CSS & Ant Design for pixel-perfect, responsive UIs.',
    accent: '#4338ca',
    bg: '#eef2ff',
  },
  {
    icon: FaServer,
    title: 'Backend',
    desc: 'Node.js & Express RESTful APIs — secure, structured, and scalable.',
    accent: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: FaDatabase,
    title: 'Database',
    desc: 'MongoDB schema design and Supabase for flexible, performant data layers.',
    accent: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: FaPalette,
    title: 'UI / UX',
    desc: 'Component systems and design tokens that feel premium across every device.',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
];

/* ─── Stats data ─────────────────────────────────────────── */
const STATS = [
  { value: '3+',   label: 'Years Experience',   accent: '#4338ca' },
  { value: '20+',  label: 'Projects Shipped',   accent: '#0891b2' },
  { value: '100+', label: 'Devs Trained',       accent: '#059669' },
  { value: '15+',  label: 'Technologies Used',  accent: '#7c3aed' },
];

/* ─── Tech tags ──────────────────────────────────────────── */
const TECH_TAGS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js',
  'Express', 'MongoDB', 'Supabase', 'Tailwind CSS',
  'Ant Design', 'REST API',
];

/* ─── Animation helpers ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardAnim = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Skill Card ─────────────────────────────────────────── */
const SkillCard = ({ card }) => {
  const Icon = card.icon;
  return (
    <motion.div
      variants={cardAnim}
      whileHover={{ y: -4, boxShadow: `0 12px 36px -8px ${card.accent}22` }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-3 shadow-sm shadow-gray-100/60"
    >
      {/* Icon badge */}
      <div
        style={{ backgroundColor: card.bg, color: card.accent }}
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      >
        <Icon />
      </div>

      {/* Title */}
      <h4 className="text-base font-extrabold text-gray-900 leading-tight">{card.title}</h4>

      {/* One-liner */}
      <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
    </motion.div>
  );
};

/* ─── Stat Cell ──────────────────────────────────────────── */
const StatCell = ({ stat }) => (
  <motion.div
    {...fadeUp(0)}
    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
  >
    <span
      className="text-4xl md:text-5xl font-black leading-none mb-1"
      style={{ color: stat.accent }}
    >
      {stat.value}
    </span>
    <span className="text-sm text-gray-500 font-medium text-center leading-snug">
      {stat.label}
    </span>
  </motion.div>
);

/* ─── Section Header ─────────────────────────────────────── */
const SectionHeader = () => (
  <motion.div {...fadeUp(0)} className="text-center mb-14">
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">
      <span className="w-6 h-px bg-indigo-400 inline-block" />
      Who I Am
      <span className="w-6 h-px bg-indigo-400 inline-block" />
    </span>
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
      About <span className="text-indigo-600">Me</span>
    </h2>
    <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
      Developer · Architect · Mentor
    </p>
  </motion.div>
);

/* ─── About Section ──────────────────────────────────────── */
const About = () => (
  <section id="about" className="py-24 bg-white relative overflow-hidden">
    {/* Subtle dot-grid texture */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.45,
      }}
    />
    {/* Soft indigo blob — top-left */}
    <div className="absolute -top-24 -left-24 w-[380px] h-[380px] bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
      <SectionHeader />

      {/* ── Two-column body ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">

        {/* ── Left: bio + tech tags ── */}
        <motion.div {...fadeUp(0.1)}>
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg">
            <FaGraduationCap className="text-indigo-500 text-sm" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              MERN Stack Developer
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug mb-5">
            Building scalable systems &amp;{' '}
            <span className="text-indigo-600">mentoring the next generation</span>
          </h3>

          {/* Bio — the specific copy requested */}
          <p className="text-gray-500 text-[0.95rem] leading-[1.8] mb-7">
            I am a MERN Stack Developer with a background in specialised frontend development.
            I focus on engineering scalable web architectures — from robust backend APIs to
            seamless e-commerce solutions. Beyond writing clean, efficient code, I am actively
            involved in tech education: managing operations for skills development programs and
            providing hands-on, professional training to students under my supervision. My dual
            role as a developer and mentor ensures my technical skills are always sharp and
            communication remains my strongest asset.
          </p>

          {/* Checklist highlights */}
          <ul className="space-y-2.5 mb-8">
            {[
              'Full-stack MERN architecture & API design',
              'E-commerce & LMS platform engineering',
              'Developer training & program management',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                <FaCheckCircle className="text-indigo-500 text-base mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Tech tag pills — light theme */}
          <div className="flex flex-wrap gap-2">
            {TECH_TAGS.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, borderColor: '#a5b4fc' }}
                className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-slate-600 shadow-sm transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Right: 2×2 Skill Cards grid ── */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {SKILL_CARDS.map((card) => (
            <SkillCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>

      {/* ── Stats bar — 2-col on mobile, 4-col on md+ ── */}
      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {STATS.map((stat) => (
          <StatCell key={stat.label} stat={stat} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;