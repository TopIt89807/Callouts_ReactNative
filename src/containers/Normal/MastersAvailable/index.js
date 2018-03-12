import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Creators } from 'redux/actions/user';
import { Types, Creators as followCreators } from 'redux/actions/follow';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';
import NavigationBar from 'react-native-navbar';

class MastersAvailable extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Masters Available',
    //   // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    //   tabBarIcon: ({ tintColor }) => (
    //     <Image
    //       source={require('./chats-icon.png')}
    //       style={[styles.icon, {tintColor: tintColor}]}
    //     />
    //   ),
    };

    componentDidMount() {
      this.props.getUsers(2);
    }

    componentWillReceiveProps({ global, user, follow }) {
      if(follow.tab != this.props.follow.tab) {
        this.props.getUsers(2);
      }
      if (global.status.effects[Types.FOLLOW_ADD] === 'success'
      && this.props.global.status.effects[Types.FOLLOW_ADD] === 'request') {
        this.props.getUsers(2);
      }
    }

    onFollow(following) {
      this.props.followAdd(following);
    }

    logout() {
      this.props.screenProps.goBack();
      this.props.signOut();
    }
    
    render() {
      const rightButtonConfig = {
        title: 'Logout',
        handler: () => this.logout()
      };
      return (
        <View  style={{ flex: 1 }}>
          <NavigationBar
            title={{ title: 'Masters Available', }}
            rightButton={rightButtonConfig}
          />
          <FlatList
            data={this.props.user.masters}
            renderItem={({item}) => {
              // this.props.check(item._id);
              return <View style={styles.employee}>
                  {/* <Image style={styles.cover}
                      source={{uri: item.picture.large}}  /> */}
                  <View style={styles.info}>
                    <Text style={styles.name}>
                      {item.email}
                    </Text>
                  </View>
                  <View>
                    <Button
                      title={item.isFollowing? 'Followed': 'Follow'}
                      disabled={item.isFollowing? true: false}
                      onPress={() => this.onFollow(item._id)}
                    />
                  </View>
              </View>
              }}
            keyExtractor={item => item._id}
          />
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
      global: state.get('global'),
      user: state.get('user'),
      follow: state.get('follow'),
  }
}

const mapDispatchToProps = {
  getUsers: Creators.getUsers,
  followAdd: followCreators.followAdd,
  check: followCreators.check,
  signOut: Creators.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(MastersAvailable)
