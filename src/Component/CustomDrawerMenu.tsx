// import React, { Component } from 'react'
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Modal,
//   SafeAreaView,
//   Share,
//   TouchableWithoutFeedback,
//   Platform,
// } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import DeviceInfo from 'react-native-device-info'
// import CustomAlert from './CustomAlert'
// import { font, color, shadow } from './Styles'
// import { User } from '../Privet'
// import Global from '../Global'

// export default class CustomDrawerMenu extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       logoutVisible: false,
//     }
//   }

//   componentDidMount() {}

//   onPress(key) {
//     if (key) {
//       this.props.props.navigation.navigate(key)
//       this.props.props.navigation.closeDrawer()
//     }
//   }

//   async logout() {
//     await this.props.props.navigation.closeDrawer()
//     await Global.main.setState({ user_id: '', username: '' })
//     await AsyncStorage.clear()
//     await this.props.props.navigation.navigate('Login')
//   }

//   render() {
//     const { logoutVisible } = this.state
//     const { props } = this.props
//     const routes =
//       this.props.props.navigation.state.routes[
//         [props.navigation.state.routes.length - 1]
//       ].routes
//     const routeName = routes[routes.length - 1].routeName

//     return (
//       <View style={{ flex: 1, backgroundColor: '#fff' }}>
//         <SafeAreaView style={{ backgroundColor: '#fff' }} />

//         <View
//           style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
//         >
//           <View
//             style={{
//               height: 85,
//               width: 85,
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginRight: 15,
//               backgroundColor: color.primeColor,
//               borderRadius: 200,
//             }}
//           >
//             <Image
//               source={require('assets/img/logo.png')}
//               style={{
//                 height: '80%',
//                 width: '80%',
//                 borderRadius: 200,
//                 resizeMode: 'contain',
//                 tintColor: '#fff',
//               }}
//             />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text
//               numberOfLines={1}
//               style={{ fontFamily: font.bold, fontSize: 17 }}
//             >
//               {Global.main.state.username}
//             </Text>
//           </View>
//         </View>

//         <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
//           <View style={{ flex: 1 }}>
//             {/* Dashboard */}
//             <TouchableOpacity
//               onPress={() => this.onPress('Home')}
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginBottom: 12,
//               }}
//             >
//               <View
//                 style={{
//                   backgroundColor:
//                     routeName === 'Home' ? color.primeColor_op_10 : '#0000',
//                   paddingVertical: 8,
//                   paddingLeft: 20,
//                   paddingRight: 18,
//                   borderTopRightRadius: 50,
//                   borderBottomRightRadius: 50,
//                   marginRight: 12,
//                 }}
//               >
//                 <Image
//                   source={require('assets/img/Home.png')}
//                   style={{
//                     width: 21,
//                     height: 21,
//                     resizeMode: 'contain',
//                     tintColor:
//                       routeName === 'Home'
//                         ? color.primeColor
//                         : color.lableColor,
//                   }}
//                 />
//               </View>
//               <Text
//                 style={{
//                   fontFamily: font.mid,
//                   fontSize: 16,
//                   color: routeName === 'Home' ? color.primeColor : '#000',
//                 }}
//               >
//                 Home
//               </Text>
//             </TouchableOpacity>

//             {/* Logour */}
//             <TouchableOpacity
//               onPress={() =>
//                 this.refs.CustomAlert.onShow(
//                   'Are you sure you want to logout!',
//                   'Logout',
//                 )
//               }
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginBottom: 12,
//               }}
//             >
//               <View
//                 style={{
//                   backgroundColor:
//                     routeName === 'Logout'
//                       ? color.primeColor_op_10
//                       : color.red_op_10,
//                   paddingVertical: 8,
//                   paddingLeft: 20,
//                   paddingRight: 18,
//                   borderTopRightRadius: 50,
//                   borderBottomRightRadius: 50,
//                   marginRight: 12,
//                 }}
//               >
//                 <Image
//                   source={require('assets/img/logout.png')}
//                   style={{
//                     width: 21,
//                     height: 21,
//                     resizeMode: 'contain',
//                     tintColor:
//                       routeName === 'Logout' ? color.primeColor : color.red,
//                   }}
//                 />
//               </View>
//               <Text
//                 style={{
//                   fontFamily: font.mid,
//                   fontSize: 16,
//                   color: routeName === 'Logout' ? color.primeColor : '#000',
//                 }}
//               >
//                 Logout
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <Text
//             numberOfLines={1}
//             style={{
//               fontFamily: font.reg,
//               textAlign: 'center',
//               paddingVertical: 15,
//             }}
//           >
//             {DeviceInfo.getVersion()}
//           </Text>
//         </ScrollView>
//         <CustomAlert ref="CustomAlert" onPressOk={() => this.logout()} cancel />
//       </View>
//     )
//   }
// }
