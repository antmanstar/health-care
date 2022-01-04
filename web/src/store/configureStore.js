import { interfaces, store } from '@evry-member-app/shared';

const { evry } = interfaces.apis;
const { configureStore } = store;

/* eslint-disable no-underscore-dangle */
let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */
if (
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production' ||
  reduxDevTools === undefined
) {
  reduxDevTools = a => a;
}

evry.init({
  baseURL: __evryAPIURL__
})

export default (history, preloadedState) => configureStore(history, preloadedState, reduxDevTools);
