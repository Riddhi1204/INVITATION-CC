import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Use motion values for smoother, decoupled animation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configuration for the subtle trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch devices to fallback to native touch behavior
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Expand and change style when hovering interactive elements
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          // Center the cursor exactly on the pointer coordinate
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      >
        <div 
          className="relative flex items-center justify-center font-mono transition-all duration-300"
          style={{ width: isHovering ? 48 : 32, height: isHovering ? 48 : 32 }}
        >
          {/* Subtle trail/glow behind the cursor */}
          <div className={`absolute inset-0 rounded-full blur-md bg-[#00f0ff] transition-opacity duration-300 ${isHovering ? 'opacity-40' : 'opacity-20'}`}></div>
          
          {/* Angular Brackets */}
          <div className="relative w-full h-full flex items-center justify-between z-10 text-xl font-light text-slate-900 drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]">
            <span className={`transform transition-all duration-300 ${isHovering ? '-translate-x-1 text-[#00f0ff]' : 'translate-x-1'}`}>&lt;</span>
            <span className={`transform transition-all duration-300 ${isHovering ? 'translate-x-1 text-[#00f0ff]' : '-translate-x-1'}`}>&gt;</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
