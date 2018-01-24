import React from 'react'
import { View, Text, Modal, Button } from 'react-native'
import styles from './styles'
// import Button from 'components/Button'

const MessageBox = ({ visible, title, text, onRequestClose }) => {
  return (
    <Modal visible={visible} presentationStyle={'overFullScreen'} animationType={'fade'} transparent={true} onRequestClose={onRequestClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{ title }</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.text}>{ text }</Text>
          </View>

          <Button title="OK" containerStyle={styles.button} titleStyle={styles.buttonText} onPress={onRequestClose} />

        </View>
      </View>
    </Modal>
  )
}

export default MessageBox