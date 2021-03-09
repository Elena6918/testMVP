import React, { useState } from "react"
import { Text} from "react-native-elements"
import { View, StyleSheet } from "react-native"
import CustomMultiPicker from "react-native-multiple-select-list"

const MultiSelectBtn =({item, title, questionNumber, setNewAnswer}) => {
    return(
        <View style={styles.container}>
            <Text>{title}</Text>
            <CustomMultiPicker
                options={item}
                search={false} // should show search bar?
                multiple={true} //
                placeholder={"Search"}
                placeholderTextColor={'#757575'}
                returnValue={"label"} // label or value
                callback={(selectedButton)=>{ setNewAnswer(questionNumber, selectedButton)}} // callback, array of selected items
                rowBackgroundColor={"#eee"}
                rowHeight={45}
                rowRadius={5}
                iconColor={"#00a2dd"}
                iconSize={30}
                selectedIconName={"ios-checkmark-circle-outline"}
                unselectedIconName={"ios-radio-button-off-outline"}
                scrollViewHeight={150}
                selected={["all"]} // list of options which are selected by default
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "lightblue",
        borderWidth: 1,
        borderColor: 'grey'
    },
    valueText: {
        fontSize: 15,
        marginBottom: 5,
        marginTop: 5
    },
});
export default MultiSelectBtn