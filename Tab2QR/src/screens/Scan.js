import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Provider, Portal} from 'react-native-paper';
import moment from 'moment';
import QRScanner from '../components/QRScanner';
import DisplayUrls from '../components/DisplayUrls';
import ScanHistory from '../db/modal';

/**
 * Render "Scan" screen.
 */
export default function Scan(props) {
  const [result, setResult] = React.useState(null);
  const [errorOccurred, setErrorOccurred] = React.useState(false);
  const [showScannedTabs, setShowScannedTabs] = React.useState(false);
  const [showResultAlert, setShowResultAlert] = React.useState(false);
  const isFocused = useIsFocused();

  // Validate the JSON after scanning QR code.
  const validate = (jsonValue) => {
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

  // Update the result hook after scanning QR code.
  const onResult = (newResult) => {
    try {
      let scannedResult = JSON.parse(newResult);
      if (validate(scannedResult)) {
        setResult(scannedResult);
        setShowResultAlert(true);
      } else {
        // Invalid JSON data.
        setErrorOccurred(true);
      }
    } catch (e) {
      // Handle error.
      setErrorOccurred(true);
    }
  };

  // Handle error.
  const onError = (error) => {
    console.warn('QRLoopScanner.js > Scan.js ERROR', error);
    setErrorOccurred(true);
  };

  // Save the scanned QR in the database.
  const onPressSave = async () => {
    const _title = `scanned ${moment().format('DD/MM/YY hh:ss a')}`;

    const toInsert = {
      title: _title,
      timestamp: Math.round(Date.now() / 1000),
      windowInfo: result,
    };

    // Update the database.
    try {
      await ScanHistory.create(toInsert);
    } catch (e) {
      // Handle error.
      console.warn('Database error');
      console.log(e);
    } finally {
      showDefaultScreen();
    }
  };

  // Reset conditions to default.
  const showDefaultScreen = () => {
    setShowResultAlert(false);
    setShowScannedTabs(false);
    setResult(null);
  };

  /**
   * Handle Cancel button.
   * Set condition to true to display scanned URLs.
   */
  const onPressCancel = () => {
    setShowResultAlert(false);
    setShowScannedTabs(true);
  };

  const onPressScanAgain = () => {
    setErrorOccurred(false);
  };

  const renderResultScreen = () => {
    Alert.alert(
      'Scanned successfully',
      'Do you want to save the list ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onPressCancel,
        },
        {
          text: 'OK',
          style: 'positive',
          onPress: onPressSave,
        },
      ],
      {cancelable: false},
    );
  };

  const renderErrorScreen = () => {
    Alert.alert(
      'Error',
      'QR code is either not supported or invalid',
      [
        {
          text: 'Scan again',
          style: 'positive',
          onPress: onPressScanAgain,
        },
      ],
      {cancelable: false},
    );
  };

  if (isFocused) {
    if (errorOccurred) {
      return <View style={styles.root}>{renderErrorScreen()}</View>;
    } else if (showResultAlert) {
      return <View style={styles.root}>{renderResultScreen()}</View>;
    } else {
      return (
        <Provider>
          <Portal>
            <QRScanner onResult={onResult} onError={onError} />
            <DisplayUrls
              visible={showScannedTabs}
              data={result}
              onClose={showDefaultScreen}
            />
          </Portal>
        </Provider>
      );
    }
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 25,
  },
});
