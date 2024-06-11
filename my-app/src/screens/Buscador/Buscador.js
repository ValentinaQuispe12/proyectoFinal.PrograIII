import { Component } from "react";
import {View, Text,  TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import {auth, db} from '../../firebase/config'

class Buscador extends Component {
    constructor(props){
        super(props)
        this.state = {
            valorInput: '',
            usuariosMostrados: [],
        }
    }

    componentDidMount(){
        db.collection("users").onSnapshot((snap)=>{
            let data = [];
            snap.forEach((doc)=>{
                data.push({
                    id:doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuariosMostrados: data
            })
        })
    }

    usuarioElegido(owner){
        owner === auth.currentUser.owner ?
        this.props.navigation.navigate('detalleusuario') :
        this.props.navigation.navigate('miperfil')
    }

    render(){
        const usuariosEncontrados = this.state.usuariosMostrados.filter((usuario)=>
        usuario.data.owner.toLowerCase().includes(this.state.valorInput.toLowerCase()))
        return(
           <View>
            <TextInput
          placeholder="busca el usuario que quieras"
          value={this.state.valorInput}
          onChangeText={(text) => this.setState({ valorInput: text })}
        />
        <FlatList
          data={usuariosEncontrados}
          keyExtractor={(user) => user.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.usuarioElegido(item.data.owner)}
            >
              
              <View>
                <Text >{item.data.name}</Text>
                </View>
            </TouchableOpacity>
          )}
        />
           </View>
        )
    }
}

export default Buscador
// import React, { Component } from 'react'
// import { Text, View, TextInput, TouchableOpacity } from 'react-native'

// export default class Buscador extends Component {
//     constructor(props){
//         super(props)
//         this.setState={
//             buscador: ''
//         }
//     }


//     componentDidMount(){
//         console.log('props', this.props)
//         db.collection('users').where('owner', '==', 'mica@gmail.com').onSnapshot(
//             docs => {
//                 let users = [];
//                 docs.forEach( docs => {
//                     users.push({
//                         id: docs.id,
//                         data: docs.data()
//                     })
//                 this.setState({
//                     usuario: users,
//                 })
//                 })
//             }
//         )     
//     }

//   render() {
//     return (
//       <View>
//         {
//         this.state.buscador === '' ?
//         <>
//         <Text>No estas buscando nada </Text>
//         </>: <>
//         <TextInput 
//         onChangeText={(text) => this.setState({ buscador: text })}
//         placeholder='BUSCA EL PERFIL'
//         keyboardType='default'
//         value={this.state.buscador} />
//         <TouchableOpacity  >
//             <Text>BUSCAR</Text>
//         </TouchableOpacity>
//         </>
//   }
//       </View>
//     )
//   }
// }
