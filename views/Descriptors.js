import React, {useState, useEffect} from "react"
import { StyleSheet, Dimensions, View,TouchableOpacity,AsyncStorage, Image, Linking, ScrollView } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import { Ionicons } from '@expo/vector-icons'
import WaveHeader from "../components/ProfileHeader"

const Descriptors = ({route}) => {
    return (
        <SafeAreaView>
            {/* <WaveHeader customStyles={styles.svgCurve}/> */}
            <ScrollView style={styles.contentContainerStyle}>
                <View style={styles.container}>
                    <Text style={styles.title}>Example Guide Words and Phrases</Text>
                    <Text style={styles.link}> List of Strong Feeling Descriptors  </Text>
                     <Text style={styles.text}>Afraid
Anxious 
Defeated 
Discouraged
Embarrassed
Furious 
Hesitant 
Humiliated
Insecure
Panicked 
Scared
Tired 
Agitated
Ashamed
Depressed
Distant 
Fragile
Guilty 
Hopeless
Hurt
Intimidated
Powerless
Shocked
Worried 
Violated
Angry 
Confused
Disappointed
Distressed
Frustrated
Helpless
Horrified
Inferior 
Irritated
Rejected
Terrified
Isolated
Vulnerable 
</Text>
                    
                    <Text style={styles.link}>List of Phrases for Reflexive Empathy</Text>
                    <Text style={styles.text}>It seems like…
I’m hearing that…
I hear you’re feeling …
I wonder if you’re feeling… 
If I understand you right …
I wonder if… 
I’m curious if… 
You seem to be feeling …
I get the feeling that …
I’m getting the impression … 
It sounds like … 
So, you’re feeling … 
I hear you saying that … 
I’m sensing that you … 
</Text>
        
                    <Text style={styles.link} > Positive Encouragement </Text>
                    <Text style={styles.text}>It takes real courage … 
It takes real strength … 
I can tell that you have great insight …. 
It’s inspiring … 
It shows true compassion … 
You’re resilient … 
I can tell you’re self-aware 
I can tell how committed you are… 
I appreciate your bravery … 
You’re smart … 
</Text>
        
                    <Text style={styles.link}> Open-Ended Questions </Text>
                    <Text style={styles.text}>What have you tried to deal with …? 
What do you usually do when … ? 
Have you thought about ... ? 
How did doing XYZ make you feel … ? 
When do you feel that way …? 
How has X been affecting you? 
How long have you been feeling X? 
Who do you usually go to for advice?
How long have you been dealing with …? 
 </Text>

                {/* </ScrollView> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

const styles = StyleSheet.create({
    contentContainerStyle:{
        padding: 16,
        //top: 70,
        height: 2000,
    },
    svgCurve:{
        position: 'absolute',
        width: Dimensions.get('screen').width,
        backgroundColor: '#D5E1F2',
    },    
    container: {
        height: 2500
    },
    title: {
        marginTop: 10,
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
        margin: 15,
        fontSize: 17
    },
    button:{
        height: 0.4 * Dimensions.get("window").width
    },
  })

export default Descriptors