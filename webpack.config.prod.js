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
  }
}

const config = {
  entry: {
    stylabilla: ['./src/index']
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [loaders.css, loaders.postcss, loaders.sass]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: 'file-loader?name=assets/fonts/[name].[ext]&publicPath=/'
      },
      {
        test: /\.(gif|png|jpg|svg|)$/,
        use: 'file-loader?name=assets/images/[name].[ext]&publicPath=/'
      }
    ]
  },

  output: {
    filename: '[name].css',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new WebpackCleanupPlugin()
  ],

  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  }
}

module.exports = config
