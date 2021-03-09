import React, {useState} from "react"
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import HowLongInput from "../components/HowLongInput"
import RadioInput from "../components/RadioInput"
import SliderInput from "../components/SliderInput"
import TextBoxInput from "../components/TextBoxInput"
import { navigate } from "../navigationRef"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import { Alert } from "react-native"


const QuestionnaireScreen = () => {
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
    "Intake Questionnaire";
  const title =
    "This questionnaire will be used for research purposes only. Your data will be kept strictly confidential.";
  const questions = [
    "Are you in the state of psychological emergencies?",
    "Do you have a current psychological or psychiatric diagnosis?",
    "If yes, what is your diagnosis and how long?",
    "Do you have a family history of psychological disorders?",
    "Have you ever sought after professional psychological treatment?",
    "If yes, for how long?",
    "Overall, to what extent do you feel the things you do in your life are worthwhile? ",
    "I’ve been feeling optimistic about the future. ",
    "Overall, how satisfied are you with your life nowadays? ",
    "Overall, how happy did you feel this past month? ",
    "Overall, how anxious did you feel this past month? ",
    "I’ve been feeling close to other people.",
    "Under certain circumstances, anyone can experience mental illness.",
    "It is best to avoid people who have mental illness.",
    "People with mental illness behave in ways that are foreseeable.",
    "People who are mentally ill are avoiding the difficulties of everyday life.",
    "I am not scared of people with mental illness. ",
    "What do you hope to get out of this app? "
  ];

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

  function checkAnswer(){
    if(initQ.question0 =="1"){
      Alert.alert("If you are in the state of psychological emergencies, we recommend you to seek professional help immediately. ")
    }
    else{
      submitQuestionnaire()
      navigate("HCWIntro1")
    }
  }
  return (
    <SafeAreaView forceInset={{ bottom: "always" }}>
      <ScrollView style={styles.container}>
      <Text style={styles.header}>{header}</Text>
        <Text style={styles.title}>{title}</Text>

        <RadioInput
          questionNumber="question0"
          questionText={questions[0]}
          setNewAnswer={handleAnswerChange}
        />
        <RadioInput
          questionNumber="question1"
          questionText={questions[1]}
          setNewAnswer={handleAnswerChange}
        />
        <TextBoxInput
          questionNumber="question2"
          questionText={questions[2]}
          setNewAnswer={handleAnswerChange}
        />
        <RadioInput
          questionNumber="question3"
          questionText={questions[3]}
          setNewAnswer={handleAnswerChange}
        />
        <RadioInput
          questionNumber="question4"
          questionText={questions[4]}
          setNewAnswer={handleAnswerChange}
        />
        <HowLongInput
          maxValue={12}
          questionNumber="question5"
          questionText={questions[5]}
          setNewAnswer={handleAnswerChange}
        />
        <SliderInput
          maxValue={5}
          questionNumber="question6"
          questionText={questions[6]}
          setNewAnswer={handleAnswerChange}
          lowLabel={1}
          highLabel={5}
        />
        <SliderInput
          maxValue={5}
          questionNumber="question7"
          questionText={questions[7]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question8"
          questionText={questions[8]}
          setNewAnswer={handleAnswerChange}
          lowLabel={1}
          highLabel={5}
        />
        <SliderInput
          maxValue={5}
          questionNumber="question9"
          questionText={questions[9]}
          setNewAnswer={handleAnswerChange}
          lowLabel={1}
          highLabel={5}
        />
        <SliderInput
          maxValue={5}
          questionNumber="question10"
          questionText={questions[10]}
          setNewAnswer={handleAnswerChange}
          lowLabel="Not at all"
          highLabel="very"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question11"
          questionText={questions[11]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question12"
          questionText={questions[12]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question13"
          questionText={questions[13]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question14"
          questionText={questions[14]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question15"
          questionText={questions[15]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <SliderInput
          maxValue={5}
          questionNumber="question16"
          questionText={questions[16]}
          setNewAnswer={handleAnswerChange}
          lowLabel="strongly disagree"
          highLabel="strongly agree"
        />
        <TextBoxInput
          questionNumber="question17"
          questionText={questions[17]}
          setNewAnswer={handleAnswerChange}
        />
        <TouchableOpacity style={styles.submit} 
          onPress={()=>{
            checkAnswer()
          }}>
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
    marginTop: 16,
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
  submitButton: {
    marginBottom: 20
  },
  submit: {
    margin: 15,
    fontFamily: 'Helvetica Neue',
    borderRadius: 10,
    paddingVertical: 5,
    //backgroundColor: '#5555fa',
    backgroundColor: '#5555fa',
    alignItems: 'center',
},
});

export default QuestionnaireScreen
