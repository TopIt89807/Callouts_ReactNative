import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Types, Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';

class MastersAvailable extends React.Component {
    static navigationOptions = {
      title: "Masters Available",
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
    }

    onFollow(following) {
      this.props.followAdd(following);
    }
  
    render() {
      return (
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
                  <Button title="Follow" onPress={() => this.onFollow(item._id)}/>
                </View>
            </View>
            }}
          keyExtractor={item => item._id}
        />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(MastersAvailable)
