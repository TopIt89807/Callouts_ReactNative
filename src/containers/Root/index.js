import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from 'containers/Splash';
import Login from 'containers/Authentication/Login';
import Signup from 'containers/Authentication/Signup';

const RootNavigator = StackNavigator({
  Splash: { screen: Splash },
  Login: { screen: Login },
  Signup: { screen: Signup },
}, {
  navigationOptions: {
    gesturesEnabled: false,
    cardStack: { gesturesEnabled: false }
  }
});

export default RootNavigator;