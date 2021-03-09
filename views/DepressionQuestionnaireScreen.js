import React,{useState} from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RadioGroupBtn from '../components/RadioGroupBtn'
import { navigate } from "../navigationRef"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"

const DepressionQuestionnaireScreen = () => {
    const [userId, setUserId] = useState("")
    const [taken, setTaken] = useState("")

    AsyncStorage.getItem("token")
    .then((value) => {
        var decoded = jwt_decode(value)
        setUserId(decoded["userId"])
    })
    .catch(function(error){
        console.log(error.message)
        throw error
    })

    AsyncStorage.getItem("answerInfo")
    .then((value) => {
      const answerInfo = JSON.parse(value)
      if(answerInfo.DPpre){
        setTaken(true)
      }else{
        setTaken(false)
      } 
    })
    .catch(function(error){
        console.log(error.message)
        throw error
    })

    const title = "PHQ-9"
    const subtitle="Over the last 2 weeks, how often have you been bothered by any of the following problems?"
    const questions = [
        "a. Little interest or pleasure in doing things",
        "b. Feeling down, depressed, or hopeless",
        "c. Trouble falling/staying asleep, sleeping too much",
        "d. Feeling tired or having little energy",
        "e. Poor appetite or overeating",
        "f. Feeling bad about yourself or that you are a failure or have let yourself or your family down",
        "g. Trouble concentrating on things, such as reading the newspaper or watching television",
        "h. Moving or speaking so slowly that other people could have noticed. Or the opposite; being so fidgety or restless that you have been moving around a lot more than usual",
        "i. Thoughts that you would be better off dead or of hurting yourself in some way",
        "If you checked off any problem on this questionnaire so far, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?"
    ]

    const DPanswers = {}

    const handleAnswerChange = (key, value) => {
        DPanswers[key] = value
    }
    
    async function submitPreTest(){
      try{
        await serverApi.put("/depression/pretest", { userId: userId, DPanswer: DPanswers })
        getAnswerInfo()
      }catch(err){
        console.log(err.message)
      }
    }

    async function submitPostTest(){
      try{
        const time = new Date().toLocaleDateString("en-US")
        await serverApi.put("/depression/posttest", { userId: userId, timestamp: time, postAnswer: DPanswers })
      }catch(err){
        console.log(err.message)
      }
    }

    function submitQuestionnaire(){
      if(taken){
        submitPostTest()
      }else{
        submitPreTest()
      }
    }

    async function getAnswerInfo(){
      try{
        const response = await serverApi.post("/answer", {userId: userId})
        await AsyncStorage.setItem("answerInfo", JSON.stringify(response.data))
        if(response.data.DPpre){
          setTaken(true)
        }else{
          setTaken(false)
        } 
      }catch(err){
        console.log(err.message)
      }
    }
  return (
    <SafeAreaView forceInset={{ bottom: "always" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[0]}
            questionNumber="DPquestion1"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[1]}
            questionNumber="DPquestion2"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[2]}
            questionNumber="DPquestion3"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[3]}
            questionNumber="DPquestion4"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[4]}
            questionNumber="DPquestion5"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[5]}
            questionNumber="DPquestion6"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[6]}
            questionNumber="DPquestion7"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[7]}
            questionNumber="DPquestion8"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP1"
            questionText={questions[8]}
            questionNumber="DPquestion9"
            setNewAnswer={handleAnswerChange}
        />
        <RadioGroupBtn 
            questionType="DP2"
            questionText={questions[9]}
            questionNumber="DPquestion10"
            setNewAnswer={handleAnswerChange}
        />

        <Button
          style={StyleSheet.submitButton}
          onPress={() => {
            submitQuestionnaire()
            navigate("DepressionModule")
          }}
          title="Submit"
        />
        <View style={{ height: 32 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 16
  },
  subtitle:{
    fontSize: 15,
    marginBottom: 5,
  },
  subquestion:{
  },
  container: {
    padding: 16
  },
  label: {
    fontSize: 16
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 20
  }
})

export default DepressionQuestionnaireScreen
