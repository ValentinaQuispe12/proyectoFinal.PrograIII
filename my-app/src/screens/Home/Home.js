import { FlatList, Text, View } from "react-native"
import React, { Component } from 'react'
import { db } from '../../firebase/config'


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
            <View>
                <FlatList
                data= {this.state.posteos}
                keyExtractor= {(item)=> item.id.toString()}
                renderItem= {({item})=>
                <View> 
                    <Text> {item.data.pie} </Text>
                </View>
            }
                />
            </View>
        )
    }
}