const env = 'development';

const config = {
  development: {
    api: 'http://localhost:3000',
  },
}[env];

export default config;
