import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIsMobile } from './use-mobile';

// Utility to mock window.matchMedia
function mockMatchMedia(matches: boolean) {
  let changeListener: ((e: any) => void) | null = null;

  const mql = {
    matches,
    media: '',
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn((event, listener) => {
      if (event === 'change') {
        changeListener = listener;
      }
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === 'change' && changeListener === listener) {
        changeListener = null;
      }
    }),
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => mql),
  });

  return {
    mql,
    triggerChange: () => {
      if (changeListener) {
        act(() => {
          changeListener({ matches: !matches }); // Simulate a change
        });
      }
    }
  };
}

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return undefined initially and then true if window.innerWidth < 768', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    mockMatchMedia(true);

    const { result } = renderHook(() => useIsMobile());

    // Initially, it's a synchronous update so it returns boolean right away.
    expect(result.current).toBe(true);
  });

  it('should return false if window.innerWidth >= 768', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should update value when resize crosses breakpoint', () => {
    // Start with desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    const { mql, triggerChange } = mockMatchMedia(false);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Resize to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    act(() => {
      triggerChange();
    });

    expect(result.current).toBe(true);
  });

  it('should clean up event listener on unmount', () => {
    const { mql } = mockMatchMedia(true);
    const { unmount } = renderHook(() => useIsMobile());

    expect(mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
