import React from 'react';
import { motion } from 'framer-motion';

const WhoShouldEnter = () => {
  const types = [
    { title: "BEGINNERS", desc: "Test your fundamentals." },
    { title: "CODERS", desc: "Put your programming skills to work." },
    { title: "PROBLEM SOLVERS", desc: "Challenge your logical thinking." },
    { title: "COMPETITIVE PROGRAMMERS", desc: "Race against the clock." }
  ];

  return (
    <section className="w-full py-24 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-16">
          WHO'S READY?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {types.map((type, idx) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 border border-gray-800 rounded-sm bg-[#050816]/50 hover:bg-[#00f0ff]/5 hover:border-[#00f0ff]/30 transition-colors group"
            >
              <h3 className="font-mono text-[#b026ff] text-sm tracking-widest font-bold mb-3 group-hover:text-[#00f0ff] transition-colors">{type.title}</h3>
              <p className="font-sans text-gray-400 text-sm">{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldEnter;
