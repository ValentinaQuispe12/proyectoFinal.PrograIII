import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            estaMiComentario: false,
        }
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.postText}>
                    {this.props.posteo.data.pie}
                </Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.props.borrarPosteo(this.props.posteo.id)}
                >
                    <Text style={styles.deleteButtonText}>Borrar Posteo</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postText: {
        flex: 1,
        color: 'black',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#FF6961',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Posteo;
