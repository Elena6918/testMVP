import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RankBtn from "../components/RankBtn"
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { AsyncStorage } from "react-native"

const Quiz2b = () => {
    const [userAnswers, setUserAnswers] = useState({})
    const answer = {}
    const questions = [
      "I’m terrified right now. I am caring for so many COVID patients and I am scared that I will give it to my family and kids. I am scared of going home and I am so tired.",
    ]
    const options=[
        [
          {
            order: 1,
            label: "I’m honestly impressed with your strength. You care greatly about your family and are putting them first which is admirable. You seem like a thoughtful person."
          },
          {
            order: 2,
            label: "You are great nurse. It seems like you care greatly about your patients and carry that same caring attitude at home. Your patients are lucky to have you. You seem like a really thoughtful nurse."
          },
          {
            order: 3,
            label: "You’re not tired, you’re energized.  Don’t be terrified.  You have no reason to be.  Everything will be fine. "
          },
        ],
    ]
    useEffect(()=>{
      AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz2b(value["quiz2b"])
      })
    },[]) 
    async function changeQuiz2bStatus(){
      await AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz2b(value["quiz2b"])
        if(!quiz2b){ //quiz not complete
          let newQuizState = value 
          newQuizState["quiz2b"] = true 
          AsyncStorage.setItem("quizState", JSON.stringify(newQuizState))
        }
      })
    }
    const [submit, setSubmit] = useState(false)
    const [quiz2b, setQuiz2b] = useState(false)
    const handleAnswerChange = (key, value) => {
        answer[key] = value
    }
    let userAnswer = {}
    function showAnswer(){
      if(answer.question0 ==null){
        userAnswer["question0"] = "123"
      }
      else if(answer.question0 != null){
        userAnswer["question0"] = answer.question0
      }
      setUserAnswers(userAnswer)
    }
    return(
      <View style={styles.parent}>
        <SwiperFlatList index={0} showPagination>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Swipe left to view quiz questions. 
              Press on the options (until color change back to white) and drag them up or down. 
              For the following questions, rank these responses from best response to worst response.
              Best at the top, and worst at the bottom.
            </Text>
          </View>
          <View style={styles.child}>
            <RankBtn
              questionText={questions[0]}
              questionNumber = "question0"
              options = {options[0]}
              setNewAnswer= {handleAnswerChange}
            />
          </View>
          {!submit && <View style={styles.title}>
            <Text style={styles.titleText}>
              This is the end of the quiz. 
              Click on the button below and keep swiping left to view the correct answer.
            </Text>
            <TouchableOpacity onPress={()=>{setSubmit(true); changeQuiz2bStatus();showAnswer() }}>
              <Text style={styles.buttonText}>View Correct Answers</Text>
            </TouchableOpacity>

          </View>}
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
            <Text style={styles.leftText} >{questions[0]}</Text>
            <Text style={styles.answer}>
                So you feel guilty and overwhelmed because you lost a patient and you feel like you could have done more?
            </Text>
            <Text style={styles.answer}>
              I’m honestly impressed with your strength. You care greatly about your family and are putting them first which is admirable. You seem like a thoughtful person. (1)
            </Text>
            <Text style={styles.answer}>
              You are great nurse. It seems like you care greatly about your patients and carry that same caring attitude at home. 
              Your patients are lucky to have you. You seem like a really thoughtful nurse. (2)
            </Text>
            <Text style={styles.answer}>
              You’re not tired, you’re energized.  
              Don’t be terrified.  You have no reason to be.  Everything will be fine. (3)
            </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText} >Correct order from best to worst:</Text>
              <Text>123</Text>
              <Text>Your answer: </Text>
              <Text>{userAnswers.question0}</Text>
            </View>
          </View>
          }
        </SwiperFlatList>
      </View> 
  )
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      width: width,
      justifyContent: "center",
      // alignItems: "center",
      padding: 20
    },
    container: {
      padding: 16,
      margin: 30,
    },
    label: {
      fontSize: 16
    },
    submitButton: {
      marginBottom: 20
    },
    parent: { 
      flex: 1,
    },
    child: {
      width: width,
      justifyContent: 'center',
      padding: 20,
      marginTop: 10,
      alignItems: "center",
    },
    answer:{
      padding: 10,
    },
    answerContainer:{
      flex: 1,
      flexDirection: "row",
      width: width,
      justifyContent: "center",
      alignItems: "center",
    },
    left:{
      flex: 3,
      flexDirection: "column", 
      width: width * 0.7
    },
    right:{
      flex: 1, 
      width: width * 0.2, 
      flexDirection: "column",
    },
    verticalLine:{
      height: '90%',
      width: 2,
      backgroundColor: 'grey',
      margin: 10
    },
    titleText: {
      fontSize: 20,
      justifyContent: "center",
      // alignItems: "center",
      padding: 30,
      color: '#1a056b',
      textAlign: 'center'

    },
    leftText: {
      fontSize: 20,
      textAlign: 'center',
      padding: 10,
      color: '#1a056b'
    },
    rightText: {
      fontSize: 20,
      textAlign: 'center',
      padding: 10,
      color: '#1a056b'
    },
    buttonText: {
      fontSize: 17,
      color: 'white',
      backgroundColor: '#5555fa',
      textAlign: 'center',
      padding: 10,
      borderRadius: 40
    },
  })

  export default Quiz2b