
import React from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity} from "react-native"
import { Text, ImageBackground, Image, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {navigate} from "../navigationRef"

const Intro2 = () =>{
  return(
    <SafeAreaView style={styles.container}>
      
        <Text style={styles.header}> The COVID-19 pandemic has revealed a significant mental health crisis across the country.  Healthcare workers are particularly vulnerable to such stress factors. PREPARE is a digital platform where we train peer supporters in healthcare and connect them with a healthcare worker who needs coaching.</Text>
        <Image source={require('../assets/images/cog.png')} style={styles.intro2}/>
        <View style = {styles.bottom}>
          
        <Button 
          title = "Next"
          buttonStyle={styles.button}
          onPress={() => navigate("Intro3")}
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
    width : .90 * Dimensions.get("window").width,
    marginTop: 50,
    marginBottom: 20,
    //transform: [{ translateY: 105 }],
  },
  intro2:{
    height:280, 
    //resizeMode:'contain',
    //justifyContent: 'center',
    //alignItems: 'center',
    width : .9 * Dimensions.get("window").width,
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

export default Intro2