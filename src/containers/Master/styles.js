import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from 'theme';

export default  StyleSheet.create({
    employee: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1
    },
    cover: {
        // flex: 1,
        // width: 150,
        height: 200,
        // marginLeft: 10,
        resizeMode: 'contain'
    },
    noimage: {
        flex: 1,
        alignSelf: 'center'
    },
    date: {
      flex: 1,
      alignSelf: 'flex-end'
    },
    text: {
        // marginBottom: 12,
        margin: 10,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
    },
    addBtnContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 50,
    },
});