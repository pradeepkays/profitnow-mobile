import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { color, font } from './Styles'

export default class AddProjectModal extends Component {
  state = {
    visible: false,
    name: '',
    related: '',
    description: '',
    tag: '',
  }

  show() {
    this.setState({ visible: true })
  }

  close() {
    this.setState({ visible: false })
  }

  render() {
    const { visible, name, related, description, tag } = this.state
    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          this.setState({ visible: false })
        }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: color.lableColor }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <SafeAreaView />
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ visible: false })}
              style={{ height: '100%', width: '100%', position: 'absolute' }}
            />
            <View
              style={{
                backgroundColor: '#fff',
                overflow: 'scroll',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ visible: false })}
                  style={{
                    width: 90,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: color.primeColor, fontFamily: font.reg }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    flex: 1,
                    color: color.fontblack,
                    fontFamily: font.semi,
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                >
                  Add Project
                </Text>
                <TouchableOpacity
                  onPress={() => null}
                  style={{
                    width: 90,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: color.primeColor, fontFamily: font.reg }}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form */}
              <ScrollView
                bounces={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              >
                <View style={{ paddingHorizontal: 20 }}>
                  <View style={{ paddingVertical: 20 }}>
                    {name ? (
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          fontSize: 12,
                        }}
                      >
                        Name
                      </Text>
                    ) : null}
                    <TextInput
                      placeholder="Enter Name"
                      style={{ fontFamily: font.reg, color: '#000' }}
                      placeholderTextColor={color.lableColor}
                      value={name}
                      onChangeText={(_name) => this.setState({ name: _name })}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/link.png')}
                      style={{ height: 18, width: 18, resizeMode: 'contain' }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {related ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Related To
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Related To"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={related}
                        onChangeText={(_related) =>
                          this.setState({ related: _related })
                        }
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/user.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: '#56CA00',
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          marginBottom: 5,
                          fontSize: 12,
                        }}
                      >
                        Owner
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        Gusskarlis
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/arrowuser.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: '#139CE0',
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          marginBottom: 5,
                          fontSize: 12,
                        }}
                      >
                        Status
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        Open
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/des.png')}
                      style={{ height: 18, width: 18, resizeMode: 'contain' }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {description ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Description
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Description"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={description}
                        onChangeText={(_description) =>
                          this.setState({ description: _description })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/hashtag.png')}
                      style={{ height: 18, width: 18, resizeMode: 'contain' }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {tag ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Tags
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Tags"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={tag}
                        onChangeText={(_tag) => this.setState({ tag: _tag })}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
              <SafeAreaView />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    )
  }
}
