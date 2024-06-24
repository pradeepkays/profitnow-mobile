import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Modal,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Appearance
} from 'react-native'

import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
// import { Appearance } from 'react-native-appearance'

interface myProps {
  style?: ViewStyle
  mode: 'date' | 'time' | 'datetime'
  value: Date | null
  placeholder: String
  onSelect: Function
  textStyle?: TextStyle
  placeholderStyle?: TextStyle
  minDate?: Date | null
  maxDate?: Date | null
  icon?: ImageSourcePropType
  imageStyle?: ImageStyle
  date?: Date
  customeView?: any
}

export default class DateTime extends React.Component<myProps> {
  state = {
    date: this.props.date,
    isVisible: false,
    active: 'date',
  }

  componentDidUpdate(prevProps: myProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ date: this.props.value })
    }
  }

  selectDate(event: Event, date?: Date) {
    // console.log(event, date);
    const { mode } = this.props
    const { active } = this.state
    if (Platform.OS === 'ios') {
      this.setState({ date })
    } else {
      if (event.type === 'set') {
        this.setState({ date })
        if (mode === 'datetime') {
          if (active === 'date') {
            this.setState({ active: 'time' })
          } else {
            this.onSelect()
          }
        } else {
          this.onSelect()
        }
      } else {
        this.setState({
          isVisible: false,
          active: mode === 'datetime' ? 'date' : mode,
          // date: value,
        })
      }
    }
  }

  onSelect() {
    const { date } = this.state
    const { onSelect, mode } = this.props
    this.setState({
      isVisible: false,
      active: mode === 'datetime' ? 'date' : mode,
    })
    onSelect && onSelect(date || new Date())
  }

  render() {
    const colorScheme = Appearance.getColorScheme()
    console.log('colorScheme', colorScheme)
    const { date, isVisible, active } = this.state
    const {
      style,
      mode = 'date',
      value,
      placeholder = 'Select Date',
      textStyle,
      placeholderStyle,
      minDate = null,
      maxDate = null,
      icon = { uri: 'https://cdn-icons-png.flaticon.com/512/661/661512.png' },
      imageStyle,
      customeView,
    } = this.props
    return (
      <View>
        {customeView ? (
          <TouchableOpacity
            onPress={() =>
              this.setState({
                isVisible: true,
                active: mode === 'datetime' ? 'date' : mode,
                date: value,
              })
            }
          >
            {customeView}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              ...style,
            }}
            onPress={() =>
              this.setState({
                isVisible: true,
                active: mode === 'datetime' ? 'date' : mode,
                date: value,
              })
            }
          >
            {value ? (
              <>
                {mode === 'datetime' && (
                  <Text style={{ ...textStyle }}>
                    {moment(value).format('DD-MM-YYYY LT')}
                  </Text>
                )}
                {mode === 'date' && (
                  <Text style={{ ...textStyle }}>
                    {moment(value).format('MM/DD/YYYY')}
                  </Text>
                )}
                {mode === 'time' && (
                  <Text style={{ ...textStyle }}>
                    {moment(value).format('LT')}
                  </Text>
                )}
              </>
            ) : (
              <Text style={{ ...placeholderStyle }}>{placeholder}</Text>
            )}
            {icon != null && (
              <Image
                source={icon}
                style={{
                  marginLeft: 15,
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  tintColor: '#a2a2a2',
                  ...imageStyle,
                }}
              />
            )}
          </TouchableOpacity>
        )}

        {Platform.OS !== 'ios' && isVisible && (
          <RNDateTimePicker
            mode={active}
            value={date || new Date()}
            minimumDate={minDate || undefined}
            maximumDate={maxDate || undefined}
            onChange={(event, _date) => this.selectDate(event, _date)}
          />
        )}

        {Platform.OS === 'ios' && (
          <Modal transparent visible={isVisible}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                this.setState({
                  isVisible: false,
                  active: mode === 'datetime' ? 'date' : mode,
                  date: value,
                })
              }
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#0005',
              }}
            >
              <TouchableWithoutFeedback>
                <View style={{ margin: 15 }}>
                  <View
                    style={{
                      paddingHorizontal: 12,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        marginHorizontal: -12,
                        paddingHorizontal: 15,
                        borderColor: '#e2e2e2',
                      }}
                    >
                      <Text style={{ textAlign: 'center' }}>{placeholder}</Text>
                    </View>

                    <RNDateTimePicker
                      mode={active}
                      display="spinner"
                      value={date || new Date()}
                      minimumDate={minDate || undefined}
                      maximumDate={maxDate || undefined}
                      themeVariant="light"
                      onChange={(event, _date) => this.selectDate(event, _date)}
                    />

                    <View
                      style={{
                        borderTopWidth: 1,
                        marginHorizontal: -12,
                        borderColor: '#e2e2e2',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (mode === 'datetime') {
                            if (active === 'date') {
                              this.setState({ active: 'time' })
                            } else {
                              this.onSelect()
                            }
                          } else {
                            this.onSelect()
                          }
                        }}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 30,
                          alignSelf: 'center',
                        }}
                      >
                        <Text style={{ textAlign: 'center' }}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        isVisible: false,
                        active: mode === 'datetime' ? 'date' : mode,
                        date: value,
                      })
                    }
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 12,
                      borderRadius: 8,
                      backgroundColor: '#fff',
                      marginTop: 15,
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
    )
  }
}
