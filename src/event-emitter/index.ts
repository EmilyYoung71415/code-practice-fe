interface Listener {
  (...args: any[]): void;
}

export class EventEmitter {
  private _eventsMap: Map<string, Listener[]> = new Map();

  on(name: string, cb: Listener) {
    if (!this._eventsMap.get(name)) {
      this._eventsMap.set(name, []);
    }
    this._eventsMap.get(name)?.push(cb);
  }

  off(name: string, listener: Listener) {
    const listeners = this._eventsMap.get(name);
    if (listeners) {
      const index = listeners.findIndex(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
        if (listeners.length === 0) {
          this._eventsMap.delete(name);
        }
      }
    }
  }

  emit(event: string, ...args: any[]) {
    const listeners = this._eventsMap.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
  }

  once(name: string, listener: Listener) {
    // 这里设计的不错，又是一个代理wrap的思维
    const onceListener: Listener = (...args: any[]) => {
      this.off(name, onceListener);
      listener.apply(this, args);
    };
    this.on(name, onceListener);
  }
}
