import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Custom cursor rendered at root level so it overlays everything */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans"
          >
            <Header />

            <AnimatePresence mode="wait">
              <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Contact />
              </main>
            </AnimatePresence>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;