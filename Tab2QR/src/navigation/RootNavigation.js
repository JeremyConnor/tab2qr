import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Scan from '../screens/Scan';
import Save from '../screens/Save';

const Tab = createMaterialBottomTabNavigator();

export default function RootNavigation(props) {
  const buttons = [
    {
      name: 'Scan',
      component: Scan,
      icon: 'camera-iris',
    },
    {
      name: 'Saved',
      component: Save,
      icon: 'bookmark-multiple',
    },
  ];

  const NavScreen = ({name, component, icon}) => (
    <Tab.Screen
      name={name}
      component={component}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        ),
      }}
    />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Scan" barStyle={styles.bottomNav}>
        {buttons.map((eachScreen) => NavScreen(eachScreen))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: 'white',
    elevation: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
});
