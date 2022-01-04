const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const { readFileSync } = require('fs');

const markup = readFileSync(path.join(__dirname, '../templates/markup/husk-client-rendered.html')).toString();

const app = express();

app.use('/assets', express.static(path.join(__dirname, '../../assets')));
app.use(express.static(path.join(__dirname, '../../dist')));

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
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(markup);
});

app.listen(process.env.PORT || 8080);
