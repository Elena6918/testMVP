import React, { useState, useContext } from "react"
import { Button, Text } from "react-native-elements"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"

const ChooseRoleScreen = () => {
    const [userId, setUserId] = useState("")
    AsyncStorage.getItem("token")
    .then((value) => {
        var decoded = jwt_decode(value)
        setUserId(decoded["userId"])
    })
    .catch(function(error){
        console.log(error.message)
        throw error
    })

    // async function changeRole(){
    //     try{
    //         await serverApi.put("/changerole", {userId : userId})
    //     }catch(err){
    //         console.log(err.response.data.error)
    //     }
    // }
    return(
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#5e1f2" }}>
            <Text style={styles.header}> 
                Please note that this role will be linked with your account and cannot be changed later. 
                You will need to create a separate account if you want to use this app with a different role.
            </Text>
            <View style={styles.container}>
                <Button 
                    title="I'm here to help" 
                    buttonStyle={{backgroundColor: "navy", margin: 10}} 
                    style={{ marginTop: 15}} 
                    onPress={()=>{navigate("Signup"),{identity: "trainer"}}} 
                />
                <Text style={{alignSelf: "center"}}>
                    In this role, you will use this app to learn how to help a current healthcare worker, then connect with one.  After signing up, navigate to the modules to begin. 
                </Text>
            </View>
            <View style={styles.container}>
                <Button 
                    title="I'm here to seek help" 
                    buttonStyle={{backgroundColor: "navy", margin: 10}} 
                    style={{ marginTop: 15}} 
                    onPress={()=>{
                        changeRole() 
                        navigate(()=>{navigate("Signup"),{identity: "patient"}})
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

export default ChooseRoleScreen