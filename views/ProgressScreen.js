import React, {useState, useContext} from "react"
import { SafeAreaView } from "react-navigation"
import { Button, Text, CheckBox } from "react-native-elements"
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, TouchableHighlight,Keyboard, TouchableWithoutFeedback } from "react-native"
import { FontAwesome} from '@expo/vector-icons'
import TextBoxInput from "../components/TextBoxInput"
import SliderInput from "../components/SliderInput"
import {Context as AuthContext} from "../context/AuthContext"
import { Alert } from "react-native"
import { navigate } from "../navigationRef"

const ProgressScreen = ({route}) =>{
    const {users, status} = route.params
    const { state, saveConversation, trainerFeedback } = useContext(AuthContext)
    const [prog, setProg] = useState(false)
    const [feedbackVisibility, setFeedbackVisibility] = useState(false)
    const questions = [
        "How useful do you think our training prepared you for this session?",
        "How comfortable do you feel for providing help in this session?",
        "Is there anything else you want to see in our app?"
    ]
    const feedback = {}
    const handleAnswerChange = (key, value) => {
      feedback[key] = value
    }

    function submit(){
        if(prog==true){ //checked
            const pairId = users._id
            saveConversation({pairId})
            setFeedbackVisibility(true)
        }
        else{
            Alert.alert("You need to select the checkbox first!")
        }
    }
    return(
        <SafeAreaView forceInset={{ top: "always" }}>
                <View style={styles.container}>
                    <Text style={styles.username}>
                        Name: {users.recipientName}
                    </Text>
                    <View style = {styles.lineStyle} />
                    {/* <Text style={styles.username}>
                        Category: {users.category}
                    </Text> */}
                    <View style = {styles.lineStyle} />
                    <View style = {styles.messageContainer}>
                        <Text style={styles.username}>
                            Message from Query Sender: 
                        </Text>
                        <Text style={styles.message}>
                            {users.recipientMessage}
                        </Text>
                    </View>
                </View>
                
                {status == 1 && 
                <View style={styles.container}>
                    <Text style={styles.username}>Progress Report</Text>
                    <CheckBox
                        title="We finished our conversation!"
                        checkedIcon={<FontAwesome name="check-square-o" size={24} color="black" />}
                        uncheckedIcon={<FontAwesome name="square-o" size={24} color="black" />}
                        checked={prog}
                        onPress={() => setProg(!prog)}
                    />
                    <Button 
                        title="submit" 
                        buttonStyle={{backgroundColor: "navy", margin: 10}} 
                        style={{ marginTop: 15}} 
                        onPress={()=>{
                            submit()
                        }} 
                    />
                </View>}

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
                                    lowLabel={"Not useful at all"}
                                    highLabel={"Very useful"}
                                    showScale={true}
                                />
                                <SliderInput
                                    maxValue={5}
                                    questionNumber="question1"
                                    questionText={questions[1]}
                                    setNewAnswer={handleAnswerChange}
                                    lowLabel={"Very uncomfortable"}
                                    highLabel={"Very comfortable"}
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
                                        const userId = users.providerId
                                        trainerFeedback({userId, feedback})
                                        navigate("Query")
                                        setFeedbackVisibility(false) 
                                    }}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableHighlight>
                                <TouchableOpacity onPress={() => navigate("Query")}>
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
    status_container:{
        padding: 16,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "moccasin",
        margin: 10
    },
    deny_status_container:{
        padding: 16,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "tomato",
        margin: 10
    },
    complete_status_container:{
        padding: 16,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "grey",
        backgroundColor: "mediumaquamarine",
        margin: 10
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
})
export default ProgressScreen