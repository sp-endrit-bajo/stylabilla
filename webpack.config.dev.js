const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
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
  kss: {
    loader: 'kss-loader',
    options: {
      config: 'kss-config.json'
    }
  }
}

const config = {
  entry: {
    kss: './docs-builder/kss-assets/kss'
  },

  devServer: {
    contentBase: './docs',
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
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', loaders.css, loaders.postcss, loaders.sass, loaders.kss]
      },
      {
        test: /\.(ttf|eot|woff|woff2|gif|png|jpg|svg)$/,
        use: 'file-loader'
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: 'kss-assets',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({ configBasedir: path.resolve(__dirname, 'node_modules') }),
    new WebpackCleanupPlugin()
  ],

  resolve: {
    extensions: ['.js', '.scss'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  }
}

module.exports = config
