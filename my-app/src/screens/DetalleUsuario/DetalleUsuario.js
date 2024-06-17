import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../firebase/config'; 

class DetalleUsuario extends Component{
    constructor(props) {
        super(props);
        this.state = {
            usuario: [],
            posteosDelUsuarioSeleccionado: []
        };
    }

    componentDidMount(){
        console.log('props', this.props.route.params.email)

        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach( doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                  console.log(users);  
                this.setState({
                    usuario: users,
                }, () => console.log('log extendido', this.state))
                })
            }
        )

        db.collection('posteos').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                  console.log(posts);  
                this.setState({
                    posteosDelUsuarioSeleccionado: posts,
                }, () => console.log('log extendido', this.state))
                })
            }
        )

    }

    render(){
        
        return(
            <View>
                {/* foto de perfil seleccionado */}
                {this.state.usuario.length !== 0 ? <Text>{this.state.usuario[0].data.fotoPerfil}</Text> : <Text>error</Text>}

                {/* bio del perfil seleccionado */}
                {this.state.usuario.length !== 0 ? <Text>{this.state.usuario[0].data.miniBio}</Text> : <Text>error</Text>}
                
                {/* nombre del perfil seleccionado */}
                {this.state.usuario.length !== 0 ? <Text>{this.state.usuario[0].data.name}</Text> : <Text>error</Text>}
                

                {/* lista con los posteos de ese usuario seleccionado 
                (hacer una validacion de que el usuario seleccionado sea igual al que esta relacionado en la coleccion de posteos)
                flatlist para recorrer todos los posteos del usuario seleccionado*/}
                <FlatList
                data = { this.state.posteosDelUsuarioSeleccionado}
                keyExtractor = { item => item.id.toString() }
                renderItem = { ({item}) => 
                    <View>
                        <Text>{item.data.imageUrl}</Text>
                        <Text>{item.data.pie}</Text>
                        {/* traer los comments y likes */}
                    </View>
                }
                // renderItem = { ({item}) => console.log('flatlist', item.data)}
                />

            </View>
        )
    }
}

// CSS

export default DetalleUsuario