import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import { Menu, MenuItem } from 'react-native-material-menu'

import AppConstant from '@vn.starlingTech/config/AppConstant'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'

import IconEmail from 'assets/svg/IconEmail'
import IconHelp from 'assets/svg/IconHelp'
import IconMessage from 'assets/svg/IconMessage'
import IconNote from 'assets/svg/IconNote'
import IconPhone from 'assets/svg/IconPhone'
import IconTask from 'assets/svg/IconTask'
import { font } from 'src/Component/Styles'

type Props = {
  type: string
  onPress(p: string): void
  bookedCallApi(): void
}

export function ActivityFilter(props: Props) {
  const { type, onPress, bookedCallApi } = props

  const [visible, setVisible] = useState(false)

  const onShow = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const onItemPress = (p: string) => () => {
    onPress(p)
    onClose()
  }

  const onBookedCallsPress = () => {
    bookedCallApi()
    onClose()
  }

  consoleLog('tu[e' + type)

  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={onShow} style={styles.anchor}>
          <AppText style={styles.label}>
            {type === 'sms'
              ? type?.toUpperCase()
              : type?.charAt(0)?.toUpperCase() + type?.slice(1)?.toLowerCase()}
          </AppText>
          <Image
            source={require('assets/img/down-arrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      }
      onRequestClose={onClose}
    >
      <MenuItem onPress={onItemPress('call')} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconPhone width={20} />
          <AppText ml={16} style={styles.label}>
            Calls
          </AppText>
        </AppBlock>
      </MenuItem>
      <MenuItem onPress={onItemPress('email')} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconEmail width={18} />
          <AppText ml={12} style={styles.label}>
            Email
          </AppText>
        </AppBlock>
      </MenuItem>
      <MenuItem onPress={onBookedCallsPress} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconPhone width={20} />
          <AppText style={styles.label}>Booked Calls</AppText>
        </AppBlock>
      </MenuItem>
      <MenuItem onPress={onItemPress('sms')} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconMessage width={20} />
          <Text style={styles.label}>SMS</Text>
        </AppBlock>
      </MenuItem>
      <MenuItem onPress={onItemPress('note')} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconNote width={20} />
          <Text style={styles.label}>Notes</Text>
        </AppBlock>
      </MenuItem>
      <MenuItem onPress={onItemPress('task')} style={styles.menuItem}>
        <AppBlock row alignItems="center">
          <IconTask width={20} />
          <Text style={styles.label}>Tasks</Text>
        </AppBlock>
      </MenuItem>
      <MenuItem
        onPress={onItemPress('Support Tickets')}
        style={styles.menuItem}
      >
        <AppBlock row alignItems="center">
          <IconHelp width={20} />
          <AppText style={styles.label}>Support Tickets</AppText>
        </AppBlock>
      </MenuItem>
    </Menu>
  )
}

const styles = StyleSheet.create({
  anchor: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 25,
    width: AppConstant.WIDTH - appSize(70),
  },
  icon: {
    height: 15,
    resizeMode: 'contain',
    tintColor: 'rgba(58, 53, 65, 0.54)',
    width: 15,
  },
  label: {
    color: '#000926',
    fontFamily: font.reg,
    fontSize: 16,
    marginLeft: appSize(12),
    textAlign: 'center',
  },
  menuItem: {
    minWidth: 220,
    paddingHorizontal: appSize(12),
  },
})
