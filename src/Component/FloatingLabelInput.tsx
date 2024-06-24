// import React, { Component } from 'react'
// import {
//   Animated,
//   Platform,
//   Text,
//   TextInput,
//   TextInputProps,
//   View,
//   ViewProps,
// } from 'react-native'

// // import PropTypes from 'prop-types';
// import { color, font } from './Styles'

// interface MyProps extends TextInputProps {
//   label: String
//   viewStyle: ViewProps
// }

// class FloatingLabelInput extends Component<MyProps> {
//   state = {
//     isFocused: false,
//   }

//   componentWillMount() {
//     this._animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0)
//   }

//   handleFocus = () => {
//     const { onFocus } = this.props
//     onFocus && onFocus()
//     this.setState({ isFocused: true })
//   }
//   handleBlur = () => {
//     const { onBlur } = this.props
//     onBlur && onBlur()
//     this.setState({ isFocused: false })
//   }

//   componentDidUpdate() {
//     Animated.timing(this._animatedIsFocused, {
//       toValue: this.state.isFocused || this.props.value ? 1 : 0,
//       duration: 200,
//     }).start()
//   }

//   render() {
//     const { label, viewStyle, ...props } = this.props
//     const labelStyle = {
//       position: 'absolute',
//       left: 10,
//       top: this._animatedIsFocused.interpolate({
//         inputRange: [0, 1],
//         outputRange: [9, -8],
//       }),
//       fontSize: this._animatedIsFocused.interpolate({
//         inputRange: [0, 1],
//         outputRange: [14, 11.5],
//       }),
//       color: this._animatedIsFocused.interpolate({
//         inputRange: [0, 1],
//         outputRange: [color.lableColor, '#000'],
//       }),
//       paddingHorizontal: this._animatedIsFocused.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 2],
//       }),
//     }
//     return (
//       <View
//         style={{
//           borderWidth: 1,
//           justifyContent: 'center',
//           borderRadius: 8,
//           marginHorizontal: 15,
//           marginTop: 8,
//           ...viewStyle,
//         }}
//       >
//         <Animated.Text
//           style={{
//             ...labelStyle,
//             backgroundColor:
//               this.state.isFocused || this.props.value ? '#fff' : '#0000',
//             fontFamily:
//               this.state.isFocused || this.props.value ? font.bold : font.reg,
//             marginTop: Platform.OS === 'ios' ? 0 : -3,
//           }}
//         >
//           {label}
//         </Animated.Text>
//         <TextInput
//           fontFamily={font.reg}
//           blurOnSubmit
//           {...props}
//           style={{
//             height: 35,
//             color: '#000',
//             paddingHorizontal: 12,
//             ...props.style,
//           }}
//           onFocus={this.handleFocus}
//           onBlur={this.handleBlur}
//         />
//       </View>
//     )
//   }
// }

// export default FloatingLabelInput
