import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, PushNotificationIOS, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config'
import Camara from './Camara'
import { FontAwesome } from '@expo/vector-icons';

class Posteo extends Component {
  constructor(props) {
    super(props)
  }

  onImageUpload(url) {
    this.setState({
      url: url
    })
  }

  render() {
    console.log(this.props);

    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("detalleusuario", { email: this.props.post.data.owner })}>
          <Text style={styles.ownerText}> {this.props.post.data.owner}</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={{ uri: this.props.post.data.imageUrl }}
            style={styles.imgPost}
          /></View>
        <Text style={styles.postText}> {this.props.post.data.pie}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("comments", { id: this.props.post.id })}>
          <Text> Agregar comentario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => this.props.borrarPosteo(this.props.posteo.id)}
        >
          <Text style={styles.deleteButtonText}><FontAwesome name="trash" size={24} color='#FF6961' /></Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden', 
  },
  ownerText: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    fontSize: 16,
  },
  imageContainer: {
    aspectRatio: 1, 
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 100,
  },
  imgPost: {
    flex: 1,
    width: '100%',
    height: '100%', 
  },
  postText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#92CD93",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});


export default Posteo;
