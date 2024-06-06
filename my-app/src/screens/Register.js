import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth} from "../firebase/config"

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            password:'',
            email:'',
            error: ''
        }
    }

    componentDidMount(){
        console.log("hizo el didMount y estas son sus props")
        console.log(this.props)
    }

    onSubmit(name, email, password){
        if(
            name === null || name === '' || name.length < 5
        ){
            this.setState({error: 'El name no puede ser menor de 5 caracteres'})
            return false
        }
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'El email tiene un formato invalido'})
            return false
        }
        if(

            password === null || password === '' || password.length < 6
        ){
            this.setState({error: 'La password no puede ser menor de 6 caracteres'})
            return false
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if(user){
                console.log('usuario registrado')
            }
        })
        .catch((err) =>{ 
            if(err.code === "auth/email-already-in-use"){
                this.setState({error:'El email ya se encuentra en uso'})
            }
        })



    }

    redirect(){
        this.props.navigation.navigate("login")
    }

    render(){
        return(
            <View style= {styles.container}>

                <Text style= {styles.registrate}>Registra tu usuario</Text>

                <TextInput
                    onChangeText={(text) => this.setState({name: text, error: ''})}
                    value={this.state.name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Indica tu email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({password: text, error: ''})}
                    value={this.state.password}
                    placeholder='Indica tu password'
                    keyboardType='default'
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
                >
                    <Text style={styles.textBtn}>REGISTRARME</Text>
                </TouchableOpacity>
               
            <View style={styles.redirectContainer}>
                <Text>
                Ya tienes una cuenta?
                <TouchableOpacity
                onPress={()=> this.redirect()}
                >
                
                <Text style={styles.redirectText}> Ingresa aqui</Text>

                </TouchableOpacity>
                
                </Text>

            </View>
            { this.state.error !== '' ?
                            <Text>
                                {this.state.error}
                            </Text>
                            : 
                            ''
            }
                    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '50%', 
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 16,
    },
    btn: {
        width: '50%', 
        backgroundColor: '#3897f0',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBtn: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registrate:{
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    redirectContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    redirectText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});



export default Register