export interface PointerSnapshot {
  x: number;
  y: number;
}

type PointerSubscriber = (snapshot: PointerSnapshot) => void;

class PointerLoop {
  private subscribers = new Set<PointerSubscriber>();
  private latestSnapshot: PointerSnapshot | null = null;
  private rafId: number | null = null;
  private listening = false;

  private readonly onPointerMove = (event: PointerEvent) => {
    this.latestSnapshot = { x: event.clientX, y: event.clientY };
    this.requestTick();
  };

  subscribe(subscriber: PointerSubscriber) {
    this.subscribers.add(subscriber);
    this.ensureListening();

    return () => {
      this.subscribers.delete(subscriber);
      if (this.subscribers.size === 0) {
        this.stop();
      }
    };
  }

  private requestTick() {
    if (this.rafId !== null) {
      return;
    }

    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = null;
      if (!this.latestSnapshot) {
        return;
      }

      this.subscribers.forEach((subscriber) => {
        subscriber(this.latestSnapshot as PointerSnapshot);
      });
    });
  }

  private ensureListening() {
    if (this.listening || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.listening = true;
  }

  private stop() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.listening) {
      window.removeEventListener('pointermove', this.onPointerMove);
      this.listening = false;
    }

    this.latestSnapshot = null;
  }
}

export const pointerLoop = new PointerLoop();
