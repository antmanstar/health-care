# Evry's Member Web Portal App
## Installation/Set-up

To get up and running, one simply needs to run `npm install` from within the repo's root directory to initialize this set-up. However, if you're wanting to see/understand how this repository, in its current state, came to be, here are the steps you can use to install the Node.js modules used by this project manually:

1. Install nodenv. (Instructions in its [GitHub repo's README](https://github.com/nodenv/nodenv#installation).)
2. `$ nodenv install`: Picks up the version indicated by `.node-version`.
3. `$ npm init`: Use the `npm init` prompts to create and fill in the (currently bare) `package.json` file.
4. `$ npm install react react-dom styled-components --save`: Install the top-level React framework module, the React DOM package (to render our root component at/within a specific DOM node), and the Styled Components library, for cohabiting styles with the components they "dress up."
5. `$ npm install webpack webpack-cli webpack-dev-server http-server html-webpack-plugin extract-text-webpack-plugin@next --save-dev`: Build into our `package.json`'s `devDependencies` Webpack and the things it needs to run a React site, incl. utilities for hot-reloaded test environment.
6. `$ npm install @babel/core @babel/preset-env @babel/preset-react babel-loader babel-plugin-styled-components --save-dev --save-dev`: Get Babel for our `devDependencies` and all _it_ needs to transpile React's JSX into ES5 JS (as well as special handling for Styled Components as well).
7. `$ git clone https://github.com/paulolramos/eslint-prettier-airbnb-react.git <directory-of-your-choosing> && <directory-of-your-choosing>/eslint-prettier-airbnb-react/eslint-prettier-config.sh`: This is where we work _smarter_ instead of harder and use [pauloramos](https://github.com/paulolramos)'s handy [eslint-prettier-airbnb-react](https://github.com/paulolramos/eslint-prettier-airbnb-react) to install for us the many packages and plugins needed for a linting set-up which uses Prettier for code formatting and Airbnb's ESLint style guide/rules (a stricter brand than others', like Google's). This command sets up initial values for `.eslintrc.json` and `.prettierrc`; no need to create them in the steps that follow.
8. `$ npm install stylelint stylelint-processor-styled-components stylelint-config-styled-components stylelint-config-recommended --save-dev`: Save the needed pieces to get style linting generally set up, and get the specific plugins and configs needed for Styled Components.
9. Create a `.node-version` file with the `8.11.0` as its only data.
10. Create a `.babelrc` file with the following for its contents:
  ```
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```
11. Create a webpack.config.js file, and populate it with the following:
  ```
  const path = require('path');
  const HtmlWebPackPlugin = require('html-webpack-plugin');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

  module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'index_bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        hash: true,
        filename: 'index.html', //target html
        template: './src/public/index.html' //source html
      }),
      new ExtractTextPlugin({ filename: 'css/style.css' })
    ]
  };
  ```
12. Add the following lines to your `package.json`'s `scripts`:
  ```
  "start": "node_modules/.bin/webpack-dev-server --mode development --open --hot",
  "build": "node_modules/.bin/webpack --config webpack.prod.js --mode production",
  "serve": "node_modules/.bin/http-server ./dist",
  "lint:css": "stylelint './src/**/*.js'"
  ```
13. Setting up now completed, run `npm start` to boot the development server and begin coding.
