const env = 'prod';

const config = {
  dev: {
    api: 'http://192.168.0.101:3000',
  },
  prod: {
    api: 'https://todoappmanager.herokuapp.com',
  },
}[env];

export default config;
