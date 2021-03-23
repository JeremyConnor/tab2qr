import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Moment from "react-moment";
import * as SplashScreen from "expo-splash-screen";
import RootNavigation from "./src/navigation/RootNavigation";
import ScanHistory from "./src/db/modal";
import "react-native-gesture-handler";

// Start the pooled timer which runs every 60 seconds
// (60000 milliseconds) by default.
Moment.startPooledTimer();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [scannedHistory, setScannedHistory] = React.useState(null);

  React.useEffect(() => {
    const showSplashScreenWhileLoading = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
      loadDatabase();
    };

    showSplashScreenWhileLoading();
  }, []);

  const loadDatabase = async () => {
    try {
      // create the table if not created
      createTable();
      queryTable();
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  const createTable = React.useCallback(async () => {
    await ScanHistory.createTable();
  }, []);

  const queryTable = React.useCallback(async () => {
    setScannedHistory(await ScanHistory.query({ order: "timestamp DESC" }));
  }, []);

  return appIsReady ? (
    <SafeAreaView style={styles.root}>
      <RootNavigation
        databaseInstance={ScanHistory}
        scannedHistory={scannedHistory}
      />
      <StatusBar hidden />
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
});
