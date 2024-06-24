// import React, { Component } from 'react';
// import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { color, font, shadow } from './Styles';

// export default class SweetAlert extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//         };
//     }

//     componentDidMount() {
//         // this.setState({ visible: true }, () => this.refs.View.bounceIn(1500));
//     }

//     show() {
//         this.setState({ visible: true }, () => this.refs.View.bounceIn(1500));
//     }

//     close() {
//         this.setState({ visible: false })
//     }

//     render() {
//         const { visible } = this.state;
//         const { children } = this.props;
//         return (
//             <Modal
//                 animationType="fade"
//                 visible={visible}
//                 transparent
//                 onRequestClose={() => this.setState({ visible: false })}>
//                 <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ visible: false })} style={{ flex: 1, backgroundColor: '#0008', paddingHorizontal: 15, justifyContent: 'center' }}>
//                     <TouchableWithoutFeedback>
//                         <Animatable.View ref="View" style={{ backgroundColor: '#fff', borderRadius: 8 }}>
//                             {children}
//                         </Animatable.View>
//                     </TouchableWithoutFeedback>
//                 </TouchableOpacity>
//             </Modal>
//         );
//     }
// }
