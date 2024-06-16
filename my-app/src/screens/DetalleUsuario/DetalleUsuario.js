import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../../firebase/config'; 

class DetalleUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: null,
            posteosDelUsuarioSeleccionado: []
        };
    }

    componentDidMount() {
        const email = this.props.route.params.email;
        console.log('props', email);

        db.collection('users').where('owner', '==', email).onSnapshot(
            docs => {
                let user = null;
                docs.forEach(doc => {
                    user = {
                        id: doc.id,
                        data: doc.data()
                    };
                });
                this.setState({
                    usuario: user,
                });
            }
        );

        db.collection('posteos').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    posteosDelUsuarioSeleccionado: posts,
                });
            }
        );
    }

    render() {
        const { usuario, posteosDelUsuarioSeleccionado } = this.state;
        
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../../../assets/logo.jpg')} />
                {usuario ? (
                    <>
                        <Image source={{ uri: usuario.data.fotoPerfil }} style={styles.profileImage} />
                        <Text style={styles.userName}>{usuario.data.name}</Text>
                        <Text style={styles.userBio}>{usuario.data.miniBio}</Text>
                        <Text style={styles.userEmail}>{usuario.data.owner}</Text>
                    </>
                ) : (
                    <Text>Cargando...</Text>
                )}
                <FlatList
                    data={posteosDelUsuarioSeleccionado}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Image source={{ uri: item.data.imageUrl }} style={styles.postImage} />
                            <Text style={styles.postCaption}>{item.data.pie}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    img: {
        height: 70,
        width: 70,
        marginBottom: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userBio: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    userEmail: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    postImage: {
        height: 200,
        borderRadius: 10,
    },
    postCaption: {
        marginTop: 10,
        fontSize: 16,
    }
});

export default DetalleUsuario;