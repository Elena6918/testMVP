import React, { useState, useEffect } from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,Image } from "react-native"
import { Tooltip, Text } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {navigate} from "../navigationRef"
import { AntDesign } from '@expo/vector-icons'
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"

const UserModuleScreen = () => {
  // const [userId, setUserId] = useState("")
  // const [taken, setTaken] = useState(false)
  // useEffect(()=>{
  //   AsyncStorage.getItem("token")
  //   .then((value) => {
  //         var decoded = jwt_decode(value)
  //         setUserId(decoded["userId"])
  //   })
  //   .catch(function(error){
  //         console.log(error.message)
  //         throw error
  //   })
  // },[])
 
  // async function getAnswerInfo(){
  //   try{
  //     const response = await serverApi.post("/answer", {userId: userId})
  //     await AsyncStorage.setItem("answerInfo", JSON.stringify(response.data))
  //     if(response.data.DPpre){
  //       setTaken(true)
  //     }else{
  //       setTaken(true)
  //       // setTaken(false) for demo purpose
  //     } 
  //   }catch(err){
  //     console.log(err.message)
  //   }
  // }
  // getAnswerInfo()

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.worldContainer}>
      <Text style={styles.moduleName}>Module 1</Text>
        {/* <Tooltip 
          popover={<Text>Here goes the description of the world</Text>}
          height={100}
          width={300}
        >
          <AntDesign name="questioncircle" size={24} color="#1a056b" />
        </Tooltip> */}
          <TouchableOpacity style={styles.stopButtonStyle} onPress={()=>{navigate("Module 1")}}>
            <Image source={require('../assets/images/heartbrain.png')} style={styles.worldImage}/>
          </TouchableOpacity> 
        {/* {!taken &&
        <View>
          <TouchableOpacity onPress={()=>{navigate("DepressionQuestionnaire");setTaken(true)}}>
            <Image source={require('../assets/images/world.png')} style={styles.worldImage}/>
          </TouchableOpacity> 
        </View>} */}
      <Text style={styles.moduleName}>Module 2</Text> 
        {/* <Tooltip 
          popover={<Text>Here goes the description of the world</Text>}
          height={100}
          width={300}
        >
          <AntDesign name="questioncircle" size={24} color="#1a056b" />
        </Tooltip> */}
        <TouchableOpacity style={styles.stopButtonStyle} onPress={()=>{navigate("Module 2")}}>
          <Image source={require('../assets/images/firstaidbrain.png')} style={styles.worldImage}/>
        </TouchableOpacity>
      <Text style={styles.moduleName}>Module 3</Text>
        {/* <Tooltip 
          popover={<Text>Here goes the description of the world</Text>}
          height={100}
          width={300}
        >
          <AntDesign name="questioncircle" size={24} color="#1a056b" />
        </Tooltip> */}
        <TouchableOpacity style={styles.stopButtonStyle} onPress={()=>{navigate("Module 3")}}>
          <Image source={require('../assets/images/rainbrain.png')} style={styles.brainImage}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  stopButtonStyle:{
    backgroundColor: '#d5e1f2',
    width:120,
    height:120, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 40,
  },
  worldContainer:{
    flexDirection: "column",
    height: 100,
    width: 130,
    margin: 70, 
    alignSelf: "center",
    alignItems: 'center'
  },
  worldImage:{
    width:100,
    height:150, 
    resizeMode:'contain',
    //alignSelf: "center",
    justifyContent: 'center',
    margin: 10, 
  },
  brainImage:{
    alignSelf:'stretch',
    width:130,
    height:150, 
    resizeMode:'contain',
    alignSelf: "center",
    margin: 10,
  },
  moduleName: {
    textAlign: "center",
    fontSize: 30,
    color: "#1a056b",
    marginBottom: 10
  },
  title: {
    fontSize: 24,
  },
  button:{
    marginLeft: 20,
    width : 0.6 * Dimensions.get("window").width
    },
  moduleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50
  },
})

export default UserModuleScreen
