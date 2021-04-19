import {cleanup} from '@testing-library/react-native';

// releasing memory to avoid memory leak after testing
afterAll(cleanup);

const format1 = JSON.stringify(null);

const format2 = JSON.stringify('random string');

const format3 = JSON.stringify({});

const format4 = JSON.stringify({randomKey: 'random string'});

const format5 = JSON.stringify({tabs: 'random string'});

const format6 = JSON.stringify({
  tabs: Array(1).fill('random url'),
  extraData: 'random string',
});

const format7 = JSON.stringify({tabs: Array(1).fill('random url')});

const validate = (jsonValue) => {
  if (
    jsonValue == null ||
    typeof jsonValue !== 'object' ||
    Object.keys(jsonValue).length < 1
  ) {
    return false;
  }

  for (let key in jsonValue) {
    if (key === 'tabs') {
      if (!Array.isArray(jsonValue[key])) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

const qrEncodeDecode = (format) => {
  return validate(JSON.parse(format));
};

describe('Validating scanned QR code data -> ', () => {
  test('rejected null data', () => {
    expect(qrEncodeDecode(format1)).toBe(false);
  });

  test('rejected random string', () => {
    expect(qrEncodeDecode(format2)).toBe(false);
  });

  test('rejected empty json', () => {
    expect(qrEncodeDecode(format3)).toBe(false);
  });

  test('rejected json with random key and random value', () => {
    expect(qrEncodeDecode(format4)).toBe(false);
  });

  test('rejected json with key as tabs and random string value ', () => {
    expect(qrEncodeDecode(format5)).toBe(false);
  });

  test('rejected json with correct format but extra data', () => {
    expect(qrEncodeDecode(format6)).toBe(false);
  });

  test('accepted json with correct format', () => {
    expect(qrEncodeDecode(format7)).toBe(true);
  });
});
