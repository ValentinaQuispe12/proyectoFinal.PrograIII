import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from '../../firebase/config'; 

class DetalleUsuario extends Component{
    constructor() {
        super();
        this.state = {
            usuario: [],
            posteosDelUsuarioSeleccionado: []
        };
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', 'mica@gmail.com').onSnapshot(
            docs => {
                let users = [];
                docs.forEach( docs => {
                    users.push({
                        id: docs.id,
                        data: docs.data()
                    })
                this.setState({
                    usuario: users,
                })
                })
            }
        )
        db.collection('posteos').where('owner', '==', 'mica@gmail.com').onSnapshot(
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
                <Text>{console.log(this.state.usuario)}</Text>

                {/* bio del perfil seleccionado */}

                {/* lista con los posteos de ese usuario seleccionado 
                (hacer una validacion de que el usuario seleccionado sea igual al que esta relacionado en la coleccion de posteos)
                flatlist para recorrer todos los posteos del usuario seleccionado*/}
                <FlatList
                data = { this.state.posteosDelUsuarioSeleccionado }
                keyExtractor = { item => item.id.toString() }
                // renderItem = { ({item}) => <View>{item.}</View>}
                renderItem = { ({item}) => console.log(item)}
                />
            </View>
        )
    }
}
export default DetalleUsuario