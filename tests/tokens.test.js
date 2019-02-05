const fs = require('fs-extra');
const path = require('path');

function traverseDir(dir, arr) {
  const returnArr = arr || [];
  fs.readdirSync(dir)
    .filter(asset => asset !== '.DS_Store')
    .forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        traverseDir(fullPath, returnArr);
      } else {
        returnArr.push(fullPath);
      }
    });

  return returnArr;
}

const jsonFiles = traverseDir(path.join(__dirname, '../tokens/'));
const jsonMerged = jsonFiles.reduce((acc, current) => {
  // eslint-disable-next-line
  const json = require(current);
  return Object.assign(acc, json);
}, {});

describe('tokens ', () => {
  test('snapshot should be matched', () => {
    expect(jsonMerged).toMatchSnapshot();
  });
});
