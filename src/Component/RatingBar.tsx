// import React, { Component } from 'react'
// import { View, Text, TouchableOpacity, Image } from 'react-native'
// import { color } from './Styles'

// export default class RatingBar extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }

//   rating() {
//     const {
//       onChange,
//       disabled = false,
//       value = 0,
//       size = 5,
//       imageStyle,
//     } = this.props
//     let ratingBar = []
//     for (let i = 1; i <= size; i++) {
//       ratingBar.push(
//         <TouchableOpacity
//           key={i + ''}
//           disabled={disabled}
//           onPress={() => onChange && onChange(i)}
//           style={{ marginRight: size == i ? 0 : 3 }}
//         >
//           <Image
//             source={require('assets/img/rating_icon.png')}
//             style={{
//               height: 13,
//               width: 13,
//               resizeMode: 'contain',
//               tintColor: value >= i ? color.secondColor : color.lableColor,
//               ...imageStyle,
//             }}
//           />
//         </TouchableOpacity>,
//       )
//     }
//     return ratingBar
//   }

//   render() {
//     const { mainStyle } = this.props
//     return (
//       <View
//         style={{ flexDirection: 'row', alignItems: 'center', ...mainStyle }}
//       >
//         {this.rating()}
//       </View>
//     )
//   }
// }
