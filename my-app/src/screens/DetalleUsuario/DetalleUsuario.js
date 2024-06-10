import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from '../../firebase/config'; 

class DetalleUsuario extends Component{
    constructor() {
        super();
        this.state = {
            usuarios: [],
            posteosDelUsuarioSeleccionado: []
        };
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach( docs => {
                    users.push({
                        id: docs.id,
                        data: docs.data()
                    })
                this.setState({
                    usuarios: users,
                })
                })
            }
        )
        db.collection('posteos').where('owner', '==', 'ale@dh.com').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( docs => {
                    posts.push({
                        id: docs.id,
                        data: docs.data()
                    })
                this.setState({
                    posteosDelUsuarioSeleccionado: posts,
                })
                })
            }
        )
    }

    render(){
        return(
            <View>
                {/* foto de perfil seleccionado desde la home */}
                {/* nombre del perfil seleccionado */}
                {/* bio del perfil seleccionado */}

                {/* lista con los posteos de ese usuario seleccionado 
                (hacer una validacion de que el usuario seleccionado sea igual al que esta relacionado en la coleccion de posteos)*/}
            </View>
        )
    }
}
export default DetalleUsuario