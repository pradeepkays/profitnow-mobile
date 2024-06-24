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
// import SelectPipelineDetails from './SelectPipelineDetails'
// import { color, font } from './Styles'

// interface MyProps {}

// export default class SelectPipeline extends Component<MyProps> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visible: false,
//       active: 'bulk',
//     }
//   }

//   show() {
//     this.setState({ visible: true })
//   }

//   close() {
//     this.setState({ visible: false })
//   }

//   render() {
//     const { visible, active } = this.state
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
//                   ></Text>
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
//                   onPress={() => this.SelectPipelineDetails.show()}
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
//                 <View
//                   style={{
//                     paddingHorizontal: 20,
//                     paddingBottom: 20,
//                     paddingTop: 20,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'bulk' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'bulk' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Bulk Data
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Business' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Business' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Business List Direct
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'CRM' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'CRM' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       CRM
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Feedback' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Feedback' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Feedback Leads
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Inbox' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Inbox' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Inbox Delivered
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Instant' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Instant' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Instant Referrals
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() =>
//                       this.setState({ active: 'InstantReferrals' })
//                     }
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'InstantReferrals' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       InstantReferrals – Clients
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'MarketingDirect' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'MarketingDirect' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Marketing List Direct
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'MarketingPro' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'MarketingPro' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Marketing List Pro
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Software' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Software' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Marketing List Software
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'PushButton' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'PushButton' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       PushButton
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Campaigns' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Campaigns' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       PushButton Campaigns
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'PushButtonCRM' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'PushButtonCRM' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       PushButtonCRM
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Quick' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Quick' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Quick Business List
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Video' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Video' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Software Demo Video
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => this.setState({ active: 'Development' })}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       paddingVertical: 10,
//                     }}
//                   >
//                     {active === 'Development' ? (
//                       <Image
//                         source={require('assets/img/rightprime.png')}
//                         style={{ height: 22, width: 22, resizeMode: 'contain' }}
//                       />
//                     ) : (
//                       <View style={{ height: 22, width: 22 }} />
//                     )}
//                     <Text
//                       style={{
//                         flex: 1,
//                         marginLeft: 35,
//                         color: color.fontblack,
//                         fontFamily: font.semi,
//                         fontSize: 16,
//                       }}
//                     >
//                       Software Development
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//               <SafeAreaView />
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//         <SelectPipelineDetails
//           ref={(ref) => (this.SelectPipelineDetails = ref)}
//         />
//       </Modal>
//     )
//   }
// }
