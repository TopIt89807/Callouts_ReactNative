import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './styles'

class Splash extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })
    
    componentDidMount() {
        const { navigation } = this.props;
        setTimeout(() => {
            navigation.navigate('Home');
        }, 1000);
    }
    render() {
        return (
            <View style={styles.splash}>
                <Text style={styles.text}>
                    Callouts
                </Text>
            </View>
        );
    }
}

export default Splash;