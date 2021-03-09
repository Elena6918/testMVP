import React, {useState, useContext} from "react"
import { StyleSheet, Dimensions, View, AsyncStorage} from "react-native"
import { Button, Input, Text } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import jwt_decode from "jwt-decode"
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from "react-navigation"

const ChangePassword = () =>{
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [userId, setUserId] = useState("")
  AsyncStorage.getItem("token")
  .then((value) => {
    var decoded = jwt_decode(value)
    setUserId(decoded["userId"])
  })
  .catch(function(error){
    console.log(error.message)
    throw error
  })
  const { state, changePassword, clearErrorMessage } = useContext(AuthContext)
    return(
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.container}>
          <NavigationEvents onWillFocus={clearErrorMessage} />
          <Input
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Old Password"
            inputContainerStyle={styles.inputBox}
            autoCapitalize="none"
            autoCorrect={false}
          /> 
          <Input
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            inputContainerStyle={styles.inputBox}
            autoCapitalize="none"
            autoCorrect={false}
          /> 
          <Input
            errorStyle={{ height: 0 }}
            secureTextEntry
            value={confirmation}
            onChangeText={setConfirmation}
            placeholder="Confirm New Password"
            inputContainerStyle={styles.inputBox}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {state.errorMessage ? (
              <Text style={styles.errorText}>{state.errorMessage}</Text>
          ) : null}
          {state.status ? (
              <Text style={styles.successText}>{state.status}</Text>
          ) : null}

          <Button 
            title="Save" 
            buttonStyle={styles.button}
            style={{ marginTop: 32}} 
            onPress={() => changePassword({userId, oldPassword, newPassword, confirmation})}
          />
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
      fontSize: 25
    },
    button:{
        margin: 10,
        width : 0.9 * Dimensions.get("window").width,
        backgroundColor: '#1a056b',
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    errorText: {
      color: "red",
      textAlign: "center"
    },
    successText: {
      color: "green",
      textAlign: "center"
    }
  })

  export default ChangePassword
