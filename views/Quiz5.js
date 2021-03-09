import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RankBtn from "../components/RankBtn"
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { AsyncStorage } from "react-native"

const Quiz5 = () => {
    const [userAnswers, setUserAnswers] = useState({})
    var answer = {}
    const options = [
        [{
          "order": 1,
          "label": "I think that you are doing a great job, you shouldn’t feel so guilty over an event that you can’t change.",
        },
        {
          "order": 2,
          "label": "Humans make errors at predictable rates, you are not a bad healthcare provider and you have done so much good for people. You are not the error.",
        },
        {
          "order": 3,
          "label": "Perhaps, you should consider light therapy or art therapy. This could help you feel better and help you manage your stress.",
        }],
        [
          {
            "order": 1,
            "label": "Respect their wishes and let them know that you are available if they decide that they would like to share."
          },
          {
            "order": 2,
            "label": "Continue to use Good Contact techniques and ask open-ended questions to try to get the healthcare worker to open up and share more with you."
          },
          {
            "order": 3,
            "label": "Use 5 Stage Philosophy to find out why the HCW is unwilling to share their experiences with you."
          },
          {
            "order": 4,
            "label": "End the conversation promptly or move onto a different topic."
          }
        ]
    ]
    
    const questions = [
      "If a healthcare worker tells you that they feel very guilty and upset about themselves for not providing the best care for their patients, how would you respond?",
      "If a healthcare worker is unwilling to share their experiences or thoughts with you, what would you do?"
    ]

    useEffect(()=>{
      AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz5(value.quiz5)
      })
    },[]) 
    async function changeQuiz5Status(){
      await AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz5(value.quiz5)
        if(!quiz5){ //quiz not complete
          let newQuizState = value 
          newQuizState["quiz5"] = true 
          AsyncStorage.setItem("quizState", JSON.stringify(newQuizState))
          // console.log(newQuizState)
        }
      })
    }
    const [submit, setSubmit] = useState(false)
    const [quiz5, setQuiz5] = useState(false)
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
      if(answer.question1==null){
        userAnswer["question1"] = "1234"
      }
      else if(answer.question1 != null){
        userAnswer["question1"] = answer.question1
      }
      setUserAnswers(userAnswer)
    }
    return(
      <View style={styles.parent}>
        <SwiperFlatList index={0}>
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
            <View style={styles.child}>
              <RankBtn
                questionText={questions[1]}
                questionNumber = "question1"
                options = {options[1]}
                setNewAnswer= {handleAnswerChange}
              />
            </View>
            {!submit && <View style={styles.title}>
              <Text style={styles.titleText}>
                This is the end of the quiz. 
                Click on the button below and keep swiping left to view the correct answer.
              </Text>
              <TouchableOpacity onPress={()=>{setSubmit(true); changeQuiz5Status();showAnswer() }}>
              <Text style={styles.buttonText}>View Correct Answers</Text>
            </TouchableOpacity>

            </View>}
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
              <Text style={styles.leftText}>{questions[0]}</Text>
              <Text style={styles.answer}>
                I think that you are doing a great job, you shouldn’t feel so guilty over an event that you can’t change. (1)
              </Text>
              <Text style={styles.answer}>
                Humans make errors at predictable rates, you are not a bad healthcare provider and you have done so much good for people. You are not the error. (2)
              </Text>
              <Text style={styles.answer}>
                Perhaps, you should consider light therapy or art therapy. This could help you feel better and help you manage your stress. (3)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText} >Correct order from best to worst:</Text>
              <Text>231</Text>
              <Text>Your answer: </Text>
              <Text>{userAnswers.question0}</Text>
            </View>
          </View>
          }
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
              <Text>{questions[1]}</Text>
              <Text style={styles.answer}>
                Respect their wishes and let them know that you are available if they decide that they would like to share. (1)
              </Text>
              <Text style={styles.answer}>
                Continue to use Good Contact techniques and ask open-ended questions to try to get the healthcare worker to open up and share more with you. (2)
              </Text>
              <Text style={styles.answer}>
                Use 5 Stage Philosophy to find out why the HCW is unwilling to share their experiences with you. (3)
              </Text>
              <Text style={styles.answer}>
                End the conversation promptly or move onto a different topic. (4)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text>Correct order from best to worst: </Text>
              <Text>1234</Text>
              <Text>Your answer: </Text>
              <Text>{userAnswers.question1}</Text>
            </View>
          </View>}
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
  })

  export default Quiz5