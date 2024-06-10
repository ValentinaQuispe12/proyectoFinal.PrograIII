import React, { Component } from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
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
    db.collection("posteos")
    .doc(idPosteo)
    .onSnapshot(doc => {
      this.setState({
        comentario:doc.data().comments
      }, () => console.log(this.state.comentario))
    })

  }
  
  enviarComentario(comentario){
    db.collection("posteos")
    .doc(idPosteo)
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

export default Comments;