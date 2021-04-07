import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import ScannerBox from './ScannerBox';

// releasing memory to avoid leak after testing
const originalWarn = console.warn.bind(console.warn);

beforeAll(() => {
  console.warn = (msg) => null;
});

afterAll(() => {
  console.warn = originalWarn;
  cleanup();
});

test('ScannerBox module rendering', () => {
  const box = render(<ScannerBox />);
  expect(box).toBeTruthy();
});
