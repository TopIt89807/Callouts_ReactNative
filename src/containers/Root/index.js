import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from 'containers/Splash';

// const HomeScreen = ({ navigation }) => (
//   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Home Screen</Text>
//     <Button
//       onPress={() => navigation.navigate('Details')}
//       title="Go to details"
//     />
//   </View>
// );

const RootNavigator = StackNavigator({
  Splash: { screen: Splash },
  // Home: { screen: HomeScreen },
});
export default RootNavigator;

/*export default class Root extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  */