import React from "react"
import { StyleSheet, Dimensions, AsyncStorage, View, TouchableOpacity} from "react-native"
import { Text, Button, Header } from "react-native-elements"
import { navigate } from "../navigationRef"
import { SafeAreaView } from "react-navigation"
const SettingScreen = () => {
    async function logout(){
        await AsyncStorage.removeItem("token")
        navigation.navigate("Signin")
    }
    return(
        <SafeAreaView >
            <View style={styles.container}>
                <Text style={styles.setColorPurple}>Account</Text>
                <Button 
                    title = "Edit Username"
                    buttonStyle={styles.button}
                    onPress={() => navigate("ChangeName")}
                />
                <Button 
                    title = "Change Password"
                    buttonStyle={styles.buttonpassword}
                    onPress={() => navigate("ChangePwd")}
                />
                <Text style={styles.setColorPurple}>Settings</Text>
                {/* <Button 
                    title = "Notice"
                    buttonStyle={styles.button}
                    // onPress={() => navigate("notice")}
                /> */}
                <Button 
                    title = "About"
                    buttonStyle={styles.button}
                    onPress={() => navigate("About")}
                />
            <TouchableOpacity onPress={() => logout()}>
                <Text style={styles.navigationLink}>
                    Logout of Your Account
                </Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#d5e1f2',
      height: '100%',
      alignItems: 'center'
    },
    button:{
        margin: 20,
        width : 0.9 * Dimensions.get("window").width,
        backgroundColor: '#1a056b',
    },
    buttonpassword:{
        margin: 20,
        width : 0.9 * Dimensions.get("window").width,
        backgroundColor: '#1a056b',
        marginBottom: 40
    },
    setColorPurple:{
        color: '#1a056b',
        fontSize: 25,
        textAlign: "center",
        marginTop: 20
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    navigationLink: {
        color: "gray",
        textAlign: "center",
        marginTop: 8,
        textDecorationLine: "underline"
    },
  })

export default SettingScreen