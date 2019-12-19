export const Scroll = {

  listeners: new Map(),

  register (name, cb) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, cb);
    }

    return this.bind('add');
  },

  unregister (name) {
    this.listeners.delete(name);

    if (!this.listeners.size) {
      this.bind('remove');
    }
  },

  bind (name) {
    window[`${name}EventListener`]('scroll', this.onScroll.bind(this), { passive: true });
  },

  onScroll (evt) {
    let i = this.listeners.size;
    const listeners = [...this.listeners.values()];

    while (i--) {
      listeners[i](evt);
    }
  }
};