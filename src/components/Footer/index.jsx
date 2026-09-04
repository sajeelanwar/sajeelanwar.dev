import React from 'react';
import { motion } from 'framer-motion';
import {
    FaHeart,
    FaGithub,
    FaLinkedinIn,
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaArrowUp,
} from 'react-icons/fa';

/* ─── Static data ────────────────────────────────────────── */
const QUICK_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const CONTACT_ITEMS = [
    {
        icon: FaEnvelope,
        label: 'Email',
        value: 'sajeelanwar.dev@gmail.com',
        href: 'mailto:sajeelanwar.dev@gmail.com',
    },
    {
        icon: FaPhone,
        label: 'Phone',
        value: '+92 301 726 8016',
        href: 'https://wa.me/923017268016',
    },
    {
        icon: FaMapMarkerAlt,
        label: 'Location',
        value: 'Faisalabad, Pakistan',
        href: null,
    },
];

const SOCIAL_LINKS = [
    { icon: FaGithub, href: 'https://github.com/sajeelanwar', label: 'GitHub' },
    { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/sajeel-anwar-69b97124b', label: 'LinkedIn' },
    { icon: FaWhatsapp, href: 'https://wa.me/923017268016', label: 'WhatsApp' },
];

/* ─── Animation helper ───────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Column heading ─────────────────────────────────────── */
const ColHeading = ({ children }) => (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
        {children}
    </h3>
);

/* ─── Footer ─────────────────────────────────────────────── */
const Footer = () => {
    const year = new Date().getFullYear();

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
            {/* Very subtle indigo tint blob — top-left only */}
            <div
                aria-hidden="true"
                className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"
            />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">

                {/* ── Main grid — 1 col mobile / 3 col desktop ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-14 pb-10">

                    {/* ── Col 1: Brand ── */}
                    <motion.div {...fadeUp(0)} className="flex flex-col gap-5">
                        {/* Logo */}
                        <a
                            href="#home"
                            className="flex items-center gap-2 w-fit"
                            aria-label="Back to top"
                        >
                            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-200">
                                S
                            </span>
                            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                                Sajeel<span className="text-indigo-600">.</span>
                            </span>
                        </a>

                        {/* Tagline */}
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[260px]">
                            Full Stack MERN Developer building scalable web architectures and empowering
                            the next generation of developers.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-2.5">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ y: -3, backgroundColor: '#eef2ff', color: '#4338ca', borderColor: '#a5b4fc' }}
                                    whileTap={{ scale: 0.92 }}
                                    className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-base shadow-sm transition-colors"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Col 2: Quick Links ── */}
                    <motion.div {...fadeUp(0.1)}>
                        <ColHeading>Quick Links</ColHeading>
                        <ul className="space-y-2.5">
                            {QUICK_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="group inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
                                    >
                                        {/* Animated indent dot */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-0.5" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ── Col 3: Contact ── */}
                    <motion.div {...fadeUp(0.2)}>
                        <ColHeading>Get In Touch</ColHeading>
                        <ul className="space-y-4">
                            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => {
                                const inner = (
                                    <div className="flex items-start gap-3 group">
                                        {/* Icon */}
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 text-xs flex-shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                                            <Icon />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                                                {label}
                                            </p>
                                            <p className="text-sm text-slate-700 font-medium group-hover:text-indigo-600 transition-colors leading-snug">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                );

                                return (
                                    <li key={label}>
                                        {href ? (
                                            <a
                                                href={href}
                                                target={href.startsWith('http') ? '_blank' : undefined}
                                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            >
                                                {inner}
                                            </a>
                                        ) : (
                                            inner
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="border-t border-gray-100 mt-2 pt-6 pb-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                    {/* Copyright — left on desktop, bottom on mobile */}
                    <p className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-1 text-sm text-slate-500 font-medium">
                        <span className="inline-flex items-center gap-1">
                            Made with <FaHeart className="text-rose-400 text-[11px]" /> by
                            <span className="text-slate-700 font-semibold">Sajeel Anwar</span>
                        </span>
                        <span className="text-gray-300 hidden sm:inline">·</span>
                        <span>© {year} All rights reserved.</span>
                    </p>

                    {/* Scroll-to-top — right on desktop, top on mobile */}
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, backgroundColor: '#e0e7ff', color: '#4338ca' }}
                        whileTap={{ scale: 0.92 }}
                        aria-label="Scroll to top"
                        className="w-10 h-10 rounded-full bg-gray-100 text-indigo-500 flex items-center justify-center shadow-sm transition-colors hover:bg-indigo-100"
                    >
                        <FaArrowUp className="text-sm" />
                    </motion.button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;