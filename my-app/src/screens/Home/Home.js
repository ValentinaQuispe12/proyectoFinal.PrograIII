import { FlatList, Text, View, StyleSheet } from "react-native"
import React, { Component } from 'react'
import { db } from '../../firebase/config'
import Posteo from "../../components/Posteo"


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('posteos').onSnapshot((docs) => {
            let posteosObtenidos = []
            docs.forEach(doc => {
                posteosObtenidos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posteos: posteosObtenidos
            })
        })
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <FlatList
                data= {this.state.posteos}
                keyExtractor= {(item)=> item.id.toString()}
                renderItem= {({item})=>
                <Posteo post = {item}/>
            }
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex: 1
    }
})