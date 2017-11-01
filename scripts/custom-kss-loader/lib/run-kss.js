'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
// var kssConfig = require('./kss-config');

module.exports = function (inputSource, options, callback) {
  var args = [];

  args.push('./node_modules/.bin/kss');

  if (typeof options.title === 'string') {
    args.push(`--title="${options.title}"`);
  }

  if (options.mask) {
    args.push(`--mask="${options.mask}"`);
  }

  if (options.markup) {
    args.push(`--markup=${options.markup}`);
  }

  if (options['nav-depth']) {
    args.push(`--nav-depth=${options['nav-depth']}`);
  }

  if (options.placeholder) {
    args.push(`--placeholder="${options.placeholder}"`);
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

  if (options.extend) {
    args.push(`--extend="${options.extend}"`);
  }

  if (options.custom) {
    args.push(`--custom="${options.custom}"`);
  }

  if (options.homepage) {
    args.push(`--homepage="${options.homepage}"`);
  }

  if (options.css) {
    args.push(`--css="${options.css}"`);
  }

  if (options.js) {
    args.push(`--js=${options.js}`);
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
