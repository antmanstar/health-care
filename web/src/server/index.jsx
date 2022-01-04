import express from 'express';
import proxy from 'http-proxy-middleware';
import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import configureStore from '../store/configureStore';
import Root from '../components/Root';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static('./assets'));

console.log('test TEST test');

global.navigator = Object.assign(global.navigator || {}, {
  userAgent: 'all'
});

console.log('navigator: ', navigator);

app.use(
  '/api',
  proxy({
    target: 'https://apidev.evryhealth.com/',
    secure: false,
    logLevel: 'debug',
    changeOrigin: true
  })
);

app.get('/*', (req, res) => {
  global.navigator = Object.assign(global.navigator || {}, {
    userAgent: req.headers['user-agent']
  });
  console.trace('something different');
  const store = configureStore();
  const sheet = new ServerStyleSheet();
  const renderedRoot = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Root />
        </StaticRouter>
      </Provider>
    )
  );
  const styleTags = sheet.getStyleTags();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(renderedRoot, styleTags));
});

app.listen(process.env.PORT || 8080);

function htmlTemplate(bodyMarkup, headMarkup) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Evry Health</title>
        ${headMarkup}
      </head>

      <body>
        <div id="app">${bodyMarkup}</div>
        <script src="/index.bundle.js"></script>
      </body>
    </html>
  `;
}
