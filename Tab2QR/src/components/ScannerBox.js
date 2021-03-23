import * as React from "react";
import { View, StyleSheet } from "react-native";

const scanBoxWidth = 250;

const BoxCorner = (props) => {
  const additionalStyle = props.style || {};
  return <View style={[styles.box, { ...additionalStyle }]} />;
};

export default function ScannerBox(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <BoxCorner />
        <BoxCorner style={{ transform: [{ rotate: "90deg" }] }} />
      </View>
      <View style={styles.row}>
        <BoxCorner style={{ transform: [{ rotate: "-90deg" }] }} />
        <BoxCorner style={{ transform: [{ rotate: "180deg" }] }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scanBoxWidth,
    width: scanBoxWidth,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 30,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
});
