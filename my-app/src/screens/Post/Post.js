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
                    <Camara 
                    style={styles.camera}
                    actualizarimg={(url)=> this.actualizarimg(url)} /> :
                    <>
               
                <TextInput
                    placeholder='Escribe un gran pie para tu nuevo post...'
                    value={this.state.pie}
                    onChangeText={(text) => this.setState({ pie: text })}
                    style={styles.input}
                />
                <TouchableOpacity 
                style={styles.submitButton}
                onPress={() => this.onSubmit(this.state.pie)}>
                    <Text  style={styles.submitButtonText}> Subi tu post!</Text>
                </TouchableOpacity>
                </>
                 }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'rgb(146, 205, 147)',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderColor: '#93CD93',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    submitButton: {
        backgroundColor: '#93CD93',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
});
