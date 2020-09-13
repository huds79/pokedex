/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text } from 'react-native';
import Detail from './src/Components/Detail/Detail';
import MainView from './src/Components/Main/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const stackNavigator = createStackNavigator();

const App = () => {
  return (
    <>
      
      <NavigationContainer>
      <stackNavigator.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <stackNavigator.Screen name="Main" component={MainView} />
        <stackNavigator.Screen name="Detail" component={Detail} />
      </stackNavigator.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
