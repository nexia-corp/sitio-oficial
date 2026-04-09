'use client';

import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export function CustomCursor() {
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const delayedPositionRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (innerCursorRef.current) {
        innerCursorRef.current.style.left = `${e.clientX}px`;
        innerCursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateOuterCursor = () => {
      const { x, y } = positionRef.current;
      const { x: delayedX, y: delayedY } = delayedPositionRef.current;

      const dx = x - delayedX;
      const dy = y - delayedY;

      delayedPositionRef.current = {
        x: delayedX + dx * 0.2,
        y: delayedY + dy * 0.2,
      };

      if (outerCursorRef.current) {
        outerCursorRef.current.style.left = `${delayedPositionRef.current.x}px`;
        outerCursorRef.current.style.top = `${delayedPositionRef.current.y}px`;
      }

      requestAnimationFrame(animateOuterCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animateOuterCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Inner white dot */}
      <div
        ref={innerCursorRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Outer blue ring */}
      <div
        ref={outerCursorRef}
        className="fixed w-8 h-8 border border-nexia-blue rounded-full pointer-events-none z-50"
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(0, 87, 255, 0.6)',
        }}
      />
    </>
  );
}
