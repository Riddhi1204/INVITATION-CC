import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'home', href: '#home' },
    { name: 'challenge', href: '#challenge' },
    { name: 'rounds', href: '#rounds' },
    { name: 'protocol', href: '#protocol' },
    { name: 'rewards', href: '#rewards' },
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
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b border-[#00f0ff]/20 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.05)]' : 'bg-white/50 backdrop-blur-md'
        }`}
      >
        <div className="w-full flex justify-between items-stretch pr-4 md:pr-6 h-14">
          
          {/* Logo / Explorer Tab */}
          <div className="flex items-center gap-3 px-6 border-r border-[#00f0ff]/10 bg-[#00f0ff]/[0.02]">
            <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
            <div className="flex flex-col justify-center">
              <span className="font-mono font-bold text-xs tracking-wider text-slate-900">
                CODE_QUEST
              </span>
              <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase mt-0.5">
                WORKSPACE
              </span>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <div className="hidden md:flex items-stretch h-full">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.href)}
                className="h-full px-5 border-r border-[#00f0ff]/10 font-mono text-[11px] tracking-widest text-slate-600 hover:text-slate-900 hover:bg-[#00f0ff]/5 transition-colors relative group flex items-center"
              >
                <span className="text-[#00f0ff] mr-1.5 opacity-60 group-hover:opacity-100">&lt;/&gt;</span> {link.name}.tsx
                
                {/* Active/Hover Bottom Indicator */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(0,240,255,0.8)]"></span>
              </button>
            ))}
            
            <div className="flex items-center ml-6">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScLg4aYaY0ZNRAkMZuxod1Ekxc-Jq9iu8HuS2gAB9dCtL3muQ/viewform" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-1.5 border border-[#00f0ff]/30 text-cyan-700 font-mono text-[10px] tracking-widest hover:bg-[#00f0ff]/10 hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-300 flex items-center gap-2 rounded-sm"
              >
                <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full shadow-[0_0_5px_rgba(57,255,20,0.8)]"></span>
                RUN_QUEST
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-[#00f0ff] flex items-center justify-center pl-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center pt-20">
          <div className="flex flex-col items-center gap-6 w-full px-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollTo(link.href)}
                className="font-mono text-xl tracking-widest text-slate-700 hover:text-[#00f0ff] transition-colors w-full border-b border-slate-300 pb-4 text-center flex justify-center items-center gap-3"
              >
                <span className="text-[#00f0ff] opacity-60">&lt;/&gt;</span> {link.name}.tsx
              </button>
            ))}
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScLg4aYaY0ZNRAkMZuxod1Ekxc-Jq9iu8HuS2gAB9dCtL3muQ/viewform" 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 w-full text-center px-8 py-4 border border-[#00f0ff] text-cyan-800 font-mono text-sm tracking-widest bg-[#00f0ff]/5 rounded-sm flex justify-center items-center gap-3"
            >
              <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.8)]"></span>
              RUN_QUEST.exe
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
