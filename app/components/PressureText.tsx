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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      charsRef.current.forEach((charSpan) => {
        if (!charSpan) return;

        const rect = charSpan.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2)
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
    };

    const handleMouseLeave = () => {
      charsRef.current.forEach((charSpan) => {
        if (!charSpan) return;
        charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [minWeight, maxWeight, minWidth, maxWidth, radius]);

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
