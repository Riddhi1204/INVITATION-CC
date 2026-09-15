import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'CHALLENGE', href: '#challenge' },
    { name: 'ROUNDS', href: '#rounds' },
    { name: 'PROTOCOL', href: '#protocol' },
    { name: 'REWARDS', href: '#rewards' },
  ];

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'glass-panel border-b border-[#00f0ff]/20 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo / Branding */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse"></span>
              CODE QUEST
            </span>
            <span className="font-mono text-[10px] text-[#00f0ff]/60 tracking-widest uppercase">
              SBU Coding Club
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xs tracking-widest text-gray-400 hover:text-[#00f0ff] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#00f0ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <a 
              href="https://forms.gle/KA6GjgxhLLSptk8k7" 
              target="_blank" 
              rel="noreferrer"
              className="ml-4 px-6 py-2 border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-xs tracking-widest hover:bg-[#00f0ff]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 rounded-sm flex items-center gap-2"
            >
              [ ENTER THE QUEST <span className="text-[#b026ff]">→</span> ]
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[#00f0ff]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#050816]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20">
          <div className="flex flex-col items-center gap-8 w-full px-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.href)}
                className="font-display text-2xl tracking-widest text-white hover:text-[#00f0ff] transition-colors w-full border-b border-white/5 pb-4 text-center"
              >
                {link.name}
              </button>
            ))}
            <a 
              href="https://forms.gle/KA6GjgxhLLSptk8k7" 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 w-full text-center px-8 py-4 border border-[#00f0ff] text-[#00f0ff] font-mono text-sm tracking-widest bg-[#00f0ff]/5 rounded-sm"
            >
              ENTER THE QUEST →
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
