
import React from "react"
import { StyleSheet, Dimensions, View, TouchableOpacity} from "react-native"
import { Text, ImageBackground, Image, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {navigate} from "../navigationRef"

const IntroPeerSupporter4 = () =>{
  return(
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignContent: 'center', backgroundColor: '#1A056B',}}>
      <View style={styles.container}>
  
        <Text style={styles.header}> When on the new feature screen, click the message icon in your bottom navigator to see all the conversations you've completed, started, and are in progress with.  
</Text>
      <Image source={require('../assets/images/message.png')} style={styles.intro3}/> 
            <Button 
                title = "Next"
                buttonStyle={styles.button}
                onPress={() => navigate("trainer")}
        /> 
        {/* <Button 
                title = "Skip"
                buttonStyle={styles.button}
                onPress={() => navigate("Intro4")}
        />  */}
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
  intro3:{
    width:500,
    height:500, 
    resizeMode:'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width : .5 * Dimensions.get("window").width,
  },
  header: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Helvetica Neue',
      color: '#D5E1F2',
      //margin: 5,
      justifyContent: 'flex-start',
      width : .9 * Dimensions.get("window").width,
      transform: [{ translateY: 65 }],
      marginBottom: 30

  },
 button :{
      margin: 20,
      fontFamily: 'Helvetica Neue',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: '#5555fa',
      justifyContent: 'flex-end',
      transform: [{ translateY: -25 }],
},
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
})

export default IntroPeerSupporter4