import React, { Component } from 'react'
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import {db, auth} from "../../firebase/config"
import firebase from "firebase"

class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
      arrComments: [],
      comentario: "",

    }
  }
  
  componentDidMount(){
    console.log('props', this.props)
    db.collection("posteos")
    .doc(this.props.route.params.id)
    .onSnapshot(doc => {
      console.log('antes del setState, comments', doc.data().comments)
      this.setState({
       arrComments:doc.data().comments
      }, ()=> console.log(this.state))
    })

  }
  
  enviarComentario(comentario){
    db.collection("posteos")
    .doc(this.props.route.params.id)
    .update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        comment: comentario
      })
    })
    .catch(err=>console.log(err))
    
    this.setState({
      comentario: ""
    })
  }

    render() {
    return (
      <View>
       <Text>Comments</Text>
       <FlatList
          data={this.state.arrComments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({item}) => <Text>{item.comment}</Text>}
        />

        <View>
          <TextInput
            placeholder="Escribi tu comentario"
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({comentario:text})}
            value={this.state.comentario}
          />

          <TouchableOpacity onPress={()=> this.enviarComentario(this.state.comentario)}>
            <Text>Enviar Comentario</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    height:32,
    borderWidth:1
  }
})

export default Comments;