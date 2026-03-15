'use client';

import React, { useEffect, useRef } from 'react';
import { pointerLoop } from '@/lib/pointerLoop';

interface PressureTextProps {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  radius?: number;
}

const PRESSURE_BUCKETS = 6;

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
  const charBucketRef = useRef<number[]>([]);
  const containerRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateContainerRect = () => {
      containerRectRef.current = container.getBoundingClientRect();
    };

    const updateCharPositions = () => {
      updateContainerRect();
      const containerRect = containerRectRef.current;
      if (!containerRect) return;

      charPositionsRef.current = charsRef.current.map((charSpan) => {
        if (!charSpan) return { x: 0, y: 0 };
        const rect = charSpan.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });
    };

    const resetBuckets = () => {
      charBucketRef.current = charsRef.current.map(() => 0);
      charsRef.current.forEach((charSpan) => {
        charSpan?.style.setProperty('--pressure-bucket', '0');
      });
    };

    const updatePressure = ({ x, y }: { x: number; y: number }) => {
      const containerRect = containerRectRef.current;
      if (!containerRect) return;

      const relMouseX = x - containerRect.left;
      const relMouseY = y - containerRect.top;

      charPositionsRef.current.forEach((pos, idx) => {
        const charSpan = charsRef.current[idx];
        if (!charSpan) return;

        const dx = relMouseX - pos.x;
        const dy = relMouseY - pos.y;
        const distance = Math.hypot(dx, dy);
        const effect = distance < radius ? 1 - distance / radius : 0;
        const bucket = Math.round(effect * PRESSURE_BUCKETS);

        if (charBucketRef.current[idx] !== bucket) {
          charBucketRef.current[idx] = bucket;
          charSpan.style.setProperty('--pressure-bucket', bucket.toString());
        }
      });
    };

    updateCharPositions();
    resetBuckets();

    const resizeObserver = new ResizeObserver(() => {
      updateCharPositions();
    });

    resizeObserver.observe(container);

    const handleInvalidate = () => {
      updateCharPositions();
    };

    window.addEventListener('resize', handleInvalidate, { passive: true });
    window.addEventListener('scroll', handleInvalidate, { passive: true });

    const handlePointerLeave = () => {
      resetBuckets();
    };

    container.addEventListener('pointerleave', handlePointerLeave);

    let unsubscribePointer: (() => void) | null = null;

    if (!reduceMotion) {
      unsubscribePointer = pointerLoop.subscribe(updatePressure);
    }

    const fonts = document.fonts;
    const onFontsDone = () => {
      updateCharPositions();
    };

    if (fonts) {
      fonts.ready.then(onFontsDone);
      fonts.addEventListener('loadingdone', onFontsDone);
    }

    return () => {
      resizeObserver.disconnect();
      if (fonts) {
        fonts.removeEventListener('loadingdone', onFontsDone);
      }
      window.removeEventListener('resize', handleInvalidate);
      window.removeEventListener('scroll', handleInvalidate);
      container.removeEventListener('pointerleave', handlePointerLeave);
      unsubscribePointer?.();
    };
  }, [radius, text]);

  let charIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap ${className}`}
      style={
        {
          fontFamily: 'var(--font-roboto-flex), sans-serif',
          '--pressure-min-weight': minWeight,
          '--pressure-max-weight': maxWeight,
          '--pressure-min-width': minWidth,
          '--pressure-max-width': maxWidth,
          '--pressure-buckets': PRESSURE_BUCKETS,
        } as React.CSSProperties
      }
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
                className="pressure-char inline-block"
                style={{ '--pressure-bucket': 0 } as React.CSSProperties}
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
