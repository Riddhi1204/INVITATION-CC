import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalLine = ({ text, delay, isSystem }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className={`font-mono text-xs md:text-sm mb-1 ${isSystem ? 'text-gray-400' : 'text-[#00f0ff]'}`}
  >
    {!isSystem && <span className="text-[#b026ff] mr-2">{'>'}</span>}
    {text}
  </motion.div>
);

const Hero = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-6 bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></div>
            <span className="font-mono text-[10px] text-cyan-800 uppercase tracking-widest">// SYSTEM INITIALIZED</span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-2 tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">CODE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">QUEST</span>
          </h1>
          <div className="text-xl md:text-2xl font-mono text-slate-600 mb-8 tracking-[0.2em]">2026</div>

          <h2 className="font-sans font-bold text-xl md:text-2xl text-slate-900 mb-4 tracking-wide">
            THINK. SOLVE. COMPETE.
          </h2>

          <p className="text-slate-600 max-w-md font-sans leading-relaxed mb-10 text-sm md:text-base border-l-2 border-[#b026ff]/50 pl-4">
            A coding challenge designed to test programming skills, logical thinking, problem-solving ability, and coding speed.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScLg4aYaY0ZNRAkMZuxod1Ekxc-Jq9iu8HuS2gAB9dCtL3muQ/viewform" 
              target="_blank" 
              rel="noreferrer"
              className="relative group overflow-hidden bg-[#00f0ff]/10 border border-[#00f0ff] px-8 py-4 rounded-sm font-mono tracking-widest text-sm text-cyan-800 transition-all hover:bg-[#00f0ff] hover:text-[#050816] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
            >
              <div className="absolute inset-0 w-0 bg-[#00f0ff] transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              <span className="relative z-10 font-bold flex items-center gap-2">
                [ REGISTER FOR THE QUEST <span className="group-hover:translate-x-1 transition-transform">→</span> ]
              </span>
            </a>
            
            <div className="flex flex-col font-mono text-xs text-slate-500 uppercase tracking-widest gap-1 border-l border-slate-300 pl-4">
              <span className="text-slate-700">21 SEPTEMBER 2026</span>
              <span>09:00 AM ONWARDS</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Terminal UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full relative group"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative glass-panel terminal-border rounded-lg overflow-hidden bg-[#0a0a0a]/80 shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="font-mono text-xs text-gray-500">CODE_QUEST.exe</div>
              <div className="w-4"></div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm h-[320px] flex flex-col justify-between bg-black/40">
              <div>
                <TerminalLine text="┌────────────────────────────┐" delay={0.6} isSystem />
                <TerminalLine text="│ CODE_QUEST.exe             │" delay={0.7} isSystem />
                <TerminalLine text="│                            │" delay={0.8} isSystem />
                <TerminalLine text="initialize_player()" delay={1.2} />
                <TerminalLine text="load_challenges()" delay={1.6} />
                <TerminalLine text="test_logic()" delay={2.0} />
                <TerminalLine text="compile_skills()" delay={2.4} />
                <TerminalLine text="prepare_arena()" delay={2.8} />
                <TerminalLine text="│                            │" delay={2.9} isSystem />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2 }}
                  className="font-mono text-xs md:text-sm text-gray-400 mt-2"
                >
                  │ SYSTEM STATUS: <span className="text-[#39ff14] text-glow font-bold">ONLINE ●</span>    │
                </motion.div>
                <TerminalLine text="└────────────────────────────┘" delay={3.3} isSystem />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.8 }}
                  className="mt-4 flex"
                >
                  <span className="text-[#00f0ff] mr-2">root@sbu:~$</span>
                  <span className={`w-2 h-4 bg-gray-400 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
