import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-12 relative z-10 border-t border-slate-300 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-xl text-slate-900 tracking-widest mb-1">
              SBU CODING CLUB
            </h3>
            <p className="font-mono text-xs text-cyan-700 tracking-[0.2em] mb-4 uppercase">
              Sarala Birla University
            </p>
            <p className="font-display font-bold text-slate-500 text-sm tracking-widest">
              CODE QUEST 2026
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['HOME', 'CHALLENGE', 'ROUNDS', 'REWARDS'].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs text-slate-600 hover:text-cyan-700 tracking-widest transition-colors"
              >
                {link}
              </a>
            ))}
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScLg4aYaY0ZNRAkMZuxod1Ekxc-Jq9iu8HuS2gAB9dCtL3muQ/viewform"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#b026ff] hover:text-cyan-700 tracking-widest transition-colors"
            >
              REGISTER
            </a>
          </div>
          
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-8"></div>
        
        <div className="text-center font-mono text-[10px] text-gray-600 tracking-widest flex flex-col gap-2">
          <span>Built with ❤️ by Riddhi(2500374)</span>
          <span>© 2026 SBU CODING CLUB. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
