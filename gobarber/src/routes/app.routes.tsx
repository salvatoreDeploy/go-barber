import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../screens/dashboard";

const App = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#312e38" },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
  );
}
