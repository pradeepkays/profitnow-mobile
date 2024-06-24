import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { font } from '../../../Component/Styles'

type Props = {
  handleClose(): void
  handleSelectedFilter(p: string): void
  selectedValue: string
}

const InboxFilter = ({
  handleClose,
  handleSelectedFilter,
  selectedValue,
}: Props) => {
  const onItemPress = (p: string) => {
    handleSelectedFilter(p)
    handleClose()
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.createText}>Filter by</Text>
        <TouchableOpacity
          onPress={() => handleClose()}
          style={styles.closeContainer}
        >
          <Image
            source={require('assets/img/cancle_icon.png')}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          onItemPress('email')
        }}
        style={styles.contentOuter}
      >
        {selectedValue === 'email' ? (
          <Image
            source={require('assets/img/Emailprime.png')}
            style={StyleSheet.flatten([
              styles.emailImage,
              { tintColor: '#6E41C0' },
            ])}
          />
        ) : (
          <Image
            source={require('assets/img/homeemail.png')}
            style={styles.emailImage}
          />
        )}

        <Text style={styles.emailText}>EMAIL</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          onItemPress('sms')
        }}
        style={styles.contentOuter}
      >
        <Image
          source={require('assets/img/sms.png')}
          style={
            selectedValue === 'sms'
              ? StyleSheet.flatten([
                  styles.emailImage,
                  { tintColor: '#6E41C0' },
                ])
              : styles.emailImage
          }
        />
        <Text style={styles.emailText}>SMS</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InboxFilter

const styles = StyleSheet.create({
  closeContainer: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  closeIcon: {
    height: 14,
    tintColor: 'rgba(58, 53, 65, 0.54)',
    width: 14,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 275,
    overflow: 'hidden',
    paddingHorizontal: 30,
    paddingTop: 35,
    width: '100%',
  },
  contentOuter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
  },
  createText: {
    color: '#3A3541',
    fontFamily: font.semi,
    fontSize: 24,
    opacity: 0.87,
  },
  emailImage: {
    height: 32,
    resizeMode: 'contain',
    width: 32,
  },
  emailText: {
    color: '#3A3541',
    fontFamily: font.semi,
    fontSize: 16,
    marginLeft: 16,
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
})
