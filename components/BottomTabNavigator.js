import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderBackButton } from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons'
import ProfileScreen from "../views/ProfileScreen"
import ModuleScreen from "../views/UserModuleScreen"
import HomeScreen from "../views/HomeScreen"
import { createStackNavigator } from '@react-navigation/stack'
import SettingScreen from "../views/SettingScreen"
import ChangeUsrnameScreen from "../views/ChangeUserName"
import ChangePwScreen from "../views/ChangePassword"
import AboutScreen from "../views/AboutScreen"
import Module1 from "../views/Module1"
import Module2 from "../views/Module2"
import Module3 from "../views/Module3"
import Quiz1 from "../views/Quiz1"
import Quiz2a from "../views/Quiz2a"
import Quiz2b from "../views/Quiz2b"
import Quiz3 from "../views/Quiz3"
import Quiz4 from "../views/Quiz4"
import Quiz5 from "../views/Quiz5"
import CertTest from "../views/CertTest"
import CertTestAnswer from "../views/CertTestAnswer"
import Resources from "../views/Resources"
import Suicide from "../views/Suicide"
import Prohelp from "../views/Prohelp"
import SelfHelp from "../views/SelfHelp"
import Descriptors from "../views/Descriptors"
import { navigate } from '../navigationRef'

const Resource = createStackNavigator()
function ResourceStack(){
  return(
    <Resource.Navigator>
      <Resource.Screen name = "Resource" component={Resources}/>
      <Resource.Screen name = "Suicide" component={Suicide}/>
      <Resource.Screen name = "Prohelp" component={Prohelp}/>
      <Resource.Screen name = "SelfHelp" component={SelfHelp}/>
    </Resource.Navigator>
  )
}

const Stack = createStackNavigator()
function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="ChangeName" component={ChangeUsrnameScreen} />
      <Stack.Screen name="ChangePwd" component={ChangePwScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Module.Screen name="CertTest" component={CertTest} />
      <Module.Screen name="CertTestAnswer" component={CertTestAnswer} 
        options={{
          headerLeft: () => (<HeaderBackButton onPress={()=>{navigate("Profile")}}/>)
        }}
      />
      <Module.Screen name="Resources" component={ResourceStack} options={{headerShown: false}}/>
      <Module.Screen name="Descriptors" component={Descriptors} />
    </Stack.Navigator>
  )
}

const Module = createStackNavigator()
function ModuleStack(){
  return(
    <Module.Navigator>
      <Module.Screen name="Module" component={ModuleScreen} options={{headerShown: false}}/>
      <Module.Screen name="Module 1" component={Module1} />
      <Module.Screen name="Module 2" component={Module2} />
      <Module.Screen name="Module 3" component={Module3} />
      <Module.Screen name="Quiz 1" component={Quiz1} />
      <Module.Screen name="Quiz 2a" component={Quiz2a} />
      <Module.Screen name="Quiz 2b" component={Quiz2b} />
      <Module.Screen name="Quiz 3" component={Quiz3} />
      <Module.Screen name="Quiz 4" component={Quiz4} />
      <Module.Screen name="Quiz 5" component={Quiz5} />
    </Module.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const BottomTabNavigator = () =>{
    return(
      // <NavigationContainer independent={true} ref={navigationRef}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size=24 }) => {
              let iconName;
              if (route.name === 'Profile') {
                iconName = focused ? 'md-person' : 'md-person';
              } else if (route.name === 'Module') {
                iconName = focused ? 'ios-list' : 'ios-list';
              } //else if (route.name === 'Home'){
              //   iconName = focused ? 'ios-home' : 'ios-home'
              // }
              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarVisible: ()=>{
              if(route.name === 'Help'){
                return false
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: '#1a056b',
            inactiveTintColor: '#5555fa',
          }}
        >
          <Tab.Screen 
            name="Module" 
            component={ModuleStack} 
          />
          <Tab.Screen 
            name="Profile" 
            component={SettingStack} 
            options={{headerRight:() => (
              <TouchableOpacity onPress={() => {navigation.jumpTo("Setting")}}>
                <AntDesign name="back" size={24} color="black" />
              </TouchableOpacity>
              )}}
          />
          {/* <Tab.Screen
            name="Home"
            component={HomeScreen}
          /> */}
          
        </Tab.Navigator>
    // </NavigationContainer>
  )
}

export default BottomTabNavigator