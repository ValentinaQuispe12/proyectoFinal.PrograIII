
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from '../../firebase/config'
import Camara from '../../components/Camara'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pie: '',
            imgurl: '',
        }
    }

    onSubmit(pie) {
        if (pie != '') {
            db.collection('posteos').add({
                pie: pie,
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                imageUrl: this.state.imgurl,
                likes: [],
                comments: [],
            })
                .then((resp) => {
                    this.setState({
                        pie: '',
                        imgurl: ''
                    },
                        () => this.props.navigation.navigate('home')
                    )
                })
                .catch((err) => console.log(err))
        }
    }
    actualizarimg(url){
        this.setState({
            imgurl: url
        })
    }
    render() {
        return (
            <View style={styles.contenedor}>
                {
                    this.state.imgurl == '' ?
                    <Camara actualizarimg={(url)=> this.actualizarimg(url)} /> :
                    <>
               
                <TextInput
                    placeholder='Escribe un gran pie para tu nuevo post...'
                    value={this.state.pie}
                    onChangeText={(text) => this.setState({ pie: text })}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.pie)}>
                    <Text> Subi tu post!</Text>
                </TouchableOpacity>
                </>
                 }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1
    },
    input: {
        borderColor: "#93CD93",
        borderWidth: 1
    }
})