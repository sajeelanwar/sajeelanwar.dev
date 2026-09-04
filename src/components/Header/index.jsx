import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const NAV_LINKS = [
  { name: 'Home',     href: '#home'     },
  { name: 'About',    href: '#about'    },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills',   href: '#skills'   },
  { name: 'Contact',  href: '#contact'  },
];

const Header = () => {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeLink,      setActiveLink]      = useState('#home');

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers  = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm shadow-gray-100/60'
            : 'bg-transparent py-5'}
        `}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* ── Logo ── */}
          <motion.a
            href="#home"
            onClick={() => handleNavClick('#home')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 select-none"
            aria-label="Go to top"
          >
            {/* Icon mark */}
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-200">
              S
            </span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Sajeel<span className="text-indigo-600">.</span>
            </span>
          </motion.a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeLink === link.href;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -1 }}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200
                    ${isActive
                      ? 'text-indigo-700 bg-indigo-50'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'}
                  `}
                >
                  {link.name}
                  {/* Active underline dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                    />
                  )}
                </motion.a>
              );
            })}

            {/* CTA button */}
            <motion.a
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 18px rgba(67,56,202,0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="ml-3 px-5 py-2 bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 transition-shadow"
            >
              Hire Me
            </motion.a>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-700 shadow-sm hover:border-indigo-200 hover:text-indigo-700 transition-all z-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-4 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/60 overflow-hidden"
            >
              <nav className="flex flex-col p-3 gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = activeLink === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors
                        ${isActive
                          ? 'text-indigo-700 bg-indigo-50'
                          : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/60'}
                      `}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      )}
                      {link.name}
                    </a>
                  );
                })}
                <div className="mt-2 pt-3 border-t border-gray-100 px-1 pb-1">
                  <a
                    href="#contact"
                    onClick={() => handleNavClick('#contact')}
                    className="block w-full text-center py-3 bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-100"
                  >
                    Hire Me
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;