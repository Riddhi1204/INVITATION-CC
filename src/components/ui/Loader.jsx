import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "INITIALIZING CODE QUEST...",
  "LOADING CODING CLUB...",
  "LOADING CHALLENGES...",
  "LOADING ARENA...",
  "ACCESS GRANTED ✓"
];

const Loader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait a beat before dismissing
      }
    }, 300); // 300ms per line

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] text-[#00f0ff] font-mono p-4"
      >
        <div className="w-full max-w-2xl">
          <div className="terminal-border bg-black/40 p-6 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4 border-b border-[#00f0ff]/30 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs text-[#00f0ff]/60 ml-2">sys_boot.exe</span>
            </div>
            
            <div className="space-y-2 min-h-[150px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line?.includes("GRANTED") ? "text-[#39ff14] text-glow font-bold" : "text-[#00f0ff]/80"}
                >
                  <span className="text-[#b026ff] mr-2">{'>'}</span> {line}
                </motion.div>
              ))}
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-5 bg-[#00f0ff] mt-2"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
