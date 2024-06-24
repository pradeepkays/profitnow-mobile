import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { font } from './Styles'

interface Props<T> {
  handleClose(): void
  handleSelect(a: T): void
  data: T[]
}

const CreateNew = <T extends object & { status: string }>({
  handleClose,
  handleSelect,
  data,
}: Props<T>) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.createText}>Create</Text>
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

      {data.map((k, index) => (
        <TouchableOpacity
          style={styles.contentOuter}
          key={index}
          onPress={() => handleSelect(k)}
        >
          <View style={styles.imageOuter}>
            <Image
              source={
                k.status === 'leads'
                  ? require('assets/img/lead.png')
                  : k.status === 'customers'
                  ? require('assets/img/AccountBoxuser.png')
                  : require('assets/img/Purchases.png')
              }
              style={styles.emailImage}
            />
          </View>

          <Text style={styles.emailText}>{k.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default CreateNew

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
    height: 345,
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
    height: 20,
    resizeMode: 'contain',
    tintColor: '#000',
    width: 20,
  },
  emailText: {
    color: '#3A3541',
    fontFamily: font.reg,
    fontSize: 16,
    marginLeft: 16,
  },
  imageOuter: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  labelContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
})
