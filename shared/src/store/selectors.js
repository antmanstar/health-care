import * as app from './app/selectors';
import * as user from './user/selectors';

export default {
  ...app,
  ...user
};

export { app, user };
