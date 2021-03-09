import React, { useState } from "react"
import { Text} from "react-native-elements"
import { View, StyleSheet } from "react-native"
import RadioGroup from 'react-native-radio-buttons-group'

const RadioGroupBtn =({ questionType, questionText, questionNumber, setNewAnswer }) => {
    const data = {
        DP1: [
            {
                label: 'Not at all'
            },
            {
                label: 'Several Days'
            },
            {
                label: 'More than half of the days'
            },
            {
                label: 'Nearly every day'
            },
        ],
        DP2: [
            {
                label: 'Not difficult at all'
            },
            {
                label: 'Somewhat difficult'
            },
            {
                label: 'Very difficult'
            },
            {
                label: 'Extremely difficult'
            },
        ]
    }
    const [state, setState] = useState(data)
    let selectedButton, pressEvent, RG

    if(questionType=="DP1"){
        selectedButton = state.DP1[0].label
        // selectedButton = state.DP1.find(e => e.selected == true).value
        //selectedButton = selectedButton ? selectedButton.value : selectedButton.value
        //pressEvent = DP1 => setState({ DP1 })
        setNewAnswer(questionNumber, selectedButton)
        RG = <RadioGroup 
                radioButtons={state.DP1} 
                onPress={() => {
                    selectedButton = state.DP1.find(e => e.selected == true).value
                    setNewAnswer(questionNumber, selectedButton)
                    // console.log(state.DP1)
                    console.log(selectedButton)
                }} 
            />
    }
    if(questionType=="DP2"){
        
        selectedButton = state.DP2[0].label
        // pressEvent = DP2 => setState({ DP2 })
        setNewAnswer(questionNumber, selectedButton)
        RG = <RadioGroup 
                radioButtons={state.DP2} 
                onPress={() => {
                    selectedButton = state.DP2.find(e => e.selected == true).value
                    setNewAnswer(questionNumber, {selectedButton})
                }} 
            />
    }
    return(
        <View style={styles.container}>
            <Text style={styles.valueText}>
                {questionText}
                {/* Value = {selectedButton} */}
            </Text>
            {RG}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    valueText: {
        fontSize: 15,
        marginBottom: 5,
        marginTop: 5
    },
});
export default RadioGroupBtn