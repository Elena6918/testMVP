import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View,TouchableOpacity,Image, ScrollView} from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import WaveHeader from "../components/ProfileHeader"
import Module from "../components/Module";
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import { Alert } from "react-native";
//import test from "../app/assets/videos/test"

const Module1Screen = () => {
  const [video1, setVideo1] = useState(false)
  const [video2a, setVideo2a] = useState(false)
  const [video2b, setVideo2b] = useState(false)
  const videoLinks = [
    "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+%231.mp4",
    "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+%232a.mp4",
    "https://elasticbeanstalk-us-east-2-836859601467.s3.us-east-2.amazonaws.com/videos/Video+%232b.mp4"
  ]
  useEffect(()=>{
    AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo1(value.video1)
      setVideo2a(value.video2a)
      setVideo2b(value.video2b)
      console.log(value)
    })
  },[]) 
  async function checkQuiz1Status(){
    await AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo1(()=>{
        if(value.video1){
          navigate("Quiz 1")
        }
        else{
          Alert.alert("You need to finish watching the video first!")
        }
        return value.video1
      })
      
    })  
  }
  async function checkQuiz2aStatus(){
    await AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo2a(()=>{
        if(value.video2a){
          navigate("Quiz 2a")
        }
        else{
          Alert.alert("You need to finish watching the video first!")
        }
        return value.video2a
      })
    })
  }
  function checkQuiz2bStatus(){
    AsyncStorage.getItem('videoState')
    .then(req => JSON.parse(req))
    .then((value) =>{
      setVideo2b(()=>{
        if(value.video2b){
          navigate("Quiz 2b")
        }
        else{
          Alert.alert("You need to finish watching the video first!")
        }
        return value.video2b
      })
    })
  }
  
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>Module 1 Videos</Text>
          <Text style={styles.videoText}>The 5 Stage Philosophy</Text>

          <View flexDirection={'row'}>
            <View flex = {1} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video1"
                  videoURL={videoLinks[0]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 1"
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
                  checkQuiz1Status()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity>
            </View>  
          </View>
          
          <Text style={styles.videoText}>Contact Techniques Part 1</Text>
          <View flexDirection={'row'}>
            <View flex = {1} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video2a"
                  videoURL={videoLinks[1]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 2a"
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
                  checkQuiz2aStatus()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity>
            </View>  
          </View>

          <Text style={styles.videoText}>Contact Techniques Part 2</Text>
          <View flexDirection={'row'}>
            <View flex = {1} alignItems = 'center'>
                <Text style={styles.columnTitleStyle}>Video</Text>  
                <Module 
                  videoName = "video2b"
                  videoURL={videoLinks[2]} 
                  //moduleDescription="Here goes the description of this 2 module"
                  quizName = "Quiz 2b"
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
                  checkQuiz2bStatus()
                }}
              >
                <Image source={require('../assets/images/multiplechoice.png')} style={styles.stopImageStyle}/>
              </TouchableOpacity> 
            </View>  
          </View>
         </View>
        </ScrollView>
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
      height: 800
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
      transform: [{ translateY: -50 }],
    },
    videoText: {
      textAlign: "center",
      fontSize: 30,
      color: "#1a056b",
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
export default Module1Screen
