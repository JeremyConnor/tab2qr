import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import QRLoopScanner from "../components/QRLoopScanner";
import ScanHistory from "../db/modal";

export default function Scan(props) {
  const [result, setResult] = React.useState(null);
  const [errorOccurred, setErrorOccurred] = React.useState(false);
  const isFocused = useIsFocused();

  const validate = (jsonValue) => {
    // for (let key in jsonValue) {
    //   if (key === "incognito") {
    //     if (typeof jsonValue[key] !== typeof true) {
    //       return false;
    //     }
    //   } else if (key === "tabs") {
    //   if (key === "tabs") {
    //     if (!Array.isArray(jsonValue[key])) {
    //       return false;
    //     }
    //   } else {
    //     return false;
    //   }
    // }
    return true;
  };

  const onResult = (newResult) => {
    console.log("newResult", typeof(newResult));
    try {
      let scannedResult = JSON.parse(newResult);
      if (validate(scannedResult)) {
        setResult(scannedResult);
      } else {
        // invalid json data
        setErrorOccurred(true);
      }
    } catch (e) {
      setErrorOccurred(true);
    }
  };

  const onError = (error) => {
    console.warn("QRLoopScanner.js > Scan.js ERROR", error);
    setErrorOccurred(true);
  };

  const onPressSave = async () => {
    const _title = `scanned ${moment().format("DD/MM/YY hh:ss a")}`;

    const toInsert = {
      title: _title,
      timestamp: Math.round(Date.now() / 1000),
      windowInfo: result,
    };

    console.log("toInsert", toInsert);

    // make a database entry
    try {
      await ScanHistory.create(toInsert);
    } catch (e) {
      console.warn("Database error");
      console.log(e);
    } finally {
      // clear result from here
      setResult(null);
    }
  };

  const onPressCancel = () => {
    setResult(null);
  };

  const onPressScanAgain = () => {
    setErrorOccurred(false);
  };

  const renderResultScreen = () => {
    Alert.alert(
      "Scanned successfully",
      "Do you want to save the list ?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: onPressCancel,
        },
        {
          text: "OK",
          style: "positive",
          onPress: onPressSave,
        },
      ],
      { cancelable: false }
    );
  };

  const renderErrorScreen = () => {
    Alert.alert(
      "Error",
      "QR code is either not supported or invalid",
      [
        {
          text: "Scan again",
          style: "positive",
          onPress: onPressScanAgain,
        },
      ],
      { cancelable: false }
    );
  };

  if (isFocused) {
    if (errorOccurred) {
      return <View style={styles.root}>{renderErrorScreen()}</View>;
    } else if (result) {
      return <View style={styles.root}>{renderResultScreen()}</View>;
    } else {
      return <QRLoopScanner onResult={onResult} onError={onError} />;
    }
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 25,
  },
});
