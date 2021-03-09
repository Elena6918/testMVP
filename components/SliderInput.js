import React, { useState } from "react"
import { Text, Slider } from "react-native-elements"
import { View, StyleSheet } from "react-native"

const SliderInput = ({
  maxValue,
  questionText,
  questionNumber,
  setNewAnswer,
  lowLabel,
  highLabel,
  showValue,
  showScale,
}) => {
  var scales = []
  for(var i = 1; i <= maxValue; i++){
    var scale = (
      <View key={i}>
        {showScale ? <Text>{i}</Text> : null}
      </View>
    )
    scales[i] = scale
  }
  const [value, setValue] = useState(0)
  setNewAnswer(questionNumber, value)
  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={styles.question}>{questionText}</Text>
      <View style={{ height: 8 }}></View>
      <View>
        <Slider
          value={value}
          onValueChange={newValue => {
            setValue(newValue)
            setNewAnswer(questionNumber, newValue)
          }}
          minimumValue={1}
          maximumValue={maxValue}
          step={1}
          thumbStyle={{
            backgroundColor: "#8f89b8",
            width: 16,
            height: 16,
            borderRadius: 8
          }}
        />
        <View style={styles.textCon}>
          {scales}
        </View>
        <View style={styles.textCon}>
          <Text>{lowLabel}</Text>
          <Text>{highLabel}</Text>
        </View>
        <View style={styles.textCon}>
          {showValue ? <Text>{value}</Text> : null}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textCon: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  question: {
    fontSize: 16
  }
})

export default SliderInput
