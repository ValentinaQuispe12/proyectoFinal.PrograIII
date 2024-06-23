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
            idUsuario: null,
            usuario: null,
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

        db.collection('users').where('owner', '==', auth.currentUser.email)
            .onSnapshot(data => {
                data.forEach(doc => {
                    this.setState({ 
                        usuario: doc.data(), 
                        idUsuario: doc.id 
                    });
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
        const userDel = auth.currentUser;
        db.collection('users').doc(id).delete()
            .then(() => {
                userDel.delete()
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
        const { usuario, userPost } = this.state;

        return (
            <View style={styles.contenedorPrin}>
                <Image style={styles.img} source={require('../../../assets/logo.jpg')} />

                <Text style={styles.title}>Mi Perfil</Text>
                {usuario ? (
                    <>
                        <Text style={styles.text}>{usuario.name}</Text>
                        <Text style={styles.text}>{usuario.miniBio}</Text>
                        {/* <Text style={styles.text}>Email: {usuario.owner}</Text> */}
                        <Text style={styles.text}> {usuario.fotoPerfil}</Text>
                        <Text style={styles.text}>Cantidad de posteos: {userPost.length}</Text>
                    </>
                ) : (
                    <Text>Cargando...</Text>
                )}
                {userPost.length > 0 ? (
                    <FlatList
                        data={userPost}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Posteo borrarPosteo={(idPosteo) => this.borrarPosteo(idPosteo)} post={item} navigation= {this.props.navigation} />
                            </View>
                        )}
                    />
                ) : (
                    <Text>Este usuario no tiene posteos</Text>
                )}
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
    img:{
        alignSelf: "center",        
        width: 70,
        marginBottom: 20, 
        height: 70,
       

},
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 20,
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
    text: {
        backgroundColor: 'rgb(146, 205, 147)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
  
    },
    profileText: {
        backgroundColor: 'rgb(146, 205, 147)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf : "center",
    },
    
});

export default Miperfil;
