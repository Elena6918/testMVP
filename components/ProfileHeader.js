import React from "react"
import Svg, { Path } from "react-native-svg"
import { View,Dimensions } from 'react-native';


export default function WaveHeader({ customStyles }) {
    return (
      <View style={customStyles}>
        <View style={{ backgroundColor: '#000b76', height: 90, width:Dimensions.get('screen').width }}>
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 1440 300"
            style={{ position: 'absolute', top: 80 }}
          >
            <Path
              fill="#000b76"
              d="M0,256L80,229.3C160,203,320,149,480,149.3C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    );
  }
// function WaveHeader() {
//   return (
//     <Svg 
//         viewBox="0 0 1440 320" 
//         height="20%"
//         width="100%"
//     >
//       <Path
//         fill="#000b76"
//         d="M0 256l80-26.7c80-26.3 240-80.3 400-80C640 149 800 203 960 208s320-37 400-58.7l80-21.3V0H0z"
//       />
//     </Svg>
//   )
// }

// export default WaveHeader

// class WaveHeader extends Component{
//     render(){
//         const { style } = this.props;
//         const component = Wave(style);

//         return <View style={style}>{component}</View>;
        // <SafeAreaView>
        //     <View style={styles.container}>
        //         <TouchableOpacity style={styles.icon} onPress={()=>{alert("you clicked me")}}>
        //             <Ionicons name="ios-settings" size={35} color="black" />
        //         </TouchableOpacity>
        //     </View>
        // </SafeAreaView>
//     }
// }

// const styles = StyleSheet.create({
//     container: {
// 		flex: 1,
// 		flexDirection: 'column',
// 		justifyContent: 'center', 
// 		alignItems: 'center'
// 	},
    // container:{
    //     // padding: 5,
    //     // flexDirection: "row-reverse",
    //     // justifyContent: "space-between",
    //     // alignItems: "center",
    //     // backgroundColor: "grey"
    // },
//     icon:{

//     }

// })

// export default WaveHeader