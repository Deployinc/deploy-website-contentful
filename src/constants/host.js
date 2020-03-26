const url = {
  production: 'https://deployinc.com',
  development: 'https://deploy-dev.netlify.com/',
  local: 'http://localhost:34567',
};

export const HOST = url[process.env.NODE_ENV];
