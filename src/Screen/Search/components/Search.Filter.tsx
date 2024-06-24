import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import { Menu, MenuItem } from 'react-native-material-menu'

import IconChevronRight from 'assets/svg/IconChevronRight'
import IconCompany from 'assets/svg/IconCompany'
import IconContact from 'assets/svg/IconContact'

type Props = {
  target: 'contact' | 'company'
  status: 'lead' | 'opportunities' | undefined
  size: string | undefined
  setTarget(p: 'contact' | 'company'): void
  setStatus(p: 'lead' | 'opportunities' | undefined): void
  setSize(p: string | undefined): void
}

export function SearchFilter(props: Props) {
  const { target, size, status, setTarget, setStatus, setSize } = props

  const [menuVisible, setMenuVisible] = useState(false)
  const [statusVisible, setStatusVisible] = useState(false)
  const [sizeVisible, setSizeVisible] = useState(false)

  const onToggleMenu = () => {
    setMenuVisible(!menuVisible)
  }
  const onToggleMenuStatus = () => {
    setStatusVisible(!statusVisible)
  }
  const onToggleMenuSize = () => {
    setSizeVisible(!sizeVisible)
  }

  const onFilterByPress = (str: 'contact' | 'company') => () => {
    setTarget(str)
    setMenuVisible(false)
  }

  const onFilterStatusPress =
    (str: 'lead' | 'opportunities' | undefined) => () => {
      setStatus(str)
      setStatusVisible(false)
    }

  const onFilterSizePress = (str: string | undefined) => {
    setSize(str)
    setSizeVisible(false)
  }

  return (
    <AppBlock row>
      <Menu
        style={styles.menu}
        visible={menuVisible}
        onRequestClose={onToggleMenu}
        anchor={
          <TouchableOpacity onPress={onToggleMenu} style={styles.anchor}>
            {target === 'company' ? (
              <IconCompany width={24} />
            ) : (
              <IconContact width={24} />
            )}
            <AppText ml={9}>
              {target === 'contact' ? 'Contacts' : 'Companies'}
            </AppText>
            <IconChevronRight
              opacity={0.4}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          </TouchableOpacity>
        }
      >
        <MenuItem
          style={[styles.item, target === 'contact' && styles.itemActive]}
          onPress={onFilterByPress('contact')}
        >
          <AppBlock row center>
            <IconContact width={24} />
            <AppText ml={9}>Contacts</AppText>
          </AppBlock>
        </MenuItem>
        <MenuItem
          style={[styles.item, target === 'company' && styles.itemActive]}
          onPress={onFilterByPress('company')}
        >
          <AppBlock row center>
            <IconCompany width={24} />
            <AppText ml={9}>Companies</AppText>
          </AppBlock>
        </MenuItem>
      </Menu>

      {target === 'contact' ? (
        <Menu
          style={styles.menu}
          visible={statusVisible}
          onRequestClose={onToggleMenuStatus}
          anchor={
            <TouchableOpacity
              onPress={onToggleMenuStatus}
              style={styles.anchor}
            >
              <AppText ml={9}>
                {status === 'lead'
                  ? 'Leads'
                  : status === 'opportunities'
                  ? 'Opportunities'
                  : 'All Status'}
              </AppText>
              <IconChevronRight
                opacity={0.4}
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </TouchableOpacity>
          }
        >
          <MenuItem
            style={[styles.item, !status && styles.itemActive]}
            onPress={onFilterStatusPress(undefined)}
          >
            <AppBlock row center>
              <AppText ml={9}>All Status</AppText>
            </AppBlock>
          </MenuItem>
          <MenuItem
            style={[
              styles.item,
              status === 'opportunities' && styles.itemActive,
            ]}
            onPress={onFilterStatusPress('opportunities')}
          >
            <AppBlock row center>
              <AppText ml={9}>Opportunities</AppText>
            </AppBlock>
          </MenuItem>
          <MenuItem
            style={[styles.item, status === 'lead' && styles.itemActive]}
            onPress={onFilterStatusPress('lead')}
          >
            <AppBlock row center>
              <AppText ml={9}>Leads</AppText>
            </AppBlock>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          style={styles.menu}
          visible={sizeVisible}
          onRequestClose={onToggleMenuSize}
          anchor={
            <TouchableOpacity onPress={onToggleMenuSize} style={styles.anchor}>
              <AppText ml={9}>
                {'Employees'}
                {size ? ': ' + size : ''}
              </AppText>
              <IconChevronRight
                opacity={0.4}
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </TouchableOpacity>
          }
        >
          <MenuItem
            style={[styles.item, !size && styles.itemActive]}
            onPress={() => onFilterSizePress(undefined)}
          >
            <AppBlock row center>
              <AppText ml={9}>All</AppText>
            </AppBlock>
          </MenuItem>
          <CustomMenuItem
            val={'1-10'}
            selected={size}
            onPress={onFilterSizePress}
          />
          <CustomMenuItem
            val={'11-50'}
            selected={size}
            onPress={onFilterSizePress}
          />
          <CustomMenuItem
            val={'51-100'}
            selected={size}
            onPress={onFilterSizePress}
          />
          <CustomMenuItem
            val={'101-200'}
            selected={size}
            onPress={onFilterSizePress}
          />
          <CustomMenuItem
            val={'201-500'}
            selected={size}
            onPress={onFilterSizePress}
          />
          <CustomMenuItem
            val={'501++'}
            selected={size}
            onPress={onFilterSizePress}
          />
        </Menu>
      )}
    </AppBlock>
  )
}

type CustomMenuItemProps = {
  selected: string | undefined
  val: string | undefined
  onPress(p: string | undefined): void
}

const CustomMenuItem = ({ val, selected, onPress }: CustomMenuItemProps) => {
  const onItemPress = () => {
    onPress(val)
  }

  return (
    <MenuItem
      style={[styles.item, val === selected && styles.itemActive]}
      onPress={onItemPress}
    >
      <AppBlock row center>
        <AppText ml={9}>{val}</AppText>
      </AppBlock>
    </MenuItem>
  )
}

const styles = StyleSheet.create({
  anchor: {
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: appSize(160),
    paddingLeft: appSize(16),
  },
  item: { paddingLeft: 16, width: 200 },
  itemActive: {
    backgroundColor: '#f0f0f0',
  },
  menu: { marginLeft: appSize(5), marginTop: appSize(30) },
})
