// import React, { Component } from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   Image,
//   Animated,
// } from 'react-native'
// import { PinchGestureHandler, State } from 'react-native-gesture-handler'
// import PinchZoomView from 'react-native-pinch-zoom-view'
// import { Value } from 'react-native-reanimated'
// import Header from './Header'

// export default class ViewImageModal extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visible: false,
//       title: 'Image',
//       url: '',
//     }
//     this.scale = new Animated.Value(1)
//   }

//   show(url, title = 'Image') {
//     this.setState({ title, url, visible: true })
//   }

//   render() {
//     const { visible, title, url } = this.state

//     return (
//       <Modal
//         visible={visible}
//         animationType="fade"
//         onRequestClose={() => this.setState({ visible: false })}
//       >
//         <View style={{ flex: 1 }}>
//           <Header
//             title={title}
//             Limg={require('assets/img/back_icon.png')}
//             Lpress={() => this.setState({ visible: false })}
//           />
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               padding: 15,
//               flex: 1,
//             }}
//           >
//             <PinchGestureHandler>
//               <Animated.Image
//                 source={url}
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   resizeMode: 'contain',
//                   transform: [{ scale: this.scale }],
//                 }}
//               />
//             </PinchGestureHandler>
//           </View>
//         </View>
//       </Modal>
//     )
//   }
// }
