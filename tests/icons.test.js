const fs = require('fs-extra');
const path = require('path');

describe('icons ', () => {
  test('snapshot should be matched', () => {
    const iconsArr = fs.readdirSync(
      path.join(__dirname, '../src/assets/icons/svg')
    );
    expect(iconsArr).toMatchSnapshot();
    expect(iconsArr.length).toMatchSnapshot();
  });
});
