# Stylabilla

## What is Stylabilla for?
Stylabilla is the CSS-only living styleguide for the [Usabilla](http://www.usabilla.com) product (both public facing widgets and the customer application), that implements our design styleguide ([sketch file](https://drive.google.com/drive/folders/0B6skUBevTtRIZ1l0eTlmMzVOWmM?usp=sharing), [invision file](https://invis.io/Y2C9FUS6Z)).

It is [inspired by Stripe's approach](http://www.youtube.com/watch?feature=player_embedded&v=NHpSmJrEvRQ).

## Contributing to Stylabilla
Stylabilla is "internal open source", meaning that we welcome contributions from anyone working at Usabilla. See [CONTRIBUTING.md](https://github.com/usabilla/stylabilla/blob/master/CONTRIBUTING.md) for details on how to contribute. Most importantly, note that we use [semantic-release](https://github.com/semantic-release/semantic-release) and therefore any commits with the type "feat" or "fix" or have "BREAKING CHANGE" in the message will automatically release a new version to NPM.

The project is under development and changing all the time and we don't recommend using it in your own projects if you don't work at Usabilla, but it may give you some ideas for your own living styleguide.

## Using Stylabilla

### Via CDN
Useful for ULab or internal projects or anywhere you want to quickly include Stylabilla.

Include the following `link` in your page. Remember to update the version number to the latest release, which is:

<a href="https://badge.fury.io/js/%40usabilla%2Fstylabilla"><img src="https://badge.fury.io/js/%40usabilla%2Fstylabilla.svg" alt="npm version" height="18"></a>

```HTML
<link rel="stylesheet" href="https://static.usabilla.com/stylabilla/v1.5.0/stylabilla.css"/>
```

### Via Yarn/NPM and Webpack
Larger frontend projects at Usabilla will want to install Stylabilla as a package so that it can be compiled and minified with any other project specific CSS.

```
yarn add @usabilla/stylabilla
```

Make sure webpack correctly packages Stylabilla by editing your `scss/css` and `woff/woff2`  webpack configuration rules to have the `exclude` property and the `url-loader` as follows:

```JavaScript
{
  test: /\.(css|scss)$/,
  exclude: {
    test: /node_modules/,
    exclude: /stylabilla/
  },
  use: ['style-loader', 'css-loader'],
},
{
  test: /\.(woff|woff2)$/,
  exclude: {
    test: /node_modules/,
    exclude: /stylabilla/
  },
  loader: 'url-loader?name=assets/fonts/[name].[ext]',
}
```

You can then include the css and fonts in your application with:
```
import '@usabilla/stylabilla';
```
Run `yarn upgrade @usabilla/stylabilla` while it is under heavy development to keep up to date.

It can also be useful to link to your local version of Stylabilla while you are working on both repos. Run `yarn link` in Stylabilla, and `yarn link @usabilla/stylabilla` in your project.

### Updating

Stylabilla follows [semantic versioning](http://semver.org). You should be able to update patch and minor versions without requiring any changes to your code.
