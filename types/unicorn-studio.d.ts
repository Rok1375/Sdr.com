export {};

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
    };
  }
}
