// import React, { Component } from 'react'
// import {
//   Animated,
//   TextInput,
//   Platform,
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   Modal,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   ScrollView,
// } from 'react-native'
// import { color, font, shadow } from './Styles'

// interface MyProps {}

// export default class SelectPipelineDetails extends Component<MyProps> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visible: false,
//       active: 'bulk',
//       title: '',
//     }
//   }

//   show() {
//     this.setState({ visible: true })
//   }

//   close() {
//     this.setState({ visible: false })
//   }

//   render() {
//     const { visible, active, title } = this.state
//     return (
//       <Modal
//         animationType="slide"
//         transparent
//         visible={visible}
//         onRequestClose={() => {
//           this.setState({ visible: false })
//         }}
//       >
//         <KeyboardAvoidingView
//           style={{ flex: 1, backgroundColor: color.lableColor }}
//           behavior={Platform.OS === 'ios' ? 'padding' : null}
//         >
//           <SafeAreaView />
//           <View style={{ flex: 1, justifyContent: 'flex-end' }}>
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={() => this.setState({ visible: false })}
//               style={{ height: '100%', width: '100%', position: 'absolute' }}
//             />
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 overflow: 'scroll',
//                 borderTopLeftRadius: 12,
//                 borderTopRightRadius: 12,
//               }}
//             >
//               {/* Header */}
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <TouchableOpacity
//                   onPress={() => this.setState({ visible: false })}
//                   style={{
//                     width: 90,
//                     height: 45,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text
//                     style={{ color: color.primeColor, fontFamily: font.reg }}
//                   >
//                     Cancel
//                   </Text>
//                 </TouchableOpacity>
//                 <Text
//                   style={{
//                     flex: 1,
//                     color: color.fontblack,
//                     fontFamily: font.semi,
//                     fontSize: 16,
//                     textAlign: 'center',
//                   }}
//                 >
//                   Select Pipeline
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => this.setState({ visible: false })}
//                   style={{
//                     width: 90,
//                     height: 45,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text
//                     style={{ color: color.primeColor, fontFamily: font.reg }}
//                   >
//                     Done
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Form */}
//               <ScrollView
//                 bounces={false}
//                 contentContainerStyle={{ paddingHorizontal: 15 }}
//               >
//                 <View style={{ paddingHorizontal: 20 }}>
//                   <View style={{ paddingVertical: 20 }}>
//                     <Text
//                       style={{
//                         fontFamily: font.reg,
//                         color: color.fontblack,
//                         fontSize: 12,
//                         marginBottom: 5,
//                       }}
//                     >
//                       Name*
//                     </Text>
//                     <Text
//                       style={{
//                         fontFamily: font.semi,
//                         color: color.fontcolor,
//                         fontSize: 15,
//                       }}
//                     >
//                       Test Content
//                     </Text>
//                   </View>

//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 20,
//                       paddingTop: 10,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img//companypipeline.png')}
//                       style={{ height: 18, width: 18, resizeMode: 'contain' }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       <Text
//                         style={{
//                           fontFamily: font.reg,
//                           color: color.fontcolor,
//                           marginBottom: 5,
//                           fontSize: 12,
//                         }}
//                       >
//                         Company
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: font.semi,
//                           color: color.fontcolor,
//                         }}
//                       >
//                         Gusskarlis
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 20,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img/AccountBoxuser.png')}
//                       style={{ height: 18, width: 18, resizeMode: 'contain' }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       {title ? (
//                         <Text
//                           style={{
//                             fontFamily: font.reg,
//                             color: color.fontcolor,
//                             fontSize: 12,
//                           }}
//                         >
//                           Title
//                         </Text>
//                       ) : null}
//                       <TextInput
//                         placeholder="Enter Title"
//                         style={{ fontFamily: font.reg, color: '#000' }}
//                         placeholderTextColor={color.lableColor}
//                         value={title}
//                         onChangeText={(title) => this.setState({ title })}
//                       />
//                     </View>
//                   </View>

//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 20,
//                       paddingTop: 10,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img/contacttype.png')}
//                       style={{ height: 18, width: 18, resizeMode: 'contain' }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       <Text
//                         style={{
//                           fontFamily: font.reg,
//                           color: color.fontcolor,
//                           marginBottom: 5,
//                           fontSize: 12,
//                         }}
//                       >
//                         Contact Type
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: font.semi,
//                           color: color.fontcolor,
//                         }}
//                       >
//                         Potential Customer
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 20,
//                       paddingTop: 10,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img/mailsetting.png')}
//                       style={{
//                         height: 18,
//                         width: 18,
//                         resizeMode: 'contain',
//                         tintColor: '#E04347',
//                       }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       <Text
//                         style={{
//                           fontFamily: font.reg,
//                           color: color.fontblack,
//                           marginBottom: 5,
//                           fontSize: 12,
//                         }}
//                       >
//                         Work Email
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: font.semi,
//                           color: color.fontblack,
//                         }}
//                       >
//                         gus@gusskarlis.com
//                       </Text>
//                     </View>
//                     <Image
//                       source={require('assets/img/cancle_icon.png')}
//                       style={{
//                         height: 15,
//                         width: 15,
//                         resizeMode: 'contain',
//                         tintColor: 'rgba(58, 53, 65, 0.54)',
//                       }}
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{
//                       fontFamily: font.semi,
//                       color: '#9E69FD',
//                       fontSize: 12,
//                       paddingBottom: 10,
//                       marginLeft: 38,
//                     }}
//                   >
//                     ADD ANOTHER EMAIL ADDRESS
//                   </Text>
//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 20,
//                       paddingTop: 10,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img/call.png')}
//                       style={{
//                         height: 18,
//                         width: 18,
//                         resizeMode: 'contain',
//                         tintColor: '#E09E00',
//                       }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       <Text
//                         style={{
//                           fontFamily: font.reg,
//                           color: color.fontblack,
//                           marginBottom: 5,
//                           fontSize: 12,
//                         }}
//                       >
//                         Mobile Phone
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: font.semi,
//                           color: color.fontblack,
//                         }}
//                       >
//                         55876544222
//                       </Text>
//                     </View>
//                     <Image
//                       source={require('assets/img/cancle_icon.png')}
//                       style={{
//                         height: 15,
//                         width: 15,
//                         resizeMode: 'contain',
//                         tintColor: 'rgba(58, 53, 65, 0.54)',
//                       }}
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{
//                       fontFamily: font.semi,
//                       color: '#9E69FD',
//                       fontSize: 12,
//                       paddingBottom: 10,
//                       marginLeft: 38,
//                     }}
//                   >
//                     ADD ANOTHER PHONE NUMBER
//                   </Text>
//                   <TouchableOpacity
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingBottom: 35,
//                       paddingTop: 10,
//                     }}
//                   >
//                     <Image
//                       source={require('assets/img/workuser.png')}
//                       style={{
//                         height: 18,
//                         width: 18,
//                         resizeMode: 'contain',
//                         tintColor: '#0E71A3',
//                       }}
//                     />
//                     <View style={{ marginLeft: 20, flex: 1 }}>
//                       <Text
//                         style={{
//                           fontFamily: font.reg,
//                           color: color.fontblack,
//                           marginBottom: 5,
//                           fontSize: 12,
//                         }}
//                       >
//                         Work Website
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: font.semi,
//                           color: color.fontblack,
//                         }}
//                       >
//                         Gusskarlis.com
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//               <View
//                 borderColor={color.borderColor}
//                 style={{
//                   borderTopWidth: 1,
//                   backgroundColor: '#ffff',
//                   alignItems: 'flex-end',
//                 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     justifyContent: 'center',
//                     height: 60,
//                     paddingHorizontal: 20,
//                   }}
//                 >
//                   <Text style={{ fontFamily: font.reg, color: '#E04347' }}>
//                     Delete
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <SafeAreaView />
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>
//     )
//   }
// }
