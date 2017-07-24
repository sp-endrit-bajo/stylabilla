module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    //Autoprefixer takes care of these for us
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,

    //Avoid specificity, prefer BEM class names
    "max-nesting-depth": 2,
    "selector-max-compound-selectors": 3,
    "selector-max-specificity": "0,3,0",
    "declaration-no-important": true,
    "selector-no-qualifying-type": true,
    "no-duplicate-selectors": true,

    //Colors should only be used as variables
    "color-named": "never",
    "color-no-hex": true,

    //Quotation consistency
    "font-family-name-quotes": "always-where-recommended",
    "function-url-quotes": "always",
    "selector-attribute-quotes": "always",

    //Misc
    "string-quotes": "single",
    "at-rule-no-unknown": null,
    "declaration-block-no-redundant-longhand-properties": null
  }
};
