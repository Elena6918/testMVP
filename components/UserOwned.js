import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native"
import { Text, Button, Card, Icon } from "react-native-elements"


const Items = [
  {
    image: require("../assets/images/soil.png"),
    description: "Desciption of this item goes here",
    name: "soil0"
  },
  {
    image: require("../assets/images/soil.png"),
    description: "Desciption of this item goes here",
    name: "soil1"
  },
];

const UserOwned = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
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
            <Text style={styles.modalText}>Things You Owned</Text>
            <Card>
              <Image source={Items[0]["image"]} style={styles.cardImage} />
              <Text style={{ marginBottom: 10 }}>
                {Items[0]["description"]}
              </Text>
              {/* <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{ marginTop: 5 }}
                title="select this item"
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              /> */}
            </Card>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close inventory</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Inventory</Text>
      </TouchableHighlight>
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
    backgroundColor: "pink",
  },
  tileContainer:{
    flexDirection: "row",
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 10,
    height: 20
  },
});
export default UserOwned;
