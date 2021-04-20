import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Button} from 'react-native-paper';
import * as Linking from 'expo-linking';

export default function TabCard({url, handleSend}) {
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handleOpen = () => {
    try {
      Linking.openURL(url);
    } catch (e) {
      console.error('Some error in <Linking />', e);
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
            icon={expanded ? 'chevron-up' : 'chevron-down'}
          />
        )}
        onPress={handlePress}
      />
      {expanded && (
        <View style={styles.action}>
          <Button onPress={handleOpen} color="#31A05F">
            Open
          </Button>
          {handleSend && (
            <Button onPress={() => handleSend(url)} color="#31A05F">
              Send
            </Button>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabcard: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#b8e0c7',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
