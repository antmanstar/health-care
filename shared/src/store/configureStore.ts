import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import rootSaga from './sagas';
import { loadState, saveState } from './localStorage';
import { History, MemoryHistory } from 'history';
import selectors from './selectors';

function createSaveState(storeState) {
  return { 
    user: {
      auth: {
        auth_token: selectors.getToken(storeState)
      }
    }
  }
}

export default function configureStore(history: History | MemoryHistory, preloadedState, ...middlewares: Array<() => void>) {
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
    saveState(createSaveState(store.getState()));
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