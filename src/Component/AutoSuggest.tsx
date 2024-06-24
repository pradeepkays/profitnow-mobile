// import React, { Component } from 'react'
// import { View, Text, FlatList, TextInput } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// export default class AutoSuggest extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       result: [],
//     }
//   }

//   async searchFilterFunction(texts) {
//     const { terms, onChangeText, value } = await this.props
//     await onChangeText(texts)

//     if (this.props.value) {
//       const newData = await terms.filter((item) => {
//         const itemData = `${item.toUpperCase()} ${item.toUpperCase()}`

//         const textData = texts.toUpperCase()

//         return itemData.indexOf(textData) > -1
//       })

//       this.setState({ result: newData })
//     } else {
//       this.setState({ result: [] })
//     }
//   }

//   render() {
//     const { result } = this.state
//     const { value, onChangeText } = this.props
//     return (
//       <View style={{ zIndex: 999 }}>
//         <TextInput
//           style={{ backgroundColor: '#fff', fontSize: 16 }}
//           placeholder="Enter"
//           value={value}
//           onChangeText={(texts) => this.searchFilterFunction(texts)}
//           onEndEditing={() => this.setState({ result: [] })}
//           onBlur={() => this.setState({ result: [] })}
//         />

//         <View style={{ zIndex: 999 }}>
//           <FlatList
//             contentContainerStyle={{
//               zIndex: 1000,
//               width: '100%',
//               backgroundColor: '#fff',
//             }}
//             style={{ position: 'absolute', width: '100%' }}
//             data={result}
//             renderItem={({ item, index }) => (
//               <TouchableOpacity
//                 activeOpacity={0.9}
//                 style={{
//                   zIndex: 1111,
//                   paddingVertical: 8,
//                   borderBottomWidth: 1,
//                 }}
//                 onPress={() =>
//                   this.setState({ result: [] }, () => onChangeText(item))
//                 }
//               >
//                 <Text>{item.name}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </View>
//     )
//   }
// }
