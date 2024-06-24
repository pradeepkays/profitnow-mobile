import React, { Component } from 'react'
import { View } from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import { ContactDetailContent } from './components/ContactDetailContent'
import { LogActivity } from './components/LogActivity'

type State = {
  visiblelogactivity: boolean
  detail: any
  modalSheetName: string
  isEditVisible: boolean
}

export default class UserDetails extends Component<AppScreenProps, State> {
  id: number

  constructor(props: AppScreenProps) {
    super(props)
    this.id = this.props?.route?.params?.id
    this.state = {
      visiblelogactivity: false,
      detail: {},
      modalSheetName: '',
      isEditVisible: false,
    }
  }

  componentDidMount = async () => {
    useAppStore.setState({ isTabBar: true, activeRoute: 'ContactCompany' })
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<AppScreenProps>): void {
    this.id = nextProps.route?.params?.id
  }

  willFocus = () => {
    useAppStore.setState({ isTabBar: true, activeRoute: 'ContactCompany' })
    this.id = this.props.route?.params?.id
  }

  handleEmail = () => {
    this.props.navigation.navigate('Home')
  }

  closeLogActivity = () => {
    this.setState({
      visiblelogactivity: false,
    })
  }

  handleModal = (modalSheetName: string) => {
    this.setState({ modalSheetName })
  }

  render() {
    const { visiblelogactivity } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ContactDetailContent handleModal={this.handleModal} id={this.id} />

        {/* Log Activity */}
        <LogActivity
          visible={visiblelogactivity}
          onClose={this.closeLogActivity}
        />

        {/* {isEditVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ isEditVisible: false })}
            style={{
              position: 'absolute',
              height: height,
              width: width,
              backgroundColor: '#0000',
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: 100,
                  position: 'absolute',
                  right: 20,
                  top: StatusBarManager.HEIGHT + 25,
                  height: 60,
                }}
              >
                <View
                  style={{
                    ...shadow,
                    borderRadius: 8,
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('AddContact', {
                        detail: detail,
                      })
                      this.setState({ isEditVisible: false })
                    }}
                  >
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                        textAlign: 'center',
                        marginLeft: 20,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        )} */}

        {/* <ModalComponent
          isVisible={modalSheetName === 'emailModal'}
          onRequestClose={() => this.setState({ modalSheetName: '' })}
        >
          <EmailModal
            handleClose={() => this.setState({ modalSheetName: '' })}
            detail={detail}
          />
        </ModalComponent> */}

        {/* <ModalComponent
          isVisible={modalSheetName === 'smsModal'}
          onRequestClose={() => this.setState({ modalSheetName: '' })}
        >
          <SmsModal
            handleClose={() => this.setState({ modalSheetName: '' })}
            detail={detail}
          />
        </ModalComponent> */}
      </View>
    )
  }
}
