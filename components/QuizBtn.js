import React, { useState } from "react"
import { Text} from "react-native-elements"
import { View, StyleSheet, Dimensions} from "react-native"
// import RadioGroup from 'react-native-radio-buttons-group'
import CustomMultiPicker from "react-native-multiple-select-list"

const QuizBtn =({ item, questionText, questionNumber, setNewAnswer }) => {
    // const [state, setState] = useState(item)
    // let selectedButton, RG
    // selectedButton = selectedButton ? selectedButton.value: state[0].value
    // function pressEvent(){
    //     selectedButton = state.find(e => e.selected == true)
    //     selectedButton = selectedButton ? selectedButton.value: state[0].value
    //     // console.log(selectedButton)
    // }
    //setNewAnswer(questionNumber, selectedButton)
    // RG = 
    // <RadioGroup 
    //     radioButtons={state} 
    //     onSelect={() => {
    //         pressEvent()
    //         setNewAnswer(questionNumber, selectedButton)
    //     }} 
    // />
    return(
        // <View style={styles.container}>
        //     <Text style={styles.valueText}>
        //         {questionText}
        //         {/* Value = {selectedButton} */}
        //     </Text>
        //     <Text style={styles.valueText}>
        //         {RG}
        //     </Text>
            
        // </View>
        <View style={styles.container}>
        <Text style={styles.valueText}>{questionText}</Text>
        <CustomMultiPicker
            options={item}
            search={false} // should show search bar?
            multiple={false} //
            returnValue={"value"} // label or value
            callback={(selectedButton)=>{ setNewAnswer(questionNumber, selectedButton)}} // callback, array of selected items
            rowBackgroundColor={"lightgrey"}
            //rowHeight={150}
            rowRadius={5}
            iconColor={"#00a2dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            //scrollViewHeight={500}
            selected={[]} // list of options which are selected by default
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        padding: 16,
        width: Dimensions.get('screen').width*0.9
        // backgroundColor: "lightblue",
    },
    valueText: {
        fontSize: 15,
        marginBottom: 5,
        padding: 10
    },
});
export default QuizBtn