/* import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from "../firebase/config"

class Miperfil extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            miniBio: '',
            fotoPerfil: '',
        };
    }

    componentDidMount() {
        db.collection("users").onSnapshot(
            infoUser => {
                let infoGuardar = [];
                infoUser.forEach(UnDato => {
                    infoGuardar.push({
                        name: UnDato.data().name,
                        email: UnDato.data().email,
                        miniBio: UnDato.data().miniBio,
                        fotoPerfil: UnDato.data().fotoPerfil
                    });
                });
               
                if (infoGuardar.length > 0) {
                    const { name, email, miniBio, fotoPerfil } = infoGuardar[0];
                    this.setState({ name, email, miniBio, fotoPerfil });
                } else {
                    console.log("No se encontraron datos de usuario.");
                }
            },
            error => {
                console.error("Error al obtener los datos del usuario:", error);
            }
        );
    }

    redirect = () => {
        this.props.navigation.navigate("Home");
    };

    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.state.fotoPerfil }} resizeMode='contain' />
                <Text style={styles.text}>{this.state.name}</Text>
                <Text style={styles.text}>{this.state.miniBio}</Text>
                <TouchableOpacity onPress={this.redirect}>
                        <Text style={styles.redirectText}> Ir al Home</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        fontSize: 16,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    redirectText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    errorMsg: {
        color: 'red',
        marginTop: 10,
    },
});

export default Miperfil;
 */