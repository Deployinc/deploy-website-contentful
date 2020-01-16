const url = {
  production: 'https://deployinc.com',
  local: 'http://deploy2019.local',
  development: 'https://dev-website.deployinc.com',
  none: ''
};

export const HOST = url[process.env.NODE_ENV];
