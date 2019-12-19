export const promisify = (fn, props) =>
  new Promise((resolve, reject) =>
    fn({ ...props, resolve, reject }));
