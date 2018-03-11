import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Lists from './Lists';
import Posts from './Posts';

const MastersFollowing = StackNavigator({
  Lists: { screen: Lists },
  Posts: { screen: Posts },
}, {
  navigationOptions: {
    gesturesEnabled: false,
    cardStack: { gesturesEnabled: false },
    tabBarLabel: 'Masters Following',
    header: null,
  }
});

export default MastersFollowing;