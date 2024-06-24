// import React, { Component } from 'react'
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   SafeAreaView,
//   Platform,
//   TouchableWithoutFeedback,
//   Image,
//   FlatList,
//   TextInput,
//   KeyboardAvoidingView,
// } from 'react-native'
// import { color, font } from './Styles'
// import * as Animatable from 'react-native-animatable'

// export default class BottomSheetMultiSelect extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       visible: false,
//       text: '',
//       filteredData: [],
//       texts: null,
//       data: this.props.data,
//       selected: this.props.selected,
//     }
//     this.handleViewRef = (ref) => (this.view = ref)
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.data) {
//       this.setState({ data: nextProps.data })
//     }
//     if (nextProps.selected) {
//       this.setState({ selected: nextProps.selected })
//     }
//   }

//   onPress() {
//     this.setState({ visible: true }, () =>
//       this.view.fadeInUpBig(1000).then((endState) => {}),
//     )
//   }

//   onSelect(item, index) {
//     const newArray = this.state.data
//     newArray[index].isSelect = this.state.data[index].isSelect ? false : true
//     this.setState({ data: newArray })
//   }

//   onSubmit() {
//     this.view.fadeOutDown(250).then((endState) => {
//       this.setState(
//         {
//           selected: this.state.data.filter((el) => el.isSelect === true),
//           visible: false,
//         },
//         () => {
//           let item = ''
//           for (let i = 0; i < this.state.selected.length; i++) {
//             item = item + ',' + this.state.selected[i].id
//           }
//           this.props.onSelect
//             ? this.props.onSelect(item.substr(1), this.state.selected)
//             : null
//         },
//       )
//     })
//   }

//   render() {
//     const { visible, texts, data = [], selected = [] } = this.state
//     const {
//       value,
//       textStyle,
//       placeholder = 'Select',
//       searchBar = false,
//       contentStyle,
//     } = this.props
//     return (
//       <View>
//         <TouchableOpacity
//           // disabled={data.length != 0 ? false : true}
//           onPress={() => this.onPress()}
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             paddingVertical: 12,
//           }}
//         >
//           {/* {value ?
//                         <Text style={{ fontFamily: font.reg, }}>{value}</Text>
//                         :
//                         <Text style={{ fontFamily: font.reg, color: color.lableColor, }}>{placeholder}</Text>
//                     } */}
//           {selected.length != 0 ? (
//             <FlatList
//               contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
//               data={selected}
//               renderItem={({ item, index }) =>
//                 item.isSelect ? (
//                   <View
//                     borderColor={color.primeColor}
//                     style={{
//                       borderRadius: 25,
//                       marginRight: 10,
//                       marginVertical: 5,
//                       paddingVertical: 5,
//                       paddingHorizontal: 15,
//                       borderWidth: 1,
//                     }}
//                   >
//                     <Text
//                       style={{ fontFamily: font.reg, color: color.primeColor }}
//                     >
//                       {item.name}
//                     </Text>
//                   </View>
//                 ) : null
//               }
//             />
//           ) : (
//             <Text style={{ fontFamily: font.reg, color: color.lableColor }}>
//               {placeholder}
//             </Text>
//           )}
//           <Image
//             source={require('assets/down_arrow_icon.png')}
//             style={{ height: 17, width: 17, resizeMode: 'contain' }}
//           />
//         </TouchableOpacity>

//         <Modal
//           transparent
//           animationType="fade"
//           visible={visible}
//           onRequestClose={() =>
//             this.view
//               .fadeOutDown(200)
//               .then((endState) =>
//                 this.setState({
//                   visible: false,
//                   texts: null,
//                   data: this.props.data,
//                 }),
//               )
//           }
//         >
//           <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           >
//             <SafeAreaView style={{ backgroundColor: '#0000' }} />
//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={() =>
//                 this.view
//                   .fadeOutDown(200)
//                   .then((endState) =>
//                     this.setState({
//                       visible: false,
//                       texts: null,
//                       data: this.props.data,
//                     }),
//                   )
//               }
//               style={{
//                 flex: 1,
//                 backgroundColor: '#0000',
//                 justifyContent: 'flex-end',
//               }}
//             >
//               <TouchableWithoutFeedback>
//                 <Animatable.View
//                   ref={this.handleViewRef}
//                   style={{
//                     backgroundColor: '#fff',
//                     overflow: 'scroll',
//                     borderTopLeftRadius: 8,
//                     borderTopRightRadius: 8,
//                   }}
//                 >
//                   {searchBar ? (
//                     <View
//                       style={{
//                         backgroundColor: color.orenge,
//                         borderTopLeftRadius: 8,
//                         borderTopRightRadius: 8,
//                         paddingVertical: 12,
//                         paddingHorizontal: 12,
//                         alignItems: 'center',
//                       }}
//                     >
//                       <View
//                         style={{ flexDirection: 'row', alignItems: 'center' }}
//                       >
//                         <Image
//                           source={require('assets/Search_icon.png')}
//                           style={{
//                             height: 20,
//                             width: 20,
//                             resizeMode: 'contain',
//                             tintColor: '#fff',
//                             marginRight: 8,
//                           }}
//                         />
//                         <TextInput
//                           style={{
//                             padding: 0,
//                             flex: 1,
//                             fontFamily: font.bold,
//                             marginTop: 0,
//                             color: '#fff',
//                             fontSize: 17,
//                           }}
//                           placeholder="Search here..."
//                           placeholderTextColor="#fff9"
//                           value={texts}
//                           onChangeText={(texts) =>
//                             this.searchFilterFunction(texts)
//                           }
//                         />
//                       </View>
//                     </View>
//                   ) : (
//                     <View
//                       style={{
//                         backgroundColor: color.orenge,
//                         borderTopLeftRadius: 8,
//                         borderTopRightRadius: 8,
//                         paddingVertical: 12,
//                         paddingHorizontal: 12,
//                         alignItems: 'center',
//                       }}
//                     >
//                       <View
//                         style={{ flexDirection: 'row', alignItems: 'center' }}
//                       >
//                         <Text
//                           style={[
//                             {
//                               flex: 1,
//                               padding: 0,
//                               color: '#fff',
//                               fontFamily: font.bold,
//                               fontSize: 17,
//                             },
//                             textStyle,
//                           ]}
//                         >
//                           {placeholder}
//                         </Text>
//                         <TouchableOpacity
//                           onPress={() =>
//                             this.view
//                               .fadeOutDown(200)
//                               .then((endState) =>
//                                 this.setState({
//                                   visible: false,
//                                   texts: null,
//                                   data: this.props.data,
//                                 }),
//                               )
//                           }
//                         >
//                           <Image
//                             source={require('assets/close_icon.png')}
//                             style={{
//                               height: 22,
//                               width: 22,
//                               resizeMode: 'contain',
//                               tintColor: '#fff',
//                             }}
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   )}
//                   {data.length != 0 ? (
//                     <View>
//                       <FlatList
//                         contentContainerStyle={{
//                           paddingBottom: 30,
//                           paddingHorizontal: 12,
//                         }}
//                         data={data}
//                         renderItem={({ item, index }) => (
//                           <TouchableOpacity
//                             key={index + ''}
//                             onPress={() => this.onSelect(item, index)}
//                             style={{
//                               paddingVertical: 10,
//                               borderBottomWidth: 1,
//                               borderColor: color.borderColor,
//                               justifyContent: 'space-between',
//                               flexDirection: 'row',
//                               alignItems: 'center',
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 fontFamily: font.reg,
//                                 color: item.isSelect
//                                   ? color.orenge_light
//                                   : '#000',
//                               }}
//                             >
//                               {item.name}
//                             </Text>
//                             <Image
//                               source={
//                                 !item.isSelect
//                                   ? require('assets/plus_icon.png')
//                                   : require('assets/minus_icon.png')
//                               }
//                               style={{
//                                 resizeMode: 'contain',
//                                 height: 18,
//                                 width: 18,
//                                 resizeMode: 'contain',
//                               }}
//                             />
//                           </TouchableOpacity>
//                         )}
//                       />
//                       <TouchableOpacity
//                         onPress={() => this.onSubmit()}
//                         style={{
//                           marginBottom: 20,
//                           backgroundColor: color.primeColor_op_20,
//                           alignSelf: 'center',
//                           borderRadius: 25,
//                           marginTop: 20,
//                           paddingHorizontal: 30,
//                           paddingVertical: 7,
//                         }}
//                       >
//                         <Text
//                           style={{
//                             fontFamily: font.bold,
//                             color: color.primeColor,
//                             fontSize: 16,
//                           }}
//                         >
//                           SUBMIT
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <View
//                       style={{
//                         backgroundColor: '#fff',
//                         height: 100,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Text
//                         style={{ fontFamily: font.reg, textAlign: 'center' }}
//                       >
//                         Oops, No results found
//                       </Text>
//                     </View>
//                   )}
//                 </Animatable.View>
//               </TouchableWithoutFeedback>
//             </TouchableOpacity>
//           </KeyboardAvoidingView>
//         </Modal>
//       </View>
//     )
//   }
// }
