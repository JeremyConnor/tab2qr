import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { dataToFrames } from "qrloop";
import config from "../config";
import "./AnimatedQR.css";

class QRCodeLoop extends React.PureComponent {
  state = { frame: 0 };

  componentDidMount() {
    const nextFrame = ({ frame }, { frames }) => {
      frame = (frame + 1) % frames.length;
      return { frame };
    };

    let lastT;
    const loop = (t) => {
      this._raf = requestAnimationFrame(loop);
      if (!lastT) lastT = t;
      if ((t - lastT) * this.props.fps < 1000) return;
      lastT = t;
      this.setState(nextFrame);
    };
    this._raf = requestAnimationFrame(loop);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }

  render() {
    const { frame } = this.state;
    const { frames, overrideSize } = this.props;
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        {frames.map((chunk, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity: i === frame ? 1 : 0,
            }}
          >
            <QRCode
              value={chunk}
              ecLevel={config.qr.correctionLevel}
              size={overrideSize || config.qr.size}
              qrStyle={config.qr.bitShape}
            />
          </div>
        ))}
      </div>
    );
  }
}

function AnimatedQR(props) {
  const [frames, setFrames] = useState(null);

  useEffect(() => {
    const convertToFrames = () => {
      setFrames(
        dataToFrames(
          props.encode,
          config.qr.frameSize,
          config.qr.repeatFrequency
        )
      );
    };

    convertToFrames();
  }, [props.encode]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: 10,
        height: config.qr.size,
      }}
    >
      {frames && (
        <QRCodeLoop
          frames={frames}
          fps={config.qr.fps}
          overrideSize={props.overrideSize}
        />
      )}
    </div>
  );
}

export default AnimatedQR;
