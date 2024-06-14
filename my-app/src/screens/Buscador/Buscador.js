import { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { auth, db } from '../../firebase/config'

class Buscador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valorInput: '',
            usuariosMostrados: [],
        }
    }

    componentDidMount() {
        db.collection("users").onSnapshot((snap) => {
            let data = [];
            snap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuariosMostrados: data
            })
        })
    }

    usuarioElegido(owner) {
        owner === auth.currentUser.owner ?
            this.props.navigation.navigate('detalleusuario') :
            this.props.navigation.navigate('miperfil')
    }

    render() {
        const usuariosEncontrados = this.state.usuariosMostrados.filter((usuario) =>
            usuario.data.owner.toLowerCase().includes(this.state.valorInput.toLowerCase()))
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('../../../assets/logo.jpg')} />
                <TextInput
                    style={styles.input}
                    placeholder="busca el usuario que quieras"
                    value={this.state.valorInput}
                    onChangeText={(text) => this.setState({ valorInput: text })}
                />

                {usuariosEncontrados.length === 0 ?
                    
                    <Text> No hay usuarios que coincidan con tu busqueda </Text>
                    :
                    <FlatList
                        data={usuariosEncontrados}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userItem}
                                onPress={() => this.usuarioElegido(item.data.owner)}
                            >

                                <View>
                                    <Text style={styles.userName} >{item.data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#93CD93',
    },
    img: {
        height: 70,
        width: 70,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#92CD93', // Color de fondo llamativo
        color: '#ffffff', // Color del texto
        fontWeight: 'bold', // Texto en negrita
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 5,
    },
    userItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#92CD93',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        color: '#333',
    },
});

export default Buscador
