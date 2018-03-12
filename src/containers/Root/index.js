import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from 'containers/Splash';
import Login from 'containers/Authentication/Login';
import Signup from 'containers/Authentication/Signup';
import Normal from 'containers/Normal';
import Master from 'containers/Master';
import Wizard from 'containers/Master/Wizard';

console.ignoredYellowBox = ['Remote debugger'];

const RootNavigator = StackNavigator({
  Splash: { screen: Splash },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Normal: { screen: Normal },
  Master: { screen: Master },
  Wizard: { screen: Wizard },
}, {
  navigationOptions: {
    gesturesEnabled: false,
    cardStack: { gesturesEnabled: false },
  }
});

export default RootNavigator;