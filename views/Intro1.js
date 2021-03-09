import React from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity} from "react-native"
import { Text, ImageBackground, Image, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {navigate} from "../navigationRef"

const Intro1 = () =>{
      return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignContent: 'center', backgroundColor: '#1A056B',}}>
          <View style={styles.container}>
            <Text style={styles.header}> Welcome to Project PREPARE!</Text>
          <Image source={require('../assets/images/brain.png')} style={styles.intro1}/> 
          <Button 
                    title = "Get Started"
                    buttonStyle={styles.button}
                    onPress={() => navigate("Intro2")}
            />   
          <Button 
                    title = "Skip"
                    buttonStyle={styles.button}
                    onPress={() => navigate("Signin")}
          /> 
          </View>  
        </SafeAreaView>
     )
  }

  const styles = StyleSheet.create({
      container: {
        backgroundColor: '#1A056B',
        justifyContent: 'center',
        alignItems: 'center',
      },
      intro1:{
        width:500,
        height:500, 
        resizeMode:'contain',
        justifyContent: 'center',
        alignItems: 'center',
        width : 1 * Dimensions.get("window").width,
      },
      header: {
          fontSize: 32,
          textAlign: 'center',
          fontFamily: 'Helvetica Neue',
          color: '#D5E1F2',
          //margin: 5,
          justifyContent: 'flex-start',
          width : 1 * Dimensions.get("window").width,
          transform: [{ translateY: 35 }],
      },
    //buttonArrowStyle: {
      //margin: 10,
      //width : .1 * Dimensions.get("window").width,
      //borderRadius: 10,
      //paddingVertical: 20,
     // paddingHorizontal: 20,
      //transform: [{translateY: 30}],
      //zIndex: 10
     button :{
          margin: 20,
          fontFamily: 'Helvetica Neue',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 30,
          backgroundColor: '#5555fa',
          justifyContent: 'flex-end',
          transform: [{ translateY: -20 }],
    },
    // buttonBackground: {
    //   margin: 10,
    //   width : 0.2 * Dimensions.get("window").width,
    //   backgroundColor: 'rgba(213, 225, 242, .3)',
    //   borderRadius: 10,
    //   paddingVertical: 20,
    //   paddingHorizontal: 30,
    //   alignSelf: 'center',
    //   justifyContent: 'flex-end'
    // },
    // buttonBackground2: {
    //   //margin: 10,
    //   width : 0.23 * Dimensions.get("window").width,
    //   backgroundColor: 'rgba(213, 225, 242, .3)',
    //   borderRadius: 10,
    //   paddingVertical: 20,
    //   paddingHorizontal: 30,
    //   alignSelf: 'center',
    //   justifyContent: 'flex-end'
    // },
      row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      },
  })

export default Intro1