import React from 'react';
import { Button, StyleSheet } from 'react-native';

class Posts extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'All Posts',
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      );
    }
}

export default Posts;