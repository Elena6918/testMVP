import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View,TouchableOpacity,Image } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import WaveHeader from "../components/ProfileHeader"
import Module from "../components/Module";
import { AsyncStorage } from "react-native"
import { Alert } from "react-native"
import { navigate } from "../navigationRef"
//import test from "../app/assets/videos/test"

const Module2Screen = () => {
    const videoLinks = [
      "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+3.mp4",
    ]
    const [video3, setVideo3] = useState(false)

    useEffect(()=>{
      AsyncStorage.getItem('videoState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setVideo3(value.video3)
      })
    },[]) 
    async function checkQuiz3Status(){
      await AsyncStorage.getItem('videoState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setVideo3(()=>{
          if(value.video3){
            navigate("Quiz 3")
          }
          else{
            Alert.alert("You need to finish watching the video first!")
          }
          return value.video3
        })
      })
    }

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        {/* <View > 
          <WaveHeader customStyles={styles.svgCurve}/>
        </View> */}
        <View style={styles.container}>
          <Text style={styles.header}>Module 2 Videos</Text>
          <Text style={styles.videoText}>The Suicide Risk            Assessment Screener</Text>
            
            <View flex = {.5} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video3"
                  videoURL={videoLinks[0]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 3"
                  buttonStyle = {styles.stopButtonStyle}
                  imageIcon =  {require('../assets/images/feeling.png')}
                  imageStyle = {styles.stopImageStyle}
                />  
              <Text style={styles.columnTitleStyle}>Quiz</Text>   
              <TouchableOpacity
                style = {styles.stopButtonStyle}
                onPress={()=>{
                  checkQuiz3Status()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    svgCurve: {
      position: "absolute",
      width: Dimensions.get("window").width,
      backgroundColor: "#1a056b",
      // transform: [{ translateY: -250 }],
    },
    videoText: {
      textAlign: "center",
      fontSize: 25,
      color: "#1a056b",
      marginBottom: 10,
      marginTop: 10
    },
    columnTitleStyle:{
      textAlign: 'center',
      fontSize: 23,
      color: "#1a056b",
      marginTop: 10,
    },
    container: {
      marginBottom: 90,
      //marginRight: 100,
      // transform: [{ translateY: 200 }],
      flex: 1,
    },
    stopButtonStyle:{
      backgroundColor: '#d5e1f2',
      width:100,
      height:100, 
      borderRadius: 20,
      justifyContent: 'center',
      alignItems:'center',
      marginBottom: 30,
    },
    stopImageStyle:{
      width:80,
      height:80,
      resizeMode:'contain',
},
    video:{
      alignSelf: "center",
      fontSize: 23,
      color: "#1a056b",
      marginTop: 10,
    },
    quiz:{
      alignSelf: "center",
      fontSize: 23,
      marginTop: 10,
      color: "#1a056b",
    },
    stop: {
      flex: 1,
      marginRight: 100,
      //paddingRight: 900,
      marginEnd: 100,
      alignSelf: "center"
    },
    header: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 32,
      color: "#1a056b",
      marginTop: 50,
      marginBottom: 50
      //transform: [{ translateY: -80 }],
    },
    navigationLink: {
      color: "gray",
      textAlign: "center",
      marginTop: 8,
      textDecorationLine: "underline",
    },
    errorText: {
      color: "red",
      textAlign: "center",
    },
    rowView:{
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
});
  
  export default Module2Screen
