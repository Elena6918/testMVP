import React, { useRef, useState, useEffect } from "react"
import { StyleSheet, Button, Dimensions, View,Image, TouchableOpacity, Platform, Modal, TouchableHighlight,} from "react-native"
import { Text, Alert } from "react-native-elements"
import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import { navigate } from "../navigationRef"
import { AsyncStorage } from "react-native"

const Module = ({ videoName, videoURL, moduleDescription, quizName, imageIcon, imageStyle, buttonStyle }) => {
    useEffect(()=>{
        AsyncStorage.getItem('videoState')
        .then(req => JSON.parse(req))
        .then((value) =>{
          if(!value[videoName]){
              setVideoState(value)
              setUpdate(true)
          }
        })
        // .then(json => console.log(json))
        // .catch(error => console.log('error!'))
      },[]) 
    const _videoRef  = useRef()
    const [modalVisible, setModalVisible] = useState(false)
    const [quizmodal, setquizModal] = useState(false)
    const [videoState, setVideoState] = useState({})
    const [update, setUpdate] = useState(false)
    const fullscreen = () => _videoRef.current?.presentFullscreenPlayer()
    const onFullscreenUpdate = async ({fullscreenUpdate}) => {
        if (Platform.OS === 'android') {
            switch (fullscreenUpdate) {
                case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                    await ScreenOrientation.unlockAsync() // only on Android required
                    break;
                case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // only on Android required
                    break;
            }
        }
    }
    const _onPlaybackStatusUpdate = playbackStatus => {
        if (playbackStatus.didJustFinish){
            setModalVisible(!modalVisible)
            setquizModal(!quizmodal)
            if(update){
                let newVideoState = videoState
                newVideoState[videoName] = true
                AsyncStorage.setItem("videoState", JSON.stringify(newVideoState))
            }
        }
        // The player has just finished playing and will stop.
    }
    async function setPlayFinished(){
        let newVideoState = videoState
        newVideoState[videoName] = true
        AsyncStorage.setItem("videoState", JSON.stringify(newVideoState))
    }
    // const _videoRef = useRef()
    // const showVideoInFullscreen = async () => { await _videoRef.current.presentFullscreenPlayer() }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{moduleDescription}</Text>
                        <Video
                            ref = {_videoRef}
                            source={{uri: videoURL}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            useNativeControls={true}
                            onFullscreenUpdate={onFullscreenUpdate}
                            onPlaybackStatusUpdate= {(playbackStatus) => _onPlaybackStatusUpdate(playbackStatus)}
                            style={{ width: 250, height: 150 }}
                        />
                        
                        {/* <Button title="Play video" onPress={showVideoInFullscreen} /> */}
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1a056b" }}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.textStyle}>Close Video</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={quizmodal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>You just finished watching this video. Do you want to take the quiz for it?</Text>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1a056b", margin: 10 }}
                            onPress={() => {
                                setPlayFinished()
                                setquizModal(!quizmodal)
                                navigate(quizName)
                            }}
                        >
                            <Text style={styles.textStyle}>Take the quiz now</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#1a056b" }}
                            onPress={() => {
                                setPlayFinished()
                                setquizModal(!quizmodal)
                            }}
                        >
                            <Text style={styles.textStyle}>Take the quiz later</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity 
                onPress={()=>{
                    setModalVisible(!modalVisible)
                    fullscreen()
                }}
                style = {buttonStyle}
                >
                    <Image source={imageIcon} style={imageStyle}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: "#1a056b",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        top: 10,

      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: '#1a056b'
    },
})
  
export default Module