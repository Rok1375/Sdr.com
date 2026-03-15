'use client';

import React, { useCallback, useEffect, useRef } from 'react';

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
  const hoverCapableRef = useRef(true);

  const resetCharacters = useCallback(() => {
    charsRef.current.forEach((charSpan) => {
      if (!charSpan) return;
      charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
    });
  }, [minWeight, minWidth]);

  const revealFromCenter = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };

    charsRef.current.forEach((charSpan, idx) => {
      if (!charSpan) return;

      // Mobile/tablet fallback: lightweight center-origin burst so touch users
      // get responsive feedback without continuous proximity calculations.
      const pos = charPositionsRef.current[idx] ?? center;
      const distance = Math.hypot(pos.x - center.x, pos.y - center.y);
      const delay = Math.min(140, distance * 0.7);

      window.setTimeout(() => {
        charSpan.style.fontVariationSettings = `"wght" ${maxWeight}, "wdth" ${Math.min(maxWidth, minWidth + 35)}`;

        window.setTimeout(() => {
          charSpan.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}`;
        }, 130);
      }, delay);
    });
  }, [maxWeight, maxWidth, minWeight, minWidth]);

  const applyProximityEffect = useCallback(() => {
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
  }, [maxWeight, maxWidth, minWeight, minWidth, radius]);

  const updateCharPositions = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateCharPositions();

    const resizeObserver = new ResizeObserver(() => {
      updateCharPositions();
    });
    resizeObserver.observe(container);

    const hoverMediaQuery = window.matchMedia('(hover: hover)');
    const updateHoverCapability = () => {
      hoverCapableRef.current = hoverMediaQuery.matches;
    };
    updateHoverCapability();

    const scheduleProximityEffect = () => {
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        applyProximityEffect();
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Fine-pointer + hover only: keep the expensive per-character distortion
      // for mouse/trackpad users where hover feedback is expected.
      if (!hoverCapableRef.current || e.pointerType === 'touch') return;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      scheduleProximityEffect();
    };

    const handlePointerLeave = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      resetCharacters();
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Coarse pointer fallback: on tap/pen contact, run a quick center-origin
      // reveal so interaction still feels responsive without hover dependency.
      if (hoverCapableRef.current && e.pointerType === 'mouse') return;
      revealFromCenter();
    };

    const handleFocus = () => {
      // Keyboard fallback: focus gets the same lightweight reveal treatment.
      if (hoverCapableRef.current) return;
      revealFromCenter();
    };

    hoverMediaQuery.addEventListener('change', updateHoverCapability);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('focus', handleFocus);

    return () => {
      resizeObserver.disconnect();
      hoverMediaQuery.removeEventListener('change', updateHoverCapability);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('focus', handleFocus);
    };
  }, [applyProximityEffect, resetCharacters, revealFromCenter, updateCharPositions, text]);

  let charIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap ${className}`}
      tabIndex={0}
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
