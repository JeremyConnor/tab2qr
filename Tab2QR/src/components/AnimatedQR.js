import React, {PureComponent} from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default class QRCodeLoop extends PureComponent {
  state = {
    frame: 0,
  };

  componentDidMount() {
    const nextFrame = ({frame}, {frames}) => {
      frame = (frame + 1) % frames.length;
      return {frame};
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

  _raf = React.createRef();

  render() {
    const {frame} = this.state;
    const {frames, size, quietZone} = this.props;

    return (
      <View style={{position: 'relative', width: size, height: size}}>
        {frames.map((chunk, i) => (
          <View
            key={i}
            style={{position: 'absolute', opacity: i === frame ? 1 : 0}}>
            <QRCode value={chunk} ecl="M" size={size} quietZone={quietZone} />
          </View>
        ))}
      </View>
    );
  }
}
