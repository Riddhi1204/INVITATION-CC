import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EventDetails = () => {
  return (
    <section className="w-full py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-slate-300 rounded-lg hover:border-[#00f0ff]/30 transition-colors bg-white/40"
          >
            <Calendar className="text-cyan-700 mb-4" size={32} />
            <h3 className="font-mono text-sm tracking-widest text-slate-500 mb-2 uppercase">Date</h3>
            <p className="font-display font-bold text-xl text-slate-900">21 SEPTEMBER 2026</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center p-8 border border-slate-300 rounded-lg hover:border-[#00f0ff]/30 transition-colors bg-white/40"
          >
            <Clock className="text-cyan-700 mb-4" size={32} />
            <h3 className="font-mono text-sm tracking-widest text-slate-500 mb-2 uppercase">Time</h3>
            <p className="font-display font-bold text-xl text-slate-900">09:00 AM ONWARDS</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center p-8 border border-slate-300 rounded-lg hover:border-[#00f0ff]/30 transition-colors bg-white/40"
          >
            <MapPin className="text-cyan-700 mb-4" size={32} />
            <h3 className="font-mono text-sm tracking-widest text-slate-500 mb-2 uppercase">Venue</h3>
            <p className="font-display font-bold text-lg text-slate-900 leading-tight">UNIVERSITY COMPUTER LAB<br/><span className="text-slate-600">AI-ML LAB — A2-304</span></p>
          </motion.div>
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel border border-[#00f0ff]/20 p-8 md:p-12 rounded-xl text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          
          <h2 className="font-mono text-sm tracking-[0.3em] text-cyan-700 mb-4">MISSION LOCATION</h2>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-2">UNIVERSITY COMPUTER LAB</h3>
          <p className="font-sans text-slate-600 mb-8">AI-ML LAB — A2-304</p>
          
          {/* If there was a real map link, it would go here. Preserving standard UI. */}
          <button className="px-6 py-2 border border-white/20 text-slate-900 font-mono text-sm tracking-widest hover:bg-white hover:text-black transition-colors rounded-sm">
            [ LOCATION CONFIRMED ]
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
