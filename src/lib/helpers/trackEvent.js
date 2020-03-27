export const trackCustomEvent = (eventOptions) => {
  if (typeof window !== "undefined" && window.ga) {
    window.ga('send', 'event', eventOptions.category, eventOptions.action, eventOptions.label, eventOptions.value);
  }
}
