/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { API_stargazers } from "../../services/api";

const StargersScreen = ({ route }) => {
  const { user, repos } = route.params;
  useEffect(() => {
    getStargazers();
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getStargazers = async () => {
    try {
      const response = await fetch(API_stargazers(user, repos));
      const json = await response.json();
      setListStargazers(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const [listStargazers, setListStargazers] = useState([]);

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
        }}
      >
        {/* <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 8,
            borderWidth: 1,
            margin: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput style={{ height: 40 }} placeholder='Insert name' />
          </View>

          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 10,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "400",
                textTransform: "uppercase",
              }}
            >
              Cerca
            </Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={listStargazers}
          style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 3,
                borderWidth: 1,
                margin: 3,
                borderRadius: 5,
                borderColor: isDarkMode ? Colors.white : Colors.black,
                marginHorizontal: 5,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    marginHorizontal: 3,
                  }}
                  resizeMode={"contain"}
                  source={{
                    uri: item.avatar_url,
                  }}
                />
                <View
                  style={{
                    justifyContent: "space-around",
                    paddingHorizontal: 3,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      color: isDarkMode ? Colors.white : Colors.black,
                    }}
                  >
                    {item.login}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: isDarkMode ? Colors.white : Colors.black,
                    }}
                  >
                    {item.url}
                  </Text>
                </View>
                <View style={{ margin: 3, justifyContent: "center" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onPress={() => Linking.openURL(item.html_url)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Open
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default StargersScreen;
