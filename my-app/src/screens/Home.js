import {Text, View} from "react-native"
import React, {Component} from 'react'
import {db} from '../firebase/config'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos:[]
        }
    }

  /*   componentDidMount(){
        db.collection()
    }
 */
    render(){
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}