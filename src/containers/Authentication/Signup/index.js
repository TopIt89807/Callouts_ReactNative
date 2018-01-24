import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MessageBox from 'components/MessageBox'
import { Types, Creators } from 'redux/actions/user';
import { Creators as globalCreators } from 'redux/actions/global';

class Signup extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    state = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    componentWillReceiveProps({ global, user }) {

        if (global.status.effects[Types.SIGN_UP] === 'success'
            && this.props.global.status.effects[Types.SIGN_UP] === 'request') {

            // const { navigation } = this.props;
            // navigation.goBack();

        //     if (user.err !== null) {
        //         if (user.err.code === 'UserNotConfirmedException') {
        //         navigate('ConfirmUser', { username: this.state.email })
        //         }
        //     } else {
        //         if (user.result.mfa === true) {
        //         navigate('CodeVerify')
        //         }
        //     }
        }
    }

    onLogin = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    validateInput = () => {
        const { email, password, confirmPassword } = this.state;

        if(!email || !password || !confirmPassword) {
            this.props.showMessage({
                visible: true,
                title: 'Error...',
                text: 'Please enter all information!',
            });
            return false;
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            this.props.showMessage({
                visible: true,
                title: 'Error...',
                text: 'Invalid email type!',
              });
            return false;
        }

        if (password !== confirmPassword) {
            this.props.showMessage({
              visible: true,
              title: 'Error...',
              text: 'Password does not match the confirm Password!',
            });
            return false
        }
        return true;
    }

    onSignup = () => {
        if (this.validateInput() === false) return;

        const { email, password } = this.state;
        this.props.signUp(email, password);
    }

    hideMessage = () => {
        this.props.showMessage({ visible: false })
        if(this.props.global.status.effects[Types.SIGN_UP] == "success") {
            const { navigation } = this.props;
            navigation.goBack();
        }
    }

    render() {
        const { status, message } = this.props.global;
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
                            returnKeyType={'next'}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry
                            placeholder='Password'
                            returnKeyType={'next'}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry
                            placeholder='Confirm Password'
                            returnKeyType={'go'}
                            onChangeText={(text) => this.setState({confirmPassword: text})}
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
    signUp: Creators.signUp,
    showMessage: globalCreators.showMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)