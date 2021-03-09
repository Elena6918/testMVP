import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
import { Text, Button, Card, Icon } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";

const Items = [
  {
    image: require("../assets/images/tree.png"),
    description: "Desciption of this item goes here",
    price: 10,
  },
];

const Shop = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text style={styles.modalText}>Shop</Text>
            <Card>
              <Image source={Items[0]["image"]} style={styles.cardImage} />
              <Text style={{ marginBottom: 10 }}>
                {Items[0]["description"]}
              </Text>
              <View style={styles.element}>
                <FontAwesome5 name="coins" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>{Items[0]["price"]}</Text>
              </View>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginTop: 5,
                }}
                title="buy this item"
                onPress={() => {
                  //TODO: once clicked, check if enough coins, if so put this item into inventory and deduct coins, if not put a warning message
                }}
              />
            </Card>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close Shop</Text>
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
        <Text style={styles.textStyle}>Shop</Text>
      </TouchableHighlight>
    </View>
  );
};

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
  element: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cardImage: {
    alignSelf: "stretch",
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
});
export default Shop;
