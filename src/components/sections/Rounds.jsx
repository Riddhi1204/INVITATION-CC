import React from 'react';
import { motion } from 'framer-motion';

const RoundCard = ({ level, title, subtitle, desc, labels, status }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative group glass-panel rounded-xl overflow-hidden border border-gray-800 hover:border-[#b026ff]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(176,38,255,0.15)] bg-black/40"
  >
    {/* Inner glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#b026ff]/0 to-[#00f0ff]/0 group-hover:from-[#b026ff]/10 group-hover:to-[#00f0ff]/10 transition-colors duration-500 z-0"></div>
    
    <div className="relative z-10 p-8 md:p-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="font-mono text-sm text-[#b026ff] tracking-[0.2em] mb-2">{level}</div>
          <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">{title}</h3>
          <h4 className="font-sans text-[#00f0ff] font-medium tracking-wide">{subtitle}</h4>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 border border-gray-700 rounded-sm bg-gray-900/50">
          <div className={`w-2 h-2 rounded-full ${status === 'UNLOCKED' ? 'bg-[#39ff14] animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest">[{status}]</span>
        </div>
      </div>
      
      <p className="font-sans text-gray-400 max-w-lg mb-10 leading-relaxed border-l border-gray-700 pl-4">
        {desc}
      </p>
      
      <div className="flex flex-wrap gap-3">
        {labels.map(label => (
          <span key={label} className="font-mono text-xs text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-sm group-hover:border-[#00f0ff]/30 transition-colors">
            {label}
          </span>
        ))}
      </div>
    </div>
    
    {/* Decorative circuit lines */}
    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" 
         style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '20px 20px', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}>
    </div>
  </motion.div>
);

const Rounds = () => {
  return (
    <section id="rounds" className="w-full py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-mono text-sm tracking-[0.3em] text-gray-500 mb-4">
            EVENT STRUCTURE
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white">
            TWO LEVELS.<br/><span className="text-[#00f0ff]">ONE QUEST.</span>
          </h3>
        </div>

        <div className="flex flex-col gap-8">
          <RoundCard 
            level="LEVEL 01"
            title="MCQ CODING ROUND"
            subtitle="THE QUALIFIER"
            desc="Test your programming fundamentals, concepts, logic, and output prediction. A fast-paced evaluation to separate the prepared from the rest."
            labels={['LOGIC', 'CONCEPTS', 'OUTPUT', 'SPEED']}
            status="UNLOCKED"
          />
          
          <RoundCard 
            level="LEVEL 02"
            title="PROBLEM-SOLVING ROUND"
            subtitle="THE ARENA"
            desc="Think, code, debug, and solve problems under competition pressure. The ultimate test of algorithms and optimization."
            labels={['ALGORITHMS', 'LOGIC', 'OPTIMIZATION', 'TIME']}
            status="NEXT CHALLENGE"
          />
        </div>
      </div>
    </section>
  );
};

export default Rounds;
