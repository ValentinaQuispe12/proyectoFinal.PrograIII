import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import {storage, auth} from '../firebase/config'

export default class Camara extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dioPermiso: false,
            urlTempo: ''
        }
        this.metodosCamara = null
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState({ dioPermiso: true }))
            .catch(() => console.log("no nos dio los permisos de camara"))
    }

    // metodo para tomar la imagen
    tomarImagen(){
        this.metodosCamara.takePictureAsync()
        .Then((urlTemp)=> this.setState({urlTempo: urlTemp.uri}))
        .catch((err)=> console.log(err))
    }

    // metodo para descartar la imagen
    descartarImagen(){
        this.setState({
            urlTempo:''
        })
    }

    // metodo para guardar la imagen
    guardarImagen(){
        fetch(this.state.urlTempo)
        .then((img)=> img.blob())
        .then((imgProcesada)=>{
            const ref = storage.ref(`imagenesPost/${Date.now()}.jpeg`)
            ref.put(imgProcesada)
            .then((url)=> {
                ref.getDownloadURL()
                .then(url => this.props.actualizarimg(url))
            })
        })
        .catch((err)=> console.log(err))
    }

    render() {
        return (
            <View style={styles.contenedor}>
                {
                    this.state.dioPermiso ?
                        this.state.urlTempo === '' ?
                        <>
                            <Camera
                                type={Camera.Constants.Type.back}
                                style={styles.camara}
                                ref = {(metodos) => this.metodosCamara = metodos}
                            /> 
                            <TouchableOpacity onPress={()=> this.tomarImagen()}>
                                <Text>Tomar foto</Text>
                            </TouchableOpacity> </>
                            :
                            <>
                                <Image
                                    style={styles.imagen}
                                    source={{uri: this.state.urlTempo}}
                                />
                                <TouchableOpacity onPress={()=> this.guardarImagen()}>
                                    <Text>Aceptar foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={()=> this.descartarImagen()}>
                                    <Text>Rechazar foto</Text>
                                </TouchableOpacity>
                            </>
                        :
                        <Text> Tenes que dar permiso para usar la camara </Text>                    
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    camara: {
        height: 400
    },
    imagen: {
        height: 400
    }

})


