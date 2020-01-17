const url = {
  production: 'https://netdev.deployinc.com',
  // development: 'https://netdev.deployinc.com',
  development: 'http://localhost:34567',
};

export const HOST = url[process.env.NODE_ENV];
