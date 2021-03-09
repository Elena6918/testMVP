import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Dimensions, ScrollView, Linking, TouchableOpacity, Image } from "react-native";
import { Input, Button, Text, Tooltip } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"
import { AsyncStorage, Modal } from "react-native"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import {Context as AuthContext} from "../context/AuthContext"
import MultiSelectBtn from "../components/MultiSelectBtn"
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from "@react-navigation/native"
import { navigate } from "../navigationRef"

placeholder = "Select a Category";

const HelpScreen = ({navigation}) => {
  const isFocused = useIsFocused()
  const [category, setCategory] = useState("all");
  const [message, setMessage] = useState("")
  const [userId, setUserId] = useState("")
  const [status, setStatus] = useState(0)
  const [ticketName, setTicketName] = useState("")
  const [resVisibility, setResVisibility] = useState(false)

  const { state, sendQuery, acceptResponse, denyResponse } = useContext(AuthContext)
  const [resMessage, setResMessage] = useState("")

  const age = {
    "20-30":"20-30 years old",
    "30-40":"31-40 years old",
    "40-50":"41-50 years old",
    "all": "All"
  }

  const gender = {
    "male": "Male",
    "female": "Female",
    "all" : "All"
  }

  const experience = {
    "<5": "< 5 years",
    "5-10": "5-10 years",
    "10-15": "11-15 years",
    "15-20": "16-20 years",
    ">20": "> 20 years",
    "all": "All"
  }

  const QueryFilter = {}
  const handleAnswerChange = (key, value) => {
    QueryFilter[key] = value
  }

  async function getQuery(userId){
    try{
      const response = await serverApi.post("/response/get", {patientId : userId})
      const query = response.data.query
      const res = response.data.response
      console.log(query)
      if(query != null && query.length != 0){
        setStatus(1) //pending
      }
      else if(res != null && res.length != 0){
        setStatus(2) //had a response
        // setresUsername(res[0].username)
        setResMessage(res[0].message)
      }
      else{
        setStatus(0)
      }
      console.log(status)
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
        getQuery(id)
    })
    .catch(function(error){
          console.log(error.message)
          throw error
    })
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={resVisibility}
        onRequestClose={() => {
          console.log("Modal has been closed.")
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style = {styles.nameContainer}>
              <Input placeholder="(Optional) Name" onChangeText={setTicketName}/>
              <Tooltip 
                popover={<Text>This name is used for identifying the ticket when stored in the Message tab. If left blank, the name will be automatically generated with random numbers.</Text>}
                  height={200}
                  width={300}
              >
                <AntDesign name="questioncircle" size={25} color="black" />
              </Tooltip>
            </View>
            <Button 
              title="Submit"
              buttonStyle={{backgroundColor: "#5555fa", margin: 10}} 
              onPress={()=>{
                acceptResponse({userId, ticketName})
                setResVisibility(false)
                setStatus(0)
              }}
            />
            <Button 
              title = "Back"
              buttonStyle={styles.button}
              onPress = {()=>{
                setResVisibility(false)
              }}
            />      
        </View>
        </View>
      </Modal>
      
      {status == 1 && 
        <View>
          <View style={styles.topContainer}>
              <Text>On this page, you can view various mental health resources as you wait for a peer supporter to begin a conversation with you. </Text>
          </View>
          <View style={styles.status_container}>
            <Text style={styles.header}>
                Status: Pending
            </Text>
          </View>
          <Button 
            title="Refresh" 
            buttonStyle={{backgroundColor: "#1a056b", margin: 10}} 
            style={{ marginTop: 10}} 
            onPress={()=>getQuery(userId)}
          />

          <Text style={{backgroundColor:"#d5e1f2", margin: 20, fontSize: 22, alignSelf: 'center', padding: 10}}> Mental Health Resources </Text>
          <Text style={styles.videoText}>Descalation/Suicide/Crisis</Text>
            <TouchableOpacity
              onPress={() => navigate("Suicide")}>
              <Image source={require('../assets/images/cloud.png')} style={styles.stopImage}/>
            </TouchableOpacity>  
            <Text style={styles.videoText}>Professional Help</Text>
            <TouchableOpacity 
              onPress={() => navigate("Prohelp")}>
              <Image source={require('../assets/images/help.png')} style={styles.stopImage}/>
            </TouchableOpacity> 
            <Text style={styles.videoText}>Positive Psychology and Self Help Skills</Text>
            <TouchableOpacity onPress={() => navigate("SelfHelp")}>
              <Image source={require('../assets/images/inspection.png')} style={styles.stopImage}/>
            </TouchableOpacity> 
      </View>
                
      }
      {status == 2 && 
        <View style={styles.modalView}>
          <View style = {styles.messageContainer}>
            <Text style={styles.username}>
              Message: 
            </Text>
            <Text style={styles.message}>
              {resMessage}
            </Text>
          </View>
          <View>
            <Button 
              title="Connect with this peer supporter" 
              buttonStyle={{backgroundColor: "#5555fa", margin: 10}} 
              style={{ marginTop: 10}} 
              onPress = {()=>{
                setResVisibility(true)
              }} 
            />
            <Button 
              title="Wait for another peer supporter" 
              buttonStyle={{backgroundColor: "#1a056b", margin: 10}} 
              style={{ marginTop: 10}} 
              onPress={()=>{
                var patientId = userId
                denyResponse({patientId})
                getQuery(userId)
                setStatus(1)
              }}
            />
        </View>
      </View>
      }
      {status == 0 &&
      <ScrollView>
        <Text style={styles.header}> By filling out this information, we can connect you with a trained, certified, and appropriate peer supporter that has been trained to aid you!</Text>
        {/* <DropDownPicker
            items={[
            {
                label: "Select a Category",
                value: "select",
                hidden: true,
            },
            {
                label: "Stress",
                value: "stress",
            },
            {
                label: "Anxiety",
                value: "anxiety",
            },
            {
                label: "Grief",
                value: "grief",
            },
            {
              label: "Relationship",
              value: "relationship",
            },
            {
              label: "Other",
              value: "other",
            },
            ]}
            defaultValue={category}
            containerStyle={{ height: 40 }}
            style={{backgroundColor: "#fafafa", color: '#1a056b'}}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) =>
              setCategory(item.value)
            }
        /> */}
        <MultiSelectBtn 
          item={age}
          title="Age group(s)"
          questionNumber="age"
          setNewAnswer={handleAnswerChange}
        />
        <MultiSelectBtn 
          item={gender}
          title="Gender group(s)"
          questionNumber="gender"
          setNewAnswer={handleAnswerChange}
        />
        <MultiSelectBtn 
          item={experience}
          title="Years of experience working in hospital"
          questionNumber="experience"
          setNewAnswer={handleAnswerChange}
        />
        <Input 
          style={styles.input} 
          multiline={true}
          numberOfLines={4}
          placeholder="Please include a message with a brief description regarding how you want to be contacted by the peer supporters, as well as a brief description of your needs." 
          onChangeText={setMessage}
        />
        <Button 
          title = "Submit"
          buttonStyle={styles.button}
          onPress = {()=>{
            sendQuery({userId, category, message}) 
            getQuery(userId)
            // setStatus(1)
          }}
        />  
      {state.errorMessage ? (
        <Text style={styles.errorText}>{state.errorMessage}</Text>
      ) : null}
      {state.status ? (
          <Text style={styles.successText}>{state.status}</Text>
      ) : null}
      </ScrollView>
    }
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 16,
    margin: 10

  },
  videoText: {
    textAlign: "center",
    fontSize: 20,
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
    fontSize: 31,
    color: "#1a056b",
    margin: 30,
    transform: [{ translateY: -80 }],
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
  button:{
    flex:1,
    marginTop: 60,
    color: "#1a056b",
  },
  stopImage:{
    margin: 20,
    alignSelf:'center',
    width:60,
    height:60, 
    resizeMode:'contain',
    backgroundColor: '#d5e1f2',
    borderRadius: 20,
},
  button: {
    backgroundColor: '#1a056b',
    margin: 10
  },
  messageContainer:{
    height: Dimensions.get('window').width * 0.8
  },
  topContainer: {
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "#F9DCDC",
    margin: 10,
},
  message:{
    fontSize: 15,
    margin: 10,
  },
  username:{
    fontSize: 20,
    marginBottom: 10,
    margin: 10
  },
  setColorBlue:{
    backgroundColor: "#fafafa",
    color: '#1a056b'
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
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    alignSelf: "center",
    margin: 10,
    backgroundColor: '#d5e1f2'
  },
  input: {
    maxHeight: 120, 
    height: 120,
    width: '60%',
    fontSize: 16,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10
  },
  errorText: {
    color: "red",
    textAlign: "center"
  },
  successText: {
    color: "green",
    textAlign: "center"
  },
  status_container:{
    padding: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "#d5e1f2",
    margin: 10
  },
  nameContainer:{
    flexDirection: "row"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
export default HelpScreen;
