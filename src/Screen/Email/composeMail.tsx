import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {AppText} from '@starlingtech/element';
import {RichEditor} from 'react-native-pell-rich-editor';

import {colorDefault} from '@vn.starlingTech/theme/theming';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import {EmailMessage} from './components/EmailMessage';
import EmailTemplate from './components/EmailTemplate';
import Header from '../../Component/Header';

type State = {
  message: string;
  subject: string;
  details: any;
  data: any;
  isLoading: boolean;
  active: number;
  templateName: any;
  templateCategory: any[];
  templateText: any;
  templateList: [];
};

export default class ComposeMail extends Component<AppScreenProps, State> {
  state: State = {
    message: '',
    subject: '',
    details: null,
    data: null,
    isLoading: false,
    active: 2,
    templateName: {},
    templateCategory: [],
    templateText: null,
    templateList: [],
  };
  richText = React.createRef<RichEditor>();
  accessToken = useAppStore.getState().accessToken;
  details = this.props.route?.params?.detail;
  data = this.props.route?.params?.data;

  // async componentDidMount() {
  //   const details = this.props.route?.params?.detail
  //   this.setState({ details: details })
  //   await this.activityTickets()
  // }

  // activityTickets() {
  //   this.setState({ isLoading: true })
  //   fetch(`${API.templateCategory}/email`, {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: {
  //       Accept: '*/*',
  //       access_token: this.accessToken,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (response) => {
  //       console.log('response', response)
  //       if (response.length) {
  //         this.setState({ isLoading: false, templateCategory: response })
  //       } else {
  //         this.setState({ isLoading: false })
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ isLoading: false })
  //       console.log(error)
  //     })
  // }

  // getTemplateList(val: any) {
  //   this.setState({ isLoading: true, templateName: val })
  //   fetch(`${API.emailTemplateList}/${val.id}`, {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: {
  //       Accept: '*/*',
  //       access_token: this.accessToken,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (response) => {
  //       console.log('response', response)
  //       if (response.data.length) {
  //         this.setState({ isLoading: false, templateList: response.data })
  //       } else {
  //         this.setState({ isLoading: false })
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ isLoading: false })
  //       console.log(error)
  //     })
  // }

  // sendMail(val?: RespTemplateEmailMessage_Data) {
  //   const { subject, message } = this.state
  //   const details = this.props.route?.params?.detail
  //   var data = {
  //     subject: val && val.subject ? val.subject : subject,
  //     message: val && val.body ? val.body : message,
  //   }
  //   this.setState({ isLoading: true })

  //   fetch(`${API.communicationEmail}/${details.id}`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: '*/*',
  //       access_token: this.accessToken,
  //     },
  //   })
  //     .then((response) => response)
  //     .then(async (response) => {
  //       if (response) {
  //         this.setState({ isLoading: false })
  //         Alert.alert('Success', 'Email Sent Successfully', [
  //           { text: 'OK', onPress: () => this.props.navigation.goBack() },
  //         ])
  //         setTimeout(() => {
  //           this.props.navigation.goBack()
  //         }, 1000)
  //       } else {
  //         this.setState({ isLoading: false })
  //       }
  //     })
  //     .catch((e) => {
  //       // this.setState({ isLoading: false });
  //       console.log('error: ', e)
  //     })
  // }

  // checkEmpty() {
  //   const { subject, message } = this.state
  //   if (subject === '' || message === '') {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // updateTemplate = (data: any) => {
  //   const { templateText } = this.state
  //   const newEmailBody = {
  //     ...templateText,
  //     body: data,
  //   }
  //   this.setState({ templateText: newEmailBody })
  // }

  // selectTemplate = (data: any) => {
  //   this.setState({ templateText: data })
  //   if (this.richText.current) {
  //     this.richText.current?.setContentHTML(data.body.trim())
  //   }
  // }

  // onEditorInitialized = () => {
  //   const { templateText } = this.state
  //   this.richText.current?.setContentHTML(templateText.body.trim())
  // }

  render() {
    const {active} = this.state;
    return (
      <View style={styles.container}>
        <Header
          title="Compose Mail"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />

        <View style={styles.tab}>
          <TouchableOpacity
            onPress={() => this.setState({active: 2})}
            style={[styles.tabItem, active === 2 && styles.tabItemActive]}>
            <AppText color={active === 2 ? 'secondary' : 'placeholder'}>
              Custom Message
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({active: 1})}
            style={[styles.tabItem, active === 1 && styles.tabItemActive]}>
            <AppText color={active === 1 ? 'secondary' : 'placeholder'}>
              Email Template
            </AppText>
          </TouchableOpacity>
        </View>

        {active === 1 ? (
          <EmailTemplate details={this.details} data={this.data} />
        ) : (
          <EmailMessage details={this.details} data={this.data} />
        )}

        {/* {isLoading && (
          <View style={styles.isLoading}>
            <ActivityIndicator color={'blue'} />
          </View>
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  // isLoading: {
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   height: '100%',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   width: '100%',
  // },
  tab: {
    borderBottomColor: colorDefault.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 50,
  },
  tabItem: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  tabItemActive: {
    borderBottomColor: colorDefault.secondary,
    borderBottomWidth: 2,
    flex: 1,
  },
});
