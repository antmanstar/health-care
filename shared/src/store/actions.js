import { AnyAction } from 'redux';

import * as app from './app/actions';
import * as user from './user/actions';

export default {
  ...app,
  ...user
};

export { app, user };
