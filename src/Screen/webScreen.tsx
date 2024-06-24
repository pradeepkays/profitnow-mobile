import React, { Component } from 'react'

import { WebView } from 'react-native-webview'

import { AppScreenProps } from 'src/navigation/navigation.types'

export default class WebScreen extends Component<AppScreenProps> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      isLoading: false,
    }
  }

  render() {
    const url = this.props?.route?.params?.url
    return (
      <WebView
        source={{
          uri: url,
        }}
        style={{ marginTop: 20 }}
      />
    )
  }
}
