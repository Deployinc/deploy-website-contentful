export const preloadSingle = src =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve();
    image.src = src;
  });

export const preloadMulti = media =>
  Promise.all(
    media.map(preloadSingle)
  );

