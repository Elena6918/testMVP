import React, {useState} from "react"
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, TouchableHighlight, Dimensions } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"
import serverApi from "../api/server"
import { AsyncStorage } from "react-native"
import jwt_decode from "jwt-decode"
import QuizBtn from "../components/QuizBtn"
import { Alert } from "react-native"


const CertTest = () => {
    const [pass, setPass] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [testScore, setTestScore] = useState(0)
    const title =
        "Certification Test";
    const questions = [
        "Which of the following is not a stage in the 5 Stage Philosophy?",
        "In which stage of the 5 Stage Philosophy will you most likely need to activate the Suicide Risk Assessment Screener?",
        "In the third stage (Identify the goal), we guide the health care workers towards what they hope will be the next steps in coping with their difficult experiences. If a healthcare worker tells you that they are tired all the time and feel burnt out, how should you respond?",
        "Which stage of the 5 stage philosophy allows you as their peer to reflect on the progress, reiterate their coping skills, and guide them to a proactive solution?",
        "Which step in good contact techniques would you double-check that you’re understanding the healthcare worker correctly?",
        "Validation is a good contact technique where we give reassurance that the healthcare worker’s feelings or experiences are normal and natural. If a healthcare worker tells you that they feel foolish for letting their emotions get in the way of their judgment, how would you respond?",
        "You should use positive encouragement with a healthcare worker even when you can’t tie to an action they’ve shared.",
        "Which of these should not be used when asking an open-ended question?",
        "Which of these is not an item in the suicide risk assessment screener?",
        "If a healthcare worker states that they do not have suicidal ideations, what would you do?",
        "If the healthcare worker responds to “yes” to ___ or more questions, they are considered a positive screen for suicide risk.",
        "You should be direct and open about talking about suicide with the healthcare worker?",
        "If a healthcare worker is considering suicide which resource or referral is the most appropriate?",
        "If a healthcare worker is experiencing physical symptoms such as insomnia, frequent irritability, chest pain, or palpitations, what should resource should you recommend?",
        "Peer supporters should be proactive and should not wait for healthcare workers to manifest obvious signs of distress before offering peer support.",
        "Healthcare worker: \"Lately with the increasing number of patients in the clinic from COVID-19, I have been feeling extremely anxious, I am afraid to go home because we don’t have enough PPE and I am scared that I will transmit the virus to my kids.\"\nWhich one of the following is the best first response? (In this scenario, this is the healthcare worker’s first conversation with you)",
        "Healthcare worker: \"I just lost a patient that I have been treating for years, he is terminal so I know this day will come but I still feel awful after delivering the news to his family, they are devastated.\" Which one of the following would be the best response?",
        "Healthcare workers: \"Recently, everything seems to be going wrong. I am facing a malpractice claim, my parents are filing for a divorce and my attending has been really unfair to me and has been giving me grunt work to do for weeks. I feel like I’m not doing well in anything, it’s just hopeless.\"\nWhich one of the following is your best response? (Assuming this scenario happens after you have done your introduction)",
        "Healthcare workers: \"I have been a little distracted at work and my attending had to correct my mistakes multiple times today during the morning round. I am so worried about what he will think of me and how much that might impact my fellowship application.\" Which of the following is the best response?",
        "Healthcare workers: \"I have recently been isolated by my co-workers. I think it’s because they found out about my sexuality and it makes me feel really unsafe at work.\"\nYou: \"I am so sorry to hear that, having a hostile work environment can be extremely frustrating and upsetting. Would you like to share more about what is going on?\"\nHealthcare workers: \"No, not really, to be honest I feel uncomfortable discussing the specific incidences, I don’t want to look back. I just wanted to express that work has been really difficult for me lately because of this.\"\n Which of the following is the best response?"
    ];
  const options = {
    question0: {
      "A": "Build rapport",
      "B": "Explore",
      "C": "Mental health resources",
      "D": "Discover next steps "
    },
    question1: {
      "A ": "Explore",
      "B": "Identify the goal",
      "C": "Build Rapport",
      "D": "End the conversation"
    },
    question2: {
      "A": <View style={styles.optionContainer}><Text>It’s understandable. Why don’t you take it up with human resources and demand the support that you deserve. You are courageous for continuing to power through but you also deserve the support."</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"I recommend that you use self-help techniques like exercising, changing your diet, or even reading. This usually helps me when I feel down and tired."</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"It’s understandable that you want to get some rest. You are resilient for continuing to power through. What do you usually do when you have a hard time sleeping?"</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"It seems like you are being overworked. It can be difficult to do your job well when you are always tired. Have you considered decreasing the number of hours you work a week. I think that you are overworking yourself."</Text></View>
    },
    question3: {
      "A": "Identify the goal",
      "B": "End the conversation",
      "C": "Build rapport",
      "D": "Explore"
    },
    question4: {
      "A": "Open-ended questions",
      "B": "Paraphrasing",
      "C": "Reflective empathy",
      "D": "Validations"
    },
    question5:{
      "A": <View style={styles.optionContainer}><Text>"You shouldn’t feel that way. It a natural thing to feel. It just shows how caring and thoughtful you are."</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"It’s normal to be overcome by your emotions sometimes when you are in a stressful or difficult situation."</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"To clarify, you feel stupid for letting your emotions affect the way you do your job? That makes sense, I think that everyone feels that way."</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"You are brave for sharing this with me. Sometimes I get overwhelmed when I make mistakes too. It’s okay."</Text></View>
    },
    question6:{
      "A": "True",
      "B": "False"
    },
    question7:{
      "A": "How",
      "B": "Why",
      "C": "What",
      "D": "When"
    },
    question8:{
      "A": "Assessing active suicidal ideation",
      "B": "Identifying an active plan",
      "C": "Evaluating for clear thought process and judgment",
      "D": "Identifying lifetime suicide attempt"
    },
    question9:{
      "A": <View style={styles.optionContainer}><Text>Continue with the screener and ask the remaining questions</Text></View>,
      "B": <View style={styles.optionContainer}><Text>Terminate the screener and respond with Good Contact Techniques</Text></View>,
      "C": <View style={styles.optionContainer}><Text>Tell them that you are glad that they do not have suicidal ideations and continue with the conversation</Text></View>,
      "D": <View style={styles.optionContainer}><Text>Ask the healthcare worker if they had suicidal ideation or past suicidal attempts in the past</Text></View>
    },
    question10:{
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    question11:{
      "A": "True",
      "B": "False"
    },
    question12:{
      "A": <View style={styles.optionContainer}><Text>Art therapy</Text></View>,
      "B": <View style={styles.optionContainer}><Text>Crisis Text Line</Text></View>,
      "C": <View style={styles.optionContainer}><Text>American Psychiatric Association Foundation</Text></View>,
      "D": <View style={styles.optionContainer}><Text>Employee assistance programs and risk management</Text></View>
    },
    question13:{
      "A": <View style={styles.optionContainer}><Text>Crisis Text Line</Text></View>,
      "B": <View style={styles.optionContainer}><Text>American Psychological Association</Text></View>,
      "C": <View style={styles.optionContainer}><Text>Greater Good Positive Psychology Project at Berkeley</Text></View>,
      "D": <View style={styles.optionContainer}><Text>Trevor Project</Text></View>
    },
    question14:{
      "A": "True",
      "B": "False"
    },
    question15:{
      "A": <View style={styles.optionContainer}><Text>"Hello there, I am xxx, and I am here to listen. It seems like you are experiencing a lot of anxiety and overwhelming stress. With the current circumstances, it is completely understandable, would you like to share a little bit more about your feelings with me today?"</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"Hello there, I am xxx and I am here for you. I totally feel your frustration over the PPE shortage situation. Have you tried reaching out to your supervisor or external volunteering organization to request PPE donations? They might be able to help you."</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"Hello there. I am sensing that you might be anxious about the urgency of COVID-19 pandemic, and I want to assure you that a lot of us also feel the same way and you are not alone."</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"Hello there, not being able to work in a safe environment can be incredibly stressful, you are right to reach out today."</Text></View>
    },
    question16:{
      "A": <View style={styles.optionContainer}><Text>"That sounds awful. I am so sorry to hear that. I think we must understand that sometimes situations are out of our hands and all we can do is to try our best to be there for the patient and his family. You are not responsible for his death, and you shouldn’t blame yourself for it."</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"I am sorry to hear that and thank you so much for sharing that with me today. If you don’t mind me asking, why do you think you still feel awful even though you know this day will come eventually, I thought perhaps we can explore this a little."</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"I am so sorry to hear that. Losing a patient is never easy no matter how experienced you are at the job. It seems like you are a very empathetic person and really cared about him and I think that is just wonderful. Now, I am curious, in the past, what has worked for you to handle the loss of a patient in the past?"</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"That sounds awful. I am so sorry to hear that you just lost a patient that you have been treating for years, even though you know he is terminal you still feel awful after delivering the devastating news to his family."</Text></View>
    },
    question17:{
      "A": <View style={styles.optionContainer}><Text>"It sounds like you are going through a particularly difficult time and experiencing all of these unfortunate events simultaneously. It takes a lot of courage today to reach out and I just want to say thank you so much for sharing all that with me."</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"Thank you so much for sharing that with me today, I really appreciate your openness and honesty. It is natural to feel powerless and hopeless when all of these major events in your life are happening all at once. Before we continue to explore those feelings, I just want to ensure your safety first. Have you had thoughts of harming or killing yourself recently? "</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"It took real courage to open up about all these problems in your life. You are an amazingly adaptive, brave, warm and optimistic person. I think we can definitely help you get through this difficult time."</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"It seems to me that there is an overwhelming amount of stress in your life right now, I am concerned with your safety. Perhaps it’s a good idea to seek out professional help offered in the hospital?"</Text></View>
    },
    question18:{
      "A": <View style={styles.optionContainer}><Text>"It seems to me the root problem is that you have been distracted at work. Why have you been distracted at work?"</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"I am so sorry to hear that. Relationships with your superior can always be a source of intense pressure and stress. Do you want to share a little more about what is happening in your life lately that you think might be causing the distraction?"</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"I totally understand what you mean. I myself am currently a resident as well and I am always concerned with my relationships with my attendings too. What do you think is causing the distraction and do you think you could try to explain your situation with your attending?"</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"It takes a lot of courage to admit that you are distracted at work, I want to just first say thank you for your honesty with me. I am wondering if you think speaking directly with your supervisor might help clearing out the situation and avoid further misunderstandings in the future."</Text></View>
    },
    question19:{
      "A": <View style={styles.optionContainer}><Text>"I understand, but perhaps sharing what is really happening we can begin to look for a tangible solution and maybe pursue some legal measures if necessary."</Text></View>,
      "B": <View style={styles.optionContainer}><Text>"I completely understand your unwillingness to share such a traumatic experience. It sounds like you are going through a lot of stress from your co-workers right now, and I just want to let you know that it is a really common for healthcare workers to experience some frictions with their co-workers occasionally, so there really isn’t anything you need to be embarrassed about, I am here to listen and not judge."</Text></View>,
      "C": <View style={styles.optionContainer}><Text>"I am seeing that you are still very angry and sensitive about what happened. I totally understand if you don’t want to discuss that experience. Is there anyone you will feel more comfortable talking about such experience with?"</Text></View>,
      "D": <View style={styles.optionContainer}><Text>"I am very sorry to hear that you feel isolated by your co-workers and you don’t ever have to share anything you don’t feel comfortable sharing. I just want to let you know that I am always here to listen if you ever change your mind."</Text></View>
    },
  }
  
  var answers= {}

  const handleAnswerChange = (key, value) => {
    answers[key] = value
  }

  const correct_answers_options={
    "question0": "C",
    "question1": "A",
    "question2": "C",
    "question3": "B",
    "question4": "B",
    "question5": "B",
    "question6": "B",
    "question7": "B",
    "question8": "C",
    "question9": "B",
    "question10": "B",
    "question11": "A",
    "question12": "B",
    "question13": "C",
    "question14": "A",
    "question15": "A",
    "question16": "C",
    "question17": "B",
    "question18": "B",
    "question19": "D",
  }

  const correct_answers={
    "question0": "Mental health resources",
    "question1": "Explore",
    "question2": "\"It’s understandable that you want to get some rest. You are resilient for continuing to power through. What do you usually do when you have a hard time sleeping?\"",
    "question3": "End the conversation",
    "question4": "Paraphrasing",
    "question5": "\" It’s normal to be overcome by your emotions sometimes when you are in a stressful or difficult situation.\"",
    "question6": "False",
    "question7": "Why",
    "question8": "Evaluating for clear thought process and judgment",
    "question9": "Terminate the screener and respond with Good Contact Techniques ",
    "question10": "2",
    "question11": "True",
    "question12": "Crisis Text Line",
    "question13": "Greater Good Positive Psychology Project at Berkeley",
    "question14": "True",
    "question15": "Hello there, I am xxx, and I am here to listen. It seems like you are experiencing a lot of anxiety and overwhelming stress. With the current circumstances, it is completely understandable, would you like to share a little bit more about your feelings with me today?",
    "question16": "That sounds awful. I am so sorry to hear that. I think we must understand that sometimes situations are out of our hands and all we can do is to try our best to be there for the patient and his family. You are not responsible for his death, and you shouldn’t blame yourself for it.",
    "question17": "It sounds like you are going through a particularly difficult time and experiencing all of these unfortunate events simultaneously. It takes a lot of courage today to reach out and I just want to say thank you so much for sharing all that with me.",
    "question18": "It seems to me the root problem is that you have been distracted at work. Why have you been distracted at work?",
    "question19": "I understand, but perhaps sharing what is really happening we can begin to look for a tangible solution and maybe pursue some legal measures if necessary.",
  }
  async function showScore(){
    let userAnswer = {}
    for(let i = 0; i < questions.length; i++){
        index = "question"+ i.toString()
        if(answers[index] == null){
            Alert.alert("Please make a choice for every question!")
        }else{
            userAnswer[index] = answers[index][0]
        }      
    }

    var score = 0;
    for(let i = 0; i < questions.length; i++){
            var index = "question"+i.toString()
            if(userAnswer[index][0] == correct_answers_options[index]){
                score += 5
            }
    }
    setTestScore(score)
    if(score >= 10){
            setPass(2)
            AsyncStorage.setItem("CertState", "2")
    }else{
            setPass(1)
            AsyncStorage.setItem("CertState", "1")
    }
  }

  return (
    <SafeAreaView forceInset={{ bottom: "always" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <QuizBtn 
          questionNumber="question0"
          questionText={questions[0]}
          item={options.question0}
          setNewAnswer={handleAnswerChange}
        />
       <QuizBtn 
          questionNumber="question1"
          questionText={questions[1]}
          item={options.question1}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question2"
          questionText={questions[2]}
          item={options.question2}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question3"
          questionText={questions[3]}
          item={options.question3}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question4"
          questionText={questions[4]}
          item={options.question4}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question5"
          questionText={questions[5]}
          item={options.question5}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question6"
          questionText={questions[6]}
          item={options.question6}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question7"
          questionText={questions[7]}
          item={options.question7}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question8"
          questionText={questions[8]}
          item={options.question8}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question9"
          questionText={questions[9]}
          item={options.question9}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question10"
          questionText={questions[10]}
          item={options.question10}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question11"
          questionText={questions[11]}
          item={options.question11}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question12"
          questionText={questions[12]}
          item={options.question12}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question13"
          questionText={questions[13]}
          item={options.question13}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question14"
          questionText={questions[14]}
          item={options.question14}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question15"
          questionText={questions[15]}
          item={options.question15}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question16"
          questionText={questions[16]}
          item={options.question16}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question17"
          questionText={questions[17]}
          item={options.question17}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question18"
          questionText={questions[18]}
          item={options.question18}
          setNewAnswer={handleAnswerChange}
        />
        <QuizBtn 
          questionNumber="question19"
          questionText={questions[19]}
          item={options.question19}
          setNewAnswer={handleAnswerChange}
        />
        <TouchableOpacity onPress={()=>{showScore(); setModalVisible(true); console.log(answers) }}>
              <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
        <View style={{ height: 32 }}></View>
      </ScrollView>

      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Your score is: {testScore}</Text>
                        {pass==1 && 
                        <Text>
                            You did not pass the test. 
                        </Text>}
                        {pass==2 && 
                        <Text>
                            Congratulations! You passed the test.
                        </Text>}
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1a056b", margin: 10 }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigate("CertTestAnswer", {questions: questions, answers: correct_answers})
                            }}
                        >
                            <Text style={styles.textStyle}>View Correct Answers</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1a056b" }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigate("Profile")
                            }}
                        >
                            <Text style={styles.textStyle}>Back to Profile</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  optionContainer:{
    width: Dimensions.get("screen").width*0.7,
  },
  title: {
    fontSize: 25,
    marginBottom: 32,
    marginTop: 16,
    textAlign: 'center',
    color: '#1a056b'
  },
  header: {
    fontSize: 25,
    marginBottom: 32,
    marginTop: 16
  },
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16
  },
  submit: {
      margin: 15,
      fontFamily: 'Helvetica Neue',
      borderRadius: 10,
      color: 'white',
      textAlign: 'center',
      padding: 15,
      fontSize: 17,
      backgroundColor: '#5555fa',
      alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    openButton: {
        backgroundColor: "#1a056b",
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: '#1a056b'
    },
});

export default CertTest
