import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {sha256} from 'react-native-sha256'
import _ from 'lodash'

import {actionLogin} from '../../../redux/actions'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import PushHeader from '../../common/PushHeader'
import styles from './styles'

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      phone: '',
      pw: '',
    }
  }
  handleLogin = callOnce(async () => {
    const {login} = this.props
    const {phone, pw} = this.state
    const hash = await sha256(pw.toString())
    const data = {
      mobile_no: phone,
      user_pass: hash,
    }
    login(data, {
      cbSuccess: response => {
        // console.log('로그인 시 props 확인 : ', this.props)
      },
      cbFailure: e => {
        // console.log('로그인 실패 : ', e)
        this.showErrorMsg(e)
      },
    })
  })
  render() {
    const {phone, pw} = this.state
    return (
      <KeyboardAvoidingView behavior={mConst.bIos ? 'padding' : null} style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <PushHeader onPress={this.pop} />
          <View style={styles.lowerWrapper}>
            <TouchableWithoutFeedback onPress={() => this.phoneInput.focus()}>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  ref={comp => (this.phoneInput = comp)}
                  style={styles.input}
                  placeholderTextColor={mConst.textPhColor}
                  value={mUtils.phoneFormat(phone)}
                  onChangeText={this.changeInputText('phone')}
                  placeholder="휴대폰 번호"
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  onSubmitEditing={() => this.passInput.focus()}
                  keyboardType="number-pad"
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={13}
                  textContentType={'username'}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.passInput.focus()}>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  ref={comp => (this.passInput = comp)}
                  style={styles.input}
                  placeholderTextColor={mConst.textPhColor}
                  value={pw}
                  onChangeText={this.changeInputText('pw')}
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  placeholder="비밀번호"
                  onSubmitEditing={this.handleLogin}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={20}
                  secureTextEntry={true}
                  textContentType={'password'}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.lowerSubWrapper}>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.notReady}>
                <Text style={styles.itemText}>
                  {'     '}비밀번호 찾기{'     '}
                </Text>
              </TouchableOpacity>
              <Text style={styles.itemText}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.notReady}>
                <Text style={styles.itemText}>
                  {'     '}회원가입{'     '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomWrapper}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    login: (data, rest) => dispatch(actionLogin.request(data, rest)),
  })
)(LoginScreen)
