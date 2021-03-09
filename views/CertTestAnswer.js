import React, {useState} from "react"
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, TouchableHighlight } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"

const CertTestAnswer = ({route}) => {
  var render_answers = []
  const {questions, answers} = route.params
  for(var i = 0; i < questions.length; i++){
      const curQ = questions[i]
      const index = "question"+i.toString()
      const curA = answers[index]
      var block = (
          <View style={styles.container} key={i}>
              <Text>Q: {curQ}</Text>
              <Text>A: {curA}</Text>
          </View>
      )
      render_answers[i] = block
  }
  return (
    <SafeAreaView forceInset={{ bottom: "always" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Test Answers</Text>
            {render_answers}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 32,
    marginTop: 16
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
      paddingVertical: 5,
      //backgroundColor: '#5555fa',
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

export default CertTestAnswer
