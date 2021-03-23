import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import {
  Appbar,
  List,
  Button,
  FAB,
  Portal,
  Provider,
  Modal,
  TextInput,
} from "react-native-paper";
import uuid from "uuid-random";
import Moment from "react-moment";
import * as Linking from "expo-linking";
import { dataToFrames } from "qrloop";
import QRCodeLoop from "./QRCodeLoop";
import ScanHistory from "../db/modal";

const TabCard = ({ url, handleSend }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handleOpen = () => {
    try {
      Linking.openURL(url);
    } catch (e) {
      console.error("Some error in <Linking />", e);
    }
  };

  return (
    <View style={styles.tabcard}>
      <List.Item
        title={url}
        titleNumberOfLines={expanded ? 100 : 1}
        right={(props) => (
          <List.Icon
            {...props}
            icon={expanded ? "chevron-up" : "chevron-down"}
          />
        )}
        onPress={handlePress}
      />
      {expanded && (
        <View style={styles.action}>
          <Button onPress={handleOpen} color="#31A05F">
            Open
          </Button>
          <Button onPress={() => handleSend(url)} color="#31A05F">
            Send
          </Button>
        </View>
      )}
    </View>
  );
};

const FABButton = (props) => {
  const { onDelete, onRename, onSendAll } = props;
  const [state, setState] = React.useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });

  return (
    <FAB.Group
      open={open}
      icon={open ? "close" : "plus"}
      color="white"
      fabStyle={{ backgroundColor: "#a16447" }}
      actions={[
        {
          icon: "qrcode",
          label: "Send",
          onPress: onSendAll,
        },
        {
          icon: "delete",
          label: "Delete",
          onPress: onDelete,
        },
        {
          icon: "pencil",
          label: "Rename",
          onPress: onRename,
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => console.log("FAB pressed")}
    />
  );
};

export default function SavedItemExpanded(props) {
  /**
   * Constants needed to display QR big enough to scan
   */
  const WINDOW_WIDTH = useWindowDimensions().width;
  const WINDOW_HEIGHT = useWindowDimensions().height;

  // QR code's height and width in px
  const QRCodeSize = Math.round(0.75 * Math.min(WINDOW_HEIGHT, WINDOW_WIDTH));

  const { data, deleteItem } = props.route.params;
  const [QRModalvisible, setQRModalVisible] = React.useState(false);
  const [renameModalVisible, setRenameModalVisible] = React.useState(false);
  const [frames, setFrames] = React.useState(null);
  const [newTitle, setNewTitle] = React.useState("");

  const showQRModal = (dataToShow) => {
    setFrames(dataToFrames(dataToShow, 100, 4));
    setQRModalVisible(true);
  };

  const showRenameModal = () => {
    setRenameModalVisible(true);
  };

  const hideQRModal = () => {
    setQRModalVisible(false);
  };

  const hideRenameModal = () => {
    setRenameModalVisible(false);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onDelete = () => {
    // delete from db instance
    ScanHistory.destroy(data.id);
    // call a function here to delete the data from parent
    deleteItem(data.id);
    // return back
    props.navigation.goBack();
  };

  const onRename = () => {
    showRenameModal();
  };

  const onTitleUpdate = () => {
    // update db instance
    ScanHistory.update({
      id: data.id,
      title: newTitle,
      timestamp: Math.round(Date.now() / 1000),
    });
    // update itself
    data.title = newTitle;
    // update parent ... did automatically
    hideRenameModal();
  };

  const onSendAll = React.useCallback(() => {
    showQRModal(JSON.stringify(data.windowInfo));
  }, [showQRModal]);

  const onSendSingle = React.useCallback(
    (url) => {
      const value = JSON.stringify({
        incognito: data.windowInfo.incognito,
        tabs: [url],
      });
      showQRModal(value);
    },
    [showQRModal]
  );

  const renderItem = ({ item: tabUrl }) => (
    <TabCard url={tabUrl} handleSend={onSendSingle} />
  );

  // For making the last item not come under FAB icon
  const renderFooter = <View style={{ height: 70 }} />;

  const keyExtractor = (item) => uuid();

  return (
    <Provider>
      <Portal>
        <View style={styles.root}>
          <Appbar.Header
            dark={true}
            style={{ backgroundColor: "#7BC887", elevation: 0 }}
          >
            <Appbar.BackAction onPress={goBack} color="white" />
            <Appbar.Content
              title={data.title}
              titleStyle={{ color: "white", fontFamily: "sans-serif-light" }}
            />
          </Appbar.Header>

          <View style={styles.body}>
            <View style={styles.fileInfo}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>{data.windowInfo.tabs.length}</Text>
                <Text style={styles.subtitle}>Tabs</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Moment
                  element={Text}
                  format="D MMM YYYY"
                  style={styles.title}
                  unix
                >
                  {data.timestamp}
                </Moment>
                <Text style={styles.subtitle}>Last edit</Text>
              </View>
            </View>

            <FlatList
              data={data.windowInfo.tabs}
              renderItem={renderItem}
              ListFooterComponent={renderFooter}
              keyExtractor={keyExtractor}
            />
          </View>

          <FABButton
            onDelete={onDelete}
            onRename={onRename}
            onSendAll={onSendAll}
          />

          <Modal
            visible={QRModalvisible}
            onDismiss={hideQRModal}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <QRCodeLoop
              frames={frames}
              fps={5}
              size={QRCodeSize}
              quietZone={20}
            />
          </Modal>

          <Modal
            visible={renameModalVisible}
            onDismiss={hideRenameModal}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 5,
                borderRadius: 5,
                elevation: 5,
              }}
            >
              <TextInput
                label="New Title"
                placeholder={data.title}
                autoFocus={true}
                style={{ backgroundColor: "transparent" }}
                onChangeText={(text) => setNewTitle(text)}
              />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Button
                  mode="text"
                  onPress={hideRenameModal}
                  color="red"
                  compact={true}
                >
                  Cancel
                </Button>
                <Button
                  mode="text"
                  onPress={onTitleUpdate}
                  color="green"
                  compact={true}
                >
                  Update
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: "#2D2D2D",
    backgroundColor: "#7BC887",
  },
  body: {
    flex: 1,
    marginTop: 20,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "white",
  },
  fileInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 5,
    fontFamily: "sans-serif-light",
  },
  subtitle: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 14,
    fontFamily: "sans-serif-light",
  },
  tabcard: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#b8e0c7",
    // elevation: 3,
    // overlayColor: "#b8e0c7",
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
