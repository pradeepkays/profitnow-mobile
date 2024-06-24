import { StyleSheet } from 'react-native'

import { colorDefault as light } from '@vn.starlingTech/theme/theming'

export const borderWidth = StyleSheet.hairlineWidth

export default StyleSheet.create({
  bgTransparent: { backgroundColor: light.transparent },
  bgWhite: { backgroundColor: light.white },
  bordered: {
    borderColor: light.border,
    borderWidth,
  },
  bottomBordered: {
    borderBottomColor: light.border,
    borderBottomWidth: borderWidth,
  },
  buttonTryAgain: { height: 54, marginTop: 15, width: 120 },
  center: { alignItems: 'center', justifyContent: 'center' },
  contentCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  contentPadding: {
    paddingHorizontal: 15,
  },
  fade: {
    alignItems: 'center',
    backgroundColor: light.backdrop,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9999,
  },
  fill: { flex: 1 },
  fillCenter: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  headerLogo: {
    height: 30,
    resizeMode: 'contain',
    width: 120,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 32,
  },
  infoContainer: {
    backgroundColor: light.white,
    marginTop: 13,
    paddingBottom: 14,
  },
  inputErrTxt: {
    color: light.danger,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginTop: 8,
  },
  leftBordered: {
    borderLeftColor: light.border,
    borderLeftWidth: borderWidth,
  },
  noBorder: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },

  noDisplay: { display: 'none' },
  noMargin: { marginBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0 },
  normalTxt: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },
  overHidden: {
    overflow: 'hidden',
  },
  rightBordered: {
    borderRightColor: light.border,
    borderRightWidth: borderWidth,
  },
  row: { flexDirection: 'row' },
  rowCenter: { alignItems: 'center', flexDirection: 'row' },

  rowCenterBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  shadow: {
    elevation: 4,
    shadowColor: light.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },

  topBordered: {
    borderTopColor: light.border,
    borderTopWidth: borderWidth,
  },
  transparent: { backgroundColor: light.transparent },
})
