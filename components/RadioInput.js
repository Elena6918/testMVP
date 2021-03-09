import React, { useState } from "react"
import { Text, CheckBox } from "react-native-elements"
import { View } from "react-native"
import TextBoxInput from "../components/TextBoxInput"

const RadioInput = ({ questionText, questionNumber, setNewAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  setNewAnswer(questionNumber, selectedIndex)
  
  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ fontSize: 16 }}>{questionText}</Text>
      <CheckBox
        title="Yes"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 1 ? true : false}
        onPress={() => {
          setSelectedIndex(1)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
      <CheckBox
        title="No"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 0 ? true : false}
        onPress={() => {
          setSelectedIndex(0)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
    </View>
  )
}

export default RadioInput
