import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo, AntDesign } from '@expo/vector-icons'
import UserMessageScreen from "../views/UserMessageScreen"
import UserHelpScreen from "../views/UserHelpScreen"
import UserProgressScreen from "../views/UserProgressScreen"
import Suicide from "../views/Suicide"
import Prohelp from "../views/Prohelp"
import SelfHelp from "../views/SelfHelp"

const Stack = createStackNavigator()

const Resource = createStackNavigator()
function UserHelpStack(){
  return(
    <Resource.Navigator>
      <Resource.Screen name="Query" component={UserHelpScreen} options={{headerShown: false}}/>
      <Resource.Screen name = "Suicide" component={Suicide}/>
      <Resource.Screen name = "Prohelp" component={Prohelp}/>
      <Resource.Screen name = "SelfHelp" component={SelfHelp}/>
    </Resource.Navigator>
  )
}
function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Message" component={UserMessageScreen} options={{headerShown: false}}/>
      <Stack.Screen name="UserProgress" component={UserProgressScreen} options={{headerBackTitle: 'Back', title: "Ticket"}}/>
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const InnerTabNavigator = () =>{
    return(
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size=24 }) => {
              let iconName;
              if (route.name === 'Query') {
                iconName = focused ? 'smileo' : 'smile-circle';
                return <AntDesign name={iconName} size={size} color={color} />
              } else if (route.name === 'Message') {
                iconName = focused ? 'message' : 'message';
                return <Entypo name={iconName} size={size} color={color} />
              }
            },
          })}

          tabBarOptions={{
            activeTintColor: '#5555fa',
            inactiveTintColor: '#1a056b',
          }}
        >
          <Tab.Screen 
            name="Query" 
            component={UserHelpStack} 
          />
          <Tab.Screen
            name="Message"
            component={MessageStack}
          />
        </Tab.Navigator>
  )
}

export default InnerTabNavigator