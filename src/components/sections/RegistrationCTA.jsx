import React from 'react';
import { motion } from 'framer-motion';

const RegistrationCTA = () => {
  return (
    <section className="w-full py-32 relative z-10 overflow-hidden">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-50 blur-3xl rounded-full scale-150 transform-gpu animate-[pulse_6s_ease-in-out_infinite]"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">COMPETE?</span>
          </h2>
          
          <p className="font-mono text-lg md:text-xl text-gray-400 tracking-widest uppercase mb-12">
            THE CODE IS WAITING.
          </p>

          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScLg4aYaY0ZNRAkMZuxod1Ekxc-Jq9iu8HuS2gAB9dCtL3muQ/viewform" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] blur opacity-70 group-hover:opacity-100 transition duration-500 rounded-sm"></div>
            <div className="relative px-10 py-5 bg-[#050816] border border-[#00f0ff]/50 rounded-sm">
              <span className="font-mono text-lg tracking-widest text-white font-bold flex items-center gap-3">
                [ ENTER CODE QUEST <span className="text-[#00f0ff] group-hover:translate-x-2 transition-transform">→</span> ]
              </span>
            </div>
          </a>

          <div className="mt-16 flex flex-col items-center">
            <div className="font-mono text-xs tracking-[0.3em] text-gray-500 mb-4">
              SCAN. REGISTER. COMPETE.
            </div>
            {/* Box for QR code if it exists, otherwise just a tech-looking box */}
            <div className="w-32 h-32 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center p-2 relative group hover:border-[#00f0ff]/50 transition-colors">
               <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff]"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f0ff]"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f0ff]"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f0ff]"></div>
               
               <div className="text-gray-600 font-mono text-[10px] text-center">
                 AWAITING<br/>SCAN
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationCTA;
