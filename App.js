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

      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    preLoad()
  }, [])
  
  return loaded && client ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View>
          <Text> Open up App.js to start working on your app! </Text> 
        </View>
      </ThemeProvider>
    </ApolloProvider> 
  ) : (
    <AppLoading />
  )
}

