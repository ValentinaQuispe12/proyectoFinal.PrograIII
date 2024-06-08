import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';
import Post from "../Post/Post"; 

class Miperfil extends Component {
    constructor() {
        super();
        this.state = {
            userPost: [],
        };
    }

    componentDidMount() {
        db.collection("posteos").where("owner", "==", auth.currentUser.email)
            .orderBy("owner", "asc")
            .onSnapshot((docs) => {
                let postObtenidos = [];
                docs.forEach(doc => {
                    postObtenidos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    userPost: postObtenidos
                });
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate("login");
            })
            .catch(e => {
                console.log(e);
            });
    }

    deletePost = 
    (postId) => {
        db.collection("posteos")
        .doc(postId)
        .delete()
            .then(() => {
                console.log("Post eliminado con éxito");
                this.setState({
                    userPost: this.state.userPost.filter(post => post.id !== postId)
                });
            })
            .catch(error => {
                console.error("Error al eliminar el post: ", error);
            });
    }

    render() {
        return (
            <View style={styles.contenedorPrin}>
                <FlatList
                    data={this.state.userPost}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => 
                        <View style={styles.postItem}>
                            <Text>{item.data.pie}</Text>
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => this.deletePost(item.id)}
                            >
                                <Text style={styles.deleteButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contenedorPrin: {
        flex: 1,
        backgroundColor: 'rgb(146, 205, 147)', 
        padding: 20,
    },
    postItem: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#93CD93', 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#FF6961', 
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Miperfil;