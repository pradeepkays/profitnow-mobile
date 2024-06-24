import React, { Component } from 'react'
import {
  FlatList,
  Image,
  ImageStyle,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable'

import { color, font } from './Styles'

interface MyProps {
  placeholder: string
  value?: string
  searchBar: boolean
  nameKey?: string
  onSelect: Function
  data: any[]
  mainViewStyle: ViewStyle
  disabled?: boolean
  multiple?: boolean
  selected?: any
  idKey?: string
  textStyle?: TextStyle
  contentStyle?: ViewStyle
  iconStyle?: ImageStyle
  icon?: number
}

type State = {
  visible: boolean
  text: string
  filteredData: any[]
  texts: any
  data: any[]

  selected: any
}

export default class Picker extends Component<MyProps, State> {
  arrayholder: any[]
  view: any
  constructor(props: MyProps) {
    super(props)
    this.state = {
      visible: false,
      text: '',
      filteredData: [],
      texts: null,
      data: this.props.data,

      selected: this.props.selected,
    }
    this.arrayholder = this.props.data
  }

  UNSAFE_componentWillReceiveProps(nextProps: MyProps) {
    const { idKey = 'id' } = this.props
    if (nextProps.data) {
      this.arrayholder = nextProps.data
      this.setState({ data: nextProps.data })
    }

    if (nextProps.multiple) {
      for (let i = 0; i < nextProps.data.length; i++) {
        nextProps.data[i].isSelected = false
        if (nextProps.selected.length !== 0) {
          for (let j = 0; j < nextProps.selected.length; j++) {
            if (nextProps.data[i][idKey] === nextProps.selected[j][idKey]) {
              nextProps.data[i].isSelected = true
            }
          }
        } else {
          nextProps.data[i].isSelected = false
        }
      }

      this.setState({ selected: nextProps.selected, data: nextProps.data })
    }
  }

  searchFilterFunction = (texts: string) => {
    const { nameKey = 'name' } = this.props
    this.setState({ texts })
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item[nameKey].toUpperCase()}   
          ${item[nameKey].toUpperCase()}`

      const textData = texts.toUpperCase()

      return itemData.indexOf(textData) > -1
    })

    this.setState({ data: newData })
  }

  onSelect(item: any) {
    this.view?.fadeOutDown(200).then(() =>
      this.setState(
        { visible: false, texts: null, data: this.props.data },
        () => {
          this.props.onSelect ? this.props.onSelect(item) : null
        },
      ),
    )
  }

  multipleSelect() {
    const { data } = this.state
    const selected: any[] = []

    for (let i = 0; i < data.length; i++) {
      if (data[i].isSelected) {
        selected.push(data[i])
      }
    }

    this.view?.fadeOutDown(200).then(() =>
      this.setState(
        { visible: false, texts: null, data: this.props.data },
        () => {
          this.props.onSelect ? this.props.onSelect(selected) : null
        },
      ),
    )
  }

  onPress() {
    const {
      data = [],
      selected = [],
      multiple = false,
      idKey = 'id',
    } = this.props
    // alert('hello')
    Keyboard.dismiss()

    if (multiple) {
      for (let i = 0; i < data.length; i++) {
        data[i].isSelected = false
        if (selected.length !== 0) {
          for (let j = 0; j < selected.length; j++) {
            if (data[i][idKey] === selected[j][idKey]) {
              data[i].isSelected = true
            }
          }
        } else {
          data[i].isSelected = false
        }
      }
    }
    this.setState(
      { visible: true, data: data, selected },
      () => this.view?.fadeInUpBig(500),
    )
  }

  render() {
    const { visible, texts, data = [], selected } = this.state
    const {
      multiple = false,
      disabled = false,
      value = '',
      textStyle,
      placeholder = 'Select',
      searchBar = false,
      contentStyle,
      mainViewStyle,
      iconStyle,
      icon = require('assets/img/dropdown.png'),
      nameKey = 'name',
    } = this.props

    // console.log(selected);

    if (!multiple) {
      return (
        <View
          style={{
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 8,
            ...mainViewStyle,
          }}
        >
          <TouchableOpacity
            disabled={disabled}
            onPress={() => this.onPress()}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                height: 35,
                paddingHorizontal: 12,
              },
              contentStyle,
            ]}
          >
            {/* {value ?
                        <Text numberOfLines={1} style={[{ flex: 1, fontFamily: font.reg, color: '#000' }, textStyle]}>{value}</Text>
                        :
                        <Text numberOfLines={1} style={[{ flex: 1, color: color.lableColor, fontFamily: font.reg }]}>{placeholder}</Text>
                    } */}
            {
              // <Text style={{ position: 'absolute', left: 10, top: value ? -8 : 9, fontSize: value ? 11 : 14, color: value ? '#000' : color.lableColor, paddingHorizontal: value ? 2 : 0, backgroundColor: value ? '#fff' : '#0000', fontFamily: value ? font.bold : font.reg, marginTop: Platform.OS === "ios" ? 0 : -3 }}>
              //     {placeholder}
              // </Text>
            }
            <Text
              numberOfLines={1}
              style={[
                {
                  flex: 1,
                  fontFamily: font.reg,
                  color: value ? '#000' : color.lableColor,
                },
                textStyle,
              ]}
            >
              {value ? value : placeholder}
            </Text>
            <Image
              source={icon}
              style={[
                {
                  marginLeft: 10,
                  height: 14,
                  width: 14,
                  resizeMode: 'contain',
                  tintColor: '#000',
                },
                iconStyle,
              ]}
            />
          </TouchableOpacity>

          <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() =>
              this.view?.fadeOutDown(200).then(() =>
                this.setState({
                  visible: false,
                  texts: null,
                  data: this.props.data,
                }),
              )
            }
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <SafeAreaView style={{ backgroundColor: '#0009' }} />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  this.view?.fadeOutDown(200).then(() =>
                    this.setState({
                      visible: false,
                      texts: null,
                      data: this.props.data,
                    }),
                  )
                }
                style={{
                  flex: 1,
                  backgroundColor: '#0009',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableWithoutFeedback>
                  <Animatable.View
                    style={{
                      backgroundColor: '#fff',
                      overflow: 'scroll',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    {/* Header */}
                    {searchBar ? (
                      <View
                        style={{
                          backgroundColor: color.primeColor,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          paddingVertical: 0,
                          paddingHorizontal: 12,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          {/* <Image source={require('assets/img/Search.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: '#fff', marginRight: 8 }} /> */}
                          <TextInput
                            style={{
                              padding: 0,
                              flex: 1,
                              fontFamily: font.bold,
                              marginTop: 0,
                              color: '#fff',
                              fontSize: 15,
                              height: 40,
                            }}
                            placeholder="Search here..."
                            placeholderTextColor="#fff9"
                            value={texts}
                            onChangeText={(_text) =>
                              this.searchFilterFunction(_text)
                            }
                          />
                          <TouchableOpacity
                            onPress={() =>
                              this.view?.fadeOutDown(200).then(() =>
                                this.setState({
                                  visible: false,
                                  texts: null,
                                  data: this.props.data,
                                }),
                              )
                            }
                          >
                            <Image
                              source={require('assets/img/cancle_icon.png')}
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
                    ) : (
                      <View
                        style={{
                          backgroundColor: color.primeColor,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          paddingVertical: 12,
                          paddingHorizontal: 12,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          {/* <Image source={require('assets/img/back.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: '#fff', marginRight: 8 }} /> */}
                          <Text
                            style={[
                              {
                                flex: 1,
                                padding: 0,
                                color: '#fff',
                                fontFamily: font.bold,
                                fontSize: 15,
                              },
                              textStyle,
                            ]}
                          >
                            {placeholder}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              this.view?.fadeOutDown(200).then(() =>
                                this.setState({
                                  visible: false,
                                  texts: null,
                                  data: this.props.data,
                                }),
                              )
                            }
                          >
                            <Image
                              source={require('assets/img/cancle_icon.png')}
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

                    {data.length !== 0 ? (
                      <FlatList
                        contentContainerStyle={{
                          paddingBottom: 30,
                          paddingHorizontal: 12,
                        }}
                        data={data}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            key={index + ''}
                            onPress={() => this.onSelect(item)}
                            style={{
                              paddingVertical: 10,
                              borderBottomWidth: 1,
                              borderColor: color.borderColor,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: font.bold,
                                color:
                                  value &&
                                  item[nameKey] &&
                                  value.toUpperCase() ===
                                    item[nameKey].toUpperCase()
                                    ? color.primeColor
                                    : '#000',
                                fontSize: 15,
                              }}
                            >
                              {item[nameKey]}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#fff',
                          height: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: font.reg,
                            textAlign: 'center',
                            fontSize: 15,
                          }}
                        >
                          Oops, No results found
                        </Text>
                      </View>
                    )}
                  </Animatable.View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      )
    } else {
      return (
        <View
          style={{
            borderWidth: 1,
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 8,
            ...mainViewStyle,
          }}
        >
          <TouchableOpacity
            disabled={disabled}
            onPress={() => this.onPress()}
            style={[
              { flexDirection: 'row', minHeight: 35, paddingHorizontal: 12 },
              contentStyle,
            ]}
          >
            {selected.length === 0 ? (
              <Text
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 9,
                  fontSize: selected.length !== 0 ? 11 : 14,
                  color: selected.length !== 0 ? '#000' : color.lableColor,
                  paddingHorizontal: selected.length !== 0 ? 2 : 0,
                  backgroundColor: selected.length !== 0 ? '#fff' : '#0000',
                  fontFamily: selected.length !== 0 ? font.bold : font.reg,
                  marginTop: Platform.OS === 'ios' ? 0 : -3,
                }}
              >
                {placeholder}
              </Text>
            ) : null}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 15,
              }}
            >
              {selected.map((item: any) => (
                <View
                  style={{
                    borderWidth: 1,
                    marginLeft: 5,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 50,
                    marginBottom: 12,
                    borderColor: color.primeColor,
                  }}
                >
                  <Text
                    style={[
                      { fontFamily: font.reg, color: '#000', fontSize: 13 },
                      textStyle,
                    ]}
                  >
                    {item[nameKey]}
                  </Text>
                </View>
              ))}
            </View>
            <Image
              source={icon}
              style={[
                {
                  marginTop: 10,
                  marginLeft: 10,
                  height: 14,
                  width: 14,
                  resizeMode: 'contain',
                  tintColor: '#000',
                },
                iconStyle,
              ]}
            />
          </TouchableOpacity>

          <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() =>
              this.view?.fadeOutDown(200).then(() =>
                this.setState({
                  visible: false,
                  texts: null,
                  data: this.props.data,
                }),
              )
            }
          >
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <SafeAreaView style={{ backgroundColor: '#0009' }} />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  this.view?.fadeOutDown(200).then(() =>
                    this.setState({
                      visible: false,
                      texts: null,
                      data: this.props.data,
                    }),
                  )
                }
                style={{
                  flex: 1,
                  backgroundColor: '#0009',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableWithoutFeedback>
                  <Animatable.View
                    style={{
                      backgroundColor: '#fff',
                      overflow: 'scroll',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    {searchBar ? (
                      <View
                        style={{
                          backgroundColor: color.primeColor,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          paddingVertical: 0,
                          paddingHorizontal: 12,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Image
                            source={require('assets/img/Search.png')}
                            style={{
                              height: 20,
                              width: 20,
                              resizeMode: 'contain',
                              tintColor: '#fff',
                              marginRight: 8,
                            }}
                          />
                          <TextInput
                            style={{
                              padding: 0,
                              flex: 1,
                              fontFamily: font.bold,
                              marginTop: 0,
                              color: '#fff',
                              fontSize: 15,
                              height: 40,
                            }}
                            placeholder="Search here..."
                            placeholderTextColor="#fff9"
                            value={texts}
                            onChangeText={(_text) =>
                              this.searchFilterFunction(_text)
                            }
                          />
                          <TouchableOpacity
                            onPress={() =>
                              this.view?.fadeOutDown(200).then(() =>
                                this.setState({
                                  visible: false,
                                  texts: null,
                                  data: this.props.data,
                                }),
                              )
                            }
                          >
                            <Image
                              source={require('assets/img/cancle_icon.png')}
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
                    ) : (
                      <View
                        style={{
                          backgroundColor: color.primeColor,
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          paddingVertical: 12,
                          paddingHorizontal: 12,
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          {/* <Image source={require('assets/img/back.png')} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: '#fff', marginRight: 8 }} /> */}
                          <Text
                            style={[
                              {
                                flex: 1,
                                padding: 0,
                                color: '#fff',
                                fontFamily: font.bold,
                                fontSize: 15,
                              },
                              textStyle,
                            ]}
                          >
                            {placeholder}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              this.view?.fadeOutDown(200).then(() =>
                                this.setState({
                                  visible: false,
                                  texts: null,
                                  data: this.props.data,
                                }),
                              )
                            }
                          >
                            <Image
                              source={require('assets/img/cancle_icon.png')}
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

                    {data.length !== 0 ? (
                      <ScrollView>
                        <FlatList
                          contentContainerStyle={{
                            paddingBottom: 30,
                            paddingHorizontal: 12,
                          }}
                          data={data}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              key={index + ''}
                              onPress={() => {
                                data[index].isSelected = !item.isSelected
                                this.setState({ data })
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderColor: color.borderColor,
                              }}
                            >
                              <Text
                                style={{
                                  flex: 1,
                                  fontFamily: font.bold,
                                  color: item.isSelected
                                    ? color.primeColor
                                    : '#000',
                                  fontSize: 15,
                                  marginRight: 12,
                                }}
                              >
                                {item[nameKey]}
                              </Text>
                              <Image
                                source={require('assets/img/check-mark.png')}
                                style={{
                                  height: 16,
                                  width: 16,
                                  resizeMode: 'contain',
                                  tintColor: item.isSelected
                                    ? color.primeColor
                                    : '#0000',
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        />
                        <TouchableOpacity
                          onPress={() => this.multipleSelect()}
                          style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 35,
                            paddingHorizontal: 25,
                            borderRadius: 50,
                            backgroundColor: color.primeColor,
                            marginBottom: 40,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: font.bold,
                              fontSize: 16,
                              color: '#fff',
                            }}
                          >
                            SUBMIT
                          </Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#fff',
                          height: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: font.reg,
                            textAlign: 'center',
                            fontSize: 15,
                          }}
                        >
                          Oops, No results found
                        </Text>
                      </View>
                    )}
                  </Animatable.View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </Modal>
        </View>
      )
    }
  }
}
