import React from "react"
import { StyleSheet, Dimensions, View} from "react-native"
import { Text, Button, Header } from "react-native-elements"
import { SafeAreaView } from "react-navigation"

const AboutScreen = () =>{
    return(
        <SafeAreaView forceInset={{ top: "always" }}>
             <View style={styles.container}>
                <Text>If you have questions and/or concerns, please email ambuloprepare@gmail.com.  Thank you! </Text>
             </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16
    },
    header:{
        fontSize: 24,
        textAlign: 'center'
    },
    title: {
      fontSize: 20
    },
    button:{
        margin: 10,
        width : 0.9 * Dimensions.get("window").width,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })

  export default AboutScreen