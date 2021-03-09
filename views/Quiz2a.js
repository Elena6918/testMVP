import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RankBtn from "../components/RankBtn"
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { AsyncStorage } from "react-native"

const Quiz2a = () => {
    const [userAnswers, setUserAnswers] = useState({})
    const answer = {}
    const questions = [
      "I just lost a patient. I feel like it was my fault, she had kids and a beautiful family.  I feel so overwhelmed, frustrated, and guilty all the time and I do not know what I can do about it.",
    ]
    const options=[
        [
          {
            order: 1,
            label: "I see that you just lost a patient. It appears that you feel like you were at fault.  You seem to be overwhelmed, frustrated, and guilty all the time and you do not know what you can do about it. Does that sound right? "
          },
          {
            order: 2,
            label: "So you feel guilty and overwhelmed because you lost a patient and you feel like you could have done more?"
          },
          {
            order: 3,
            label: "You seem to feel that losing a patient was your fault.  You may have not been paying attention to her vitals which resulted in her death. It is okay to feel this way."
          },
        ],
    ]
    useEffect(()=>{
      AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz2a(value["quiz2a"])
      })
    },[]) 
    async function changeQuiz2aStatus(){
      await AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz2a(value["quiz2a"])
        if(!quiz2a){ //quiz not complete
          let newQuizState = value 
          newQuizState["quiz2a"] = true 
          AsyncStorage.setItem("quizState", JSON.stringify(newQuizState))
        }
      })
    }
    const [submit, setSubmit] = useState(false)
    const [quiz2a, setQuiz2a] = useState(false)
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
              Click on the button below and keep swiping left to view the correct answers.
            </Text>
            <TouchableOpacity onPress={()=>{setSubmit(true); changeQuiz2aStatus();showAnswer() }}>
              <Text style={styles.buttonText}>View Correct Answers</Text>
            </TouchableOpacity>

          </View>}
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
              <Text style={styles.leftText}>{questions[0]}</Text>
              <Text style={styles.answer}>
                  I see that you just lost a patient. It appears that you feel like you were at fault.  
                  You seem to be overwhelmed, frustrated, and guilty all the time and you do not know what you can do about it. 
                  Does that sound right? (1)
              </Text>
              <Text style={styles.answer}>
                  So you feel guilty and overwhelmed because you lost a patient and you feel like you could have done more? (2)
              </Text>
              <Text style={styles.answer}>
                  You seem to feel that losing a patient was your fault.  You may have not been paying attention to her vitals which resulted in her death. It is okay to feel this way. (3)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText} >Correct order from best to worst:</Text>
              <Text>213</Text>
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
    titleText: {
      fontSize: 20,
      justifyContent: "center",
      // alignItems: "center",
      padding: 30,
      color: '#1a056b',
      textAlign: 'center',
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
  })

  export default Quiz2a