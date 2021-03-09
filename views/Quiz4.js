import React, {useState, useEffect} from "react"
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import RankBtn from "../components/RankBtn"
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { AsyncStorage } from "react-native"

const Quiz4 = () => {
    const [userAnswers, setUserAnswers] = useState({})
    var answer = {}
    const options = [
        [{
          "order": 1,
          "label": "Crisis Text Line",
        },
        {
          "order": 2,
          "label": "American Psychological Association",
        },
        {
          "order": 3,
          "label": "Greater Good Positive Psychology Project at Berkely",
        }],
        [
          {
            "order": 1,
            "label": "Crisis text line"
          },
          {
            "order": 2,
            "label": "Light therapy"
          },
          {
            "order": 3,
            "label": "Professional Psychological therapy"
          },
          {
            "order": 4,
            "label": "Freedom from Fear and Anxiety and Depression Association of America (ADAA)"
          }
        ]
    ]
    
    const questions = [
      "If a healthcare worker is experiencing physical symptoms such as insomnia, frequent irritability, chest pain, or palpitations, what should resource should you recommend?",
      "If a healthcare worker mentions that they feel “hopeless”, and would prefer if “things could just end forever”, what resource would you recommend? Rank from least appropriate to most appropriate."
    ]

    useEffect(()=>{
      AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz4(value.quiz4)
      })
    },[]) 
    async function changeQuiz4Status(){
      await AsyncStorage.getItem('quizState')
      .then(req => JSON.parse(req))
      .then((value) =>{
        setQuiz4(value.quiz4)
        if(!quiz4){ //quiz not complete
          let newQuizState = value 
          newQuizState["quiz4"] = true 
          AsyncStorage.setItem("quizState", JSON.stringify(newQuizState))
          // console.log(newQuizState)
        }
      })
    }
    const [submit, setSubmit] = useState(false)
    const [quiz4, setQuiz4] = useState(false)
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
              <TouchableOpacity onPress={()=>{setSubmit(true); changeQuiz4Status();showAnswer() }}>
              <Text style={styles.buttonText}>View Correct Answers</Text>
            </TouchableOpacity>
            </View>}
          {submit && 
          <View style={styles.answerContainer}>
            <View style={styles.left}>
              <Text style={styles.leftText}>{questions[0]}</Text>
              <Text style={styles.answer}>
                Crisis Text Line (1)
              </Text>
              <Text style={styles.answer}>
                American Psychological Association (2)
              </Text>
              <Text style={styles.answer}>
                Greater Good Positive Psychology Project at Berkely (3)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text style={styles.rightText}>Correct order from best to worst:</Text>
              <Text>321</Text>
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
                Crisis text line (1)
              </Text>
              <Text style={styles.answer}>
                Light therapy (2)
              </Text>
              <Text style={styles.answer}>
                Professional Psychological therapy (3)
              </Text>
              <Text style={styles.answer}>
                Freedom from Fear and Anxiety and Depression Association of America (ADAA) (4)
              </Text>
            </View>
            <View style={styles.verticalLine}></View>
            <View style={styles.right}>
              <Text>Correct order from best to worst: </Text>
              <Text>1342</Text>
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

  export default Quiz4