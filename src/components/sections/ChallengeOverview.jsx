import React from 'react';
import { motion } from 'framer-motion';

const ChallengeOverview = () => {
  const cards = [
    {
      num: "01",
      title: "THINK",
      desc: "Sharpen your logical reasoning."
    },
    {
      num: "02",
      title: "SOLVE",
      desc: "Tackle challenging problems."
    },
    {
      num: "03",
      title: "CODE",
      desc: "Put your programming skills to work."
    },
    {
      num: "04",
      title: "COMPETE",
      desc: "Challenge yourself against fellow coders."
    }
  ];

  return (
    <section id="challenge" className="w-full py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            THE CHALLENGE
          </h2>
          <p className="font-sans text-slate-600 max-w-2xl text-lg leading-relaxed border-l-2 border-[#00f0ff]/50 pl-4">
            Code Quest is designed to test how fast you can think, how accurately you can reason, and how effectively you can solve programming problems under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-lg border border-slate-300 hover:border-[#00f0ff]/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,240,255,0.1)]"
            >
              <div className="font-mono text-3xl text-[#39ff14]/30 font-bold mb-4 group-hover:text-[#39ff14] transition-colors">
                {card.num}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 tracking-wide">
                {card.title}
              </h3>
              <p className="font-sans text-slate-600 text-sm">
                {card.desc}
              </p>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-[#00f0ff] transition-colors m-3"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengeOverview;
