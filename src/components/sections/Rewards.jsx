import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const Rewards = () => {
  return (
    <section id="rewards" className="w-full py-24 relative z-10 bg-white/40 border-y border-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-16">
          RECOGNITION AWAITS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-10 rounded-xl border border-slate-300 hover:border-[#b026ff]/50 transition-all hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] flex flex-col items-center group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b026ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Trophy size={48} className="text-[#b026ff] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">TOP 3</h3>
            <h4 className="font-sans text-sm text-slate-600 mb-6 uppercase tracking-wider">WINNERS</h4>
            <div className="mt-auto px-6 py-2 bg-white/5 border border-white/10 rounded-sm font-mono text-cyan-800 text-sm tracking-widest group-hover:bg-[#00f0ff]/10 group-hover:border-[#00f0ff]/30 transition-colors">
              TROPHIES
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-10 rounded-xl border border-slate-300 hover:border-[#00f0ff]/50 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col items-center group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Medal size={48} className="text-[#00f0ff] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">TOP 5</h3>
            <h4 className="font-sans text-sm text-slate-600 mb-6 uppercase tracking-wider">WINNERS</h4>
            <div className="mt-auto px-6 py-2 bg-white/5 border border-white/10 rounded-sm font-mono text-slate-900 text-sm tracking-widest group-hover:bg-white/10 transition-colors">
              CERTIFICATES
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-10 rounded-xl border border-slate-300 hover:border-[#39ff14]/30 transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col items-center group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39ff14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Award size={48} className="text-slate-600 group-hover:text-[#39ff14] mb-6 group-hover:scale-110 transition-all duration-500" />
            <h3 className="font-display text-xl font-bold text-slate-900 mb-1">ALL</h3>
            <h4 className="font-sans text-sm text-slate-600 mb-6 uppercase tracking-wider">PARTICIPANTS</h4>
            <div className="mt-auto px-6 py-2 bg-white/5 border border-white/10 rounded-sm font-mono text-slate-700 text-sm tracking-widest group-hover:text-[#39ff14] transition-colors">
              E-CERTIFICATES
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
