'use client';

import { useEffect, useRef } from 'react';

export default function CyberGrid() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      background: '#050505',
      perspective: '1000px',
      overflow: 'hidden'
    }}>
      {/* Grid Floor */}
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        left: '-50%',
        width: '200%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(0, 243, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 243, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        transform: 'rotateX(60deg)',
        animation: 'gridMove 20s linear infinite',
        opacity: 0.2
      }} />

      {/* Ceiling Grid */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(255, 0, 60, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 60, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transform: 'rotateX(-60deg)',
        animation: 'gridMove 30s linear infinite reverse',
        opacity: 0.15
      }} />

      {/* Styles for animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(40px); }
        }
      `}</style>

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, transparent 0%, #050505 90%)'
      }} />
    </div>
  );
}
