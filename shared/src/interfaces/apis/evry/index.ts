import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import * as app from './app';
import * as user from './user';

export default {
  ...app,
  ...user
};

let instance: AxiosInstance;

const init = (config: AxiosRequestConfig) => {
  instance = axios.create(config);
};

export { instance as axios, app, init, user };

