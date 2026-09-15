import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InvitationContent = ({ isCut }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const detailsRef = useRef(null);
  const footerRef = useRef(null);

  const welcomeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const eventNameRef = useRef(null);

  useEffect(() => {
    if (isCut) {
      // Optional: Gentle ambient tone for the formal reveal
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(528, audioCtx.currentTime); // Relaxing, premium tone
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 10);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 10);
      } catch (err) {
        console.log("Audio synthesis failed", err);
      }

      const tl = gsap.timeline();
      
      gsap.set(containerRef.current, { visibility: 'visible' });
      gsap.set(cardRef.current, { opacity: 0, scale: 0.95, y: 30, display: 'none' });

      // 1. Welcome Sequence
      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 1.5 })
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, "+=0.8")
        .to(eventNameRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, "+=0.5")
        
        // Hold for reading (2.5s) then fade out
        .to(welcomeRef.current, { opacity: 0, y: -20, duration: 1.5, ease: 'power2.inOut' }, "+=2.5")
        
        // Hide welcome text entirely and display main card structure
        .set(welcomeRef.current, { display: 'none' })
        .set(cardRef.current, { display: 'flex' }) // It has flex-col class

        // 2. Main Card Entrance
        .fromTo(cardRef.current,
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(headingRef.current, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(detailsRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(footerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );

      // Subtle floating animation for the card
      gsap.to(cardRef.current, {
        y: "-=10",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 11 // Starts floating only after the full sequence
      });
    }
  }, [isCut]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isCut ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ visibility: isCut ? 'visible' : 'hidden' }}
    >
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-[120px] -z-10 pointer-events-none transition-all duration-[3000ms]" />

      {/* Ceremonial Welcome Message */}
      <div ref={welcomeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-10 z-30 pointer-events-none gap-8">
        
        <div ref={line1Ref} className="flex flex-col items-center gap-3 opacity-0 translate-y-4">
          <p className="text-sm text-gray-400 tracking-widest font-inter uppercase">
            Respected
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-lg md:text-xl font-medium text-white/95 font-inter">
            <span>Director General, Prof. Gopal Pathak</span>
            <span className="hidden md:block text-gray-600">|</span>
            <span>Vice Chancellor, Prof. C. Jeganathan</span>
          </div>
        </div>

        <p ref={line2Ref} className="text-gray-300 font-inter text-sm md:text-base font-light tracking-wide max-w-md opacity-0 translate-y-4">
          you are cordially invited to inaugurate
        </p>

        <h2 ref={eventNameRef} className="flex flex-col items-center gap-2 opacity-0 scale-95">
          <span className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-md">
            SBU CODING CHALLENGE
          </span>
          <span className="text-lg md:text-2xl font-medium text-cyan-50/80 drop-shadow-sm tracking-wide mt-2">
            PROBLEM SOLVING EDITION
          </span>
        </h2>
      </div>

      {/* Main Invitation Card Content */}
      <div 
        ref={cardRef} 
        style={{ display: 'none' }}
        className="max-w-2xl w-full mx-4 p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex-col items-center justify-center text-center text-white relative overflow-hidden group"
      >
        {/* Inner subtle glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div ref={headingRef} className="relative z-10 w-full flex flex-col items-center gap-2 mb-10">
          <p className="text-cyan-300/80 font-inter text-xs md:text-sm tracking-widest uppercase mb-2">You are cordially invited to</p>
          <h1 className="text-3xl md:text-5xl font-poppins font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-sm leading-tight">
            SBU CODING CHALLENGE
          </h1>
          <p className="text-base md:text-lg font-medium text-cyan-50/80 tracking-widest mt-1 uppercase">Problem Solving Edition</p>
        </div>

        {/* Minimal Details Row */}
        <div ref={detailsRef} className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-12 text-sm md:text-base text-gray-300 font-inter relative z-10 mb-12">
          <span className="flex flex-col items-center gap-1">
            <span className="text-cyan-400 text-xl">📅</span>
            <span>18 April 2026, 9:00 AM</span>
          </span>
          <span className="flex flex-col items-center gap-1">
            <span className="text-purple-400 text-xl">📍</span>
            <span>A2 303/304</span>
          </span>
        </div>

        {/* Action Button & Footer Minimalized */}
        <div ref={footerRef} className="flex flex-col items-center relative z-10 w-full gap-5">
          <a 
            href="https://forms.gle/KA6GjgxhLLSptk8k7" 
            target="_blank" 
            rel="noreferrer"
            className="px-10 py-3 text-base md:text-lg font-medium text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 pointer-events-auto backdrop-blur-sm"
          >
            Register Now
          </a>
          <p className="font-poppins font-medium tracking-[0.2em] text-gray-500 text-xs mt-2 uppercase">
            Think. Code. Innovate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationContent;

