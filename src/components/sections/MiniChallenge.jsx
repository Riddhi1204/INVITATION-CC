import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MiniChallenge = () => {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect

  const handleSelect = (option) => {
    setSelected(option);
    if (option === 'C') {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <section className="w-full py-24 relative z-10 bg-black/60 backdrop-blur-md border-y border-[#00f0ff]/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-3xl font-bold text-white mb-2">
          CAN YOU SOLVE THIS?
        </h2>
        <p className="font-mono text-sm text-gray-400 tracking-widest mb-12 uppercase">
          {'>'} CHALLENGE_001
        </p>

        <div className="text-left glass-panel border border-gray-700 rounded-lg overflow-hidden max-w-2xl mx-auto shadow-2xl">
          <div className="bg-[#111] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
            <span className="font-mono text-xs text-gray-500">main.cpp</span>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm md:text-base text-gray-300 bg-[#0a0a0a]">
            <p className="mb-4 text-gray-500">// What will be the output?</p>
            <p><span className="text-[#b026ff]">int</span> x = <span className="text-[#00f0ff]">5</span>;</p>
            <p>cout {'<<'} ++x * <span className="text-[#00f0ff]">2</span>;</p>
          </div>
          
          <div className="p-6 bg-[#151515] grid grid-cols-2 gap-4">
            {['A', 'B', 'C', 'D'].map((opt, idx) => {
              const values = { 'A': '10', 'B': '11', 'C': '12', 'D': '15' };
              const isSelected = selected === opt;
              let btnClass = "border-gray-700 text-gray-400 hover:border-[#00f0ff] hover:text-[#00f0ff]";
              
              if (isSelected) {
                btnClass = status === 'correct' 
                  ? "border-[#39ff14] text-[#39ff14] bg-[#39ff14]/10" 
                  : "border-red-500 text-red-500 bg-red-500/10";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={status === 'correct'}
                  className={`font-mono text-sm px-4 py-3 border rounded-sm transition-all text-left flex justify-between ${btnClass}`}
                >
                  <span>{opt}.</span>
                  <span>{values[opt]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-8 min-h-[100px]">
          {status === 'correct' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="font-mono text-xl text-[#39ff14] text-glow font-bold mb-2">ACCESS GRANTED ✓</div>
              <p className="text-gray-400 font-sans mb-6">You might belong in the arena.</p>
              <a 
                href="https://forms.gle/KA6GjgxhLLSptk8k7" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-8 py-3 border border-[#00f0ff] text-[#00f0ff] font-mono text-sm tracking-widest hover:bg-[#00f0ff] hover:text-black transition-colors rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                [ ENTER THE QUEST → ]
              </a>
            </motion.div>
          )}

          {status === 'incorrect' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="font-mono text-xl text-red-500 font-bold mb-2">ACCESS DENIED</div>
              <p className="text-gray-400 font-sans">Keep practicing. The real challenge awaits.</p>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

export default MiniChallenge;
