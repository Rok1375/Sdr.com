'use client';

import React, { useEffect, useRef } from 'react';

interface PressureTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  radius?: number;
}

export const PressureText: React.FC<PressureTextProps> = ({
  text,
  className = '',
  minWeight = 300,
  maxWeight = 900,
  minWidth = 50,
  maxWidth = 150,
  radius = 200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const charPositionsRef = useRef<{ x: number; y: number }[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  const updateCharPositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    charPositionsRef.current = charsRef.current.map((charSpan) => {
      if (!charSpan) return { x: 0, y: 0 };
      const rect = charSpan.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateCharPositions();

    const resizeObserver = new ResizeObserver(() => {
      updateCharPositions();
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const relMouseX = mousePosRef.current.x - containerRect.left;
        const relMouseY = mousePosRef.current.y - containerRect.top;

        charPositionsRef.current.forEach((pos, idx) => {
          const charSpan = charsRef.current[idx];
          if (!charSpan) return;

          const distance = Math.sqrt(
            Math.pow(relMouseX - pos.x, 2) + Math.pow(relMouseY - pos.y, 2)
          );

          if (distance < radius) {
            const effect = 1 - distance / radius;
            const currentWeight = minWeight + (maxWeight - minWeight) * effect;
            const currentWidth = minWidth + (maxWidth - minWidth) * effect;
            charSpan.style.fontVariationSettings = `"wght" ${currentWeight}, "wdth" ${currentWidth}`;
          } else {
            charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
          }
        });
      });
    };

    const handleMouseLeave = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      charsRef.current.forEach((charSpan) => {
        if (!charSpan) return;
        charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      resizeObserver.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [minWeight, maxWeight, minWidth, maxWidth, radius, text]);

  let charIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap ${className}`}
      style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
    >
      {text.split(' ').map((word, wordIndex, arr) => (
        <span key={wordIndex} className={`inline-flex whitespace-nowrap ${wordIndex !== arr.length - 1 ? 'mr-[0.3em]' : ''}`}>
          {word.split('').map((char) => {
            const currentIndex = charIndexCounter++;
            return (
              <span
                key={currentIndex}
                ref={(el) => {
                  charsRef.current[currentIndex] = el;
                }}
                className="inline-block transition-all duration-75 ease-out"
                style={{ fontVariationSettings: `"wght" ${minWeight}, "wdth" ${minWidth}` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};
