import React from 'react';
import {render, cleanup, waitFor} from '@testing-library/react-native';
import Scan from '../src/screens/Scan';

// releasing memory to avoid memory leak after testing
afterAll(cleanup);

describe('QR Scanner after scanning qr code -> ', () => {
  test('successfully showing alert message to save for valid qr code data', async () => {
    const fakeData = JSON.stringify({tabs: ['https://www.google.com']});
    const {queryByTestId} = render(<Scan mock={true} fakeData={fakeData} />);

    // check if save alert is showing up
    await waitFor(() => expect(queryByTestId('saveAlert')).toBeTruthy());
  });

  test('successfully showing alert message to scan again for invalid qr code data', async () => {
    const fakeData = JSON.stringify({'random key': 'random value'});
    const {queryByTestId} = render(<Scan mock={true} fakeData={fakeData} />);

    // check if rescan alert is showing up
    await waitFor(() => expect(queryByTestId('rescanAlert')).toBeTruthy());
  });
});
