import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Sept 21, 2026, 09:00 AM IST
    // IST is UTC+5:30 -> 09:00 IST is 03:30 UTC
    const targetDate = new Date('2026-09-21T03:30:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsStarted(false);
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <section className="w-full py-16 border-y border-[#00f0ff]/10 relative overflow-hidden bg-black/20 backdrop-blur-sm z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h3 className="font-mono text-sm tracking-[0.3em] text-[#b026ff] mb-8">
          {isStarted ? "// STATUS" : "// THE QUEST BEGINS IN"}
        </h3>
        
        {isStarted ? (
          <div className="font-display font-bold text-4xl md:text-6xl text-[#39ff14] text-glow animate-pulse">
            THE QUEST HAS BEGUN ⚡
          </div>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8 lg:gap-12">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HRS', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="font-display text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 relative group">
                  {/* Subtle highlight */}
                  <div className="absolute inset-0 bg-[#00f0ff] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <span className="relative z-10">{formatNumber(unit.value)}</span>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-[#00f0ff] tracking-widest uppercase">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Countdown;
