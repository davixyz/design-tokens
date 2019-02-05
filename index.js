// Require transforms
require('./src/transforms');
require('./src/transformGroups');
require('./src/templates');
require('./src/actions');
const { argv } = require('yargs');

const StyleDictionary = require('style-dictionary');
const del = require('del');
const path = require('path');
const StyleDictionaryConfig = require('./style-config.json');

const Dictionary = StyleDictionary.extend(StyleDictionaryConfig);

switch (argv.platform) {
  case 'web':
    del(path.join(__dirname, './build/web/')).then(() => {
      Dictionary.buildPlatform('web');
    });
    break;

  case 'ios':
    del([
      path.join(__dirname, './build/ios/Classes/'),
      path.join(__dirname, './build/ios/Fonts/'),
      path.join(__dirname, './build/ios/Assets/Icons.xcassets/Icons/'),
    ]).then(() => {
      // TODO: merge all these tasks into a single one
      Dictionary.buildPlatform('ios-swift');
      Dictionary.buildPlatform('ios-fonts');
      Dictionary.buildPlatform('ios-icons');
    });
    break;

  case 'android':
    del([path.join(__dirname, './build/android/app/src/main/res/')]).then(
      () => {
        // TODO: merge all these tasks into a single one
        Dictionary.buildPlatform('android');
        Dictionary.buildPlatform('android-fonts');
        Dictionary.buildPlatform('android-icons');
      }
    );
    break;

  default:
    del([
      path.join(__dirname, './build/web/'),
      path.join(__dirname, './build/android/app/src/main/res/'),
      path.join(__dirname, './build/ios/Classes/'),
      path.join(__dirname, './build/ios/Fonts/'),
      path.join(__dirname, './build/ios/Assets/Icons.xcassets/Icons/'),
    ]).then(() => {
      Dictionary.buildAllPlatforms();
    });
}
