import React, {useState, useEffect, useContext} from "react"
import { SafeAreaView } from "react-navigation"
import { Button, Text, Input, Tooltip } from "react-native-elements"
import { StyleSheet, View, Dimensions,TextInput, Modal, TouchableHighlight,Keyboard, TouchableWithoutFeedback, ScrollView} from "react-native"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import {Context as AuthContext} from "../context/AuthContext"
import { AntDesign } from '@expo/vector-icons'

const HelpScreen = () =>{
    const [index,setIndex] = useState(0)
    const [category, setCategory] = useState("all")
    const [resVisibility, setResVisibility] = useState(false)
    const [users, setUsers] = useState([{
        userId : "",
        category:"Currently unavailable",
        message: "Currently unavailable",
        state: 0 //default to pending
    }])
    const [userId, setUserId] = useState("")
    const [patientName, setPatientName] = useState("")
    const [message, setMessage] = useState("")
    const [empty, setEmpty] = useState(false)
    const { state, sendResponse, queryValidation } = useContext(AuthContext)
    
    useEffect(()=>{
        AsyncStorage.getItem("token")
        .then((value) => {
              var decoded = jwt_decode(value)
              setUserId(decoded["userId"])
              getQuery()
        })
        .catch(function(error){
              console.log(error.message)
              throw error
        })
        getQuery()
    },[])
    async function getQuery(){
        try{
            const response = await serverApi.post("/query/get", {category : category})
            if(response.data.query.length == 0){
                setEmpty(true)
                setIndex(0)
                setUsers([{
                    userId : "default",
                    category:"Currently unavailable",
                    message: "Currently unavailable",
                    state: 0
                }])
            }
            else{
                setUsers(response.data.query)
                setEmpty(false)
            }
        }catch(err){
            console.log(err.response.data.error)
        }
    }

    function changeIndex(){
        const randomNumber = Math.floor(Math.random() * users.length)
        if(index < users.length-1){
            const statNumber = index + 1
            setIndex(statNumber)
        }else{
            const statNumber = 0
            setIndex(statNumber)
        }
        // setIndex(randomNumber)
    }
    return(
        <ScrollView forceInset={{ top: "always" }} style={{marginTop: 50}}>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={resVisibility}
                    onRequestClose={() => {
                        console.log("Modal has been closed.")
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible={false}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.name_container}>
                                    <Input placeholder="(Optional) Name" onChangeText={setPatientName}/>
                                    <Tooltip 
                                        popover={<Text>This name is used for identifying the ticket when stored in Message tab. If leaving blank, the name will be automatically generated with random numbers.</Text>}
                                        height={200}
                                        width={300}
                                    >
                                        <AntDesign name="questioncircle" size={25} color="black" />
                                    </Tooltip>
                                </View>
                                
                                <TextInput
                                    style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
                                    placeholder="Please include a message with your phone number and email." 
                                    multiline={true}
                                    numberOfLines={4}
                                    maxLength={120}
                                    onChangeText={setMessage}
                                />
                                
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#1a056b" }}
                                    onPress={() => {
                                        let recipientId = users[index].userId
                                        setResVisibility(false)
                                        queryValidation({recipientId})
                                        sendResponse({userId, recipientId, patientName, message})
                                        getQuery()
                                    }}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#1a056b" }}
                                    onPress={() => {
                                        setResVisibility(false) 
                                    }}
                                >
                                    <Text style={styles.textStyle}>Back</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
            {state.errorMessage ? (
                <Text style={styles.errorText}>{state.errorMessage}</Text>
            ) : null}
            {state.status ? (
                <Text style={styles.successText}>{state.status}</Text>
            ) : null}
            <View style={styles.topContainer}>
                <Text>On this page, you can see various queries opened by current healthcare workers seeking help from you, a peer supporter. Select a query to begin a conversation.</Text>
            </View>
            <View style={styles.container}>
                {/* <Text style={styles.username}>
                    Category: {users[index].category}
                </Text> */}
                
                <View style = {styles.messageContainer}>
                    <Text style={styles.username}>
                        Message: 
                    </Text>
                    <View style = {styles.lineStyle} />
                    <Text style={styles.message}>
                        {users[index].message}
                    </Text>
                </View>
                <View>
                    <Button 
                        title="Pick This Query" 
                        buttonStyle={{backgroundColor: "#5555fa", margin: 10}} 
                        style={{ marginTop: 10}} 
                        onPress = {()=>{
                            let recipientId = users[index].userId
                            queryValidation({recipientId})
                            !empty && setResVisibility(true)
                        }} 
                    />
                    <Button 
                        title="See Another Query" 
                        buttonStyle={{backgroundColor: "#1a056b", margin: 10}} 
                        style={{ marginTop: 10}} 
                        onPress={()=>changeIndex()}
                    />
                    <Button 
                        title="Refresh" 
                        buttonStyle={{backgroundColor: "#1a056b", margin: 10}} 
                        style={{ marginTop: 10}} 
                        onPress={()=>getQuery()}
                    />
                    {/* <Button 
                        title="test"
                        onPress={()=>removeItemValue()}
                    /> */}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "#d5e1f2",
        margin: 10
    },
    topContainer: {
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "#F9DCDC",
        margin: 10,
    },
    messageContainer:{
        height: Dimensions.get('window').width * 0.8
    },
    name_container:{
        flexDirection: "row",
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        marginBottom: 10,
    },
    username:{
        fontSize: 20,
        marginBottom: 10,
        margin: 10
    },
    message:{
        fontSize: 15,
        margin: 10,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        top: 10,
        margin: 10,
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        width: Dimensions.get('window').width * 0.8,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    errorText: {
        color: "red",
        textAlign: "center"
    },
    successText: {
        color: "green",
        textAlign: "center"
    }
})

export default HelpScreen