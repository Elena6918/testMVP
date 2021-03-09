import React, { useState } from "react"
import { StyleSheet, Dimensions, View, TouchableHighlight, Alert, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import UserOwned from "../components/UserOwned"
import Shop from "../components/Shop"
import Tile from "../components/Tile"
import HouseImage from "../components/House"

const HomeScreen = () =>{
    const [Tile1, setTile1] = useState(false)
    const [Tile2, setTile2] = useState(false)
    const [Tile3, setTile3] = useState(false)
    const [Plant1, setPlant1] = useState(false)
    const [Plant2, setPlant2] = useState(false)
    const [Plant3, setPlant3] = useState(false)
    const [House, setHouse] = useState(false)
    const [BuildHouse, setBuildHouse] = useState(false)
    return(
        <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
            <View style={styles.header}>
                <Shop />
                <UserOwned />
                <Button
                    title="Edit"
                    onPress={()=>{
                        //all the layout here
                        {!BuildHouse && setHouse(!House)}
                        {BuildHouse && setHouse(!House)}
                        {!Plant1 && setTile1(!Tile1)}
                        {Plant1 && setTile1(!Tile1)}
                        {!Plant2 && setTile2(!Tile2)}
                        {Plant2 && setTile2(!Tile2)}
                        {!Plant3 && setTile3(!Tile3)}
                        {Plant3 && setTile3(!Tile3)}
                        }
                    }
                />
            </View>
            <View style={styles.houseContainer}>
                {House && !BuildHouse &&
                    <View>
                        <TouchableHighlight
                            style={{ ...styles.house}}
                            onPress={() => {
                                //need to add checking condition: if there is house in inventory
                                //if not enough, display an alert window
                                setBuildHouse(true)
                            }}
                        >
                        <Text style={styles.house}>Build your house here</Text>
                        </TouchableHighlight>
                    </View>}
                    {BuildHouse && <HouseImage />}
                    {!House && !BuildHouse && 
                        <View>
                            <TouchableOpacity style={styles.housePlaceHolder}/>
                        </View>}
            </View>
            <View style={styles.tileContainer}>
                {Tile1 && !Plant1 &&
                <View>
                    <TouchableHighlight
                        style={{ ...styles.test}}
                        onPress={() => {
                            //need to add checking condition: if there is enough soil in inventory
                            //if not enough, display an alert window
                            setPlant1(true)
                        }}
                    >
                    <Text style={styles.test}>Plants Here</Text>
                    </TouchableHighlight>
                </View>}
                {Plant1 && <Tile />}
                {!Tile1 && !Plant1 && 
                    <View>
                        <TouchableOpacity style={styles.tilePlaceHolder}/>
                    </View>}

                {Tile2 && !Plant2 &&
                <View>
                    <TouchableHighlight
                        style={{ ...styles.test}}
                        onPress={() => {
                            //need to add checking condition: if there is enough soil in inventory
                            //if not enough, display an alert window
                            Alert.alert("You don't have enough soil in your inventory!")
                        }}
                    >
                    <Text style={styles.test}>Plants Here</Text>
                    </TouchableHighlight>
                </View>}
                {Plant2 && <Tile />}
                {!Tile2 && !Plant2 && 
                    <View>
                        <TouchableOpacity style={styles.tilePlaceHolder}/>
                    </View>}

                {Tile3 && !Plant3 &&
                <View>
                    <TouchableHighlight
                        style={{ ...styles.test}}
                        onPress={() => {
                            //need to add checking condition: if there is enough soil in inventory
                            //if not enough, display an alert window
                            setPlant3(true)
                        }}
                    >
                    <Text style={styles.test}>Plants Here</Text>
                    </TouchableHighlight>
                </View>}
                {Plant3 && <Tile />}
                {!Tile3 && !Plant3 && 
                    <View>
                        <TouchableOpacity style={styles.tilePlaceHolder}/>
                    </View>}
            </View>

            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header:{
        flexDirection: "row",
        padding: 10,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: 10,
    },
    tileContainer:{
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 10,
        height: 150,
    },
    tilePlaceHolder:{
        width: 100,
        height: 150,
    },
    houseContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    housePlaceHolder:{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
    },
    house:{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        backgroundColor: 'lightblue',
    },
    plantImage:{
        width: 100,
        height: 150,
        // backgroundColor: "pink",
        resizeMode: "contain",
        justifyContent: 'space-between',
    },
    test:{
        width: 100,
        height: 150,
        backgroundColor:'lightblue'
    }
})

export default HomeScreen