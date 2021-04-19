import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import AnimatedQR from './AnimatedQR';
import {dataToFrames} from 'qrloop';

// releasing memory to avoid leak after testing
afterAll(cleanup);

const maxTabs = 40;
const shortURL = 'https://www.google.com';
const largeURL = Array(1024).fill('h').join('');

const generateList = (isShortUrl, isSmallList) => {
  let url = isShortUrl ? shortURL : largeURL;
  let list = Array(isSmallList ? 1 : maxTabs).fill(url);
  return list;
};

const formatDataToSend = (data) => {
  return JSON.stringify({
    tabs: data,
  });
};

describe('Sucessfully rendered Animated QR in mobile for -> ', () => {
  test('single tab + small url', () => {
    const qr = render(
      <AnimatedQR
        quietZone={10}
        size={200}
        frames={dataToFrames(generateList(true, true))}
      />,
    );
    expect(qr).toBeTruthy();
  });

  test('single tab + large url', () => {
    const qr = render(
      <AnimatedQR
        quietZone={10}
        size={200}
        frames={dataToFrames(generateList(false, true))}
      />,
    );
    expect(qr).toBeTruthy();
  });

  test('multiple tabs + small-url', () => {
    const qr = render(
      <AnimatedQR
        quietZone={10}
        size={200}
        frames={dataToFrames(generateList(true, false))}
      />,
    );
    expect(qr).toBeTruthy();
  });

  test('multiple tabs + large url', () => {
    const qr = render(
      <AnimatedQR
        quietZone={10}
        size={200}
        frames={dataToFrames(generateList(false, false))}
      />,
    );
    expect(qr).toBeTruthy();
  });
});
