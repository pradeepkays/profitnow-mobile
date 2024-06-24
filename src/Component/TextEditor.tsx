// import React, { useState, useRef, useEffect } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Text,
//   View
// } from 'react-native';
// import { color, font } from './Styles';
// import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

// const TextEditor = ({
//   data,
//   onUpdateContent
// }) => {
//   const richText = useRef();

//   useEffect(() => {
//     if(richText.current) {
//       richText.current.setContentHTML(data);
//     }
//   }, [data])

//   const onEditorInitialized = () => {
//     richText.current.setContentHTML(data);
//   }

//   const updateTemplate = (data) => {
//     onUpdateContent(data)
//   }
//   return (
//     <View style={styles.container}>
//       <View style={styles.editorContainer}>
//         <RichEditor
//           ref={richText}
//           placeholder='Write message..'
//           initialContentHTML={data}
//           //editorInitializedCallback={() => onEditorInitialized()}
//           onChange={descriptionText => updateTemplate(descriptionText)}
//           style={styles.editorStyle}
//           editorStyle={{
//                     contentCSSText: `
//                       min-height: 200px;
//                       position: absolute;
//                       top: 0; right: 0; bottom: 0; left: 0;`,
//                 }}
//         />
//       </View>
//       <RichToolbar
//         editor={richText}
//         actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertLink, actions.insertBulletsList, actions.undo, actions.redo]}
//         iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
//       />
//     </View>
//   );
// };

// export default TextEditor;

// const styles = StyleSheet.create({
//   container: { marginTop: 20 },
//   editorContainer: { borderWidth: 1, borderRadius: 6, borderColor: color.borderColor, paddingTop: 10, paddingHorizontal: 10, height: 200 },
//   editorStyle: { flex: 1, color: '#000', fontFamily: font.reg },
// });
