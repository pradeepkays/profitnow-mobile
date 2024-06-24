// import React, { useState } from 'react';
// import {
//     View,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     Text,
//     Keyboard,
//     FlatList,
// } from 'react-native';
// import { color, font, shadow } from './Styles';

// const CustomSelect = ({
//     disabled,
//     value,
//     placeholder,
//     icon,
//     data,
//     nameKey,
//     onSelect,
// }) => {
//     const [openSheet, setOpenSheet] = useState(false);
//     console.log('data', data)

//     const handleSelect = val => {
//         console.log('val', val);
//         Keyboard.dismiss();
//         setOpenSheet(false);
//         onSelect(val);
//     };

//     const renderList = ({ item, index }) => {
//         return (
//             <TouchableOpacity
//                 key={index + ''}
//                 onPress={() => handleSelect(item)}
//                 style={styles.itemContianer}>
//                 <Text
//                     style={StyleSheet.flatten([styles.textStyle, {
//                         color:
//                             value &&
//                                 item[nameKey] &&
//                                 value.toUpperCase() ===
//                                 item[nameKey].toUpperCase()
//                                 ? color.primeColor
//                                 : '#000',
//                     }])}>
//                     {item[nameKey]}
//                 </Text>
//             </TouchableOpacity>
//         );
//     };

//     const renderEmptyContent = () => (
//         <View style={styles.noResultContainer}>
//             <Text style={styles.noResultText}>
//                 Oops, No results found
//             </Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 disabled={disabled}
//                 style={styles.selectContainer}
//                 onPress={() => setOpenSheet(!openSheet)}
//             >
//                 {value ? (
//                     <Text numberOfLines={1} style={styles.selectValue}>{value}</Text>
//                 ) : (
//                     <Text numberOfLines={1} style={styles.placeHolderStyle}>{placeholder ? placeholder : 'Select...'}</Text>
//                 )}
//                 <Image source={icon} style={styles.iconStyle} />
//             </TouchableOpacity>

//             {openSheet ? (
//                 <View style={styles.openContainer}>
//                     <View style={styles.arrowContainer}>
//                         <View style={styles.triangle} />
//                     </View>
//                     <View style={styles.listContainer}>
//                         <FlatList
//                             data={data}
//                             extraData={data}
//                             renderItem={renderList}
//                             onEndReachedThreshold={0.9}
//                             keyExtractor={(item, index) => index.toString()}
//                             showsHorizontalScrollIndicator={false}
//                             keyboardDismissMode="on-drag"
//                             keyboardShouldPersistTaps="always"
//                             showsVerticalScrollIndicator={false}
//                             ListEmptyComponent={renderEmptyContent}
//                         />
//                     </View>
//                 </View>
//             ) : null}
//         </View>
//     );
// };

// export default CustomSelect;

// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         borderWidth: 1,
//         borderColor: '#DEE1E6',
//         paddingVertical: 5,
//         justifyContent: 'center',
//         borderRadius: 8,
//         marginTop: 8,
//         backgroundColor: 'rgba(255,255,255,1)'
//     },
//     selectContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%',
//         height: 35,
//         paddingHorizontal: 12,
//     },
//     selectValue: {
//         fontFamily: font.reg,
//         color: '#000',
//         fontSize: 16,
//     },
//     placeHolderStyle: {
//         color: 'rgba(58, 53, 65, 0.38)',
//         fontFamily: font.reg,
//         fontSize: 16,
//     },
//     iconStyle: {
//         marginLeft: 10,
//         height: 15,
//         width: 17,
//         resizeMode: 'contain',
//         tintColor: color.lableColor,
//     },
//     openContainer: {
//         width: '100%',
//         position: 'absolute',
//         minHeight: 50,
//         top: 50,
//     },
//     listContainer: {
//         width: '100%',
//         minHeight: 50,
//         zIndex: 100,
//         backgroundColor: 'rgba(255,255,255,1)',
//         borderRadius: 8,
//         ...shadow
//     },
//     itemContianer: {
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderColor: '#DEE1E6',
//         paddingHorizontal: 12,
//     },
//     textStyle: {
//         fontFamily: font.bold,
//         color: '#000926',
//         fontSize: 16,
//         lineHeight: 32,
//         textTransform: 'capitalize'
//     },
//     noResultContainer: {
//         backgroundColor: '#fff',
//         height: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     noResultText: {
//         fontFamily: font.reg,
//         textAlign: 'center',
//         fontSize: 15,
//     },
//     triangle: {
//         width: 0,
//         height: 0,
//         borderTopWidth: 0,
//         borderRightWidth: 20,
//         borderBottomWidth: 20,
//         borderLeftWidth: 20,
//         borderBottomColor: '#fff',
//         ...shadow
//     },
//     arrowContainer: {
//         height: 20,
//         marginRight: 8,
//         alignSelf: 'flex-end'
//     },
// });
