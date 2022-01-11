const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const clientConfig = env => ({
  devtool: 'source-map',
  entry: {
    index: './src/client/index',
    'style-guide': './src/client/style-guide',
    sandbox: './src/client/sandbox'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://scudevehg.azurewebsites.net/',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        use: [
          {
            loader: 'url-loader?name=[name].[ext]'
          }
        ],
        type: 'javascript/auto'
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      chunks: ['index'],
      filename: 'index.html',
      template: './src/templates/markup/husk-wds-rendered.html',
      favicon: './assets/favicon.ico'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      chunks: ['style-guide'],
      filename: 'style-guide.html',
      template: './src/templates/markup/husk-wds-rendered.html',
      favicon: './assets/favicon.ico'
    }),
    new HtmlWebPackPlugin({
      hash: true,
      chunks: ['sandbox'],
      filename: 'sandbox.html',
      template: './src/templates/markup/husk-wds-rendered.html',
      favicon: './assets/favicon.ico'
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new webpack.DefinePlugin({
      __isSSR__: !env.dev || env.ssr ? 'true' : 'false'
    }),
    new webpack.DefinePlugin({
      __evryAPIURL__: env.dev ? `''` : `'${process.env.EVRY_API_URL}'`
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
});

const serverConfig = env =>
  env.ssr
    ? {
        mode: 'development',
        entry: './src/server/index',
        target: 'node',
        externals: [nodeExternals()],
        output: {
          path: __dirname,
          filename: 'server.bundle.js',
          publicPath: '/'
        },
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-react',
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          node: '8.11.0'
                        }
                      }
                    ]
                  ]
                }
              }
            }
          ]
        },
        node: {
          // set this (faux) global to value correct for the location of
          // the compiled file
          __dirname: false
        },
        plugins: [
          new webpack.DefinePlugin({
            __isBrowser__: 'false'
          })
        ],
        resolve: {
          extensions: ['.js', '.jsx']
        }
      }
    : null;

module.exports = env => [clientConfig(env), serverConfig(env)].filter(config => config != null);
