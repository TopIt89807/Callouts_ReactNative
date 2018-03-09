import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import MastersAvailable from './MastersAvailable';
import MastersFollowing from './MastersFollowing';
import Posts from './Posts';
import { Types, Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';

const MainTabNavigator = TabNavigator({
        Available: {
            screen: MastersAvailable,
        },
        Following: {
            screen: MastersFollowing,
        },
        Post: {
            screen: Posts,
        },
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: '#e91e63',
            inactiveTintColor: 'black',
        },
        
    }
);

class Normal extends React.Component {
    static navigationOptions = {
        // headerLeft: null,
        // title: "Callouts - Normal",
        header: null,
    };

    componentDidMount() {
        // this._onNav = this._onNav.bind(this);
    }

    _onNav = (prevState, nextState) => {
        this.props.setTabIndex(nextState.index);
    }

    render() {
        return (
            <MainTabNavigator onNavigationStateChange={this._onNav}/>
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
    setTabIndex: followCreators.setTabIndex,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Normal)