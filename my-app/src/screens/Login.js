import { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                console.log('este es el email logueado:', auth.currentUser.email)
            }
        })
    }
    
    onSubmit(email, password){
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'el email tiene un formato invalido'})
            return false
        }
        if(
            password === null || password === ''
        ){
            this.setState({error: 'el password no puede ser menor a 8 caracteres'}) // hay q cambiar esto
            return false
        }
        //console.log("usuario logueado exitosamente")
        
        auth.signInWithEmailAndPassword(email, password)
        .then(user => console.log('usuario logueado:', user))
        //.catch(err => console.log(err))
        .catch( err => {
            if(err.code === 'auth/internal-error'){
                this.setState({error: 'password incorrecta'})
            }
        })
    }
            
    render(){
        return(
            <View style={styles.container}> 
                <Text style={styles.text}>Login</Text>
                {/* email field */}
                <TextInput style={styles.field}
                keyboardType = 'email-address'
                placeholder = 'ingresa tu email'
                // valor actualizable en tiempo real, (text) es un callback
                // volver a poner el error para cuando se borre el campo, desaparezca el error viejo
                onChangeText = {(text) => this.setState({email:text, error: ''})} 
                value = {this.state.email}
                />

                {/* password field */}
                <TextInput style={styles.field}
                keyboardType = 'default'
                placeholder = 'ingresa tu password'
                // secureTextEntry = {true}
                onChangeText = {(text) => this.setState({password:text, error: ''})}
                value = {this.state.password}
                />

                <TouchableOpacity 
                style={styles.button} 
                // crear la funcion onSubmit() ya que no existe en react native, solo en react
                onPress ={() => this.onSubmit(this.state.email, this.state.password)}> 
                    <Text style={styles.text}>Loguearme</Text>
                </TouchableOpacity>
                {
                    this.state.error !== '' ?
                    <Text style={styles.error}>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
