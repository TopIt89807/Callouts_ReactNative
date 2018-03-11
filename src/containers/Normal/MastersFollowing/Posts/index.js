import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Types, Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';
import Moment from 'moment';

class Posts extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "View posts"
    });
  
    render() {
      return (
        <FlatList
          data={this.props.navigation.state.params.posts}
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
  getFollowings: followCreators.getFollowings,
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)