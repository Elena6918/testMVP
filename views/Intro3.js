
import React from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity} from "react-native"
import { Text, ImageBackground, Image, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {navigate} from "../navigationRef"

const Intro3 = () =>{
  return(
  <SafeAreaView style={styles.container}>
      
  <Text style={styles.header}> If you are here to seek help, you can use this app to connect with a trained certified peer supporter.  If you are interested in becoming a peer supporter, you can use this app to learn the necessary skills and techniques to support and connect with a current healthcare worker. </Text>
  <Image source={require('../assets/images/person.png')} style={styles.intro3}/>
  <View style = {styles.bottom}>
    
  <Button 
    title = "Next"
    buttonStyle={styles.button}
    onPress={() => navigate("Intro4")}
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
    flex:1,
    backgroundColor: '#1A056B',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    color: '#D5E1F2',
    //margin: 5,
    //justifyContent: 'flex-start',
    width : .9 * Dimensions.get("window").width,
    marginTop: 50,
    //transform: [{ translateY: 105 }],
  },
  intro3:{
    height:350, 
    //resizeMode:'contain',
    //justifyContent: 'center',
    alignItems: 'center',
    width : 1 * Dimensions.get("window").width,
    //borderWidth: 10,
  },
 button :{
  margin: 10,
  fontFamily: 'Helvetica Neue',
  borderRadius: 10,
  //height:10,
  //width:30,
  paddingVertical: 10,
  paddingHorizontal: 30,
  backgroundColor: '#5555fa',
  //alignSelf: 'flex-end',
  //marginBottom: 200,
  
},
bottom:{
  flex:1,
  justifyContent:'flex-end',
}
})

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#1A056B',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   intro3:{
//     width:500,
//     height:500, 
//     resizeMode:'contain',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width : 1 * Dimensions.get("window").width,
//   },
//   header: {
//       fontSize: 20,
//       textAlign: 'center',
//       fontFamily: 'Helvetica Neue',
//       color: '#D5E1F2',
//       //margin: 5,
//       justifyContent: 'flex-start',
//       width : .9 * Dimensions.get("window").width,
//       transform: [{ translateY: 85 }],
//   },
//  button :{
//       margin: 20,
//       fontFamily: 'Helvetica Neue',
//       borderRadius: 10,
//       paddingVertical: 10,
//       paddingHorizontal: 30,
//       backgroundColor: '#5555fa',
//       justifyContent: 'flex-end',
//       transform: [{ translateY: -25 }],
// },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
// })

export default Intro3