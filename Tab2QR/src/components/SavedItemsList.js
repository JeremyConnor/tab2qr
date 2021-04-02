import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import uuid from 'uuid-random';
import Moment from 'react-moment';
import ScanHistory from '../db/modal';

/**
 * Item format :
 * {
 *   title: <filename>,
 *   timestamp: <time-date>,
 *   windowInfo: {
 *     tabs: <array-of-urls>
 *   }
 * }
 */

const ListItemCard = ({item, deleteItem}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('SavedItemExpanded', {
      data: item,
      deleteItem: deleteItem,
    });
  };

  return item.windowInfo.tabs ? (
    <TouchableOpacity onPress={onPress}>
      <Surface style={[styles.surface]}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.center}>
          <Text style={styles.itemSubtitle}>
            {item.windowInfo.tabs.length} tabs
          </Text>
          <Text>
            <Moment
              element={Text}
              format="D MMM YYYY"
              style={styles.itemSubtitle}
              unix>
              {item.timestamp}
            </Moment>
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  ) : null;
};

export default function SavedItemsList(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [scannedHistory, setScannedHistory] = React.useState(
    props.scannedHistory,
  );

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setScannedHistory(await ScanHistory.query({order: 'timestamp DESC'}));
    setRefreshing(false);
  }, [refreshing]);

  const handleDelete = (_id) => {
    setScannedHistory((prev) => prev.filter((item) => item.id != _id));
  };

  const renderItem = (value) => (
    <ListItemCard {...value} deleteItem={handleDelete} />
  );

  const keyExtractor = (item) => uuid();

  const separator = () => <View style={{padding: 10}} />;

  const footer = () => <View style={{padding: 10}} />;

  return (
    <View style={styles.root}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={scannedHistory}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={separator}
        ListFooterComponent={footer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  surface: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#7BC887',
    elevation: 4,
  },
  itemTitle: {
    fontSize: 19,
    paddingVertical: 5,
    fontFamily: 'sans-serif-light',
    color: 'white',
  },
  itemSubtitle: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    color: 'white',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 20,
    fontFamily: 'sans-serif-light',
    color: 'black',
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
