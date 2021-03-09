import React, { useState } from "react"
import { Text, CheckBox } from "react-native-elements"
import { View } from "react-native"

const HowLongInput = ({ questionText, questionNumber, setNewAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ fontSize: 16 }}>{questionText}</Text>
      <CheckBox
        title="<1 month"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 0 ? true : false}
        onPress={() => setSelectedIndex(0)}
      />
      <CheckBox
        title="1-3 months"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 1 ? true : false}
        onPress={() => {
          setSelectedIndex(1)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
      <CheckBox
        title="3-6 months"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 2 ? true : false}
        onPress={() => {
          setSelectedIndex(2)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
      <CheckBox
        title="6-12 months"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 3 ? true : false}
        onPress={() => {
          setSelectedIndex(3)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
      <CheckBox
        title=">12 months"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={selectedIndex == 4 ? true : false}
        onPress={() => {
          setSelectedIndex(4)
          setNewAnswer(questionNumber, selectedIndex)
        }}
      />
    </View>
  )
}

export default HowLongInput
