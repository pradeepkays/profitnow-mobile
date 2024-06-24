import React from 'react'
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { color, font } from '../Styles'

type Props = {
  handleClose(): void
  image?: number
  detail: any
}

const { height, width } = Dimensions.get('window')

const EmailModal = ({ handleClose, image, detail }: Props) => {
  const handleMail = () => {
    handleClose()
    Linking.openURL(`mailto:${detail?.email}`)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleClose()}
        style={styles.closeContainer}
      >
        <Image
          source={require('assets/img/cancle_icon.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.userImageStyle} />
        ) : (
          <Text style={styles.avatarText}>{detail?.initials}</Text>
        )}
      </View>
      <Text style={styles.userName} numberOfLines={2}>
        {detail?.first_name} {detail?.last_name}
      </Text>

      <TouchableOpacity style={styles.mailButton} onPress={() => handleMail()}>
        <Text style={styles.mailText}>Open Mail</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmailModal

const styles = StyleSheet.create({
  avatarText: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 25,
  },
  closeContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 24,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 15,
    width: 24,
  },
  closeIcon: {
    height: 14,
    tintColor: 'rgba(58, 53, 65, 0.54)',
    width: 14,
  },
  container: {
    backgroundColor: color.whiteColor,
    height: height,
    width: width,
  },
  imageContainer: {
    alignItems: 'center',
    borderColor: color.secondColor,
    borderRadius: 54,
    borderWidth: 1,
    height: 107,
    justifyContent: 'center',
    marginTop: 10,
    padding: 27,
    width: 107,
  },
  mailButton: {
    alignItems: 'center',
    backgroundColor: color.secondColor,
    borderRadius: 5,
    height: 42,
    justifyContent: 'center',
    marginTop: 57,
    width: 240,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    shadowRadius: 10,
  },
  mailText: {
    color: color.whiteColor,
    fontFamily: font.semi,
    fontSize: 15,
  },
  userImageStyle: {
    borderRadius: 50,
    height: '100%',
    width: '100%',
  },
  userName: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 20,
    marginTop: 18,
    textAlign: 'center',
  },
})
