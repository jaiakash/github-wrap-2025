'use client';

import { motion } from 'framer-motion';

export default function AuroraOrbs() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      background: '#000',
      overflow: 'hidden'
    }}>
      {/* Orb 1: Emerald */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      
      {/* Orb 2: Violet */}
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />

      {/* Orb 3: Cyan */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
