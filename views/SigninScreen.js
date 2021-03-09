import React, { useState, useContext } from "react"
import { Button, Input, Text } from "react-native-elements"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-navigation"
import { navigate } from "../navigationRef"
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from "react-navigation"

const SigninScreen = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { state, signin, clearErrorMessage } = useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Text style={styles.header}>Welcome Back!!</Text>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          inputContainerStyle={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          errorStyle={{ height: 0 }}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          inputContainerStyle={styles.inputBox}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {state.errorMessage ? (
          <Text style={styles.errorText}>{state.errorMessage}</Text>
        ) : null}

        <Button 
          title="Sign in" 
          buttonStyle={{backgroundColor: "#5569FA", margin: 15}} 
          style={{ marginTop: 32}} 
          onPress={() => signin({ username, password })} 
        />
        <TouchableOpacity onPress={() => navigate("Intro4")}>
          <Text style={styles.navigationLink}>
            Don't have an account? Sign up instead
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 8
  },
  container: {
    padding: 16
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 16
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

export default SigninScreen
