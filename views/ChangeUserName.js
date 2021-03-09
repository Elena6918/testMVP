import React, {useState, useContext} from "react"
import { StyleSheet, Dimensions, View, AsyncStorage} from "react-native"
import { Button, Input, Text } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"
import jwt_decode from "jwt-decode"
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from "react-navigation"

const ChangeUserName = () =>{
  const [newUsername, setNewUsername] = useState("")
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
  const { state, changeUsername, clearErrorMessage } = useContext(AuthContext)
  return(
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
            <Input
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="New Username"
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
              onPress={() => changeUsername({userId, newUsername})}
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
      fontSize: 20
    },
    button:{
        margin: 10,
        backgroundColor: '#1a056b',
        width : 0.9 * Dimensions.get("window").width,
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

  export default ChangeUserName
