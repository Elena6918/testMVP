import React, {useState, useEffect} from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,AsyncStorage, Image, Linking } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import WaveHeader from "../components/ProfileHeader"
import { navigate } from "../navigationRef"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import { Alert } from "react-native"

const ProfileScreen = () => {
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    const [certStatus, setCertStatus] = useState(0) //0: cannot unlock test, 1: unlock test but not passed, 2: passed test and got certification
    AsyncStorage.getItem("token")
    .then((value) => {
        var decoded = jwt_decode(value)
        setUserId(decoded["userId"])
        getUserName()
        .catch(function(error){
            console.log(error.message)
            throw error
        })
    })
    .catch(function(error){
        console.log(error.message)
        throw error
    })
    AsyncStorage.getItem("CertState")
    .then((value)=>{
        // if(value=="0"){
        //     setCertStatus(0)
        // }
        if(value=="1"){
            setCertStatus(1)
        }
        if(value=="2"){
            setCertStatus(2)
        }
    })
    async function getUserName(){
        try{
            const response = await serverApi.post("/profile", { userId })
            setUserName(response.data.username)
        }catch(err){
            console.log(err.message)
        } 
    }
    
    async function checkHelpStatus(){
        AsyncStorage.getItem("CertState")
        .then((value)=>{
            if(value=="1"){
                setCertStatus(1)
            }
            if(value=="2"){
                setCertStatus(2)
            }
        })
        .then(isHelp())
    }
    async function checkCertStatus(){ //whether the user can unlock certificate quiz (finished all module quiz)
        AsyncStorage.getItem('quizState')
        .then(req => JSON.parse(req))
        .then((value) =>{
            setCertStatus(()=>{
                console.log(value)
                const quiz1 = value.quiz1
                const quiz2a = value.quiz2a
                const quiz2b = value.quiz2b
                const quiz3 = value.quiz3
                const quiz4 = value.quiz4
                const quiz5 = value.quiz5
                console.log(value)
                if(quiz1 && quiz2a && quiz2b && quiz3 && quiz4 && quiz5 && certStatus!=2){
                    // navigate("CertTest")
                    AsyncStorage.setItem("CertState", "1")
                    return 1
                }
            })
        })
        .then(isCertificate())
    }

    function isCertificate(){
        if(certStatus==0){
            Alert.alert("You need to finish all module quizzes to unlock this certification quiz!")
        }
        if(certStatus==1){
            navigate("CertTest")
        }
        if(certStatus==2){
            Alert.alert("You've already passed the test!")
        }
        // AsyncStorage.getItem('CertState')
        // .then((value)=>{
        //     if(value=="0"){
        //         Alert.alert("You need to finish all module quizzes to unlock this certification quiz!")
        //     }
        //     if(value=="1"){
        //         navigate("CertTest")
        //     }
        //     if(value=="2"){
        //         setCertStatus(2)
        //         Alert.alert("You've already passed the test!")
        //     }
        // })
    }

    function isHelp(){
        if(certStatus==2){
            navigate("Help")
        }
        else{
            console.log(certStatus)
            Alert.alert("You need to pass the certification test to unlock this feature!")
        }
    }

    async function clearstorage(){
        const videoState = {
            video1: false,
            video2a: false,
            video2b: false,
            video3: false,
            video4: false,
            video5: false
          }
          const quizState = {
            quiz1: false,
            quiz2a: false,
            quiz2b: false,
            quiz3: false,
            quiz4: false,
            quiz5: false
          }
          await AsyncStorage.setItem("quizState", JSON.stringify(quizState))
          await AsyncStorage.setItem("videoState", JSON.stringify(videoState))
          await AsyncStorage.setItem("CertState", "0")
    }
    return (
        <View>
            <WaveHeader customStyles={styles.svgCurve}/>
            <SafeAreaView forceInset={{ top: "always" }}>
            {/* <WaveHeader customStyles={styles.svgCurve}/> */}
                <View style = {styles.iconContainer}>
                    <TouchableOpacity style={styles.icon} onPress={()=>{navigate("Setting")}}>
                        <Ionicons name="ios-settings" size={35} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Username: {userName}</Text>
                    <View style={styles.rowView}>
                        <Text style={styles.iconHeader}>Certification Test</Text>
                        <Text style={styles.iconHeader}>Peer Support</Text>
                    </View>

                    <View style={styles.rowView}>
                        <TouchableOpacity style = {styles.stopButtonStyle} onPress={()=>{checkCertStatus()}}>
                            <Image source={require('../assets/images/multiplechoice.png')} style={styles.certificationQuiz}/>
                        </TouchableOpacity> 
                        <TouchableOpacity style = {styles.stopButtonStyle} onPress={()=>{checkHelpStatus()}}>
                            <Image source={require('../assets/images/peersupport.png')} style={styles.peerSupport}/>
                        </TouchableOpacity> 
                    </View>

                    <View style={styles.rowView}>
                        <Text style={styles.iconHeader}> Mental Health Resources</Text>
                        <Text style={styles.iconHeader}>List of Strong Feeling Descriptors</Text>
                    </View>
                    <View style={styles.rowView}>
                        <TouchableOpacity style = {styles.stopButtonStyle} onPress={() => {navigate("Resources")}}>
                            <Image source={require('../assets/images/pin.png')} style={styles.peerSupport}/>
                        </TouchableOpacity> 
                        <TouchableOpacity style = {styles.stopButtonStyle} onPress={() => {navigate("Descriptors")}}>
                            <Image source={require('../assets/images/feeling.png')} style={styles.peerSupport}/>
                        </TouchableOpacity> 
                    </View>
                    {/* <Button 
                        title="Clear Async storage"
                        onPress={()=>{clearstorage()}}
                    >
                    </Button>  */}
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    svgCurve:{
        position: 'absolute',
        width: Dimensions.get('screen').width,
        backgroundColor: '#D5E1F2',
    },    
    rowView:{
        flexDirection: "row",
        justifyContent: "space-evenly"
      },
    iconHeader:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 10,
        color: '#1a056b',
        width : 0.4 * Dimensions.get("window").width,
    },
    stopButtonStyle:{
        backgroundColor: '#d5e1f2',
        width:100,
        height:100, 
        borderRadius: 20,
        justifyContent: 'center',
        alignItems:'center',
        //marginBottom: 30,
      },
    container: {
        padding: 16,
        top: 70,
        height: 600,
        justifyContent: 'flex-start'
    },
    certificationQuiz: {
        width:80,
        height:80,
        resizeMode:'contain',
    },
    peerSupport: {
        width:80,
        height:80,
        resizeMode:'contain',
    },
    iconContainer:{
        flexDirection: "row-reverse",
        right: 10,
        top: 10
    },
    point:{
        padding: 16,
        marginTop: 20,
        marginBottom : 40
    },
    title: {
        margin: 10,
        fontSize: 24
    },
    button:{
        height: 0.4 * Dimensions.get("window").width
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
})

export default ProfileScreen

