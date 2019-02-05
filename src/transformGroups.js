const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransformGroup({
  name: 'swift-custom',
  transforms: [
    'attribute/cti/components',
    'name/cti/pascal',
    'name/cti/swift-paypal',
    'color/swift-paypal',
    'size/swift-paypal',
    'time/swift-paypal',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: [
    'attribute/cti/components',
    'name/cti/snake',
    'color/hex8android',
    'size/android-paypal',
    'font-size/android-paypal',
    'line-height/android-paypal',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'web-custom',
  transforms: [
    'attribute/cti/components',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem/web-paypal',
    'color/hex-rgba/web-paypal',
  ],
});
