import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';
import { Types, Creators as postCreators } from 'redux/actions/post';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';
import NavigationBar from 'react-native-navbar';

class Lists extends React.Component {
    static navigationOptions = {
      title: "Masters Following"
    };
  
    componentDidMount() {
      // this.viewProfile = this.viewProfile.bind(this);
    }

    componentWillReceiveProps({ global, user, follow, post }) {
      if(follow.tab != this.props.follow.tab) {
        this.props.getFollowings();
      }
      if (global.status.effects[Types.GET_POSTS] === 'success'
          && this.props.global.status.effects[Types.GET_POSTS] === 'request') {
        const { navigate } = this.props.navigation;
        navigate('Posts', this.props.post);
      }

    }

    viewProfile = (following) => {
      this.props.getPosts(following._id);
    }

    render() {
      return (
        <View  style={{ flex: 1 }}>
          <NavigationBar
            title={{ title: 'Masters Following', }}
          />
          <FlatList
            data={this.props.follow.followings}
            renderItem={({item}) => {
              return <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.viewProfile(item.following_id)}
              >
                <View style={styles.employee}>
                  <View style={styles.info}>
                    <Text style={styles.name}>
                      {item.following_id.email}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
      post: state.get('post'),
  }
}

const mapDispatchToProps = {
  getFollowings: followCreators.getFollowings,
  getPosts: postCreators.getPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)