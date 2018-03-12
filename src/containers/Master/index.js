import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Types, Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';
import { Creators as postCreators } from 'redux/actions/post';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';

class Master extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    componentDidMount() {
        this.props.getPosts(this.props.user.result.user.id);
    }

    logout() {
        this.props.navigation.goBack();
        this.props.signOut();
    }

    onAdd = () => {
      const { navigate } = this.props.navigation;
      navigate('Wizard');
    }

    render() {
      const rightButtonConfig = {
          title: 'Logout',
          handler: () => this.logout()
      };
      return (
        <View  style={{ flex: 1 }}>
          <NavigationBar
            title={{ title: 'Your Posts', }}
            rightButton={rightButtonConfig}
          />
          <FlatList
            data={this.props.post.posts}
            renderItem={({item}) => {
              return <View style={styles.employee}>
                  <Text style={styles.date}>
                    {Moment(item.created_date).format('YYYY/MM/DD H:mm:s')}
                  </Text>
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
          <View style={styles.addBtnContainer}>
            <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={this.onAdd}
            />
          </View>
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
  getPosts: postCreators.getPosts,
  getFollowings: followCreators.getFollowings,
  signOut: Creators.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Master)