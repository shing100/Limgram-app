import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";
import styles from './styles';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 로그인 했는지 안했는지 모르기 때문에

  const preLoad = async() => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);

      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === null || isLoggedIn === false) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    preLoad()
  }, [])
  
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View>
          {isLoggedIn === true ? <Text>I'm In</Text> : <Text>I'm Out</Text>} 
        </View>
      </ThemeProvider>
    </ApolloProvider> 
  ) : (
    <AppLoading />
  )
}

