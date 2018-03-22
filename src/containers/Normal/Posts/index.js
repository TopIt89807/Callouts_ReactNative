import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Creators } from 'redux/actions/user';
import { Types, Creators as postCreators } from 'redux/actions/post';
import styles from './styles';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';

class Posts extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'All Posts',
    };

    componentWillReceiveProps({ global, user, follow, post }) {
      if(follow.tab != -1 && follow.tab != this.props.follow.tab) {
        this.props.getAll();
      }
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
            title={{ title: 'All Posts', }}
            rightButton={rightButtonConfig}
          />
          <FlatList
            data={this.props.post.posts}
            renderItem={({item}) => {
              return <View style={styles.employee}>
                  <View style={styles.info}>
                    <Text style={styles.user}>
                      {item.master_id.email}
                    </Text>
                    <Text style={styles.date}>
                      {Moment(item.created_date).format('YYYY/MM/DD H:mm:s')}
                    </Text>
                  </View>
                  {item.image? 
                    <Image style={styles.cover}
                          source={{uri: item.thumb_img}}/>
                    : <Text style={styles.noimage}>No Image</Text>
                  }
                  <Text style={styles.text}>
                    {item.text}
                  </Text>
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
      post: state.get('post'),
  }
}

const mapDispatchToProps = {
  getAll: postCreators.getAll,
  signOut: Creators.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)