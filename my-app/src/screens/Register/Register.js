import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from "../../firebase/config";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            error: '',
            loading: false,
            miniBio: '',
            fotoPerfil: ''
        };
    }

    onSubmit = () => {
        const { name, email, password } = this.state;

        // Validación de campos
        if (name === null || name === '' || name.length < 5) {
            this.setState({ error: 'El nombre debe tener al menos 5 caracteres', loading: false });
            return;
        }
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({ error: 'Ingrese un correo electrónico válido', loading: false });
            return;
        }
        if (password === null || password === '' || password.length < 6) {
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres', loading: false });
            return;
        }

        this.setState({ loading: true, error: '' });

        auth.createUserWithEmailAndPassword(email, password)
            .then(resp => {
                db.collection('users').add({
                    owner: email,
                    name: name,
                    miniBio: this.state.miniBio,
                    fotoPerfil: this.state.fotoPerfil,
                    createdAt: Date.now()
                })
                .then(() => {
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        loading: false
                    });
                    this.props.navigation.navigate("login");
                })
            })
            .catch(err => this.setState({ error: err.message, loading: false }));
    };

    redirect = () => {
        this.props.navigation.navigate("login");
    };

    render() {
        const { name, email, password, miniBio, fotoPerfil, loading, error } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.registrate}>Registra tu usuario</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ name: text, error: '' })}
                    value={name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ email: text, error: '' })}
                    value={email}
                    placeholder='Indica tu email'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ password: text, error: '' })}
                    value={password}
                    placeholder='Indica tu contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ miniBio: text })}
                    placeholder='Mini bio'
                    keyboardType='default'
                    value={this.state.miniBio}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ fotoPerfil: text })}
                    placeholder='Foto de perfil'
                    keyboardType='default'
                    value={this.state.fotoPerfil}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.onSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textBtn}>REGISTRARME</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.redirectContainer}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={this.redirect}>
                        <Text style={styles.redirectText}> Ingresa aquí</Text>
                    </TouchableOpacity>
                </View>
                {error !== '' && <Text style={styles.errorMsg}>{error}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(146, 205, 147)', // Fondo color
        padding: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 15,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    btn: {
        width: '80%',
        backgroundColor: '#93CD93', // Botón color
        borderRadius: 25,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    textBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registrate: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    redirectContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    redirectText: {
        color: '#0066cc',
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    errorMsg: {
        color: 'red',
        marginTop: 10,
    },
});

export default Register;
