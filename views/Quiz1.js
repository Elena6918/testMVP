import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RankBtn from "../components/RankBtn"
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { AsyncStorage } from "react-native"

const Quiz1 = () => {
    const [userAnswers, setUserAnswers] = useState({})
    var answer = {}
    const default_answer = {
      "question0": [
        {
          "order": 1,
          "label": "Hi my name is Chase, I am here to help! What can I help you with?",
        },
        {
          "order": 2,
          "label": "Hi there, I’m Chase, and I’m here for you. It sounds like you are overwhelmed by the amount of work you have a daily basis. Will you share more about what’s going on?",
        },
        {
          "order": 3,
          "label": "Hi, it sounds like you are going through a rough time. I am here for you. Let me know how I can help. ",
        },
        {
          "order": 4,
          "label": "Hi, my name is Chase. You are so brave and courageous for reaching out."
        }],
        "question1": [
          {
            "order": 1,
            "label": "I’m hearing you are worried and stressed about school and work. Going to school full time while working can be very demanding and you are very resilient. How have you dealt with stress in the past? Can I suggest listening to some of your favorite music or going on a jog?"
          },
          {
            "order": 2,
            "label": "You are very brave and I applaud your resilience. It seems like you are very stressed. Why don’t you try dealing with your feelings by practicing mindfulness?"
          },
          {
            "order": 3,
            "label": "You seem to be very stressed. Here are some resources that you can refer to in case you want additional health resources. I recommend using techniques, they help me when I feel stressed and become overwhelmed by my feelings."
          },
          {
            "order": 4,
            "label": "I understand how you feel. What has helped you in the past?"
          }
        ]
    }
    const questions = [
      "How would you establish rapport?",
      "How do you help a healthcare worker discover next steps?"
    ]
    const options=[default_answer["question0"], default_answer["question1"]]
    useEffect(()=>{
      AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz1(value.quiz)
      })
    },[]) 
    async function changeQuiz1Status(){
      await AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz1(value.quiz1)
        if(!quiz1){ //quiz not complete
          let newQuizState = value 
          newQuizState["quiz1"] = true 
          AsyncStorage.setItem("quizState", JSON.stringify(newQuizState))
          // console.log(newQuizState)
        }
      })
    }
    const [submit, setSubmit] = useState(false)
    const [quiz1, setQuiz1] = useState(false)
    const handleAnswerChange = (key, value) => {
        answer[key] = value
    }
    let userAnswer = {}
    function showAnswer(){
      if(answer.question0 ==null){
        userAnswer["question0"] = "1234"
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
                Click on the button below and keep swiping left to view the correct answers.
              </Text>
              <TouchableOpacity onPress={()=>{setSubmit(true); changeQuiz1Status();showAnswer() }}>
              <Text style={styles.buttonText}>View Correct Answers</Text>
            </TouchableOpacity>
            </View>}
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
              <Text style={styles.leftText}>{questions[0]}</Text>
              <Text style={styles.answer}>
                Hi my name is Chase, I am here to help! What can I help you with? (1)
              </Text>
              <Text style={styles.answer}>
                Hi there, I’m Chase, and I’m here for you. 
                It sounds like you are overwhelmed by the amount of work you have a daily basis. 
                Will you share more about what’s going on? (2)
              </Text>
              <Text style={styles.answer}>
                Hi, it sounds like you are going through a rough time. 
                I am here for you. Let me know how I can help. (3)
              </Text>
              <Text style={styles.answer}>
                Hi, my name is Chase. You are so brave and courageous for reaching out. (4)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText} >Correct order from best to worst:</Text>
              <Text>2314</Text>
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
                I’m hearing you are worried and stressed about school and work. 
                Going to school full time while working can be very demanding and you are very resilient. 
                How have you dealt with stress in the past? 
                Can I suggest listening to some of your favorite music or going on a jog? (1)
              </Text>
              <Text style={styles.answer}>
                You are very brave and I applaud your resilience. It seems like you are very stressed. 
                Why don’t you try dealing with your feelings by practicing mindfulness? (2)
              </Text>
              <Text style={styles.answer}>
                You seem to be very stressed. Here are some resources that you can refer to in case you want additional health resources. 
                I recommend using techniques, they help me when I feel stressed and become overwhelmed by my feelings. (3)
              </Text>
              <Text style={styles.answer}>
                I understand how you feel. What has helped you in the past? (4)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText}>Correct order from best to worst: </Text>
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
    buttonText: {
      fontSize: 17,
      color: 'white',
      backgroundColor: '#5555fa',
      textAlign: 'center',
      padding: 10,
      borderRadius: 40
    },
    titleText: {
      fontSize: 20,
      justifyContent: "center",
      // alignItems: "center",
      padding: 30,
      color: '#1a056b'
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
    }
  })

  export default Quiz1