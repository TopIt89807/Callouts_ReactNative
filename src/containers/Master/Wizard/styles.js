import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from 'theme';

export default  StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#FFFFFF',
        // borderBottomColor: '#DDDDDD',
        // borderBottomWidth: 1
    },
    cover: {
        width: Metrics.screenWidth,
        height: 300,
        // marginLeft: 10,
        resizeMode: 'contain'
    },
    description: {
        flex: 1,
    },
    noimage: {
        flex: 1,
        alignSelf: 'center'
    },
    text: {
        // marginBottom: 12,
        margin: 10,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
    },
});