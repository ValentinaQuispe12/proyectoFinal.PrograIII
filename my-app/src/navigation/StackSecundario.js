import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//rutas
import Home from '../screens/Home/Home';
import DetalleUsuario from '../screens/DetalleUsuario/DetalleUsuario';
import Comments from '../screens/Comments/Comments';

const Stack = createNativeStackNavigator();

export default class StackSecundario extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="home"           component={Home}            options={{ headerShown: false }} />
        <Stack.Screen name="detalleusuario" component={DetalleUsuario}  options={{ headerShown: false }} />
        <Stack.Screen name="comments"       component={Comments}        options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }
}


