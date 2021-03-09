import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-navigation"
import { Text } from "react-native-elements"
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native"
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import { useIsFocused } from "@react-navigation/native"

const UserMessageScreen = () =>{
    const isFocused = useIsFocused()
    const [userId, setUserId] = useState("")
    const [done, setDone] = useState([])
    const [pairs, setPairs] = useState([])
    const [expandPair, setExpandPair] = useState(false)
    const [expandDone, setExpandDone] = useState(false)
    const winHeight = Dimensions.get("window").height
    async function getPair(id){
        try{
          const response = await serverApi.post("/pair/get", {recipientId : id})
          setPairs(response.data.pair)
        }catch(err){
            console.log(err.message)
        }
    }

    async function getDone(id){
        try{
          const response = await serverApi.post("/done/get", {recipientId : id})
          setDone(response.data.done)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
        AsyncStorage.getItem("token")
        .then((value) => {
            var decoded = jwt_decode(value)
            const id = decoded["userId"]
            setUserId(decoded["userId"])
            getPair(id)
            getDone(id)
        })
        .catch(function(error){
            console.log(error.message)
            throw error
        })
          
    },[isFocused])

    var inProgress = []
    var complete = []

    if(pairs != null){
        for (var i = 0; i < pairs.length; i++){
            const tempUser = pairs[i]
            const key = tempUser._id
            var msg = (
                <View style={styles.container} key={key}>
                    <TouchableOpacity onPress={() => {
                        navigate("UserProgress",{users: tempUser, status: 0})
                        }}> 
                        <Text style={styles.username}>
                            Name: {tempUser.providerName}
                        </Text>
                        <View style = {styles.lineStyle} />
                        {/* <Text style={styles.username}>
                            Category: {tempUser.category}
                        </Text> */}
                    </TouchableOpacity>
                </View>
            )
            inProgress[i] = msg
        }
    }

        if(done != null){
            for (var i = 0; i < done.length; i++){
                const tempUser = done[i]
                const key = tempUser._id
                var msg = (
                    <View style={styles.container} key={key}>
                        <TouchableOpacity onPress={() => {
                            navigate("UserProgress",{users: tempUser, status: 1})
                            }}> 
                            <Text style={styles.username}>
                                Name: {tempUser.providerName}
                            </Text>
                            <View style = {styles.lineStyle} />
                            <Text style={styles.username}>
                                Category: {tempUser.category}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
                complete[i] = msg
            }
        }

    return(
        <SafeAreaView forceInset={{ top: "always" }}>
            <ScrollView style={{margin: 10, height: winHeight * 0.9}}>
                <Text style={{fontSize: 18, textAlign: 'center', padding: 10}}>
                    Here, you can view how many conversations you've started and completed with a peer supporter. When the peer supporter clicks "finished conversation" on their side, tickets will move from in progress to done, and feedback will become available. 
                </Text>
                <ScrollView style={styles.btnTextHolder}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={()=>{setExpandPair(!expandPair)}} 
                        style={{...styles.Btn, backgroundColor: 'lightblue'}}>
                        <Text style={styles.btnText}>In Progress: {inProgress.length}</Text>
                    </TouchableOpacity>
                    <View style={{ height: expandPair ? null : 0, overflow: 'hidden', flex: 1 }}>
                        {inProgress}
                    </View>
                </ScrollView>
                <ScrollView style={styles.btnTextHolder}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={()=>{setExpandDone(!expandDone)}} 
                        style={{...styles.Btn, backgroundColor: 'mediumaquamarine'}}>
                        <Text style={styles.btnText}>Done: {complete.length}</Text>
                    </TouchableOpacity>
                    <View style={{ height: expandDone ? null : 0, overflow: 'hidden' }}>
                        {complete}
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 0.2,
        borderRadius: 20,
        borderColor: "grey",
        backgroundColor: "gainsboro",
        margin: 10,
        top: 20
    },
    messageContainer:{
        height: Dimensions.get('window').width * 0.8
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
    text: {
        fontSize: 17,
        color: 'black',
        padding: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 20
    },
    
    btnTextHolder: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 10,
        borderColor: 'lightgrey',
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1
    },
    
    Btn: {
        padding: 10,
    }
})

export default UserMessageScreen