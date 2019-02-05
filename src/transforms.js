const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');
const _ = require('lodash');

const propertiesToCTI = {
  width: { category: 'size', type: 'dimension' },
  'min-width': { category: 'size', type: 'dimension' },
  'max-width': { category: 'size', type: 'dimension' },
  height: { category: 'size', type: 'dimension' },
  'min-height': { category: 'size', type: 'dimension' },
  'max-height': { category: 'size', type: 'dimension' },
  'padding-y': { category: 'size', type: 'dimension' },
  'padding-x': { category: 'size', type: 'dimension' },
  'border-radius': { category: 'size', type: 'border', item: 'width' },
  'border-width': { category: 'size', type: 'border', item: 'width' },
  'border-color': { category: 'color', type: 'border' },
  'background-color': { category: 'color', type: 'background' },
  color: { category: 'color', type: 'font' },
  'text-color': { category: 'color', type: 'font' },
  padding: { category: 'size', type: 'padding' },
  icon: { category: 'content', type: 'icon' },
  'font-family': { category: 'font-family' },
  'font-size': { category: 'size', type: 'font-size' },
  'line-height': { category: 'size', type: 'line-height' },
  size: { category: 'size', type: 'icon' },
};

const components = {
  button: true,
  text: true,
  icon: true,
  link: true,
};
// General

StyleDictionary.registerTransform({
  name: 'attribute/cti/components',
  type: 'attribute',
  transformer(prop) {
    if (components[prop.path[0]]) {
      return propertiesToCTI[prop.name];
    }
    return StyleDictionary.transform['attribute/cti'].transformer(prop);
  },
});

// Swift

StyleDictionary.registerTransform({
  name: 'name/cti/swift-paypal',
  type: 'name',
  transformer(prop) {
    return _.camelCase(prop.name);
  },
});

StyleDictionary.registerTransform({
  name: 'color/swift-paypal',
  type: 'value',
  matcher(prop) {
    return prop.attributes.category === 'color';
  },
  transformer(prop) {
    const { r, g, b, a } = tinycolor(prop.original.value).toRgb();
    const rFixed = (r / 255.0).toFixed(2);
    const gFixed = (g / 255.0).toFixed(2);
    const bFixed = (b / 255.0).toFixed(2);
    return `UIColor(red: ${rFixed}, green: ${gFixed}, blue: ${bFixed}, alpha:${a})`;
  },
});

StyleDictionary.registerTransform({
  name: 'size/swift-paypal',
  type: 'value',
  matcher(prop) {
    return (
      prop.attributes.category === 'size' ||
      prop.attributes.category === 'spacing'
    );
  },
  transformer(prop) {
    return parseFloat(prop.original.value, 10).toFixed(2);
  },
});

StyleDictionary.registerTransform({
  name: 'time/swift-paypal',
  type: 'value',
  matcher(prop) {
    return prop.attributes.category === 'time';
  },
  transformer(prop) {
    return `${(prop.value / 1000).toFixed(1)}`;
  },
});

// Android

StyleDictionary.registerTransform({
  name: 'size/android-paypal',
  type: 'value',
  matcher(prop) {
    return (
      prop.attributes.category === 'spacing' ||
      prop.attributes.category === 'size'
    );
  },
  transformer(prop) {
    return `${prop.value}dp`;
  },
});

StyleDictionary.registerTransform({
  name: 'font-size/android-paypal',
  type: 'value',
  matcher(prop) {
    return (
      prop.attributes.category === 'size' &&
      prop.attributes.type === 'font-size'
    );
  },
  transformer(prop) {
    return `${prop.original.value}sp`;
  },
});

StyleDictionary.registerTransform({
  name: 'line-height/android-paypal',
  type: 'value',
  matcher(prop) {
    return (
      prop.attributes.category === 'size' &&
      prop.attributes.type === 'line-height'
    );
  },
  transformer(prop) {
    return prop.original.value;
  },
});

StyleDictionary.registerTransform({
  name: 'size/rem/web-paypal',
  type: 'value',
  matcher(prop) {
    return (
      prop.attributes.category === 'size' ||
      prop.attributes.category === 'spacing'
    );
  },
  transformer(prop) {
    if (prop.attributes && prop.attributes.type === 'line-height') {
      return prop.value;
    }
    return `${prop.value / 16}rem`;
  },
});

StyleDictionary.registerTransform({
  name: 'color/hex-rgba/web-paypal',
  type: 'value',
  matcher(prop) {
    return prop.attributes.category === 'color';
  },
  transformer(prop) {
    const color = tinycolor(prop.original.value);
    const format = color.getFormat();
    if (format === 'hex8') {
      return color.toRgbString();
    }
    return color.toHexString();
  },
});
