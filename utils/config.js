const env = 'development';

const config = {
  development: {
    api: 'http://192.168.0.101:3000',
  },
}[env];

export default config;
