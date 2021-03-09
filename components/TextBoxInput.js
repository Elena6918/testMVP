import React, { useState } from "react"
import { View, TextInput, StyleSheet} from "react-native"
import { Text } from "react-native-elements"

const TextBoxInput = ({ questionNumber, questionText, setNewAnswer }) => {
  const [value, setValue] = useState("")
  setNewAnswer(questionNumber, value)
  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={styles.question}>{questionText}</Text>
      <View style={styles.inputBox}>
          <TextInput
            style={{ height: 80, borderColor: 'gray', borderWidth: 1 }}
            multiline={true}
            numberOfLines={4}
            maxLength={80}
            onChangeText={text => {
              setValue(text)
              setNewAnswer(questionNumber, text)
            }}
            value={value}
          />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1
  },
  question: {
    fontSize: 16
  }
})

export default TextBoxInput
