import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View,TouchableOpacity,Image } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import WaveHeader from "../components/ProfileHeader"
import Module from "../components/Module";
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import { Alert } from "react-native";

const Module3Screen = () => {
  const videoLinks = [
    "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+%234.mp4",
    "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+%235.mp4"
  ]
  const [video4, setVideo4] = useState(false)
  const [video5, setVideo5] = useState(false)
  useEffect(()=>{
    AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo4(value.video4)
      setVideo5(value.video5)
    })
  },[]) 
  async function checkQuiz4Status(){
    await AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo4(()=>{
        if(value.video4){
          navigate("Quiz 4")
        }
        else{
          Alert.alert("You need to finish watching the video first!")
        }
        return value.video4
      })
    })
  }
  function checkQuiz5Status(){
    AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo5(()=>{
        if(value.video5){
          navigate("Quiz 5")
        }
        else{
          Alert.alert("You need to finish watching the video first!")
        }
        return value.video5
      })
    })
  }
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Module 3 Videos</Text>
        <Text style={styles.videoText}>Resources and Referrals</Text>
      {/* <WaveHeader customStyles={styles.svgCurve}/> */}
          <View flexDirection={'row'}>
            <View flex = {1} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video4"
                  videoURL={videoLinks[0]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 4"
                  buttonStyle = {styles.stopButtonStyle}
                  imageIcon =  {require('../assets/images/chat.png')}
                  imageStyle = {styles.stopImageStyle}
                />  
            </View>
            <View flex = {1} alignItems = 'center'>
              <Text style={styles.columnTitleStyle}>Quiz</Text>   
              <TouchableOpacity
                style = {styles.stopButtonStyle}
                onPress={()=>{
                  checkQuiz4Status()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity>
            </View>  
          </View>

        <Text style={styles.videoText}> Conclusion, Review,             and More</Text>
          <View flexDirection={'row'}>
            <View flex = {1} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video5"
                  videoURL={videoLinks[1]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 5"
                  buttonStyle = {styles.stopButtonStyle}
                  imageIcon =  {require('../assets/images/peersupport.png')}
                  imageStyle = {styles.stopImageStyle}
                />  
            </View>
            <View flex = {1} alignItems = 'center'>
              <Text style={styles.columnTitleStyle}>Quiz</Text>   
              <TouchableOpacity
                style = {styles.stopButtonStyle}
                onPress={()=>{
                  checkQuiz5Status()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity>
            </View>  
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
      transform: [{ translateY: -250 }],
    },
    container: {
      //marginBottom: 90,
      //marginRight: 100,
      transform: [{ translateY: 50 }],
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
columnTitleStyle:{
  textAlign: 'center',
  fontSize: 23,
  color: "#1a056b",
  marginTop: 10,
},
    header: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 32,
      color: "#1a056b",
      //marginTop: 50,
      //transform: [{ translateY: -50 }],
    },
    videoText: {
      textAlign: "center",
      fontSize: 30,
      color: "#1a056b",
      marginTop: 20
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
  
  export default Module3Screen
