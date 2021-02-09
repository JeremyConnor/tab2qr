import React, { Component, Fragment, useState } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    StatusBar,
    Linking,
    View,
    Dimensions
} from 'react-native';

import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from 'react-native-qrcode-scanner';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Scanner = () => {

    const [state, setState] = useState({
        scan: false,
        scanResult: false,
        result: null
    });

    const onSuccess = (e) => {
        const checkUrl = e.data.substring(0, 4);
        console.log('scanned data' + checkUrl);
        setState({
            ...state,
            result: e,
            scan: false,
            scanResult: true
        })
        if (checkUrl === 'http') {
            Linking.openURL(e.data)
                .catch(err => console.error('An error occured', err));

        } else {
            setState({
                ...state,
                result: e,
                scan: false,
                scanResult: true
            })
        }

    }

    const activeQR = () => {
        setState({
            ...state,
            scan: true
        })
    }
    const scanAgain = () => {
        setState({
            ...state,
            scan: true,
            scanResult: false
        })
    }

    const description = 'Scan your QR code!'
    return (
        <View style={styles.scrollViewStyle}>
          <Fragment>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.textTitle}>Tab2QR</Text>
            {!state.scan && !state.scanResult &&
              <View style={styles.cardView} >
                <Text numberOfLines={1} style={styles.descText}>{description}</Text>

                <TouchableOpacity onPress={() => activeQR()} style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>Click to Scan</Text>
                </TouchableOpacity>

              </View>
            }

            {state.scanResult &&
              <Fragment>
                <Text style={styles.textTitle1}>Result !</Text>
                <View style={state.scanResult ? styles.scanCardView : styles.cardView}>
                  <Text>Type : {state.result.type}</Text>
                  <Text>Result : {state.result.data}</Text>
                  <Text numberOfLines={3}>RawData: {state.result.rawData}</Text>
                  <TouchableOpacity onPress={() => scanAgain()} style={styles.buttonTouchable}>
                    <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                  </TouchableOpacity>
				</View>
              </Fragment>
            }

			{
				state.scan &&
                <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={(node) => { this.scanner = node }}
                  onRead={(e) => onSuccess(e)}
                  topContent={
                    <Text style={styles.centerText}>
                      Scan any QR
                    </Text>
            	  }
            	  bottomContent={
              		<View>
                	  <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                  		<Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                	  </TouchableOpacity>
					  <TouchableOpacity style={styles.buttonTouchable} 
                  		onPress={() => 
                    	  setState({ 
                      		...state,
                      		scan: false 
                    	  })}
                	  >
                  		<Text style={styles.buttonTextStyle}>Stop Scan</Text>
                	  </TouchableOpacity>
              		</View>
            	  }
            	/>
            }
          </Fragment>
        </View>

    );
};

export default Scanner;

const styles = StyleSheet.create({

    scrollViewStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FEDBD0'
    },

    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: '#442C2E'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'black'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonScan: {
        width: 42,

    },
    descText: {
        padding: 16,
        textAlign: 'justify',
        fontSize: 16
    },


    highlight: {
        fontWeight: '700',
    },

    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: '#442C2E',
        marginTop: 32,

        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderRadius: 10
    },
    buttonTextStyle: {
        color: '#FEEAE6',
        fontWeight: 'bold',
    }

});