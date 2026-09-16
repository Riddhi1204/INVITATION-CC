import React from 'react';
import { motion } from 'framer-motion';

const Protocol = () => {
  const steps = [
    { num: '01', title: 'CHECK-IN' },
    { num: '02', title: 'ROUND 01', subtitle: 'MCQ CODING ROUND' },
    { num: '03', title: 'QUALIFICATION' },
    { num: '04', title: 'ROUND 02', subtitle: 'PROBLEM-SOLVING ROUND' },
    { num: '05', title: 'RESULTS' },
    { num: '06', title: 'RECOGNITION' },
  ];

  return (
    <section id="protocol" className="w-full py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-16 text-center">
          EVENT PROTOCOL
        </h2>

        <div className="relative border-l border-slate-300 ml-4 md:ml-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-12 pl-8 relative group"
            >
              {/* Timeline Node */}
              <div className="absolute w-3 h-3 bg-gray-800 rounded-full -left-[6.5px] top-1.5 group-hover:bg-[#00f0ff] transition-colors shadow-[0_0_10px_rgba(0,240,255,0)] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
              
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#b026ff] tracking-widest mb-1">{step.num}</span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#00f0ff] transition-colors">{step.title}</h3>
                {step.subtitle && (
                  <span className="font-sans text-sm text-slate-600 mt-1">{step.subtitle}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Protocol;
