import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Modal} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import uuid from 'uuid-random';
import TabCard from './TabCard';

// Display all the URLs as a list.
export default function DisplayUrls(props) {
  const renderItem = ({item: tabUrl}) => <TabCard url={tabUrl} />;

  const keyExtractor = (item) => uuid();

  return (
    <Modal
      visible={props.visible}
      contentContainerStyle={styles.modal}
      onDismiss={props.onClose}>
      <View style={styles.centeredView}>
        <View style={styles.headerContainer}>
          <View style={styles.evenly}>
            <Ionicons
              name="chevron-back"
              size={32}
              color="green"
              onPress={props.onClose}
            />
          </View>
          <View style={styles.evenly}>
            <Text style={styles.heading}>Found tabs</Text>
          </View>
          <View style={styles.evenly} />
        </View>
        <FlatList
          data={props.data ? props.data.tabs : []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.fullWidth}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 20,
    marginTop: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
  },
  fullWidth: {
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
  },
  evenly: {
    flex: 1,
  },
});
