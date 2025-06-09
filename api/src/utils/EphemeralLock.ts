/*
This class creates named mutexes using promises for async communication among
consumers waiting on locks. Locks are created on-demand and automatically
cleaned up when no longer needed.
*/
class EphemeralLock {
  private locked: boolean = false;
  private queue: (() => void)[] = [];
  private static namedLocks: Map<string, EphemeralLock> = new Map();

  // Private constructor to prevent direct instantiation
  private constructor() {}

  private async acquire(): Promise<void> {
    return new Promise<void>(resolve => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  private release(onEmpty?: () => void): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) {
        next();
      }
    } else {
      this.locked = false;
      if (onEmpty) {
        onEmpty();
      }
    }
  }

  // Main public interface - static method for named lock operations
  static async withLock<T>(name: string, fn: () => Promise<T>): Promise<T> {
    // Create lock if it doesn't exist. This stateful lock object is only
    // instantiated within this function; never publically exposed.
    if (!this.namedLocks.has(name)) {
      this.namedLocks.set(name, new EphemeralLock());
    }

    const mutex = this.namedLocks.get(name)!;
    await mutex.acquire();

    try {
      return await fn();
    } finally {
      mutex.release(() => {
        // Remove the named lock if queue is empty. This way the locks clean up
        // after themselves.
        if (mutex.queue.length === 0) {
          this.namedLocks.delete(name);
        }
      });
    }
  }
}

export default EphemeralLock;
