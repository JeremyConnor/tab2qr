import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
  parseFramesReducer,
  areFramesComplete,
  framesToData,
  progressOfFrames,
} from 'qrloop';
import ProgressCircle from 'react-native-progress-circle';
import ScannerBox from '../ScannerBox/ScannerBox';

export default class QRScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    progress: 0,
  };

  // Access permission to access Camera.
  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  frames = null;

  onBarCodeScanned = ({data}) => {
    try {
      const frames = (this.frames = parseFramesReducer(this.frames, data));
      if (areFramesComplete(frames)) {
        // Convert to string once the QR is scanned completely.
        this.props.onResult(framesToData(frames).toString());
        this.setState({
          progress: 0,
        });
      } else {
        // Update state with new frames.
        this.setState({
          progress: progressOfFrames(frames),
        });
      }
    } catch (e) {
      this.props.onError(e);
    }
  };

  render() {
    const {hasCameraPermission, progress} = this.state;

    // Request permission to access Camera.
    if (hasCameraPermission === null) {
      return (
        <View style={styles.root}>
          <Text>Requesting camera permission...</Text>
        </View>
      );
    }

    // Permission denied to access Camera.
    if (hasCameraPermission === false) {
      return (
        <View style={styles.root}>
          <Text>
            Camera access denied...You need to manually set the permission to
            scan QR code
          </Text>
        </View>
      );
    }

    return (
      <Camera
        style={styles.root}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={this.onBarCodeScanned}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Scan the QR code</Text>
        </View>

        <ScannerBox />

        <ProgressCircle
          percent={Math.round(progress * 100)}
          radius={40}
          borderWidth={8}
          color="#31A05F"
          shadowColor="white"
          bgColor="white">
          <Text style={{fontSize: 18}}>{(progress * 100).toFixed(0)}%</Text>
        </ProgressCircle>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  progressText: {
    color: 'white',
    fontSize: 20,
  },
  progress: {
    margin: 20,
  },
  titleContainer: {
    height: 50,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
