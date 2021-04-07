import React from 'react';
import uuid from 'uuid-random';
import {render, cleanup} from '@testing-library/react-native';
import SavedItemExpanded, {FABButton} from './SavedItemExpanded';

// releasing memory to avoid leak after testing
const originalWarn = console.warn.bind(console.warn);

beforeAll(() => {
  console.warn = (msg) => null;
});

afterAll(() => {
  console.warn = originalWarn;
  cleanup();
});

const formatDataToSend = (tabs) => {
  return {
    tabs,
  };
};

const generateList = (noOfTabs) => {
  let url = 'https://www.google.com';
  let list = Array(noOfTabs).fill(url);
  return formatDataToSend(list);
};

const renderScreen = (noOfTabs) =>
  render(
    <SavedItemExpanded
      mock={true}
      route={{
        params: {
          data: {
            id: uuid(),
            title: 'sample title',
            timestamp: Date.now(),
            windowInfo: generateList(noOfTabs),
          },
          deleteItem: jest.fn,
        },
      }}
    />,
  );

test('FABButton rendering', () => {
  const fab = render(<FABButton />);
  expect(fab).toBeTruthy();
});

test('SavedItemExpanded screen simple rendering', () => {
  const expandedItem = renderScreen(10);
  expect(expandedItem).toBeTruthy();
});

test('SavedItemExpanded screen stress rendering', () => {
  const expandedItem = renderScreen(100);
  expect(expandedItem).toBeTruthy();
});
