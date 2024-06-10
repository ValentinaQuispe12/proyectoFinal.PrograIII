import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, PushNotificationIOS } from 'react-native'
import { auth, db } from '../firebase/config'
import Camara from './Camara'

export default class Posteo extends Component {
  constructor(props){
    super(props)


    onImageUpload(url){
      this.setState({
        url:url
      })
    }
    
  }
  render() {
    return (
      <View>
        <Image source={{uri: this.props.post.data.imageUrl}}
            style={styles.imgPost}
        />
        <Text> {this.props.post.data.pie}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgPost:{
    height: 200,
    width: '100%'
  }
})
