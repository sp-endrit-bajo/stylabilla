var kss = require('./kss.scss');
var stylabilla = require('../../src/index.scss');
var scrollspy = require('./scrollspy.js');
var prettify = require('./prettify.js');
var fullscreen = require('./kss-fullscreen.js');
var guides = require('./kss-guides.js');
var markup = require('./kss-markup.js');
var logo = require('./logo.svg');

(function() {
  var KssStateGenerator;

  KssStateGenerator = (function() {
    var pseudo_selectors;

    pseudo_selectors = ['hover', 'enabled', 'disabled', 'active', 'visited', 'focus', 'target', 'checked', 'empty', 'first-of-type', 'last-of-type', 'first-child', 'last-child'];

    function KssStateGenerator() {
      var idx, idxs, pseudos, replaceRule, rule, stylesheet, _i, _len, _len2, _ref, _ref2;
      pseudos = new RegExp("(\\:" + (pseudo_selectors.join('|\\:')) + ")", "g");
      try {
        _ref = document.styleSheets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          stylesheet = _ref[_i];
          if (stylesheet.href && stylesheet.href.indexOf(document.domain) >= 0) {
            idxs = [];
            _ref2 = stylesheet.cssRules;
            for (idx = 0, _len2 = _ref2.length; idx < _len2; idx++) {
              rule = _ref2[idx];
              if ((rule.type === CSSRule.STYLE_RULE) && pseudos.test(rule.selectorText)) {
                replaceRule = function(matched, stuff) {
                  return matched.replace(/\:/g, '.pseudo-class-');
                };
                this.insertRule(rule.cssText.replace(pseudos, replaceRule));
              }
              pseudos.lastIndex = 0;
            }
          }
        }
      } catch (_error) {}
    }

    KssStateGenerator.prototype.insertRule = function(rule) {
      var headEl, styleEl;
      headEl = document.getElementsByTagName('head')[0];
      styleEl = document.createElement('style');
      styleEl.type = 'text/css';
      if (styleEl.styleSheet) {
        styleEl.styleSheet.cssText = rule;
      } else {
        styleEl.appendChild(document.createTextNode(rule));
      }
      return headEl.appendChild(styleEl);
    };

    return KssStateGenerator;

  })();

  new KssStateGenerator;

}).call(this);


(function() {
  var hash = window.location.hash;

    if (!hash) {
      document.getElementById('kss-node').classList.add('kss-parent');
    } else {
      document.getElementById('kss-node').classList.remove('kss-parent');

        var sections = Array.from(document.getElementsByClassName('kss-section'));

        sections.forEach(function(section) {
            var sectionId = '#' + section.id;

            console.log('sectionnn', sectionId, hash, hash.includes(sectionId));

            if (!sectionId.includes(hash)) {
                console.log('bex', section.id)

                document.getElementById(section.id).style.display = "none";
            }
        });

    }


    window.onhashchange = function() {

        if (!window.location.hash) {
            document.getElementById('kss-node').classList.add('kss-parent');
        } else {
            document.getElementById('kss-node').classList.remove('kss-parent');

            var sections = Array.from(document.getElementsByClassName('kss-section'));

            sections.forEach(function(section) {
                var sectionId = '#' + section.id;

                console.log('sectionnn', sectionId, window.location.hash, window.location.hash.includes(sectionId));

                if (!sectionId.includes(window.location.hash)) {
                    console.log('bex', section.id)

                    document.getElementById(section.id).style.display = "none";
                } else {
                    document.getElementById(section.id).style.display = "block";
                }
            });
        }

    }

})()


// colors.
(function () {
  if ( typeof NodeList.prototype.forEach === "function" ) return false;
  NodeList.prototype.forEach = Array.prototype.forEach;
})();

(function(){
  var parameters = document.querySelectorAll('.kss-parameters');

  if (parameters) {
    document.querySelectorAll('.kss-parameters__item').forEach(function (el) {
      var description = el.querySelector('.kss-parameters__description').textContent.trim().replace(/; +/g, ';');
      var colorVar = el.querySelector('.kss-parameters__name').textContent.trim();
      var colorCode = description.split(';')[0];
      var isHexadecimal  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorCode);
      var colorContent = '<span class="kss-color__var">' + colorVar + '</span>' +
                          '<span class="kss-color__code">' + colorCode + '</span>';

      if (isHexadecimal) {
        el.parentElement.classList.add('kss-colors-container');
        el.classList.add('kss-color');
        el.style.background = colorCode;
        el.querySelector('.kss-parameters__description').innerHTML = (colorContent);
      }
    });
  }
})();
