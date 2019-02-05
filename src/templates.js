const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');
const path = require('path');
const template = require('lodash/template');

StyleDictionary.registerFormat({
  name: 'swift/tokens',
  formatter: template(
    fs.readFileSync(path.join(__dirname, 'templates/swift/tokens.template'))
  ),
});

StyleDictionary.registerFormat({
  name: 'android/tokens',
  formatter: template(
    fs.readFileSync(path.join(__dirname, '/templates/android/tokens.template'))
  ),
});
