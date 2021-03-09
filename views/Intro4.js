import React, { useState, useContext } from "react"
import { Button, Text } from "react-native-elements"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"

const Intro4 = () => {
    // const [userId, setUserId] = useState("")
    // AsyncStorage.getItem("token")
    // .then((value) => {
    //     var decoded = jwt_decode(value)
    //     setUserId(decoded["userId"])
    // })
    // .catch(function(error){
    //     console.log(error.message)
    //     throw error
    // })

    // async function changeRole(){
    //     try{
    //         await serverApi.put("/changerole", {userId : userId})
    //     }catch(err){
    //         console.log(err.response.data.error)
    //     }
    // }
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "1A056B"}}>
            <Text style={styles.header}> 
                On this screen, you can choose the role you will participate in.  Please note that this role will be linked with your account and cannot be changed later. 
                You will need to create a separate account if you want to use this app with a different role.
            </Text>
            <View style={styles.container}>
                <Button 
                  title="I'm here to help" 
                  buttonStyle={styles.button}
                  buttonStyle={{backgroundColor: "navy", margin: 10}} 
                  onPress={()=>{navigate("Signup",{identity: "trainer"})}}
                />
                <Text style={{alignSelf: "center"}}>
                    In this role, you will use this app to learn how to support and connect with a current healthcare worker.  After signing up, navigate to the modules to begin. 
                </Text>
            </View>
            <View style={styles.container}>
                <Button 
                    title="I'm here to seek help" 
                    buttonStyle={{backgroundColor: "navy", margin: 10}} 
                    style={{ marginTop: 15}} 
                    onPress={()=>{navigate("Signup",{identity: "patient"})
                  }} 
                />
                <Text>
                    In this role, you will use this app to connect with a peer supporter.  After signing up, navigate to the query tab on the bottom to begin.
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "#d5e1f2",
        margin: 10,
    },
    header: {
        flexDirection: "row",
        padding: 10,
        alignContent: "center",
        flexWrap: "wrap",
        margin: 10,
        backgroundColor: '#d5e1f2',
        fontSize: 20
    },
})

export default Intro4

// import React from "react"
// import { StyleSheet, Dimensions, View, TouchableOpacity} from "react-native"
// import { Text, ImageBackground, Image, Button } from "react-native-elements"
// import { SafeAreaView } from "react-navigation"
// import {navigate} from "../navigationRef"


// const Intro4 = () =>{
//       return(
//         <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#1A056B',}}>
//           <View style={styles.container}>
//             {/* <Text style={styles.header}>Insert stuff here!!! woo hoooo  </Text> */}
//             <Image source={require('../assets/images/twoppl.png')} style={styles.intro2}/>  
//             <Text style={styles.header}> 
//                 Please note that this role will be linked with your account and cannot be changed later. 
//                 You will need to create a separate account if you want to use this app with a different role.
//             </Text>
//             <Button 
//                 title="I'm here to help" 
//                 buttonStyle={styles.button}
//                 onPress={()=>{navigate("Signup",{identity: "trainer"})}} 
//             />
//               <Text style={{alignSelf: "center"}}>
//                   In this role, you will use this app to learn how to help a current healthcare worker, then connect with one.  After signing up, navigate to the modules to begin. 
//               </Text>
//             <Button 
//                 title="I'm here to seek help" 
//                 buttonStyle={styles.button}
//                 onPress={()=>{navigate("Signup",{identity: "patient"})}}
//             />
//                 <Text>
//                     In this role, you will use this app to connect with a peer supporter.  After signing up, navigate to the query tab on the bottom to begin.
//                 </Text>

//             {/* <Button 
//                     title = "Next"
//                     buttonStyle={styles.button}
//                     onPress={() => navigate("Signup")}
//             />   
//             <Button 
//                     title = "Skip"
//                     buttonStyle={styles.button}
//                     onPress={() => navigate("Signup")}
//             />    */}
//           </View>  
//         </SafeAreaView>
//      )
//   }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#1A056B',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   intro4:{
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

// export default Intro4