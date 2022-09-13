/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
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
import { API_repos } from "../../services/api";

const RepositoriesScreen = ({ route, navigation }) => {
  const { user } = route.params;

  useEffect(() => {
    getRepos();
  }, []);

  const isDarkMode = useColorScheme() === "dark";
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState("");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getRepos = async () => {
    try {
      const response = await fetch(API_repos(user));
      const json = await response.json();
      setListRepos(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onSearchRepos = () => {
    let findUser = [];
    if (repos.length < 1) {
      Alert.alert("Error", "Inser name repos");
      getRepos();
    } else {
      if (user.toString.lenght === 0) {
        setIsLoading(false);
      } else {
        findUser = listRepos.filter((elem) => {
          if (elem.name.includes(repos.toLowerCase())) {
            return true;
          }
        });
        if (findUser.length > 0) {
          setListRepos(findUser);
        }
      }
    }
  };
  const [listRepos, setListRepos] = useState([]);

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
              style={{
                height: 40,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                color: isDarkMode ? Colors.white : Colors.black,
              }}
              value={repos}
              placeholder='Insert repos name'
              placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
              onChangeText={(text) => setRepos(text)}
            />
          </View>
          {repos.length > 0 && (
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
                  setRepos("");
                  getRepos();
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
            onPress={onSearchRepos}
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
          style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}
          data={listRepos}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 3,
                borderWidth: 1,
                margin: 3,
                borderRadius: 5,
                marginHorizontal: 5,
                borderColor: isDarkMode ? Colors.white : Colors.black,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      color: isDarkMode ? Colors.white : Colors.black,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "500",
                      color: isDarkMode ? Colors.white : Colors.black,
                    }}
                  >
                    {item.updated_at}
                  </Text>
                </View>
                <View
                  style={{
                    margin: 3,
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      borderRadius: 10,
                      padding: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("StargersScreen", {
                        user: user,
                        repos: item.name,
                      });
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        color: "white",
                        fontWeight: "600",
                        fontSize: 10,
                      }}
                    >
                      stargazers
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      {item.stargazers_count}
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

export default RepositoriesScreen;
