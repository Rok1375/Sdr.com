🧪 Add tests for `useIsMobile` hook

🎯 **What:** The `useIsMobile` hook lacked test coverage, creating a risk for regressions in responsive behavior.
📊 **Coverage:** The new tests cover the default initial state, mobile viewport (< 768px), desktop viewport (>= 768px), updates triggered by window resize events crossing the breakpoint, and proper cleanup of event listeners on unmount.
✨ **Result:** Test coverage for `hooks/use-mobile.ts` is now 100%, and the project is fully set up with Vitest and React Testing Library for future component and hook testing.
