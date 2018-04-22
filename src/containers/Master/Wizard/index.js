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
import ImageResizer from 'react-native-image-resizer';
import { aws } from 'configs'

class Wizard extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    })

    state = {
        description: '',
        imgSrc: defaultImg,
        thumbnailSrc: defaultImg,
    }

    componentDidMount() {
        var {params} = this.props.navigation.state;
        if(params)
            this.setState({
                description: params.text,
                imgSrc: params.image? {uri: params.image}: defaultImg,
                thumbnailSrc: params.image? {uri: params.thumb_img}: defaultImg,
            });
    }

    componentWillReceiveProps({ global, user, follow, post }) {
        if (global.status.effects[Types.ADD_POST] === 'success'
            && this.props.global.status.effects[Types.ADD_POST] === 'request') {
            this.props.getPosts(this.props.user.result.user.id);
                
          this.props.navigation.goBack();
        }
        if (global.status.effects[Types.UPDATE_POST] === 'success'
            && this.props.global.status.effects[Types.UPDATE_POST] === 'request') {
            this.props.getPosts(this.props.user.result.user.id);
                
          this.props.navigation.goBack();
        }
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
                    imgSrc: source,
                });

                ImageResizer.createResizedImage(this.state.imgSrc.uri , 500, 500, "JPEG", 90).then((response) => {
                    console.log(response);
                    this.setState({
                        thumbnailSrc: {uri: response.uri}
                    })
                    // response.uri is the URI of the new image that can now be displayed, uploaded... 
                    // response.path is the path of the new image 
                    // response.name is the name of the new image with the extension 
                    // response.size is the size of the new image 
                }).catch((err) => {
                    console.log(err);
                });
        
            }
        });
    }

    onSave = () => {
        var {params} = this.props.navigation.state;
        if(!this.state.description && !this.state.imgSrc.uri) {
            return this.props.showMessage({
                visible: true,
                title: 'Error...',
                text: 'Attach text or image!',
            })
        }
        if(!this.state.imgSrc.uri) {
            if(params)
                this.props.updatePost(params._id, this.props.user.result.user.id, this.state.description,
                    '', '');
            else
                this.props.addPost(this.props.user.result.user.id, this.state.description, '', '');

            return this.props.showMessage({
                visible: true,
                title: 'Success',
                text: 'You posted a new text!',
            })
        }

        if(params) {
            if(params.image == this.state.imgSrc.uri) {
                this.props.updatePost(params._id, this.props.user.result.user.id, this.state.description,
                    params.image, params.thumb_img);
                return;
            }
        }
        const file1 = {
            // `uri` can also be a file system path (i.e. file://)
            uri: this.state.imgSrc.uri,
            name: Date.now(),
            type: "image/png"
        }

        const file2 = {
            // `uri` can also be a file system path (i.e. file://)
            uri: this.state.thumbnailSrc.uri,
            name: Date.now() + "_",
            type: "image/png"
        }
            
        const options = {
            keyPrefix: aws.s3.keyPrefix,
            bucket: aws.s3.bucketName,
            region: aws.region,
            accessKey: aws.s3.accessKey,
            secretKey: aws.s3.secretKey,
            successActionStatus: 201
        }
        
        RNS3.put(file1, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");

            RNS3.put(file2, options).then(response2 => {
                if (response2.status !== 201)
                    throw new Error("Failed to upload image to S3");
                this.props.showMessage({
                    visible: true,
                    title: 'Success',
                    text: 'New post added!',
                })
                if(params)
                    this.props.updatePost(params._id, this.props.user.result.user.id, this.state.description,
                        response.body.postResponse.location, response2.body.postResponse.location);
                else
                    this.props.addPost(this.props.user.result.user.id, this.state.description,
                        response.body.postResponse.location, response2.body.postResponse.location);
            });
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

    render() {
      var {params} = this.props.navigation.state;

      const leftButtonConfig = {
        title: '<Back',
        handler: () => this.props.navigation.goBack()
      };
      const rightButtonConfig = {
        title: params? 'Update': 'Save',
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
                        source={this.state.thumbnailSrc}
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
  updatePost: postCreators.updatePost,
  getPosts: postCreators.getPosts,
  getFollowings: followCreators.getFollowings,
  signOut: Creators.signOut,
  showMessage: globalCreators.showMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)