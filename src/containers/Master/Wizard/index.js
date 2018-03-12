import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, TextInput, Text, View, Image, TouchableOpacity } from 'react-native';
import { Creators } from 'redux/actions/user';
import { Creators as followCreators } from 'redux/actions/follow';
import { Types, Creators as postCreators } from 'redux/actions/post';
import { Creators as globalCreators } from 'redux/actions/global';
import styles from './styles';
import Moment from 'moment';
import NavigationBar from 'react-native-navbar';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Wizard extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    state = {
        description: '',
    }

    componentDidMount() {
    }

    componentWillReceiveProps({ global, user, follow, post }) {
        if (global.status.effects[Types.ADD_POST] === 'success'
            && this.props.global.status.effects[Types.ADD_POST] === 'request') {
            this.props.getPosts(this.props.user.result.user.id);
                
          this.props.navigation.goBack();
        }
    }

    onSave = () => {
        this.props.addPost(this.props.user.result.user.id, this.state.description, '');
        // this.setState({description: 'abc'});
        // console.log(this.state.description);
    }

    render() {
      const leftButtonConfig = {
        title: '<Back',
        handler: () => this.props.navigation.goBack()
      };
      const rightButtonConfig = {
        title: 'Save',
        handler: this.onSave
      };
      return (
        <View style={{flex: 1}}>
            <NavigationBar
                title={{ title: 'Post Wizard', }}
                leftButton={leftButtonConfig}
                rightButton={rightButtonConfig}
            />
            <KeyboardAwareScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.container}
            >
                <Image style={styles.cover}
                    source={{uri: "https://process.filestackapi.com/rotate=deg:exif/resize=width:300,height:300,fit:clip/h7l9sufJQ0WkGSCK6T8P"}}/>
                <TextField
                    ref= {(el) => { this.description = el; }}
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    multiline={true}
                    label='Enter description...'
                    style={styles.description}
                />
            </KeyboardAwareScrollView>
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
  addPost: postCreators.addPost,
  getPosts: postCreators.getPosts,
  getFollowings: followCreators.getFollowings,
  signOut: Creators.signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)