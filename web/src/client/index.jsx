import '@babel/polyfill';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from '../components/Root';
import configureStore from '../store/configureStore';
import history from '../utils/history';
import { HelmetProvider, Helmet } from 'react-helmet-async';


const rootEl = document.getElementById('app');
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(history, preloadedState);

const title = history.location.pathname
  .replace('/', '')
  .replaceAll('-', ' ')
  .replaceAll(/^(.)|\s+(.)/g, c => c.toUpperCase());

const rootComponent = (
  <Provider store={store}>
    <Router history={history}>
      <HelmetProvider>
        <Helmet>
          <title>{title} - Evry Health</title>
        </Helmet>
        <Root store={store} />
      </HelmetProvider>
    </Router>
  </Provider>
);

if (__isSSR__) {
  hydrate(rootComponent, rootEl);
} else {
  render(rootComponent, rootEl);
}

if (module.hot) {
  module.hot.accept();
}
