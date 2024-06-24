// import React, { Component } from 'react'
// import {
//   Image,
//   Linking,
//   Modal,
//   Platform,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native'

// import { getAppstoreAppMetadata } from 'react-native-appstore-version-checker'
// import DeviceInfo from 'react-native-device-info'

// import { color, font } from './Styles'

// interface MyProps {
//   cancle: Boolean
// }

// export default class AppUpdateAlert extends Component<MyProps> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visible: false,
//       newVersion: '',
//     }
//   }

//   componentDidMount() {
//     const appVersion = DeviceInfo.getVersion()
//     const bundleId = DeviceInfo.getBundleId()

//     getAppstoreAppMetadata(Platform.OS === 'ios' ? '1571431954' : bundleId)
//       .then((metadata) => {
//         if (parseFloat(appVersion) < parseFloat(metadata.version)) {
//           console.log('error occurred', metadata)
//           this.setState({ newVersion: metadata.version, visible: true })
//         }
//       })
//       .catch((err) => {
//         console.log('error occurred', err)
//       })
//   }

//   render() {
//     const { visible, newVersion } = this.state
//     const { cancle = false } = this.props
//     return (
//       <View>
//         <Modal visible={visible} animationType="fade">
//           <View
//             style={{ flex: 1, paddingHorizontal: 15, justifyContent: 'center' }}
//           >
//             <SafeAreaView />
//             <Image
//               source={require('assets/img/login_footer.png')}
//               style={{
//                 position: 'absolute',
//                 top: -10,
//                 right: 0,
//                 width: '100%',
//                 height: 150,
//                 resizeMode: 'stretch',
//                 tintColor: color.primeColor,
//                 transform: [{ rotate: '180deg' }],
//               }}
//             />
//             <Image
//               source={require('assets/img/login_footer.png')}
//               style={{
//                 position: 'absolute',
//                 bottom: -10,
//                 width: '100%',
//                 height: 150,
//                 resizeMode: 'stretch',
//                 tintColor: color.primeColor,
//               }}
//             />

//             <Text
//               style={{
//                 fontFamily: font.bold,
//                 fontSize: 18,
//                 color: '#000',
//                 textAlign: 'center',
//               }}
//             >
//               New Version {newVersion} Available!
//             </Text>

//             <Image
//               source={require('assets/img/logo.png')}
//               style={{
//                 height: 60,
//                 resizeMode: 'contain',
//                 width: '80%',
//                 alignSelf: 'center',
//                 marginVertical: 30,
//               }}
//             />

//             <Text
//               style={{
//                 textAlign: 'center',
//                 marginBottom: 20,
//                 fontFamily: font.reg,
//               }}
//             >
//               Hey, seems you're using older version of the application. Kindly
//               update to greater version.
//             </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 Linking.openURL(
//                   Platform.OS === 'ios'
//                     ? 'itms-apps://itunes.apple.com/us/app/id1571431954?mt=8'
//                     : 'https://play.google.com/store/apps/details?id=' +
//                         DeviceInfo.getBundleId(),
//                 )
//               }
//               style={{
//                 marginTop: 20,
//                 alignSelf: 'center',
//                 height: 35,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 paddingHorizontal: 30,
//                 backgroundColor: color.primeColor,
//                 borderRadius: 50,
//               }}
//             >
//               <Text
//                 style={{ fontFamily: font.bold, color: '#fff', fontSize: 16 }}
//               >
//                 UPDATE
//               </Text>
//             </TouchableOpacity>

//             {cancle && (
//               <TouchableOpacity
//                 style={{ alignSelf: 'center', padding: 10, marginTop: 20 }}
//               >
//                 <Text
//                   style={{ fontFamily: font.bold, color: color.lableColor }}
//                 >
//                   SKIP
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </Modal>
//       </View>
//     )
//   }
// }
