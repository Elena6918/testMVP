import React, { useState, useContext } from "react"
import { Button, Input, Text } from "react-native-elements"
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native"
import { navigate } from "../navigationRef"
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from "react-navigation"
import WaveHeader from "../components/ProfileHeader"

const SignupScreen = ({route}) => {
  const {identity} = route.params
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const { state, signup, clearErrorMessage } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, justifyContent: "center"}} >
          {/* <WaveHeader customStyles={styles.svgCurve}  /> */}
      <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Text style={styles.header}>Welcome to PREPARE</Text>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          inputContainerStyle={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          inputContainerStyle={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          errorStyle={{ height: 0 }}
          secureTextEntry
          value={confirmation}
          onChangeText={setConfirmation}
          placeholder="Confirm Password"
          inputContainerStyle={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* <CheckBox
          title="I'm a current health worker"
          checkedIcon={<FontAwesome name="check-square-o" size={24} color="black" />}
          uncheckedIcon={<FontAwesome name="square-o" size={24} color="black" />}
          checked={prog}
          onPress={() => setProg(!prog)}
        /> */}
        {state.errorMessage ? (
          <Text style={styles.errorText}>{state.errorMessage}</Text>
        ) : null}

        <Button 
          title="Sign up" 
          buttonStyle={{backgroundColor: "#5569FA", margin: 15}} 
          style={{ marginTop: 32}} 
          onPress={() => {
            signup({ username, password, confirmation, identity })
          }}
        />

        <TouchableOpacity onPress={() => navigate("Signin")}>
          <Text style={styles.navigationLink}>
            Already have an account? Sign in instead
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 8
  },
  container: {
    padding: 50
  },
  svgCurve:{
    width: Dimensions.get('screen').width,
    // backgroundColor: '#D5E1F2',
    justifyContent: 'flex-start',
    flex: 1
},
  header: {
    alignItems: 'flex-start',
    textAlign: "center",
    fontSize: 32,
    marginBottom: 16,
  },
  navigationLink: {
    color: "gray",
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline"
  },
  errorText: {
    color: "red",
    textAlign: "center"
  }
})

export default SignupScreen
