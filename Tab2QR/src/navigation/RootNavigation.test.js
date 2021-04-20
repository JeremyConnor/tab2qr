import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import RootNavigation from './RootNavigation';

// releasing memory to avoid leak after testing
const originalWarn = console.warn.bind(console.warn);
const originalError = console.error.bind(console.error);

beforeAll(() => {
  console.warn = (msg) => null;
  console.error = (msg) => null;
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
  cleanup();
});

test('RootNavigation module rendering', () => {
  const rootNav = render(<RootNavigation />);
  expect(rootNav).toBeTruthy();
});
