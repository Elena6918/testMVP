import React, {useState, useEffect} from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,AsyncStorage, Image, Linking, ScrollView } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import WaveHeader from "../components/ProfileHeader"

const Prohelp = ({route}) => {
    return (
        <View>
            {/* <WaveHeader customStyles={styles.svgCurve}/> */}
            <SafeAreaView forceInset={{ top: "always" }}>
            <ScrollView style={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Text style={styles.title}>Professional Help</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.psychiatry.org/')}> American Psychiatric Association </Text>
                    <Text style={styles.text}>This is the official website of the American Psychiatric Association, the largest psychiatric organization in the world. It’s made up of more than 35,000 member psychiatrists.</Text>
                    
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.mentalhealthamerica.net/')}> Mental Health America </Text>
                    <Text style={styles.text}>A community-based network with 240 nationwide affiliates that provide services such as counseling referrals and support.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.psychologytoday.com/us/therapists?utm_source=PT_Psych_Today')}> Psychology Today - Find a Therapist </Text>
                    <Text style={styles.text}>Psychology Today helps users find mental health professionals in their area.</Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://adaa.org/find-help/support/community-resources')}> American Psychological Association — Psychology Help Center </Text>
                    <Text style={styles.text}>Contains a Find a Psychologist directory and help resources in the areas of work and school, family and relationships, health and emotional wellness. </Text>
                   
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.samhsa.gov/find-treatment')}> SAMSHA’s Behavioral Health Treatment Services Locator External </Text>
                    <Text style={styles.text}>Provides resources and referrals for treatment for a variety of mental health issues. </Text>
        
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.mayoclinic.org/diseases-conditions/mental-illness/symptoms-causes/syc-20374968')}> Mayo Clinic — Mental Illness </Text>
                    <Text style={styles.text}>Provides reliable physician-backed information about mental illness definitions, causes, symptoms, prevention, treatment, and support.</Text>

                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.mindwise.org/screenings/')}> MindWise Mental Health Screenings </Text>
                    <Text style={styles.text}>Offers screenings for mental health concerns, providing military members and their families to take free, anonymous mental health or alcohol self-assessments.</Text>
                    
     
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
    container: {
        padding: 16,
        // top: 70,
        height: 1500,
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
    contentContainerStyle:{
        padding: 16,
        //top: 70,
        height: 800,
    },
  })

export default Prohelp