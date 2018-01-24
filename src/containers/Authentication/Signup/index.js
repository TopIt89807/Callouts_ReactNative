import React from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Signup extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    onLogin = () => {
        const { navigation } = this.props;
        // navigation.navigate("Login");
        navigation.goBack(null);
    }

    onSignup = () => {

    }

    render() {
        return (
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.scrollView}
            >
                <View style={styles.signup}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        placeholder='Email'
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry
                        placeholder='Password'
                    />
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry
                        placeholder='Confirm Password'
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonContainer}
                        onPress={this.onSignup}
                    >
                        <Text style={styles.loginText}> Register </Text>
                    </TouchableOpacity>
                    <Button
                        title='Already registered? Login'
                        onPress={this.onLogin}
                    />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default Signup;