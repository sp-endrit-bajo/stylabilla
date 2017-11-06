'use strict';

// based on https://github.com/design4pro/kss-loader/releases/tag/v0.3.2
var loaderUtils = require('loader-utils');
var exec = require('child_process').exec;

var runKss = function (inputSource, options, callback) {
  var args = [];

  args.push('./node_modules/.bin/kss');

  if (typeof options.title === 'string') {
    args.push(`--title="${options.title}"`);
  }

  if (options.source) {
    args.push(`--source="${options.source}"`);
  }

  if (options.destination) {
    args.push(`--destination="${options.destination}"`);
  }

  if (options.builder) {
    args.push(`--builder="${options.builder}"`);
  }

  if (options.homepage) {
    args.push(`--homepage="${options.homepage}"`);
  }

  args.push(';');

  exec(args.join(' '), {
    cwd: process.cwd()
  }, function (e, stdout, stderr) {
    if (e instanceof Error) {
      callback(e);
    } else {
      callback(null, {
        source: inputSource
      });
    }
  });
};

module.exports = function (source) {
  var options = Object.assign({}, loaderUtils.getOptions(this), {});

  if (this.cacheable) {
    this.cacheable();
  }

  var callback = this.async();

  runKss(source, options, function (err, result) {
    if (result) {
      callback(null, result.source);
    } else {
      callback(err);
      return;
    }
  });
};
