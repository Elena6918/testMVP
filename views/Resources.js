
// DEESC/SUICIDE/CRISIS, PRO HELP, psotiviepscyholigysandselhelpskills 
import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View,TouchableOpacity,Image, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import WaveHeader from "../components/ProfileHeader"
import Module from "../components/Module";
import {navigate} from "../navigationRef"

const Resources = () => {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
        <View style={styles.container}>
        <WaveHeader customStyles={styles.svgCurve}/>
          <Text style={styles.header}>Mental Health Resources</Text>
          <Text style={styles.videoText}>Descalation/Suicide/Crisis</Text>
            <TouchableOpacity 
              onPress={() => navigate("Suicide")}>
              <Image source={require('../assets/images/cloud.png')} style={styles.stopImage}/>
            </TouchableOpacity>  
            <Text style={styles.videoText}>Professional Help</Text>
            <TouchableOpacity 
              onPress={() => navigate("Prohelp")}>
              <Image source={require('../assets/images/help.png')} style={styles.stopImage}/>
            </TouchableOpacity> 
            <Text style={styles.videoText}>Positive Psychology and Self Help Skills</Text>
            <TouchableOpacity onPress={() => navigate("SelfHelp")}>
              <Image source={require('../assets/images/inspection.png')} style={styles.stopImage}/>
            </TouchableOpacity> 
          </View> 
          </ScrollView>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    svgCurve: {
      position: "absolute",
      width: Dimensions.get("window").width,
      backgroundColor: "#1a056b",
      transform: [{ translateY: -250 }],
    },
    videoText: {
      textAlign: "center",
      fontSize: 20,
      color: "#1a056b",
    },
    container: {
      marginBottom: 90,
      //marginRight: 100,
      transform: [{ translateY: 200 }],
      flex: 1,
      height: 700
    },
    stop: {
      flex: 1,
      marginRight: 100,
      //paddingRight: 900,
      marginEnd: 100,
      alignSelf: "center"
    },
    header: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 30,
      color: "#1a056b",
      transform: [{ translateY: -80 }],
    },
    navigationLink: {
      color: "gray",
      textAlign: "center",
      marginTop: 8,
      textDecorationLine: "underline",
    },
    errorText: {
      color: "red",
      textAlign: "center",
    },
    rowView:{
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    button:{
      flex:1,
      marginTop: 60,
      color: "#1a056b",
    },
    stopImage:{
      margin: 20,
      alignSelf:'center',
      width:100,
      height:100, 
      resizeMode:'contain',
      backgroundColor: '#d5e1f2',
      borderRadius: 20,
  },
});
  
  export default Resources
