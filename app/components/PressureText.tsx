'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface PressureTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  radius?: number;
}

interface CharRect {
  centerX: number;
  centerY: number;
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
  const charRectsRef = useRef<CharRect[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  const updateCharRects = useCallback(() => {
    charRectsRef.current = charsRef.current.map((charSpan) => {
      if (!charSpan) return { centerX: 0, centerY: 0 };
      const rect = charSpan.getBoundingClientRect();
      // Store viewport-relative coordinates
      return {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    });
  }, []);

  const updateStyles = useCallback(() => {
    const { x: mouseX, y: mouseY } = mousePosRef.current;

    charsRef.current.forEach((charSpan, index) => {
      if (!charSpan) return;

      const rect = charRectsRef.current[index];
      if (!rect) return;

      const distance = Math.sqrt(
        Math.pow(mouseX - rect.centerX, 2) + Math.pow(mouseY - rect.centerY, 2)
      );

      if (distance < radius) {
        const effect = 1 - distance / radius; // 0 to 1
        const currentWeight = minWeight + (maxWeight - minWeight) * effect;
        const currentWidth = minWidth + (maxWidth - minWidth) * effect;
        charSpan.style.fontVariationSettings = `"wght" ${currentWeight}, "wdth" ${currentWidth}`;
      } else {
        charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
      }
    });
    rafIdRef.current = null;
  }, [minWeight, maxWeight, minWidth, maxWidth, radius]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset weights if they changed
    charsRef.current.forEach((charSpan) => {
      if (!charSpan) return;
      charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
    });

    updateCharRects();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(updateStyles);
      }
    };

    const handleMouseLeave = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      charsRef.current.forEach((charSpan) => {
        if (!charSpan) return;
        charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
      });
    };

    const handleRefresh = () => {
      updateCharRects();
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleRefresh);
    window.addEventListener('scroll', handleRefresh, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('scroll', handleRefresh);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [text, minWeight, maxWeight, minWidth, maxWidth, radius, updateCharRects, updateStyles]);

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
