import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {sha256} from 'react-native-sha256'
import _ from 'lodash'

import {actionLogin} from '../../../redux/actions'
import {login} from '../../../common/aws-auth'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      email: 'test1000@ruu.kr',
      pw: 'test1000@ruu.kr',
    }
  }
  componentDidMount() {
    this.pushOption('')
  }
  handleLogin = callOnce(async () => {
    const {email, pw} = this.state
    const {loginSuccess, loginFailure} = this.props
    const hash = await sha256(pw.toString())
    const data = {
      email,
      pw, // : hash, //TODO 추후 암호화 적용
    }
    if (email.trim() === '') return this.alert('', '이메일을 입력해주세요.')
    if (!mUtils.isEmail(email)) return this.alert('', '이메일 형식이 아닙니다.')
    if (pw.trim() === '') return this.alert('', '비밀번호를 입력해주세요.')
    if (!mUtils.isPassword(pw)) return this.alert('', '비밀번호 형식을 확인해주세요.')
    login(data, {
      cbSuccess: async response => {
        loginSuccess(response)
        console.log('###로그인 성공:', response)
        // console.log('로그인 시 props 확인 : ', this.props)
      },
      cbFailure: e => {
        loginFailure(e)
        console.log('###로그인 실패', e)
        // this.showErrorMsg(e)
      },
    })
  })
  render() {
    const {email, pw} = this.state
    return (
      <KeyboardAvoidingView behavior={mConst.bIos ? 'padding' : null} style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.screenTitleText}>로그인</Text>
          {/* <PushHeader onPress={this.pop} /> */}
          <View style={styles.upperWrapper}>
            <Text style={styles.inputTitleText}>이메일</Text>
            <TouchableWithoutFeedback onPress={() => this.emailInput.focus()}>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  ref={comp => (this.emailInput = comp)}
                  style={styles.input}
                  placeholderTextColor={mConst.textPhColor}
                  value={email}
                  onChangeText={this.changeInputText('email')}
                  placeholder="이메일을 입력해주세요."
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  onSubmitEditing={() => this.passInput.focus()}
                  keyboardType="email-address"
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={100}
                  textContentType={'username'}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.inputTitleText}>비밀번호</Text>
            <TouchableWithoutFeedback onPress={() => this.passInput.focus()}>
              <View style={styles.inputTextWrapper}>
                <TextInput
                  ref={comp => (this.passInput = comp)}
                  style={styles.input}
                  placeholderTextColor={mConst.textPhColor}
                  value={pw}
                  onChangeText={this.changeInputText('pw')}
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  placeholder="8자리 이상 숫자, 문자 조합"
                  onSubmitEditing={this.handleLogin}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={16}
                  secureTextEntry={true}
                  textContentType={'password'}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.middleWrapper}>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handleLogin}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButtonWrapper} onPress={this.notReady}>
              <Text style={styles.joinButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lowerWrapper}>
            <View style={styles.lowerSubWrapper}>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.notReady}>
                <Text style={styles.itemText}>아이디 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.notReady}>
                <Text style={styles.itemText}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>
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
    loginSuccess: data => dispatch(actionLogin.success(data)),
    loginFailure: data => dispatch(actionLogin.failure(data)),
  })
)(LoginScreen)
