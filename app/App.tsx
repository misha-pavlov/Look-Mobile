import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from 'react-apollo';
import { client } from './helpers/client/client';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  );
}
