import React, {PureComponent} from 'react'
import {KeyboardAvoidingView, SafeAreaView, View, Platform,TouchableWithoutFeedback, TouchableOpacity, TextInput, Linking} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/AntDesign';
import {actionLogin, actionUserType,actionSubScrbeStatus} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import API from '../../../common/aws-api'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler'
const logoImg = require('../../../images/logo_2.png')

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = { 
      pushKey : null,
      email : '',
      pw : '',
      historyLogin : []
      // email: 'test1000@ruu.kr',
      // pw: 'test1000@ruu.kr',
      // email: 'gucci@ruu.kr', // 브랜드 테스트
      //email: 'bazzar@ruu.kr', // 매거진 테스트
      // email: 'cosmo@ruu.kr', // 매거진 테스트
      // email: 'arena@ruu.kr', // 매거진 테스트
      // email: 'dazed@ruu.kr', // 매거진 테스트
      // email: 'elle@ruu.kr', // 매거진 테스트
      //pw: '1234qwer',
      // email: minuee@nate.com, pw: lenapark47##,
      // email: Katie.choi@gucci.com pw : Reww0208!
      //  kimkim979797@naver.com/ Khjkhj413**
    }
  }

  async UNSAFE_componentWillMount() {
    //AsyncStorage.removeItem('historyLogin');
    const historyLogin = await AsyncStorage.getItem('historyLogin'); 
    console.log("historyLogin",historyLogin)
    if ( historyLogin != undefined && historyLogin != null ) {
      this.setState({
        historyLogin: JSON.parse(historyLogin)
      })
    }
  }


  async componentDidMount() {
    this.emptyOption('');
    const pushKey = await mUtils.getFcmToken();
    if ( __DEV__) {
      this.setState({
        email: 'minuee@nate.com',
        pw: 'lenapark47##',
        pushKey
      })
    }else{
      this.setState({pushKey})
    }
   
  }
  handleLogin2 = callOnce(async () => {
    try{
      API.setUserActive();
      console.log('###setUserActive :')
    }catch(e){
      console.log('###setUsereeeeee :',e)
    }
    
  })
  handleLogin = callOnce(async () => {
    const {email, pw, pushKey,historyLogin} = this.state;
    const {loginSuccess, loginFailure, userTypeSuccess,userSubScrbeStatus} = this.props;
    const isExistEmail =  historyLogin.filter((element) =>  element.id != email) ;
    const saveExistEmail = isExistEmail.concat({id:email, pw:pw})
    const data = {
      email,
      pw, // : hash, //TODO 추후 암호화 적용
    }
    
    if (email.trim() == '') {
      this.alert('', '이메일을 입력해주세요.');
      return;
    }
    if (!mUtils.isEmail(email)) {
      this.alert('', '이메일 형식이 아닙니다.');
      return;
    }
    if (pw.trim() == '' ) {
      this.alert('', '비밀번호를 입력해주세요.');
      return;
    }
    
    await mUtils.setFcmTopicClear();
    API.login(data, {
      cbSuccess: async response => {
        API.getUserType()
          .then(resUserType => {

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
            AsyncStorage.setItem('myInformation', JSON.stringify(resUserType));
            
            AsyncStorage.setItem('historyLogin', JSON.stringify(saveExistEmail));
            userSubScrbeStatus(isSubscrYN);
            userTypeSuccess(resUserType)
            loginSuccess(response)
              if ( pushKey ) {
                API.setPushToken({token_value: pushKey})
                console.log('###로그인 성공:', pushKey)
              }
          })
          .then(async() =>  console.log('###로그인 성공222:', pushKey))
          //console.log('로그인 시 props 확인 : ', this.props)
      },
      cbFailure: error => {
        loginFailure(error)
        console.log('###로그인 실패', error)
        if( error.code === 'NotAuthorizedException') {
          if ( error.message.includes('exceeded')) {
              this.alert('PR Magnet관리자', '인증시도가 초과되었습니다. 3시간이후에 시도해주세요.');
              return false;
          }else{
              this.alert('PR Magnet관리자', '없는 계정이거나 비밀번호가 맞지 않습니다.');
              return false;
          }
        }else if( error.code === 'UserNotFoundException') {
            this.alert('PR Magnet관리자', '없는 계정이거나 사용중인 계정이 아닙니다.');
            return false;
        }else if( error.code === 'LimitExceededException') {
            this.alert('PR Magnet관리자', '인증시도가 초과되었습니다. 3시간이후에 시도해주세요.');
            return false;
        }else if( error.code === 'PasswordResetRequiredException') {
            this.alert('PR Magnet관리자', '비밀번호가 만료되었습니다.. 관리자에게 문의하세요.');
            return false;
        }else{
          this.showErrorMsg(error)
        }
      },
    })
  })
  handleJoin = callOnce(async () => {
    //const moveUrl =  Platform.OS === 'ios' ? 'https://www.prmagnet.kr/#/join' : 'https://www.prmagnet.co.kr/#/join';
    //this.pushTo('WebviewScreen', {url: moveUrl, title:'회원가입'})
    await Linking.openURL('https://www.prmagnet.kr/#/join')
  })
  handleFindId = callOnce(async () => {
    //const moveUrl =  Platform.OS === 'ios' ? 'https://www.prmagnet.kr/#/find-id' : 'https://www.prmagnet.kr/find-id';
    //this.pushTo('WebviewScreen', {url:moveUrl , title:'아이디 찾기'})
    await Linking.openURL('https://www.prmagnet.kr/#/find-id')
  })
  handleFindPw = callOnce(async () => {
    //const moveUrl =  Platform.OS === 'ios' ? 'https://www.prmagnet.kr/#/find-pw' : 'https://www.prmagnet.kr/find-pw';
    //this.pushTo('WebviewScreen', {url: moveUrl, title:'비밀번호 찾기'})
    await Linking.openURL('https://www.prmagnet.kr/#/find-pw')
  })

  removeItems = callOnce(async (id) => {
    console.log("removeItems",id)
    const {historyLogin} = this.state;
    console.log("historyLogin",historyLogin)
    const isExistEmail =  await historyLogin.filter((element) =>  element.id != id) ;
    console.log("isExistEmail",isExistEmail)
    this.setState({historyLogin : isExistEmail})
    AsyncStorage.setItem('historyLogin', JSON.stringify(isExistEmail));
  })

  render() {
    const {email, pw,historyLogin} = this.state
    return (
      <KeyboardAvoidingView behavior={mConst.bIos ? 'padding' : null} style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <View style={styles.screenTitleView}>
            <FastImage resizeMode={'contain'} style={styles.logoImg} source={logoImg} />
          </View>
          {/* <PushHeader onPress={this.pop} /> */}
          <View style={styles.upperWrapper}>
            <Text style={styles.inputTitleText}>이메일</Text>
            <TouchableWithoutFeedback onPress={() => this.emailInput.focus()} style={{marginBottom:10}}>
              <View style={[styles.inputTextWrapper,{marginBottom:15}]}>
                <TextInput
                  ref={comp => (this.emailInput = comp)}
                  style={styles.input}
                  placeholderTextColor={mConst.textPhColor}
                  value={email}
                  //onChangeText={this.changeInputText('email')}
                  onChangeText={(value)=> this.setState({email : value.trim()})}
                  placeholder="이메일을 입력해주세요."
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  onSubmitEditing={() => this.passInput.focus()}
                  keyboardType="email-address"
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={100}
                  textContentType={'username'}
                  clearButtonMode={'always'}
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
                  //onChangeText={this.changeInputText('pw')}
                  onChangeText={(value)=> this.setState({pw : value.trim()})}
                  returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                  placeholder="영문 대소문자/숫자/특수문자 포함 8-16자리"
                  onSubmitEditing={this.handleLogin}
                  autoCompleteType="off"
                  autoCapitalize="none"
                  maxLength={16}
                  secureTextEntry={true}
                  textContentType={'password'}
                  clearButtonMode={'always'}
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
         {/*  <View style={styles.lowerWrapper}>
            <Text style={styles.itemText}>회원가입,아이디/비밀번호찾기는 사이트를 이용</Text>
          </View> */}
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flex:1,marginTop:10}}
          >
            {historyLogin?.length > 1 && (
            <View style={styles.idWrap}>
              {
                historyLogin.map((d, i) => {
                  return (
                    <View style={styles.itemTextWrapper} >
                      <TouchableOpacity
                        onPress={() => this.setState({email: d.id, pw: d.pw})}
                      >
                        <Text style={styles.itemText}>{d.id}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.itemClose}
                        onPress={() => this.removeItems(d.id)}
                      >
                         <Icon name="close" size={mUtils.wScale(20)} color="#000" />
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
            )}
          </ScrollView>
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
