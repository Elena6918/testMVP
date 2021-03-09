import React, {useState, useContext} from "react"
import { SafeAreaView, ScrollView } from "react-navigation"
import { Text, Button } from "react-native-elements"
import { StyleSheet, View, Dimensions, Modal, TouchableHighlight, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from "react-native"
import TextBoxInput from "../components/TextBoxInput"
import SliderInput from "../components/SliderInput"
import {Context as AuthContext} from "../context/AuthContext"
import { Alert } from "react-native"

const UserProgressScreen = ({route}) =>{
    const {users, status} = route.params
    const { state, saveConversation, patientFeedback } = useContext(AuthContext)
    const [feedbackVisibility, setFeedbackVisibility] = useState(false)
    const questions = [
        "How helpful is this sesion?",
        "How much would you like to connect to this provider again?",
        "Is there anything else you want to see in our app?"
    ]
    const feedback = {}
    const handleAnswerChange = (key, value) => {
      feedback[key] = value
    }

    function feedbackState(){
        if(status==0){
            Alert.alert("Feedback form can only be accessed when this session ends!")
        }
        if(status==1){
            setFeedbackVisibility(true)
        }
        if(status==2){
            Alert.alert("You've already submitted this feedback form!")
        }
    }
    return(
        <SafeAreaView forceInset={{ top: "always" }}>
            {state.errorMessage ? (
                <Text style={styles.errorText}>{state.errorMessage}</Text>
            ) : null}
            {state.status ? (
                <Text style={styles.successText}>{state.status}</Text>
            ) : null}
                <ScrollView style={styles.container}>
                    <Text style={styles.username}>
                        Name: {users.providerName}
                    </Text>
                    <View style = {styles.lineStyle} />
                    {/* <Text style={styles.username}>
                        Query Category: {users.category}
                    </Text> */}
                    <View style = {styles.lineStyle} />
                    <View style = {styles.messageContainer}>
                        <Text style={styles.username}>
                            Message from Peer Supporter: 
                        </Text>
                        <Text style={styles.message}>
                            {users.providerMessage}
                        </Text>
                    </View>
                    <Button 
                        title="Feedback" 
                        buttonStyle={{backgroundColor: "navy", margin: 10}} 
                        style={{ marginTop: 15}} 
                        onPress={()=>{
                            feedbackState()
                        }} 
                    />
                </ScrollView>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={feedbackVisibility}
                        onRequestClose={() => {
                            console.log("Modal has been closed.")
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} accessible={false}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <SliderInput
                                    maxValue={5}
                                    questionNumber="question0"
                                    questionText={questions[0]}
                                    setNewAnswer={handleAnswerChange}
                                    lowLabel={"Not helpful at all"}
                                    highLabel={"Very helpful"}
                                    showScale={true}
                                />
                                <SliderInput
                                    maxValue={5}
                                    questionNumber="question1"
                                    questionText={questions[1]}
                                    setNewAnswer={handleAnswerChange}
                                    lowLabel={"Not at all"}
                                    highLabel={"Very much"}
                                    showScale={true}
                                />
                                <TextBoxInput
                                    questionNumber="question2"
                                    questionText={questions[2]}
                                    setNewAnswer={handleAnswerChange}
                                />
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        const userId = users.recipientId
                                        patientFeedback({userId, feedback})
                                        setFeedbackVisibility(false) 
                                    }}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableHighlight>
                                <TouchableOpacity onPress={() => {
                                    setFeedbackVisibility(false)
                                }}>
                                    <Text style={styles.navigationLink}>
                                        Skip
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        marginTop: 30
    },
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
    username:{
        fontSize: 20,
        marginBottom: 10,
        margin: 10
    },
    message:{
        fontSize: 15,
        margin: 10,
    },
    navigationLink: {
        color: "gray",
        textAlign: "center",
        marginTop: 20,
        textDecorationLine: "underline"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        top: 10,
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
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
    },
})
export default UserProgressScreen