import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrComments: [],
      comentario: "",
    };
  }

  componentDidMount() {
    console.log('props', this.props);
    db.collection("posteos")
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        console.log('antes del setState, comments', doc.data().comments);
        this.setState({
          arrComments: doc.data().comments.sort((a, b) => b.createdAt - a.createdAt),
        }, () => console.log(this.state));
      });
  }

  enviarComentario(comentario) {
    const newComment = {
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      comment: comentario,
    };

    db.collection("posteos")
      .doc(this.props.route.params.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(newComment),
      })
      .then(() => {
        this.setState({
          comentario: "",
        });
      })
      .catch(err => console.log(err));
  }

  regresar() {
    this.props.navigation.navigate("home");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>COMENTARIOS</Text>
        <FlatList
          data={this.state.arrComments}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
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
          <TouchableOpacity style={styles.returnButton} onPress={() => this.regresar()}>
            <Text style={styles.returnButtonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
  commentBox: {
    backgroundColor: '#A4D4AE',  
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderColor: '#38761D',  
    borderWidth: 1,
  },
  comment: {
    color: '#fff',
    fontSize: 16,  
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
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  returnButton: {
    backgroundColor: '#92CD93',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Comments;
