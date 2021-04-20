import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import Scan from './Scan';

afterAll(() => {
  cleanup();
});

test('RootNavigation module rendering', () => {
  const scan = render(<Scan mock={true} />);
  expect(scan).toBeTruthy();
});
