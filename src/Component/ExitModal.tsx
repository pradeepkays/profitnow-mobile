// import React, { Component } from 'react';
// import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { color, font } from './Styles';

// export default class ExitModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         const { visible, onClose, onExit } = this.props;
//         return (
//             <Modal
//                 animationType="fade"
//                 transparent
//                 visible={visible}
//                 onRequestClose={() => onClose ? onClose() : null}>
//                 <TouchableOpacity onPress={() => onClose ? onClose() : null} style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#0007', justifyContent: 'center' }}>
//                     <TouchableWithoutFeedback>
//                         <View style={{ padding: 15, backgroundColor: '#fff' }}>
//                             <Text style={{ fontFamily: font.reg, fontSize: 16 }}>Are you sure you want to exit?</Text>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
//                                 <Text onPress={() => onClose ? onClose() : null} style={{ fontFamily: font.reg, color: color.lableColor, fontSize: 15, paddingHorizontal: 15, marginRight: 15 }}>Cancel</Text>
//                                 <Text onPress={() => onExit ? onExit() : null} style={{ fontFamily: font.bold, fontSize: 15, paddingHorizontal: 15, }}>Exit</Text>
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </TouchableOpacity>
//             </Modal>
//         );
//     }
// }
