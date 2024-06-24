import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import {
  LANDSCAPE,
  OrientationLocker,
  PORTRAIT,
} from 'react-native-orientation-locker'
import Slider from 'react-native-sliders'
import Video from 'react-native-video'

type Props = {
  autoPlay: boolean
  style?: ViewStyle
  title?: string
  source: { uri: string }
  seekColor?: string
  onBackPress?(): void
  onFullscreen?(p: boolean): void
}

type State = {
  currentTime: number
  isVisibleControls: boolean
  duration: number
  onSlidingStart: boolean
  paused: boolean
  onLoad: boolean
  onEnd: boolean
  fullscreen: boolean
}

const { height, width } = Dimensions.get('screen')

export default class VideoPlayer extends Component<Props, State> {
  setTimeout: NodeJS.Timeout | null
  player: Video | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      currentTime: 0,
      isVisibleControls: false,
      duration: 0,
      onSlidingStart: false,
      paused: this.props.autoPlay ? false : true,
      onLoad: true,
      onEnd: false,
      fullscreen: false,
    }
    this.setTimeout = null
  }

  componentDidMount() {
    this.showControls()
  }

  showControls() {
    this.setTimeout && clearTimeout(this.setTimeout)
    this.setState({ isVisibleControls: true })
    this.setTimeout = setTimeout(() => {
      this.setState({ isVisibleControls: false })
    }, 5000)
  }

  timeFormate(totalSeconds: number) {
    let hours: string | number = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes: string | number = Math.floor(totalSeconds / 60)
    let seconds: string | number = totalSeconds % 60
    minutes = String(minutes).padStart(2, '0')
    hours = String(hours).padStart(2, '0')
    seconds = String(seconds).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  seekTo(seconds = 0) {
    const { duration } = this.state
    if (duration >= seconds && seconds >= 0) {
      this.setState({ currentTime: seconds })
      this.player?.seek(seconds)
      if (seconds === 0) {
        this.setState({ paused: false })
      }
    }
  }

  render() {
    const {
      isVisibleControls,
      currentTime,
      duration,
      onSlidingStart,
      paused,
      onLoad,
      onEnd,
      fullscreen,
    } = this.state
    const {
      style = {},
      title,
      source = { uri: '' },
      seekColor = '#0099ff',
      onBackPress,
      onFullscreen,
    } = this.props

    return (
      <>
        {Platform.OS === 'ios' ? null : (
          <OrientationLocker orientation={fullscreen ? LANDSCAPE : PORTRAIT} />
        )}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.showControls()}
          style={
            fullscreen && Platform.OS !== 'ios'
              ? {
                  position: 'absolute',
                  height: width,
                  width: height,
                  zIndex: 999,
                  backgroundColor: '#000',
                }
              : { height: width * 0.65, backgroundColor: '#000', ...style }
          }
        >
          <Video
            source={source} // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}
            resizeMode="contain"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            // controls
            paused={paused}
            onLoad={(e) => {
              this.setState({
                duration: Math.round(e.duration),
                onLoad: false,
                onEnd: false,
              })
            }}
            onProgress={(e) => {
              !onSlidingStart &&
                this.setState({
                  currentTime: Math.round(e.currentTime),
                  onEnd: false,
                })
            }}
            onEnd={() =>
              this.setState({ onEnd: true, paused: true }, () =>
                this.showControls(),
              )
            }
            fullscreen={fullscreen}
          />

          {isVisibleControls && (
            <View
              style={{ position: 'absolute', height: '100%', width: '100%' }}
            >
              {/* Title */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#0006',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ fullscreen: false, paused: true })
                    onBackPress && onBackPress()
                  }}
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                >
                  <Image
                    source={require('assets/img/back.png')}
                    style={{
                      height: 22,
                      width: 22,
                      resizeMode: 'contain',
                      tintColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{ color: '#fff', fontSize: 14 }}
                  >
                    {title}
                  </Text>
                </View>
              </View>

              {/* Body */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <TouchableOpacity
                  onPress={() => this.seekTo(currentTime - 10)}
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('assets/img/fast-forward.png')}
                    style={{
                      height: '80%',
                      width: '80%',
                      tintColor: '#fff',
                      transform: [{ rotate: '180deg' }],
                    }}
                  />
                </TouchableOpacity>
                {onLoad ? (
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 30,
                      backgroundColor: '#0003',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator color={'#fff'} />
                  </View>
                ) : onEnd ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ onEnd: false, currentTime: 0 }, () =>
                        this.seekTo(0),
                      )
                    }
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 30,
                    }}
                  >
                    <Image
                      source={require('assets/img/repeatsign.png')}
                      style={{
                        height: '60%',
                        width: '60%',
                        tintColor: '#572ff2',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({ paused: !paused })}
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 30,
                    }}
                  >
                    <Image
                      source={
                        paused
                          ? require('assets/img/play.png')
                          : require('assets/img/pause-button.png')
                      }
                      style={{
                        height: '45%',
                        width: '45%',
                        tintColor: '#572ff2',
                      }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => this.seekTo(currentTime + 10)}
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('assets/img/fast-forward.png')}
                    style={{ height: '80%', width: '80%', tintColor: '#fff' }}
                  />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#0006',
                  paddingLeft: 15,
                }}
              >
                <View style={{}}>
                  <Text style={{ color: '#fff' }}>
                    {this.timeFormate(currentTime)}
                  </Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                  <Slider
                    value={currentTime}
                    onValueChange={(_currentTime: any) =>
                      this.setState({
                        currentTime: _currentTime,
                        onSlidingStart: true,
                      })
                    }
                    step={1}
                    minimumValue={0}
                    maximumValue={duration}
                    maximumTrackTintColor="#fff9"
                    minimumTrackTintColor={seekColor}
                    thumbTintColor={seekColor}
                    onSlidingStart={() => {
                      this.setState({ onSlidingStart: true })
                    }}
                    onSlidingComplete={() => {
                      this.setState({ onSlidingStart: false })
                      this.seekTo(currentTime)
                    }}
                  />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: '#fff' }}>
                    {this.timeFormate(duration)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState(
                      { fullscreen: !fullscreen },
                      () => onFullscreen && onFullscreen(fullscreen),
                    )
                  }
                  style={{ paddingHorizontal: 15, paddingVertical: 10 }}
                >
                  <Image
                    source={
                      !fullscreen || Platform.OS === 'ios'
                        ? require('assets/img/maximize.png')
                        : require('assets/img/fullscreen.png')
                    }
                    style={{
                      height: 15,
                      width: 15,
                      resizeMode: 'contain',
                      tintColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </>
    )
  }
}
