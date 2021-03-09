import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
} from "react-native";


const House = () =>{
    return(
        <View>
            <TouchableHighlight
              style={{ ...styles.house}}
            >
              <Image source={require('../assets/images/house.png')} style={styles.house} /> 
            </TouchableHighlight>
        </View>
    )
    
}

const styles = StyleSheet.create({
    house:{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        // backgroundColor: 'pink',
        resizeMode:'contain'
    }
})

export default House