import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import { getAuth, deleteUser } from "firebase/auth";
import Posteo from '../../components/Posteo';

class Miperfil extends Component {
    constructor() {
        super();
        this.state = {
            userPost: [],
        };
    }

    componentDidMount() {
        db.collection("posteos").where("owner", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let postObtenidos = [];
                docs.forEach(doc => {
                    postObtenidos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                console.log('post obtenidos', postObtenidos)
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


    borrarPosteo(idPosteo) {
        db.collection("posteos")
            .doc(idPosteo)
            .delete()
            .then((res) => console.log(res))
            .catch(e => console.log(e))

    }

    deletearUsuario(id) {
        const userDel = auth.currentUser;
        db.collection('users').doc(id).delete()
            .then(() => {
                userDel.delete()
                    .then(() => {
                        console.log('User deleted.');
                        this.props.navigation.navigate("login");
                    })
                    .catch((error) => {
                        console.log('Error deleting user:', error);
                    });
            })
            .catch((error) => {
                console.log('Error deleting user document:', error);
            });
    }

    render() {
        return (
            <View style={styles.contenedorPrin}>
                <Image style={styles.img} source={require('../../../assets/logo.jpg')} />
                {
                    this.state.userPost.length > 0 ?
                        <FlatList
                            data={this.state.userPost}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) =>
                                <View>  <Posteo borrarPosteo={(idPosteo) => this.borrarPosteo(idPosteo)} post={item} />  </View>}
                        />
                        :
                        <Text>Este usuario no tiene posteos</Text>
                }
                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => (this.deletearUsuario())(this.props.navigation.navigate("home"))}>
                    <Text style={styles.buttonText}>DELETE PROFILE</Text>
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
    img: {
        height: 70,
        width: 70,
        marginBottom: 20,
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