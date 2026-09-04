import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaServer, FaShoppingCart, FaTools,
} from 'react-icons/fa';

/* ─── Category data ──────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'frontend',
    icon: FaCode,
    title: 'Frontend Development',
    subtitle: 'Interfaces that feel as good as they look',
    accent: '#4338ca',      // indigo-700
    accentBg: '#eef2ff',    // indigo-50
    skills: [
      'React',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'Ant Design (antd)',
      'Framer Motion',
      'HTML5 / CSS3',
    ],
  },
  {
    id: 'backend',
    icon: FaServer,
    title: 'Backend & Database',
    subtitle: 'Scalable APIs and resilient data layers',
    accent: '#0891b2',      // cyan-600
    accentBg: '#ecfeff',    // cyan-50
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Supabase',
      'RESTful APIs',
      'Mongoose',
    ],
  },
  {
    id: 'ecommerce',
    icon: FaShoppingCart,
    title: 'E-Commerce & Platforms',
    subtitle: 'End-to-end commerce and CMS solutions',
    accent: '#059669',      // emerald-600
    accentBg: '#ecfdf5',    // emerald-50
    skills: [
      'WordPress',
      'WooCommerce',
      'Shopify Theme Customization',
      'DSers',
      'AliExpress',
      'Dropshipping Integrations',
    ],
  },
  {
    id: 'tools',
    icon: FaTools,
    title: 'Architecture & Tools',
    subtitle: 'Workflow, systems thinking, and leadership',
    accent: '#7c3aed',      // violet-600
    accentBg: '#f5f3ff',    // violet-50
    skills: [
      'Git / GitHub',
      'Vite',
      'Local Storage Management',
      'Responsive UI/UX',
      'Mentorship',
      'Code Supervision',
    ],
  },
];

/* ─── Animation helpers ──────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const pillVariants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Skill Pill ─────────────────────────────────────────── */
const SkillPill = ({ label, accent }) => (
  <motion.span
    variants={pillVariants}
    whileHover={{ borderColor: accent, color: accent, scale: 1.04 }}
    transition={{ duration: 0.18 }}
    className="
      inline-flex items-center
      px-4 py-2 rounded-full
      bg-gray-50 border border-gray-200
      text-slate-600 text-xs font-semibold
      shadow-sm transition-colors
      whitespace-nowrap
    "
  >
    {label}
  </motion.span>
);

/* ─── Category Card ──────────────────────────────────────── */
const CategoryCard = ({ cat }) => {
  const Icon = cat.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -4,
        boxShadow: `0 16px 48px -12px ${cat.accent}22, 0 2px 8px 0 rgba(0,0,0,0.05)`,
      }}
      transition={{ duration: 0.25 }}
      style={{
        borderTop: `3px solid ${cat.accent}`,
      }}
      className="
        relative flex flex-col
        bg-white rounded-2xl border border-gray-100
        p-6 md:p-8
        shadow-sm shadow-gray-100/60
        overflow-hidden
      "
    >
      {/* Soft accent blob — purely decorative */}
      <div
        aria-hidden="true"
        style={{ background: cat.accentBg }}
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-60 pointer-events-none"
      />

      {/* ── Card header ── */}
      <div className="relative z-10 flex items-start gap-4 mb-6">
        {/* Icon badge */}
        <div
          style={{ backgroundColor: cat.accentBg, color: cat.accent }}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
        >
          <Icon />
        </div>

        <div>
          <h3 className="text-[1.05rem] font-extrabold text-gray-900 leading-tight">
            {cat.title}
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5 leading-snug">
            {cat.subtitle}
          </p>
        </div>
      </div>

      {/* ── Skill pills ── */}
      {/*
        flex-wrap on a flex container: pills wrap onto new lines cleanly.
        No overflow because each pill has whitespace-nowrap but the container
        itself can grow to full card width. Works on 320px screens.
      */}
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="relative z-10 flex flex-wrap gap-2"
      >
        {cat.skills.map((skill) => (
          <SkillPill key={skill} label={skill} accent={cat.accent} />
        ))}
      </motion.div>

      {/* Pill count badge — bottom-right corner */}
      <div className="relative z-10 mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: cat.accent }}
        >
          {cat.title.split(' ')[0]}
        </span>
        <span className="text-[11px] font-semibold text-gray-400">
          {cat.skills.length} skills
        </span>
      </div>
    </motion.article>
  );
};

/* ─── Section Header ─────────────────────────────────────── */
const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-12"
  >
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">
      <span className="w-6 h-px bg-indigo-400 inline-block" />
      What I Work With
      <span className="w-6 h-px bg-indigo-400 inline-block" />
    </span>
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
      Technical <span className="text-indigo-600">Expertise</span>
    </h2>
    <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
      A focused stack refined across real-world MERN projects, e-commerce platforms,
      and developer training programs.
    </p>
  </motion.div>
);

/* ─── Skills Section ─────────────────────────────────────── */
const Skills = () => (
  <section id="skills" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
    {/* Dot-grid texture */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.5,
      }}
    />
    {/* Soft accent blobs */}
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 w-[420px] h-[300px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-x-1/3 translate-y-1/4"
    />
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-50 rounded-full blur-3xl opacity-40 pointer-events-none translate-x-1/4 -translate-y-1/4"
    />

    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
      <SectionHeader />

      {/*
        Grid layout:
        - Mobile (default):  1 column, cards stack vertically
        - md (≥ 768px):      2 columns, 2 cards per row
        The gap-6 / md:gap-8 keeps spacing comfortable without overflow.
      */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;