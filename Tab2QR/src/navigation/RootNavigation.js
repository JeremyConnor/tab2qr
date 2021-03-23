import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Scan from "../screens/Scan";
import Save from "../screens/Save";

const Tab = createMaterialBottomTabNavigator();

export default function RootNavigation(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Scan"
        barStyle={{
          backgroundColor: "white",
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: "rgba(0,0,0,0.1)",
        }}
      >
        <Tab.Screen
          name="Scan"
          component={Scan}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="camera-iris"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Saved"
          // component={Save}
          children={() => <Save {...props} />}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bookmark-multiple"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
