const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const path = require('path')

const loaders = {
  css: {
    loader: 'css-loader',
    options: {
      minimize: true
    }
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        autoprefixer({
          browsers: ['last 2 versions', 'ie 9-11']
        })
      ]
    }
  },
  sass: {
    loader: 'sass-loader',
    options: {
      includePaths: [path.resolve(__dirname, './src')]
    }
  },
  // based on https://github.com/design4pro/kss-loader/releases/tag/v0.3.2
  kss: {
    loader: 'custom-kss-loader',
    options: {
      title: "Stylabilla",
      source: "./src",
      destination: "./dist-docs/",
      builder: "./docs-builder",
      homepage: "../README.md"
    }
  },
  file: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }
}

//Webpack configuration for creating production-ready Stylabilla css and assets in the 'dist' folder
const stylabillaConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [loaders.css, loaders.postcss, loaders.sass]
        })
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [loaders.file]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],

  entry: {
    stylabilla: './src/index'
  },

  output: {
    filename: '[name].css',
    path: path.join(__dirname, './dist'),
    publicPath: ''
  }
};

//Webpack configuration for creating production-ready Stylabilla documentation in the 'dist-docs' folder
const docsConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [loaders.css, loaders.postcss, loaders.sass, loaders.kss]
        }),
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  },

  resolveLoader: {
    alias: {
      'custom-kss-loader' : path.join(__dirname, './scripts', 'custom-kss-loader')
    }
  },

  plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin('[name].css')
  ],

  entry: {
    kss: ['babel-polyfill', 'classlist-polyfill', './docs-builder/kss-assets/kss.js']
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist-docs/kss-assets'),
    publicPath: ''
  },
}

module.exports = [stylabillaConfig, docsConfig]
