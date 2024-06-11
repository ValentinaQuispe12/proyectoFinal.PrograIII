import React, { Component } from 'react'
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { db, auth } from "../../firebase/config"
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
       arrComments: doc.data().comments
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
      <View style={styles.container}>
        <Text style={styles.title}>COMENTARIOS</Text>
        <FlatList
          data={this.state.arrComments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({ item }) => <Text style={styles.comment}>{item.comment}</Text>}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribi tu comentario"
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.enviarComentario(this.state.comentario)}>
            <Text style={styles.buttonText}>Enviar Comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(146, 205, 147)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  comment: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#92CD93',
    borderRadius: 5,
    color: '#fff',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#92CD93',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default Comments;
