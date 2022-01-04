import React from 'react';
import { render } from 'react-dom';
import StyleGuide from '../components/StyleGuide';

const rootEl = document.getElementById('app');

render(<StyleGuide />, rootEl);

if (module.hot) {
  module.hot.accept();
}
