import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from 'theme';

export default  StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.backgroundPrimary,
    },
    login: {
        ...Styles.fullScreen,
    },
    space: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'lightgreen',
        fontSize: 40,
        fontStyle: 'italic',
    },
    inputGroup: {
        flex:1.3,
        marginLeft: 20,
        marginRight:20,
    },
    textInput: {
        fontSize: 20,
        color: 'black',
        backgroundColor: 'lightyellow',
        marginBottom:15,
        padding:10,
        paddingLeft:20,
        borderRadius: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#2E9298',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
    },
    loginText: {
        color: 'white',
        fontSize: 18,
    }
});