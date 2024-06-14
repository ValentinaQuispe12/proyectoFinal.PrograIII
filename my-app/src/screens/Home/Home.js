import { FlatList, Text, View, StyleSheet, Image } from "react-native"
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
        db.collection('posteos')
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
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
                <Image  style={styles.img} source={require('../../../assets/logo.jpg')} />
                <FlatList
                    style={styles.flatList}
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <Posteo
                            style={styles.posteo}
                            navigation={this.props.navigation}
                            post={item} />

                    }
                />

            </View>
        )
    }
}



const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'rgb(146, 205, 147)',
        padding: 10,
        alignItems: 'center', 
    },
    img: {
        height: 70,
        width: 70,
        marginBottom: 20, 
    },
    flatList: {
        flex: 1,
        width: '100%', 
    },
    posteo: {
        backgroundColor: '#93CD93',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
