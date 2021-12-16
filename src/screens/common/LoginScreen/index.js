import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, Linking} from 'react-native'
import {connect} from 'react-redux'
import {sha256} from 'react-native-sha256'
import _ from 'lodash'

import {actionLogin, actionUserType,actionSubScrbeStatus} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import API from '../../../common/aws-api'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import FastImage from 'react-native-fast-image'

const logoImg = require('../../../images/logo_2.png')

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      // email: 'test1000@ruu.kr',
      // pw: 'test1000@ruu.kr',
      // email: 'gucci@ruu.kr', // 브랜드 테스트
      //email: 'bazzar@ruu.kr', // 매거진 테스트
      // email: 'cosmo@ruu.kr', // 매거진 테스트
      // email: 'arena@ruu.kr', // 매거진 테스트
      // email: 'dazed@ruu.kr', // 매거진 테스트
      // email: 'elle@ruu.kr', // 매거진 테스트
      //pw: '1234qwer',
    }
  }
  componentDidMount() {
    this.pushOption('');
    if ( __DEV__) {
      this.setState({
        email: 'celine@ruu.kr',
        pw: '1234qwer'
      })
    }
  }
  handleLogin = callOnce(async () => {
    const {email, pw} = this.state
    const {loginSuccess, loginFailure, userTypeSuccess,userSubScrbeStatus} = this.props
    const hash = await sha256(pw.toString())
    const pushKey = await mUtils.getFcmToken()
    const data = {
      email,
      pw, // : hash, //TODO 추후 암호화 적용
    }
    if (email.trim() === '') return this.alert('', '이메일을 입력해주세요.')
    if (!mUtils.isEmail(email)) return this.alert('', '이메일 형식이 아닙니다.')
    if (pw.trim() === '') return this.alert('', '비밀번호를 입력해주세요.')
    // if (!mUtils.isPassword(pw)) return this.alert('', '비밀번호 형식을 확인해주세요.') // TODO 임시 주석 처리  
    await mUtils.setFcmTopicClear();
    API.login(data, {
      cbSuccess: async response => {
        API.getUserType()
          .then(resUserType => {
            ///console.log('###UserType:', resUserType)
            let isSubscrYN = false;
            if ( resUserType.is_brand_user ) {
              if ( resUserType.subscr_yn){
                isSubscrYN = true;
              }else{
                isSubscrYN = false;
              }
              if ( resUserType.notice_notifi_recv_yn ) mUtils.setFcmTopic('B');
            }else{
              isSubscrYN = true;
              if ( resUserType.notice_notifi_recv_yn )  mUtils.setFcmTopic('M');
            }
            userSubScrbeStatus(isSubscrYN);
            userTypeSuccess(resUserType)
            loginSuccess(response)
          })
          .then(() => API.setPushToken({token_value: pushKey}))
          //console.log('###로그인 성공:', response)
          //console.log('로그인 시 props 확인 : ', this.props)
      },
      cbFailure: e => {
        loginFailure(e)
        console.log('###로그인 실패', e)
        // this.showErrorMsg(e)
      },
    })
  })
  handleJoin = callOnce(async () => {
    await Linking.openURL('http://fpr-prod-web.s3-website.ap-northeast-2.amazonaws.com/join')
  })
  handleFindId = callOnce(async () => {
    await Linking.openURL('http://fpr-prod-web.s3-website.ap-northeast-2.amazonaws.com/find-id')
  })
  handleFindPw = callOnce(async () => {
    await Linking.openURL('http://fpr-prod-web.s3-website.ap-northeast-2.amazonaws.com/find-pw')
  })
  render() {
    const {email, pw} = this.state
    return (
      <KeyboardAvoidingView behavior={mConst.bIos ? 'padding' : null} style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <View style={styles.screenTitleView}>
            <FastImage resizeMode={'contain'} style={styles.logoImg} source={logoImg} />
          </View>
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
            <TouchableOpacity style={styles.joinButtonWrapper} onPress={this.handleJoin}>
              <Text style={styles.joinButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lowerWrapper}>
            <View style={styles.lowerSubWrapper}>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.handleFindId}>
                <Text style={styles.itemText}>아이디 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={this.handleFindPw}>
                <Text style={styles.itemText}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* TODO 임시 테스트용 아이디 비번 설정 Start--------------------------------------------------------- */}
          {/* <View style={{justifyContents: 'center', paddingTop: 0, backgroundColor: 'gray'}}>
            <View style={styles.lowerSubWrapper}>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={() => this.setState({email: 'gucci@ruu.kr', pw: '1234qwer'})}>
                <Text style={styles.itemText}>B:gucci</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={() => this.setState({email: 'bazzar@ruu.kr', pw: '1234qwer'})}>
                <Text style={styles.itemText}>M:bazzar</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={() => this.setState({email: 'minuee@nate.com', pw: 'lenapark47##'})}>
                <Text style={styles.itemText}>M:minuee</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={() => this.setState({email: 'celine@ruu.kr', pw: '1234qwer'})}>
                <Text style={styles.itemText}>B:celine</Text>
              </TouchableOpacity>
              <Text style={styles.fence}>|</Text>
              <TouchableOpacity style={styles.itemTextWrapper} onPress={() => this.setState({email: 'elle@ruu.kr', pw: '1234qwer'})}>
                <Text style={styles.itemText}>M:elle</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* TODO 임시 테스트용 아이디 비번 설정 End--------------------------------------------------------- */}
        </SafeAreaView>
        <CodePush />
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    loginSuccess: data => dispatch(actionLogin.success(data)),
    loginFailure: data => dispatch(actionLogin.failure(data)),
    userTypeSuccess: data => dispatch(actionUserType.success(data)),
    userSubScrbeStatus: data => dispatch(actionSubScrbeStatus.success(data)),
  })
)(LoginScreen)
