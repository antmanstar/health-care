import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import rootSaga from './sagas';
import { loadState, saveState } from './localStorage';
import { History, MemoryHistory } from 'history';


const configureStore = (history: History | MemoryHistory, preloadedState, ...middlewares: Array<() => void>) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      history
    }
  });

  const store = createStore(
    combineReducers(reducers),
    preloadedState || loadState(),
    compose(
      applyMiddleware(sagaMiddleware),
      ...middlewares
    )
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  sagaMiddleware.run(rootSaga);
  /*
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }
  */

  return store;
};

export default configureStore;
