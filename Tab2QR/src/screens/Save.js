import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SavedItemsList from "../components/SavedItemsList";
import SavedItemExpanded from "../components/SavedItemExpanded";

const Stack = createStackNavigator();

export default function Save(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SavedItemsList">
      <Stack.Screen
        name="SavedItemsList"
        children={() => <SavedItemsList {...props} />}
      />
      <Stack.Screen name="SavedItemExpanded" component={SavedItemExpanded} />
    </Stack.Navigator>
  );
}
