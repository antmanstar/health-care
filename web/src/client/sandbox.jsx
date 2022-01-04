import React from 'react';
import { render } from 'react-dom';
import Sandbox from '../components/Sandbox';

const rootEl = document.getElementById('app');

render(<Sandbox />, rootEl);

if (module.hot) {
  module.hot.accept();
}
