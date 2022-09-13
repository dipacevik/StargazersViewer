/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { API_all_user, API_user } from "../../services/api";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    getUsersGit();
  }, []);

  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getUsersGit = async () => {
    setIsLoading(false);
    try {
      const response = await fetch(API_all_user());
      const json = await response.json();
      setListUsers(json);
      setIsLoading(true);
    } catch (error) {
      setIsLoading(true);
      setListUsers([]);
    } finally {
      setIsLoading(true);
    }
  };

  const onSearchUsers = async () => {
    let findUser = [];
    if (user.length < 1) {
      setIsLoading(false);
      getUsersGit();
    } else {
      try {
        const response = await fetch(API_user(user));
        const json = await response.json();
        if (json.message === "Not Found" && json.message != undefined) {
          Alert.alert("Not Found", "No users found", [
            { text: "OK", onPress: () => getUsersGit() },
          ]);
        } else {
          findUser.push(json);
          setListUsers(findUser);
        }
        setIsLoading(true);
      } catch (error) {
        if (error.message === "Not Found") {
          Alert.alert("Not found", "No asd");
        }
        setIsLoading(true);
        setListUsers([]);
      } finally {
        setIsLoading(true);
      }
    }
  };

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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            borderColor: isDarkMode ? Colors.white : Colors.black,
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 8,
            borderWidth: 1,
            margin: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              value={user}
              style={{
                height: 40,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                color: isDarkMode ? Colors.white : Colors.black,
              }}
              placeholder='Insert user name'
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={(text) => {
                if (text.length < 1) {
                  getUsersGit();
                }
                setUser(text);
              }}
            />
          </View>
          {user.length > 0 && (
            <View
              style={{
                marginHorizontal: 3,
                justifyContent: "center",
                opacity: 0.5,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 3,
                  paddingHorizontal: 5,
                  justifyContent: "center",
                  backgroundColor: "#c1c1c1",
                  borderRadius: 1000,
                }}
                onPress={() => {
                  setUser("");
                  getUsersGit();
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 10,
              backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onSearchUsers}
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
        </View>
        <FlatList
          data={listUsers}
          style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 3,
                borderWidth: 1,
                margin: 3,
                marginHorizontal: 5,
                borderRadius: 5,
                borderColor: isDarkMode ? Colors.white : Colors.black,
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
                    onPress={() =>
                      navigation.navigate("RepositoriesScreen", {
                        user: item.login,
                      })
                    }
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      repos
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

export default HomeScreen;
