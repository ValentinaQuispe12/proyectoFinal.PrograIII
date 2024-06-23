import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from 'react-native';
import { auth, db } from '../../firebase/config';
import Posteo from '../../components/Posteo';

class Miperfil extends Component {
    constructor() {
        super();
        this.state = {
            userPost: [],
            mostrarModal: false,
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

    borrarUsuario(id) {
        const user = auth.currentUser;
        // Eliminar los documentos del usuario en la colección 'users'
        db.collection('users').doc(id).delete()
            .then(() => {
                // Eliminar el usuario de Firebase Authentication
                user.delete()
                    .then(() => {
                        console.log('User deleted.');
                        this.props.navigation.navigate("register");
                    })
                    .catch((error) => {
                        console.log('Error deleting user:', error);
                    });
            })
            .catch((error) => {
                console.log('Error deleting user document:', error);
            });
    }

    // modal
    mostrarModal() {
        this.setState({ mostrarModal: true }); 
    }

    confirmarBorradoModal() {
        this.setState({ mostrarModal: false });
        this.borrarUsuario(); 
    }

    cancelarBorradoModal() {
        this.setState({ mostrarModal: false });
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
                
                <TouchableOpacity style={styles.button} onPress={() => (this.mostrarModal())}>
                    <Text style={styles.buttonText}>DELETE PROFILE</Text>
                </TouchableOpacity>

                <Modal
                    visible={this.state.mostrarModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>¿Estás seguro de que quieres eliminar tu perfil?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => this.confirmarBorradoModal()}>
                                    <Text style={styles.modalButtonText}>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={() => this.cancelarBorradoModal()}>
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
    },
    modalButton: {
        backgroundColor: '#93CD93',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Miperfil;