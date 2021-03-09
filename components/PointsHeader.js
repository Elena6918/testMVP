import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import { SafeAreaView } from "react-navigation"
import { FontAwesome, FontAwesome5, AntDesign} from '@expo/vector-icons'
import {navigate} from "../navigationRef"
const PointsHeader = () =>{
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigate("Module")}}>
                    <AntDesign name="back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.points}>
                    <View style={styles.element}>
                        <FontAwesome5 name="coins" size={24} color="black" />
                        <Text style={styles.text}>0</Text>
                    </View>  
                    <View style={styles.element}>
                        <FontAwesome name="diamond" size={24} color="black" />
                        <Text style={styles.text}>0</Text>
                    </View>  
                </View>        
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "grey"
    },
    points:{
        width: 0.6 * Dimensions.get("window").width,
        flexDirection: "row",
    },
    element:{
        width: 0.3 * Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "space-around",
        left: 10,
        alignItems: "baseline"
    },
    text:{
        fontSize: 16,
        color: "black",
        left: 10
    },
    button:{

    }
})

export default PointsHeader