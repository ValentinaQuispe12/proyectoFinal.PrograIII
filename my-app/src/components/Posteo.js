import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, PushNotificationIOS } from 'react-native'
import { auth, db } from '../firebase/config'
import Camara from './Camara'

class Posteo extends Component {
  constructor(props){
    super(props)
  }

  onImageUpload(url){
    this.setState({
      url:url
    })
  }
  
  render() {
    return (
      <View>
        <Image source={{uri: this.props.post.data.imageUrl}}
            style={styles.imgPost}
        />
        <Text> {this.props.post.data.pie}</Text>
        <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.props.borrarPosteo(this.props.posteo.id)}
                >
                    <Text style={styles.deleteButtonText}>Borrar Posteo</Text>
                </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postText: {
        flex: 1,
        color: 'black',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#FF6961',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imgPost:{
      height: 200,
      width: '100%'
    }
});

export default Posteo;
