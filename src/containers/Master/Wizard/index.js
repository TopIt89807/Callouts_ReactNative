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
import ImagePicker from 'react-native-image-picker';
import defaultImg from 'src/static/images/default-thumbnail.jpg';
import { RNS3 } from 'react-native-aws3';

class Wizard extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    state = {
        description: '',
        avatarSource: defaultImg,
        response: '',
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
        if(!this.state.description && !this.state.response.uri) {
            return this.props.showMessage({
                visible: true,
                title: 'Error...',
                text: 'Attach text or image!',
            })
        }
        if(!this.state.response.uri) {
            this.props.addPost(this.props.user.result.user.id, this.state.description, '');
            return this.props.showMessage({
                visible: true,
                title: 'Success',
                text: 'You posted a new text!',
            })
        }
        const file = {
            // `uri` can also be a file system path (i.e. file://)
            uri: this.state.response.uri,
            name: Date.now(),
            type: "image/png"
        }
            
        const options = {
            keyPrefix: "images/",
            bucket: "callouts-rn",
            region: "us-east-1",
            accessKey: "AKIAJFNO27RERYUIWP4A",
            secretKey: "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",
            successActionStatus: 201
        }
            
        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
            this.props.showMessage({
                visible: true,
                title: 'Success',
                text: 'New post added!',
            })
            this.props.addPost(this.props.user.result.user.id, this.state.description,
                response.body.postResponse.location);
            /**
             * {
             *   postResponse: {
             *     bucket: "your-bucket",
             *     etag : "9f620878e06d28774406017480a59fd4",
             *     key: "uploads/image.png",
             *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
             *   }
             * }
             */
        })
        
    }

    showImagePicker = () => {
        var options = {
            title: 'Select Picture',
            // customButtons: [
            //   {name: 'fb', title: 'Choose Photo from Facebook'},
            // ],
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
            
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.setState({
                    avatarSource: source,
                    response: response,
                });
            }
        });
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
                <TouchableOpacity activeOpacity = { .5 } onPress={this.showImagePicker}>
                    <Image
                        style={styles.cover}
                        source={this.state.avatarSource}
                        // source={{uri: "https://process.filestackapi.com/rotate=deg:exif/resize=width:300,height:300,fit:clip/h7l9sufJQ0WkGSCK6T8P"}}
                    />
                </TouchableOpacity>
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
  showMessage: globalCreators.showMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)