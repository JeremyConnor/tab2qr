import React from "react";
import { Progress } from "antd";
import QrReader from "react-qr-reader";
import {
  parseFramesReducer,
  areFramesComplete,
  framesToData,
  progressOfFrames,
} from "qrloop";

export default class QRCodeScanner extends React.Component {
  state = {
    progress: 0,
  };

  frames = null;

  handleScan = (data) => {
    // ensures that scan only happens after user presses "Scan New"
    if (this.props.getScanNew()) {
      if (data) {
        try {
          const frames = (this.frames = parseFramesReducer(this.frames, data));
          if (areFramesComplete(frames)) {
            this.props.onQRScanned(framesToData(frames).toString());
            this.setState({
              progress: 0,
            });
          } else {
            this.setState({
              progress: progressOfFrames(frames),
            });
          }
        } catch (e) {
          this.handleError(e);
        }
      }
    }
  };

  handleError = (error) => {
    this.props.onQRScanError(error);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {!this.props.mock && (
          <QrReader
            delay={200} // for 5 fps
            onError={this.handleError}
            onScan={this.handleScan}
            style={{
              width: "70%",
              borderWidth: 10,
              borderColor: "blue",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1.5em",
          }}
        >
          <Progress
            type="circle"
            width={80}
            percent={Math.round(this.state.progress * 100)}
          />
        </div>
      </div>
    );
  }
}
