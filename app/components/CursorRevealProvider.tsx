'use client';

import { useEffect } from 'react';

export function CursorRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;

    const updatePointerVars = (x: number, y: number) => {
      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerVars(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      updatePointerVars(window.innerWidth / 2, window.innerHeight / 2);
    };

    updatePointerVars(window.innerWidth / 2, window.innerHeight / 2);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <>{children}</>;
}
