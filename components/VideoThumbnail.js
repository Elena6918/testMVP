import React from "react"
import { StyleSheet } from "react-native"
import { Thumbnail } from "react-native-thumbnail-video"

const VideoThumbnail = ({ videoURL, width }) => {
  return <Thumbnail url={videoURL} imageWidth={width} imageHeight={100} />
}

const styles = StyleSheet.create({})

export default VideoThumbnail
