"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageZoomProps {
  src: string;
  alt: string;
}

export function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage position
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setPosition({ x, y });
    setCursorPos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full overflow-hidden cursor-crosshair"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-opacity duration-300 ${isZoomed ? "opacity-0" : "opacity-100"}`}
      />

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundSize: "250%", // Zoom level
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Optional lens effect or just full container zoom */}
            <div 
              className="absolute h-40 w-40 border-2 border-[var(--theme-accent-primary)] rounded-full shadow-2xl pointer-events-none"
              style={{
                left: cursorPos.x - 80,
                top: cursorPos.y - 80,
                backgroundImage: `url(${src})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                backgroundSize: "600%", // Higher zoom for the lens
                backgroundRepeat: "no-repeat",
                display: "none", // Hide the lens for now, full container zoom is often cleaner
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zoom Hint Icon */}
      <div className="absolute bottom-4 right-4 z-20 rounded-full bg-black/40 p-2 backdrop-blur-md opacity-60 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
    </div>
  );
}
