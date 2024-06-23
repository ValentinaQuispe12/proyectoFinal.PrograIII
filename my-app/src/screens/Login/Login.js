import { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../../firebase/config';

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
            this.setState({error: 'la password es invalida'})
            return false
        }
                
        auth.signInWithEmailAndPassword(email, password)
        .then(user => {
            this.props.navigation.navigate("tabnav")
        })
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
                <Text style={styles.login}>Login</Text>
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

                {/* simil boton de login */}
                <TouchableOpacity 
                style={styles.button} 
                // crear la funcion onSubmit() ya que no existe en react native, solo en react
                onPress ={() => this.onSubmit(this.state.email, this.state.password)}> 
                    <Text style={styles.text}>Loguearme</Text>
                </TouchableOpacity>


                <View style={styles.redirectContainer}>
                    <Text>¿No tienes una cuenta?</Text>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate("register")}>
                        <Text style={styles.redirectText}> Hazte una aqui</Text>
                    </TouchableOpacity>
                </View>

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
        backgroundColor: 'rgb(146, 205, 147)',
        padding: 20,
    },
    login: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 15,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
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
    redirectContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    redirectText: {
        color: '#0066cc',
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;

