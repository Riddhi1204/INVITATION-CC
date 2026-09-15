import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
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
  }, []);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center mix-blend-screen"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 12),
          y: mousePosition.y - (isHovering ? 20 : 12),
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        style={{ width: isHovering ? 40 : 24, height: isHovering ? 40 : 24 }}
      >
        <div className={`relative flex items-center justify-between font-mono font-light transition-all duration-300 text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] w-full h-full`}>
          <span className={`transform transition-transform ${isHovering ? '-translate-x-1 scale-125 text-[#00f0ff]' : 'translate-x-0'} `}>&lt;</span>
          <span className={`transform transition-transform ${isHovering ? 'translate-x-1 scale-125 text-[#00f0ff]' : 'translate-x-0'} `}>&gt;</span>
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
