import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import {db, auth} from "../../firebase/config"
import firebase from 'firebase'



class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
        comentario: ""

    }
  }
  

  
  
    render() {
    return (
      <View>
        <FlatList

      />
      </View>
    )
  }
}

export default Comments;