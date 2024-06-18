import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Camara from './Camara'
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { auth, db } from '../firebase/config'
import firebase from 'firebase'


class Posteo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      estaMiLike: false
    }
  }

  componentDidMount() {
    console.log('data', this.props.post.id, 'auth', auth.currentUser)
    let estaMiLike = this.props.post.data.likes.includes(auth.currentUser.email)
    if (estaMiLike){
      this.setState({estaMiLike: true})
    } 
  }
  
  like() {
    db.collection('posteos').doc(this.props.post.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( () => this.setState({estaMiLike: true}) )
    .catch( (err) => console.log(err) )
  }
  
  unlike() {
    db.collection('posteos').doc(this.props.post.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( () => this.setState({estaMiLike: false}) )
    .catch( (err) => console.log(err) )
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
          />
        </View>
        <Text style={styles.postText}> {this.props.post.data.pie}</Text>

        <View style={styles.buttons}>
        {/* Boton de like */}
        <View style={styles.likesContainer}>
        { this.state.estaMiLike ?
        <TouchableOpacity onPress={ () => this.unlike() } > 
          <FontAwesome  name= 'heart'  color = {'#92CD93'}  size = {24}/>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={ () => this.like() } > 
          <FontAwesome  name= 'heart-o'  color = {'#92CD93'}  size = {24}/>
        </TouchableOpacity>
        }
        <Text style={styles.likesNum}> {this.props.post.data.likes.length} </Text>
        </View>

        {/* Comentarios*/}
        <View style={styles.commentsContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("comments", { id: this.props.post.id })}>
          <FontAwesome5 name="comment" size={26} color="#92CD93" />
          <Text style={styles.commentsNum}> {this.props.post.data.comments.length} </Text>
        </TouchableOpacity>
        </View>
        </View>

        {/* Boton para borrar posteo */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(idPosteo) => this.props.borrarPosteo(this.props.post.id)}
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
  commentsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  commentsNum: {
    color: '#92CD93',
    marginLeft: 5,
    //fontSize: 16,
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
  mandarComent: {
    backgroundColor: '#92CD93',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  likesContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesNum:{
    color: '#92CD93',
    marginLeft: 5, 
  },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
  },

});


export default Posteo;
