const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
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
          browsers: ['last 2 versions']
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
  kss: {
    loader: 'kss-loader',
    options: {
      config: 'kss-config.json'
    }
  }
}

const config = {
  entry: {
    stylabilla: './src/index'
  },

  devServer: {
    contentBase: './build/stylabilla',
    inline: true,
    hot: true,
    port: 8080
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', loaders.css, loaders.sass]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: [loaders.kss]
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/build'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackCleanupPlugin()
  ],

  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  }
}

module.exports = config
