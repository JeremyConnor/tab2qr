import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import DisplayUrls from './DisplayUrls';

// releasing memory to avoid leak after testing
afterAll(cleanup);

const formatDataToSend = (data) => {
  return JSON.stringify({
    tabs: data,
  });
};

const generateList = (noOfTabs) => {
  let url = 'https://www.google.com';
  let list = Array(noOfTabs).fill(url);
  return formatDataToSend(list);
};

test('DisplayUrls model single-url-list rendering', () => {
  const modal = render(
    <DisplayUrls visible={true} onClose={jest.fn} data={generateList(1)} />,
  );
  expect(modal).toBeTruthy();
});

test('DisplayUrls model medium-urls-list rendering', () => {
  const modal = render(
    <DisplayUrls visible={true} onClose={jest.fn} data={generateList(20)} />,
  );
  expect(modal).toBeTruthy();
});

test('DisplayUrls model large-urls-list rendering', () => {
  const modal = render(
    <DisplayUrls visible={true} onClose={jest.fn} data={generateList(100)} />,
  );
  expect(modal).toBeTruthy();
});

test('DisplayUrls model extreme-urls-list rendering', () => {
  const modal = render(
    <DisplayUrls visible={true} onClose={jest.fn} data={generateList(1000)} />,
  );
  expect(modal).toBeTruthy();
});
