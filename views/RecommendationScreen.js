import React, { useState } from "react"
import { StyleSheet, Dimensions, View } from "react-native"
import { Text, Button } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import VideoThumbnail from "../components/VideoThumbnail"

const RecommendationScreen = () => {
  const sampleThumbnailInfo = {
    uri: "https://youtu.be/DxIDKZHW3-E",
    time: 0
  }

  const windowWidth = Dimensions.get("window").width
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <Text style={styles.title}> Recommendation screen </Text>
      </View>

      <View style={styles.recommendationRow}>
        <View style={{ padding: windowWidth * 0.05 }}>
          <VideoThumbnail
            videoURL={sampleThumbnailInfo.uri}
            width={0.4 * windowWidth}
          />
        </View>
        <View style={{ padding: windowWidth * 0.05 }}>
          <Button title="Enroll" />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Other Modules and Courses</Text>
        <View style={styles.recommendationRow}>
          <VideoThumbnail
            videoURL={sampleThumbnailInfo.uri}
            width={0.4 * windowWidth}
          />
          <VideoThumbnail
            videoURL={sampleThumbnailInfo.uri}
            width={0.4 * windowWidth}
          />
        </View>
        <View style={styles.recommendationRow}>
          <VideoThumbnail
            videoURL={sampleThumbnailInfo.uri}
            width={0.4 * windowWidth}
          />
          <VideoThumbnail
            videoURL={sampleThumbnailInfo.uri}
            width={0.4 * windowWidth}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontSize: 24
  },
  recommendationRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16
  }
})

export default RecommendationScreen
