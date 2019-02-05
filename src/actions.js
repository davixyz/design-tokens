const StyleDictionary = require('style-dictionary');
const path = require('path');
const fs = require('fs-extra');
const log = require('fancy-log');
const _ = require('lodash');

// Web SVG Converter
const SVGO = require('svgo');

// Android SVG to XML Converter
const svgsus = require('svgsus');

// iOS SVG to PDF Converters
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

StyleDictionary.registerAction({
  name: 'copy_fonts',
  do(dictionary, config) {
    log('Copying fonts directory');
    const fontsPath = path.join(__dirname, 'assets/fonts');
    const assetPathArr = fs
      .readdirSync(fontsPath)
      // remove garbage hack
      .filter(asset => asset !== '.DS_Store');
    fs.ensureDirSync(config.buildPath);
    assetPathArr.forEach(asset => {
      let processedAsset = asset;
      // If the target is android we need to
      // process the fileName and make
      // it snakeCase
      if (config.target === 'android') {
        const parsedPath = path.parse(processedAsset);
        processedAsset = `${_.snakeCase(parsedPath.name)}${parsedPath.ext}`;
      }
      fs.createReadStream(path.join(fontsPath, asset)).pipe(
        fs.createWriteStream(path.join(config.buildPath, processedAsset))
      );
    });
  },
  undo(dictionary, config) {
    log(`Removing fonts directory from ${config.buildPath} assets`);
    fs.removeSync(config.buildPath);
  },
});

StyleDictionary.registerAction({
  name: 'copy_icons_ios',
  do(dictionary, config) {
    log('Copying icons directory');
    const assetsPath = path.join(__dirname, 'assets/icons/svg');
    const assetPathArr = fs
      .readdirSync(assetsPath)
      // remove garbage hack
      .filter(asset => asset !== '.DS_Store');
    const assetNameArr = [];
    assetPathArr.forEach(asset => {
      const assetFullPath = path.join(assetsPath, asset);
      const svg = fs.readFileSync(assetFullPath, 'utf8');
      const assetFullPathParsed = path.parse(assetFullPath);
      const assetNameCamelCase = _.camelCase(assetFullPathParsed.name);
      // Adding data for class template usage
      assetNameArr.push(assetNameCamelCase);

      const imageSetPath = path.join(
        config.buildPath,
        `${assetNameCamelCase}.imageset`
      );
      fs.ensureDirSync(imageSetPath);
      // PDF Generation
      // 48 * 48 -> 36 * 36
      const doc = new PDFDocument({ size: [36, 36] });
      const stream = fs.createWriteStream(
        path.join(imageSetPath, `${assetNameCamelCase}.pdf`)
      );
      SVGtoPDF(doc, svg, 0, 0);
      doc.pipe(stream);
      doc.end();
      // Content.json generation
      const jsonTemplate = {
        images: [
          {
            idiom: 'universal',
            filename: `${assetNameCamelCase}.pdf`,
          },
        ],
        info: {
          version: 1,
          author: 'xcode',
        },
        properties: {
          'preserves-vector-representation': true,
        },
      };
      fs.outputJsonSync(path.join(imageSetPath, 'Contents.json'), jsonTemplate);
    });

    // Helper icons class for iOS
    const iconsTemplate = fs.readFileSync(
      path.join(__dirname, 'templates/swift/icons.template'),
      'utf8'
    );
    const compiledTemplate = _.template(iconsTemplate);
    const compiledIconsTemplate = compiledTemplate({ data: assetNameArr });
    fs.outputFileSync(
      path.join(__dirname, '../build/ios/Classes/Image.swift'),
      compiledIconsTemplate
    );
  },
  undo(dictionary, config) {
    log(`Removing icons directory from ${config.buildPath} assets`);
    fs.removeSync(config.buildPath);
  },
});

StyleDictionary.registerAction({
  name: 'copy_icons_android',
  do(dictionary, config) {
    log('Copying icons directory');
    const assetsPath = path.join(__dirname, 'assets/icons/svg/');
    const assetPathArr = fs
      .readdirSync(assetsPath)
      .filter(asset => asset !== '.DS_Store')
      .map(file => {
        const assetPath = path.join(assetsPath, file);
        const parsedPath = path.parse(assetPath);
        return {
          name: parsedPath.name,
          path: assetPath,
        };
      });
    // Processor of SVG before shipping
    // to android conversion to add a default fill color
    // default fill color is grey-700: #2C2E2F
    const svgo = new SVGO({
      plugins: [
        {
          processSvg: {
            type: 'perItem',
            name: 'addFill',
            description: 'Adds default color for svgs',
            fn: item => {
              if (item.isElem('svg')) {
                item.addAttr({
                  name: 'fill="#2C2E2F"',
                  prefix: '',
                  local: '',
                });
              }
            },
          },
        },
      ],
    });

    const svgConverterOptions = { compressed: true, codeIndent: '  ' };

    assetPathArr.forEach(asset => {
      const svg = fs.readFileSync(asset.path, 'utf8');
      svgo.optimize(svg).then(result => {
        svgsus.vectordrawable
          .convert(result.data, svgConverterOptions)
          .then(cleanedSvg =>
            fs.outputFileSync(
              path.join(config.buildPath, `ui_${_.snakeCase(asset.name)}.xml`),
              cleanedSvg
            )
          )
          .catch(err => log(err));
      });
    });
  },
  undo(dictionary, config) {
    log(`Removing icons directory from ${config.buildPath} assets`);
    fs.removeSync(config.buildPath);
  },
});

StyleDictionary.registerAction({
  name: 'copy_icons_web',
  do() {
    log('Copying icons directory');
    const assetsPath = path.join(__dirname, 'assets/icons/svg');
    const assetPathArr = fs
      .readdirSync(assetsPath)
      // remove garbage hack
      .filter(asset => asset !== '.DS_Store');
    const svgo = new SVGO({
      plugins: [{ removeDimensions: true }, { removeViewBox: false }],
    });
    assetPathArr.forEach(asset => {
      const svg = fs.readFileSync(path.join(assetsPath, asset), 'utf8');
      svgo.optimize(svg).then(result => {
        fs.outputFileSync(path.join('build/web/icons/svg', asset), result.data);
      });
    });
  },
  undo(dictionary, config) {
    log(`Removing icons directory from ${config.buildPath} assets`);
    fs.removeSync(config.buildPath);
  },
});
