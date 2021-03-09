import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
import { Text, Button, Card, Icon } from "react-native-elements"
import CountDown from 'react-native-countdown-component'


const Plantable = [
    {
      image: require("../assets/images/bud.png"),
      description: "Desciption of this item goes here",
    },
]

const Tile = () =>{
    const [modalVisible, setModalVisible] = useState(false)
    const [isPlanted, setPlanted] = useState(false)
    const [harvest, setHarvest] = useState(false)
    let tile,plant 
    if(harvest){
        tile = 
        <View>
            <TouchableHighlight
              style={{ ...styles.plantImage}}
              onPress={() => {
                setHarvest(!harvest)
                setPlanted(!isPlanted)
                //add some rewarding effect here
              }}
            >
              <Image source={require('../assets/images/tree.png')} style={styles.plantImage} /> 
            </TouchableHighlight>
        </View>
        
    }
    if(isPlanted && !harvest){
        tile = 
        <View>
            <Image source={Plantable[0]["image"]} style={styles.plantImage} />
            <View style={styles.timeContainer}>
                <CountDown
                    // until={60 * 10 + 30}
                    until={5}
                    size={10}
                    onFinish={() => setHarvest(!harvest)}
                    digitStyle={{backgroundColor: '#FFF'}}
                    digitTxtStyle={{color: '#1CC625'}}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                />
            </View>    
        </View>

    }else if(!isPlanted && !harvest){
        tile = 
        <View>
          <TouchableHighlight
              style={{ ...styles.plantImage}}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Image source={require('../assets/images/soil.png')} style={styles.plantImage} /> 
            </TouchableHighlight>
        </View>
        plant =  
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Things Can be Planted Here</Text>
            <Card>
              <Image source={Plantable[0]["image"]} style={styles.cardImage} />
              <Text style={{ marginBottom: 10 }}>
                {Plantable[0]["description"]}
              </Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{ marginTop: 5 }}
                title="plant"
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setPlanted(!isPlanted)
                }}
              />
            </Card>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
        </View>
    }
    
    return(
    <View style={styles.tileContainer}>
      <View>
        {tile}
      </View>
        <View>{plant}</View>
    </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    timeContainer:{
        flexDirection: "row",
    },
    tileContainer:{
        height: 150
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      top: 10,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    cardImage: {
      alignSelf: "stretch",
      width: 100,
      height: 150,
      resizeMode: "contain",
    },
    plantImage:{
        width: 100,
        height: 150,
        // backgroundColor: 'pink',
        resizeMode: "contain"
    }
})
export default Tile
  