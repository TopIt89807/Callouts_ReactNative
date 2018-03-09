import React from 'react';
import { Button, StyleSheet } from 'react-native';

class MastersFollowing extends React.Component {
    static navigationOptions = {
      title: "Masters Following",
      tabBarLabel: 'Masters Following',
    };
  
    componentDidMount() {
    }

    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      );
    }
}

export default MastersFollowing;