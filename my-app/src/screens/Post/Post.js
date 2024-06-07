import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from '../../firebase/config'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pie: ''
        }
    }
    onSubmit(pie) {
        if (pie != '') {
            db.collection('posteos').add({
                pie: pie,
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                imageUrl: '',
                likes: [],
                comments: [],
            })
                .then((resp) => {
                    this.setState({
                        pie: ''
                    },
                        () => this.props.navigation.navigate('home')
                    )
                })
                .catch((err) => console.log(err))
        }
    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder='Escribe un gran pie para tu nuevo post...'
                    value={this.state.pie}
                    onChangeText={(text) => this.setState({ pie: text })}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.pie)}>
                    <text> Subi tu post!</text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderColor: "#93CD93",
        borderWidth: 1
    }
})
