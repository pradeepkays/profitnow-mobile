import React, { Component } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'

import { font } from './Styles'

class SnackBar extends Component {
  animatedValue: any
  ShowSnackBar = false
  HideSnackBar = true
  timerID: any
  state: {
    SnackBarInsideMsgHolder: any
  }
  constructor(props: any) {
    super(props)

    this.animatedValue = new Animated.Value(60)
    this.ShowSnackBar = false
    this.HideSnackBar = true
    this.state = {
      SnackBarInsideMsgHolder: undefined,
    }
  }

  show(
    SnackBarInsideMsgHolder = 'Default SnackBar Message...',
    duration = 3000,
  ) {
    if (this.ShowSnackBar === false) {
      this.setState({ SnackBarInsideMsgHolder: SnackBarInsideMsgHolder })

      this.ShowSnackBar = true

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => this.hide(duration))
    }
  }

  hide = (duration: number) => {
    this.timerID = setTimeout(() => {
      if (this.HideSnackBar === true) {
        this.HideSnackBar = false

        Animated.timing(this.animatedValue, {
          toValue: 60,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          this.HideSnackBar = true
          this.ShowSnackBar = false
          clearTimeout(this.timerID)
        })
      }
    }, duration)
  }

  SnackBarCloseFunction = () => {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false
      clearTimeout(this.timerID)

      Animated.timing(this.animatedValue, {
        toValue: 60,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        this.ShowSnackBar = false
        this.HideSnackBar = true
      })
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.animatedValue }] },
          styles.SnackBarContainter,
        ]}
      >
        <Text numberOfLines={1} style={styles.SnackBarMessage}>
          {this.state.SnackBarInsideMsgHolder}
        </Text>

        <Text
          style={styles.SnackBarUndoText}
          onPress={this.SnackBarCloseFunction}
        >
          {' '}
          OK{' '}
        </Text>
      </Animated.View>
    )
  }
}

export default SnackBar

const styles = StyleSheet.create({
  SnackBarContainter: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    bottom: 10,
    flexDirection: 'row',
    height: 45,
    left: 10,
    paddingLeft: 10,
    paddingRight: 55,
    position: 'absolute',
    right: 10,
    zIndex: 101,
  },

  SnackBarMessage: {
    color: '#fff',
    fontFamily: font.reg,
    fontSize: 14,
  },

  SnackBarUndoText: {
    color: '#fff',
    fontFamily: font.bold,
    fontSize: 14,
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    right: 10,
  },
})
