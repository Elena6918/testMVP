import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-navigation"
import { Text } from "react-native-elements"
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView} from "react-native"
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import { useIsFocused } from "@react-navigation/native"

const MessageScreen = () =>{
    const isFocused = useIsFocused()
    const [pairs, setPairs] = useState([])
    const [done, setDone] = useState([])
    const [pending, setPending] = useState([])
    const [userId, setUserId] = useState("")
    const [expandPending, setExpandPending] = useState(false)
    const [expandPair, setExpandPair] = useState(false)
    const [expandDone, setExpandDone] = useState(false)
    const winHeight = Dimensions.get("window").height
    var complete = []
    var inProgress = []
    var pendings = []

    async function getPair(id){
        try{
          const response = await serverApi.post("/pair/get", {providerId : id})
          const pair = response.data.pair
          setPairs(pair)
        }catch(err){
            console.log(err.message)
        }
    }

    async function getDone(id){
        try{
          const response = await serverApi.post("/done/get", {providerId : id})
          const done = response.data.done
          setDone(done)
        }catch(err){
            console.log(err.message)
        }
    }

    async function getPending(id){
        try{
          const response = await serverApi.post("/pending/get", {providerId : id})
          const pending = response.data.pending
          setPending(pending)
        }catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        AsyncStorage.getItem("token")
        .then((value) => {
            var decoded = jwt_decode(value)
            setUserId(decoded["userId"])
            const id = decoded["userId"]
            getPair(id)
            getDone(id)
            getPending(id)  
        })
        .catch(function(error){
            console.log(error.message)
            throw error
        })   
    },[isFocused])

        if(pairs != null){
            for (var i = 0; i < pairs.length; i++){
                const tempUser = pairs[i]
                const key = tempUser._id
                var msg = (
                    <View style={styles.container} key={key}>
                        <TouchableOpacity onPress={() => {
                            navigate("Progress",{users: tempUser, status: 1})
                            }}> 
                            <Text style={styles.username}>
                                Name: {tempUser.recipientName}
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
                            navigate("Progress",{users: tempUser, status: 2})
                            }}> 
                            <Text style={styles.username}>
                                Name: {tempUser.recipientName}
                            </Text>
                            <View style = {styles.lineStyle} />
                            {/* <Text style={styles.username}>
                                Category: {tempUser.category}
                            </Text> */}
                        </TouchableOpacity>
                    </View>
                )
                complete[i] = msg
            }
        }
        
    
        
        if(pending != null){
            for (var i = 0; i < pending.length; i++){
                const tempUser = pending[i]
                tempUser["recipientName"] = tempUser["username"]
                const key = tempUser._id
                var msg = (
                    <View>
                        <View style={styles.container} key={key}>
                            <TouchableOpacity onPress={() => {
                                navigate("Progress",{users: tempUser, status: 0})
                                }}> 
                                <Text style={styles.username}>
                                    Name: {tempUser.username}
                                </Text>
                                <View style = {styles.lineStyle} />
                                {/* <Text style={styles.username}>
                                    Category: {tempUser.category}
                                </Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                pendings[i] = msg
            }
        }

    return(
        <SafeAreaView forceInset={{ top: "always" }}>
            <ScrollView>
                <Text style={{fontSize: 18, textAlign: 'center', padding: 20}}>
                    Here, you can view how many conversations you've started and completed with a healthcare worker. When you click "finished conversation", tickets will move from in progress to done, and feedback will become available. 
                </Text>
                <ScrollView style={styles.btnTextHolder}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={()=>{setExpandPending(!expandPending)}} 
                        style={{...styles.Btn, backgroundColor: 'moccasin'}}>
                        <Text style={styles.btnText}>Pending: {pendings.length}</Text>
                    </TouchableOpacity>
                    <View style={{ height: expandPending ? null: 0, overflow: 'hidden' }}>
                        {pendings}
                    </View>
                </ScrollView>
                <ScrollView style={styles.btnTextHolder}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        onPress={()=>{setExpandPair(!expandPair)}} 
                        style={{...styles.Btn, backgroundColor: 'lightblue'}}>
                        <Text style={styles.btnText}>In Progress: {inProgress.length}</Text>
                    </TouchableOpacity>
                    <View style={{ height: expandPair ? null : 0, overflow: 'hidden' }}>
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
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "gainsboro",
        margin: 10,
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
    },
    
    Btn: {
        padding: 10,
        
    }
})

export default MessageScreen