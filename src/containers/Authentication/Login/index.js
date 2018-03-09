import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonWidgets from 'components/CommonWidgets'
import MessageBox from 'components/MessageBox'
import { Types, Creators } from 'redux/actions/user';
import { Creators as globalCreators } from 'redux/actions/global';

class Login extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    state = {
        email: '',
        password: '',
    }

    componentWillReceiveProps({ global, user }) {
        if (global.status.effects[Types.SIGN_IN] === 'success'
            && this.props.global.status.effects[Types.SIGN_IN] === 'request') {
            const { navigate } = this.props.navigation;
            navigate('Normal');
        }
    }

    validateInput = () => {
        const { email, password } = this.state;

        if (!email || !password) {
            this.props.showMessage({
                visible: true,
                title: 'Error...',
                text: 'Please enter all information!',
            })
            return false;
        }

        return true;
    }

    onLogin = () => {
        if (this.validateInput() === false) {
            return;
        }
      
        const { email, password } = this.state
        this.props.signIn(email, password);
    }

    onSignup = () => {
        const {navigation} = this.props;
        navigation.navigate("Signup");
    }

    hideMessage = () => {
        this.props.showMessage({ visible: false })
    }

    render() {
        const { status, message } = this.props.global
        return (
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.scrollView}
            >
                <View style={styles.login}>
                    <View style={styles.space}>
                        <Text style={styles.titleText}>
                            Callouts
                        </Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.textInput}
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            placeholder='Email'
                            onChangeText={(text) => this.setState({email: text})}
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) => this.setState({password: text})}
                        />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonContainer}
                            onPress={this.onLogin}
                        >
                            <Text style={styles.loginText}> Log In </Text>
                        </TouchableOpacity>
                        <Button
                            title='Create an account'
                            onPress={this.onSignup}
                        />
                    </View>
                </View>
                <MessageBox visible={message.visible} title={message.title} text={message.text} onRequestClose={this.hideMessage} />

            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        global: state.get('global'),
        user: state.get('user'),
    }
}

const mapDispatchToProps = {
    signIn: Creators.signIn,
    showMessage: globalCreators.showMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)