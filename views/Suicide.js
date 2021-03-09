import React, {useState, useEffect} from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,AsyncStorage, Image, Linking, ScrollView } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import WaveHeader from "../components/ProfileHeader"
import { navigate } from "../navigationRef"
import jwt_decode from "jwt-decode"
import serverApi from "../api/server"
import { Alert } from "react-native"

const Suicide = ({route}) => {
    return (
        <View>
            {/* <WaveHeader customStyles={styles.svgCurve}/> */}
            <SafeAreaView forceInset={{ top: "always" }}>
            <ScrollView style={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Text style={styles.title}>Suicide</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://suicidepreventionlifeline.org/')}> National Suicide Prevention Lifeline </Text>
                    <Text style={styles.text}>24-hour suicide prevention hotline. Call 1-800-273-TALK to receive counseling and local referrals.</Text>
                    
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.thetrevorproject.org/')}> The Trevor Project </Text>
                    <Text style={styles.text}>Provides suicide prevention and crisis intervention for LGBTQ youth between the ages of 13 and 24.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.veteranscrisisline.net/')}> Veterans Crisis Line </Text>
                    <Text style={styles.text}>The Veterans Crisis Line provides confidential help for veterans and their families at 1-800-273-8255.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.crisistextline.org/text-us/')}> Crisis Text Line </Text>
                    <Text style={styles.text}>Provides free mental health texting service through confidential crisis intervention via SMS message.</Text>
                   
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.imalive.org/')}> ImAlive </Text>
                    <Text style={styles.text}>Provide help and hope through online crisis chat, educational college events, and awareness campaigns.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.betterhelp.com/')}> BetterHelp </Text>
                    <Text style={styles.text}>Provides professional online mental health services with professional therapist.</Text>
                    

                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.7cups.com/')}> 7cupsoftea </Text>
                    <Text style={styles.text}>Provides online therapy and free support to people experiencing emotional distress by connecting them with trained listeners.</Text>
                    
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.befrienders.org/')}> Befrienders </Text>
                    <Text style={styles.text}>Provides support and companionship to lonely, or emotionally distressed people. Befrienders will usually visit for an hour or so per week.</Text>
                    
                </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
    }

const styles = StyleSheet.create({
    svgCurve:{
        position: 'absolute',
        width: Dimensions.get('screen').width,
        backgroundColor: '#D5E1F2',
    },   
    contentContainerStyle:{
        padding: 16,
        //top: 70,
        height: 800,
    }, 
    container: {
        padding: 16,
        height: 1300,
        justifyContent: 'flex-start'
    },
    title: {
        margin: 30,
        textAlign: 'center',
        fontSize: 30,
        color: '#1a056b'
    },
    link: {
        //margin: 10,
        fontSize: 20,
        color: '#5555fa'
    },
    text: {
        margin: 10,
        fontSize: 17
    },
    button:{
        height: 0.4 * Dimensions.get("window").width
    },
  })

export default Suicide