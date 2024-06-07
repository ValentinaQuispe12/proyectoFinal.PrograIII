import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//rutas
import Home from '../screens/Home/Home'
import Post from '../screens/Post/Post'
import Miperfil from '../screens/Miperfil/Miperfil'
import Profile from '../screens/Profile/Profile'
// iconos 
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='home'     component={Home}    options={{ headerShown: false, tabBarIcon: ()=> <Entypo name="home"       size={24} color="#92CD93" /> }} />
        <Tab.Screen name='post'     component={Post}    options={{ headerShown: false, tabBarIcon: ()=> <AntDesign name="camerao" size={24} color="#92CD93" />  }} />
        <Tab.Screen name='miperfil'  component={Miperfil} options={{ headerShown: false, tabBarIcon: ()=> <MaterialCommunityIcons name="human" size={24} color="#92CD93" /> }} />
        <Tab.Screen name='profile'  component={Profile} options={{ headerShown: false, tabBarIcon: ()=> <MaterialCommunityIcons name="human" size={24} color="#92CD93" /> }} />



      </Tab.Navigator>
    )
  }
}
