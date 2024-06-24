// import React, { Component } from 'react';
// import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import { color, font, shadow } from './Styles';

// interface MyProps {
//     option: ImagePicker,
//     onSelect: Funcation,
// }

// class ImagePickerCustom extends Component<MyProps>{
//     constructor(props) {
//         super(props);
//         this.state = {
//             visible: false,
//             image: [],
//             isPhotoFor: ''
//         };
//     }

//     show(isPhotoFor = '') {
//         this.setState({ visible: true, image: [], isPhotoFor })
//     }

//     selectPhoto(value) {
//         const { isPhotoFor } = this.state;
//         const { onSelect, option, } = this.props;

//         let height_width = {};

//         if (isPhotoFor === 'profile') {
//             height_width = {
//                 width: 300,
//                 height: 300
//             }
//         } else if (isPhotoFor === 'card') {
//             height_width = {
//                 width: 300,
//                 height: 180
//             }
//         }

//         if (value === 'take') {
//             ImagePicker.openCamera({
//                 cropperStatusBarColor: "#000000",
//                 cropping: true,
//                 compressImageQuality: .4, ...height_width, ...option
//             }).then(image => {
//                 onSelect && onSelect(image, isPhotoFor);
//                 this.setState({ visible: false });
//             });
//         } else {
//             ImagePicker.openPicker({
//                 mediaType: 'photo',
//                 cropperStatusBarColor: "#000000",
//                 cropping: true,
//                 compressImageQuality: .4, ...height_width, ...option
//             }).then(image => {
//                 onSelect && onSelect(image, isPhotoFor);
//                 this.setState({ visible: false });
//             })
//                 .catch(r => console.log(e));
//         }
//     }

//     render() {
//         const { visible } = this.state;
//         return (
//             <Modal
//                 transparent
//                 animationType="fade"
//                 visible={visible}
//                 onRequestClose={() => this.setState({ visible: false })}
//             >
//                 <TouchableOpacity onPress={() => this.setState({ visible: false })} activeOpacity={1} style={{ flex: 1, backgroundColor: '#0003', justifyContent: 'center', paddingHorizontal: 15 }}>
//                     <TouchableWithoutFeedback>
//                         <View>
//                             <View style={{ padding: 15, ...shadow, borderRadius: 8, }}>
//                                 <View borderColor={color.primeColor} style={{ borderWidth: 1, borderRadius: 8, marginBottom: 15 }}>
//                                     <TouchableOpacity onPress={() => this.selectPhoto('choose')} style={{ alignItems: 'center', height: 35, justifyContent: 'center' }}>
//                                         <Text style={{ fontFamily: font.bold, textAlign: 'center', color: color.primeColor }}>Choose to Gallery</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <View borderColor={color.primeColor} style={{ borderWidth: 1, borderRadius: 8 }}>
//                                     <TouchableOpacity onPress={() => this.selectPhoto('take')} style={{ alignItems: 'center', height: 35, justifyContent: 'center' }}>
//                                         <Text style={{ fontFamily: font.bold, textAlign: 'center', color: color.primeColor }}>Take Photo</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                             <View style={{ ...shadow, borderRadius: 8, marginTop: 15 }}>
//                                 <TouchableOpacity onPress={() => this.setState({ visible: false })} style={{ alignItems: 'center', height: 35, justifyContent: 'center' }}>
//                                     <Text style={{ fontFamily: font.bold, textAlign: 'center', color: color.red }}>Cancel</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </TouchableOpacity>
//             </Modal>
//         );
//     }
// }
// export default ImagePickerCustom
