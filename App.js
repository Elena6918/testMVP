import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import QuestionnaireScreen from "./app/views/QuestionnaireScreen"
import RecommendationScreen from "./app/views/RecommendationScreen"
import SignupScreen from "./app/views/SignupScreen"
import SigninScreen from "./app/views/SigninScreen"
import InnerNavigator from "./app/components/InnerTabNavigator"
import ProgressScreen from "./app/views/ProgressScreen"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { navigate, navigationRef } from "./app/navigationRef"
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from "./app/components/BottomTabNavigator"
import { Provider as AuthProvider } from "./app/context/AuthContext"
import DepressionQuestionnaireScreen from "./app/views/DepressionQuestionnaireScreen"
import UserBottomNavigator from "./app/components/UserBottomNavigator"
import ChooseRoleScreen from "./app/views/ChooseRoleScreen"
import Intro1 from "./app/views/Intro1"
import Intro2 from "./app/views/Intro2"
import Intro3 from "./app/views/Intro3"
import Intro4 from "./app/views/Intro4"
import TrainerQuestionnaireScreen from "./app/views/TrainerQuestionnaireScreen"
import UserQuestionnaireScreen from "./app/views/QuestionnaireScreen"
import HCWIntro1 from "./app/views/IntroCurrentHCW1"
import HCWIntro2 from "./app/views/IntroCurrentHCW2"
import HCWIntro3 from "./app/views/IntroCurrentHCW3"
import PSIntro1 from "./app/views/IntroPeerSupporter1"
import PSIntro2 from "./app/views/IntroPeerSupporter2"
import PSIntro3 from "./app/views/IntroPeerSupporter3"
import PSIntro4 from "./app/views/IntroPeerSupporter4"
// import test from "./app/views/CertTest"

const Stack = createStackNavigator()
function LoginStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="test" component={test} options={{headerShown: false}}/> */}
      <Stack.Screen name="Intro1" component={Intro1} options={{headerShown: false}}/>
      <Stack.Screen name="Intro2" component={Intro2} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="Intro3" component={Intro3} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="Intro4" component={Intro4} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="PSIntro1" component={PSIntro1} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="PSIntro2" component={PSIntro2} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="PSIntro3" component={PSIntro3} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="PSIntro4" component={PSIntro4} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="HCWIntro1" component={HCWIntro1} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="HCWIntro2" component={HCWIntro2} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="HCWIntro3" component={HCWIntro3} options={{title: "PREPARE", headerBackTitle: "Back"}}/>
      <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}}/>
      <Stack.Screen name="UQuestion" component={UserQuestionnaireScreen} options={{headerShown: false}}/>
      <Stack.Screen name="TQuestion" component={TrainerQuestionnaireScreen} options={{headerShown: false}}/>
      {/* <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} options={{headerShown: false}}/> */}
    </Stack.Navigator>
  )
}

const Root = createStackNavigator()
function NavStack(){
  return(
    <Root.Navigator>
      <Root.Screen 
        name="login" 
        component={LoginStack} 
        options={{
          headerShown: false
        }}/>
      <Root.Screen 
        name="trainer" 
        component={BottomNavigator} 
        options={{
          headerShown: false
        }}/>
      <Root.Screen 
        name="Help" 
        component={InnerNavigator} 
        options={{title: "", headerBackTitle: "Back"}}
      />
      <Root.Screen
        name="Progress"
        component={ProgressScreen}
        options={{headerBackTitle: "Back"}}
      />
      <Root.Screen 
        name="patient" 
        component={UserBottomNavigator}
        options={{
          headerShown: false
        }}
      />
    </Root.Navigator>
  )
}

const switchNavigator = createSwitchNavigator({
  NavStack: NavStack
})
const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <App/>
      </NavigationContainer>
    </AuthProvider>
  );
};
