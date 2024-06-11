import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//rutas
import Home from '../screens/Home/Home'
import Post from '../screens/Post/Post'
import Miperfil from '../screens/Miperfil/Miperfil'
import Buscador from '../screens/Buscador/Buscador'

// iconos 
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import StackSecundario from './StackSecundario'

const Tab = createBottomTabNavigator()

export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='home'     component={StackSecundario}   options={{ headerShown: false, tabBarIcon: ()=> <Entypo name="home"                  size={24} color="#92CD93" /> }} />
        <Tab.Screen name='post'     component={Post}              options={{ headerShown: false, tabBarIcon: ()=> <AntDesign name="camerao"            size={24} color="#92CD93" />  }} />
        <Tab.Screen name='buscador' component={Buscador}          options={{ headerShown: false, tabBarIcon: ()=> <FontAwesome name="search"           size={24} color="#92CD93" />  }} />
        <Tab.Screen name='miperfil' component={Miperfil}          options={{ headerShown: false, tabBarIcon: ()=> <MaterialCommunityIcons name="human" size={24} color="#92CD93" /> }} />


      </Tab.Navigator>
    )
  }
}
