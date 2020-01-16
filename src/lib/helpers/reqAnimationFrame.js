import window from '@constants/window';

const requestAnimationFrame = window && window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const cancelAnimationFrame = window && window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame;

export const reqAnimationFrame = fn => fn && requestAnimationFrame(fn);
export const cancelAnimation = id => id && cancelAnimationFrame(id);