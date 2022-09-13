import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/homescreen/HomeScreen";
import StargersScreen from "../screen/stargersscreen/StargersScreen";
import RepositoriesScreen from "../screen/repositoriesscreen/RepositoriesScreen";
import { color } from "react-native-reanimated";
import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const Stack = createNativeStackNavigator();

export default RootNavigation = () => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "red" },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitle: "HOME",
            headerBackTitle: "Home",
            headerTitleStyle: {
              color: isDarkMode ? Colors.lighter : Colors.darker,
            },
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
        <Stack.Screen
          name='RepositoriesScreen'
          component={RepositoriesScreen}
          options={{
            headerTitle: "REPOSITORIES",
            headerBackTitle: "Home",
            headerTitleStyle: {
              color: isDarkMode ? Colors.lighter : Colors.darker,
            },
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
        <Stack.Screen
          name='StargersScreen'
          component={StargersScreen}
          options={{
            headerTitle: "STARGERS",
            headerBackTitle: "Repos",
            headerTitleStyle: {
              color: isDarkMode ? Colors.lighter : Colors.darker,
            },
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
