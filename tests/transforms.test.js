require('./../src/transforms');
const StyleDictionary = require('style-dictionary');

describe('attribute/cti/components', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['attribute/cti/components'];
  });

  test('transformer should get default cti object', () => {
    const { transformer } = transform;
    const prop = {
      path: ['primary', 'default', 'background-color'],
    };
    expect(transformer(prop)).toEqual({
      category: 'primary',
      type: 'default',
      item: 'background-color',
      subitem: undefined,
      state: undefined,
    });
  });

  test('transformer should get default cti object', () => {
    const { transformer } = transform;
    const prop = {
      name: 'background-color',
      path: ['button', ' primary', 'default', 'background-color'],
    };
    expect(transformer(prop)).toEqual({
      category: 'color',
      type: 'background',
    });
  });
});

describe('name/cti/swift-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['name/cti/swift-paypal'];
  });

  test('transformer camelCase name', () => {
    const { transformer } = transform;
    const prop = {
      name: 'PrimaryDefaultBackgroundColor',
    };
    expect(transformer(prop)).toBe('primaryDefaultBackgroundColor');
  });
});

describe('color/swift-paypal transform', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['color/swift-paypal'];
  });

  test('matcher should match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'color',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      original: {
        value: '#000000',
      },
    };
    expect(transformer(prop)).toBe(
      'UIColor(red: 0.00, green: 0.00, blue: 0.00, alpha:1)'
    );
  });
});

describe('size/swift-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['size/swift-paypal'];
  });

  test('matcher should match size', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should match spacing', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'spacing',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      original: {
        value: '16',
      },
    };
    expect(transformer(prop)).toBe('16.00');
  });
});

describe('size/swift-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['size/swift-paypal'];
  });

  test('matcher should match size', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should match spacing', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'spacing',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      original: {
        value: '16',
      },
    };
    expect(transformer(prop)).toBe('16.00');
  });
});

describe('time/swift-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['time/swift-paypal'];
  });

  test('matcher should match time', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'time',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      value: '1000',
    };
    expect(transformer(prop)).toBe('1.0');
  });
});

describe('size/android-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['size/android-paypal'];
  });

  test('matcher should match size', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      value: '1',
    };
    expect(transformer(prop)).toBe('1dp');
  });
});

describe('font-size/android-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['font-size/android-paypal'];
  });

  test('matcher should match size && font-size', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
        type: 'font-size',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      original: {
        value: '16',
      },
    };
    expect(transformer(prop)).toBe('16sp');
  });
});

describe('line-height/android-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['line-height/android-paypal'];
  });

  test('matcher should match size && line-height', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
        type: 'line-height',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform', () => {
    const { transformer } = transform;
    const prop = {
      original: {
        value: '16',
      },
    };
    expect(transformer(prop)).toBe('16');
  });
});

describe('size/rem/web-paypal', () => {
  let transform;

  beforeAll(() => {
    transform = StyleDictionary.transform['size/rem/web-paypal'];
  });

  test('matcher should match size', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'size',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should match spacingt', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'spacing',
      },
    };
    expect(matcher(prop)).toBe(true);
  });

  test('matcher should not match', () => {
    const { matcher } = transform;
    const prop = {
      attributes: {
        category: 'random',
      },
    };
    expect(matcher(prop)).toBe(false);
  });

  test('transformer should transform rems', () => {
    const { transformer } = transform;
    const prop = {
      value: '16',
      attributes: {
        type: 'font-size',
      },
    };
    expect(transformer(prop)).toBe('1rem');
  });

  test('transformer should not transform line-height into rems', () => {
    const { transformer } = transform;
    const prop = {
      value: '1.2',
      attributes: {
        type: 'line-height',
      },
    };
    expect(transformer(prop)).toBe('1.2');
  });
});
