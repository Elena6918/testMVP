import React, {useState, useEffect} from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,AsyncStorage, Image, Linking, ScrollView } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import WaveHeader from "../components/ProfileHeader"

const SelfHelp = ({route}) => {
    return (
        <View>
            {/* <WaveHeader customStyles={styles.svgCurve}/> */}
            <SafeAreaView forceInset={{ top: "always" }}>
            <ScrollView style={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Text style={styles.title}>Self Help</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://greatergood.berkeley.edu/tag/positive+psychology')}> Berkeley Positive Psychology Great Good Lab </Text>
                    <Text style={styles.text}>Magazine that provides self-help tips and resources.</Text>
                    
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.psywww.com/resource/selfhelp.htm')}> Psychology Self-Help Resources </Text>
                    <Text style={styles.text}>Provides self-help resources for a myriad of mental health issues and disorders.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.stevefund.org/')}> SteveFund </Text>
                    <Text style={styles.text}>Releases recommendations for higher education institutions and employers on promoting mental health and well-being of students of color.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://mind-lab.com/happier-five-techniques-positive-psychology/')}> MindLab </Text>
                    <Text style={styles.text}>Provides techniques and guidance on how to actively practice positive psychology. </Text>
                
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.ippanetwork.org/')}> International Positive Psychology Organization </Text>
                    <Text style={styles.text}>Promote and present the science of positive psychology and its research-based applications.</Text>

                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.nhs.uk/conditions/stress-anxiety-depression/self-help-therapies/')}> NHS Self Help Guide </Text>
                    <Text style={styles.text}>Provides resources and methods to practice self-help skills for mental health problems. </Text>
                    
     
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
        
        height: 800,
    },   
    container: {
        padding: 16,
        // top: 70,
        height: 1000,
        justifyContent: 'flex-start'
    },
    title: {
        marginBottom: 30,
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

export default SelfHelp