import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkOutlined, CloseOutlined } from '@ant-design/icons';
import { FiArrowUpRight } from 'react-icons/fi';

/* ─── Project Data ───────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Seeraht LMS',
    tagline: 'LEARNING MANAGEMENT SYSTEM',
    description:
      'Engineering the complete technical foundation for a scalable Learning Management System. Currently in active development.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary', 'Tailwind CSS', 'Ant Design'],
    accent: '#4338ca',
    accentLight: '#eef2ff',
    icon: '🎓',
    liveDemo: 'in-progress',
    className: 'lg:col-span-2',
  },
  {
    id: 2,
    title: 'Restaurant Management Platform',
    tagline: 'FOOD TECH & E-COMMERCE',
    description:
      'Developed a full-stack web application tailored for fast-food restaurants in Pakistan, managing menus, orders, and image assets efficiently.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary', 'Tailwind CSS', 'Ant Design'],
    accent: '#0891b2',
    accentLight: '#ecfeff',
    icon: '🍔',
    liveDemo: 'https://restaurent-app-olive.vercel.app/',
    className: 'lg:col-span-1',
  },
  {
    id: 3,
    title: 'Seeraht Educational Ecosystem',
    tagline: 'INSTITUTE MULTI-PLATFORM',
    description:
      'Official digital platform for an educational organization handling school systems, book e-commerce, and course registrations (Islamic & MERN stack).',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS', 'Ant Design'],
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    icon: '🏫',
    liveDemo: 'https://seeraht.com/',
    className: 'lg:col-span-1',
  },
  {
    id: 4,
    title: 'Advanced Task Manager',
    tagline: 'PRODUCTIVITY · CRUD',
    description:
      'A robust productivity application demonstrating complex state management, full CRUD operations, and responsive UI principles.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Tailwind CSS', 'Ant Design'],
    accent: '#059669',
    accentLight: '#ecfdf5',
    icon: '✅',
    liveDemo: null,
    className: 'lg:col-span-2',
  },
];

/* ─── Tag colour map — inline styles avoid Tailwind/AntD clash ─ */
const TAG_COLORS = {
  'MongoDB':      { bg: '#f0fdf4', text: '#166534' },
  'Express':      { bg: '#fafafa', text: '#525252' },
  'React':        { bg: '#eff6ff', text: '#1d4ed8' },
  'Node.js':      { bg: '#f0fdf4', text: '#15803d' },
  'Cloudinary':   { bg: '#fefce8', text: '#92400e' },
  'Tailwind CSS': { bg: '#eff6ff', text: '#0369a1' },
  'Ant Design':   { bg: '#fff7ed', text: '#c2410c' },
};
const tagStyle = (tag) => TAG_COLORS[tag] || { bg: '#f3f4f6', text: '#374151' };

/* ─── Variants ───────────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Tag Pill ───────────────────────────────────────────── */
const TagPill = ({ tag }) => {
  const { bg, text } = tagStyle(tag);
  return (
    <span
      style={{ backgroundColor: bg, color: text }}
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border border-black/[0.06]"
    >
      {tag}
    </span>
  );
};

/* ─── Live Demo Footer — three states ───────────────────── */
const DemoFooter = ({ project }) => {
  if (!project.liveDemo) return null;

  if (project.liveDemo === 'in-progress') {
    return (
      <div className="mt-auto pt-5 border-t border-gray-100">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 cursor-default select-none">
          🚧 In Development
        </span>
      </div>
    );
  }

  return (
    <div className="mt-auto pt-5 border-t border-gray-100">
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        aria-label={`Live demo for ${project.title}`}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all duration-200"
      >
        <LinkOutlined className="text-[13px]" />
        Live Demo
      </a>
    </div>
  );
};

/* ─── Project Card ───────────────────────────────────────── */
const ProjectCard = ({ project, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderTop: `3px solid ${hovered ? project.accent : 'transparent'}`,
        boxShadow: hovered
          ? `0 16px 48px -12px ${project.accent}28, 0 2px 8px 0 rgba(0,0,0,0.06)`
          : '0 1px 4px 0 rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease, border-color 0.25s ease',
      }}
      className={`
        relative flex flex-col bg-white rounded-2xl border border-gray-100
        overflow-hidden ${project.className}
      `}
    >
      {/* Hover accent blob */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.3 }}
        style={{ background: project.accentLight }}
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
      />

      {/* ── Card body ── */}
      <div className="relative z-10 flex flex-col flex-1 p-7">

        {/* Header row: icon + title + arrow */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              style={{ backgroundColor: project.accentLight }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            >
              {project.icon}
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] font-bold uppercase tracking-widest truncate"
                style={{ color: project.accent }}
              >
                {project.tagline}
              </p>
              <h3 className="text-[1.05rem] font-extrabold text-gray-900 leading-snug">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Arrow — animates on hover */}
          <motion.button
            onClick={() => onSelect(project)}
            aria-label={`View details for ${project.title}`}
            animate={{ x: hovered ? 1 : 0, y: hovered ? -1 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            style={{ color: project.accent }}
            className="flex-shrink-0 mt-0.5 text-xl p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <FiArrowUpRight />
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>

        {/* ── Footer — conditional liveDemo states ── */}
        <DemoFooter project={project} />
      </div>
    </motion.article>
  );
};

/* ─── Modal ──────────────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.94, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto shadow-2xl border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal header strip */}
      <div
        className="flex items-center justify-between px-7 py-5 border-b border-gray-100"
        style={{ borderTop: `4px solid ${project.accent}` }}
      >
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: project.accentLight }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          >
            {project.icon}
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.tagline}
            </p>
            <h3 className="text-xl font-extrabold text-gray-900">{project.title}</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
        >
          <CloseOutlined />
        </button>
      </div>

      {/* Modal body */}
      <div className="px-7 py-6 space-y-5">
        <p className="text-gray-600 text-[0.95rem] leading-relaxed">{project.description}</p>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2.5">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Modal footer — same three-state liveDemo logic */}
        {project.liveDemo && (
          <div className="flex gap-2.5 pt-1">
            {project.liveDemo === 'in-progress' ? (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200 cursor-default select-none">
                🚧 In Development
              </span>
            ) : (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: project.accent }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
              >
                <LinkOutlined /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

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
      Selected Work
      <span className="w-6 h-px bg-indigo-400 inline-block" />
    </span>
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
      Projects I&apos;ve Built
    </h2>
    <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
      Real-world MERN stack applications — each solving a concrete problem with scalable
      architecture and clean, maintainable code.
    </p>
  </motion.div>
);

/* ─── Main Section ───────────────────────────────────────── */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />
      {/* Soft indigo blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-x-1/3 -translate-y-1/4" />

      <div className="container mx-auto relative z-10">
        <SectionHeader />

        {/*
          Bento grid layout:
          ┌────────────────────┬──────────┐  lg (3-col)
          │  Seeraht LMS (×2)  │ E-Comm   │
          ├──────────┬─────────┴──────────┤
          │  Seeraht │  Task Manager (×2) │
          └──────────┴────────────────────┘

          md (2-col): all cards span 1 col, natural wrap
          sm (1-col): all stack
        */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;