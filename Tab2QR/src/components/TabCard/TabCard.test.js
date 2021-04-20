import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import TabCard from './TabCard';

// releasing memory to avoid leak after testing
const originalWarn = console.warn.bind(console.warn);

beforeAll(() => {
  console.warn = (msg) => null;
});

afterAll(() => {
  console.warn = originalWarn;
  cleanup();
});

test('Card rendering', () => {
  const card = render(<TabCard />);
  expect(card).toBeTruthy();
});
