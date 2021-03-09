import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, AntDesign } from '@expo/vector-icons'
import HelpScreen from "../views/HelpScreen"
import MessageScreen from "../views/MessageScreen"

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
            component={HelpScreen} 
          />
          <Tab.Screen
            name="Message"
            component={MessageScreen}
          />
        </Tab.Navigator>
    // </NavigationContainer>
  )
}

export default InnerTabNavigator