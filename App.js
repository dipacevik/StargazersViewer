/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { View } from "react-native-ui-lib";
import RootNavigation from "./src/navigation";
import HomeScreen from "./src/screen/homescreen/HomeScreen";
import { NetworkServices } from "./src/services/networkServices";

export default App = () => {
  return (
    <NetworkServices>
      <RootNavigation />
    </NetworkServices>
  );
};
