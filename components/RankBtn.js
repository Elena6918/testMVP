import React, { useState } from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

const width = Dimensions.get("window").width
const RankBtn = ({ questionText, questionNumber, options, setNewAnswer }) => {
    const [data, setData] = useState(options)
    const [orderString, setOrderString] = useState("")
    const renderItem = ({ item, index, drag, isActive }) => (
        <View>
            <TouchableOpacity onLongPress={drag} style={styles.item}>
                <Text>{item?.label}</Text>
            </TouchableOpacity>
        </View>
    )
    function getOrder(data){
        setData(data)
        var order = []
        data.map((item) =>{
            order.push(item.order)
        })
        setOrderString(
            ()=>{
                var temp = ""
                for(let i = 0; i < order.length; i++){
                    temp = temp.concat(order[i].toString())
                }
                setNewAnswer(questionNumber, temp)
                return temp
            }
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 15, color: '#1a056b'}}>{questionText}</Text>
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    contentContainerStyle={{justifyContent: 'space-between', color: '#1a056b', }}
                    data={data}
                    renderItem={renderItem}
                    activationDistance={10}
                    keyExtractor={(item, index) => index.toString()}
                    onDragEnd={
                        ({ data }) => {
                            getOrder(data)
                        }}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
});

export default RankBtn
