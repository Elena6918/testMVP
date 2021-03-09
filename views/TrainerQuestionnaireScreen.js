import React, {useState} from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import TextBoxInput from "../components/TextBoxInput"
import { navigate } from "../navigationRef"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import QuizBtn from "../components/QuizBtn"
import { TouchableOpacity } from "react-native-gesture-handler"

const TrainerQuestionnaireScreen = () => {
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
  const header = 
    "Basic Demographic Questionnaire";
  const title =
    "This questionnaire helps us to better match you with people who seek help and will be used for research purposes only. Your data will be kept strictly confidential.";
  const questions = [
    "Gender: ",
    "Age: ",
    "Years of experience working in hospital: ",
    "What do you hope to get out of this app? "
  ];
  const options = {
    gender: {
      "M": "Male",
      "F": "Female",
      "Other": "Other",
      "N/A": "Prefer not to say"
    },
    age:{
      "20-30": "20-30 years old",
      "31-40": "31-40 years old",
      "41-50": "41-50 years old",
      "51-60": "> 50 years old",
      "N/A": "Prefer not to say"
    },
    experience:{
      "< 5": "< 5 years",
      "5-10": "5-10 years",
      "11-15": "11-15 years",
      "16-20": "16-20 years",
      ">20": "> 20 years"
    }
  }
  const initQ = {}

  const handleAnswerChange = (key, value) => {
    initQ[key] = value
  }

  async function submitQuestionnaire(){
    try{
      const response = await serverApi.post("/submit", {userId: userId, initQ: initQ })
    }catch(err){
      console.log(err.message)
    }
  }

  return (
    <SafeAreaView forceInset={{ bottom: "always" }}>
      <ScrollView style={styles.container}>
      <Text style={styles.header}>{header}</Text>
        <Text style={styles.title}>{title}</Text>
        <QuizBtn 
          questionNumber="question0"
          questionText={questions[0]}
          item={options.gender}
          setNewAnswer={handleAnswerChange}
        />
       <QuizBtn 
          questionNumber="question1"
          questionText={questions[1]}
          item={options.age}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question2"
          questionText={questions[2]}
          item={options.experience}
          setNewAnswer={handleAnswerChange}
        />
        <TextBoxInput
          questionNumber="question3"
          questionText={questions[3]}
          setNewAnswer={handleAnswerChange}
        />
        <TouchableOpacity style={styles.submit} 
          onPress={()=>{
            submitQuestionnaire()
            navigate("PSIntro1")
          }}
        >
            <Text style={{color: '#d5e1f2', fontSize:20, padding: 7}}>Submit</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    marginBottom: 32,
    textAlign: 'center'
  },
  header: {
    fontSize: 25,
    marginBottom: 32,
    textAlign: 'center'
  },
  container: {
    padding: 16
  },
  label: {
    fontSize: 16
  },
  submit: {
      margin: 15,
      fontFamily: 'Helvetica Neue',
      borderRadius: 10,
      paddingVertical: 5,
      //backgroundColor: '#5555fa',
      backgroundColor: '#5555fa',
      alignItems: 'center',
  }
});

export default TrainerQuestionnaireScreen
