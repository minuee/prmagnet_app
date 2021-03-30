import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {CommonActions} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import {alert} from '../screens/common/Alert'
import Text from '../screens/common/Text'
import mConst from './constants'
import mUtils from './utils'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

const DOUBLE_TAP_DELAY = 1000
export const callOnce = callback => _.throttle(callback, DOUBLE_TAP_DELAY, {trailing: false})
export const callOnceShort = callback => _.throttle(callback, DOUBLE_TAP_DELAY / 2, {trailing: false})

const backBtnImage = require('../images/navi/back.png')
const closeBtnImage = require('../images/navi/close.png')
const menuBtnImage = require('../images/navi/menu.png')
const alarmImage = require('../images/navi/alarm.png')
const linkImage = require('../images/navi/link.png')
const alarmNewImage = require('../images/navi/alarm_new.png')

const fontCheck = font => {
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  return check_kor.test(font)
}

const cBind = reactComp => {
  const {navigation, route} = reactComp.props
  reactComp.params = _.get(route, 'params', {})
  reactComp.emptyOption = screenName =>
    navigation.setOptions({
      title: '',
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerLeft: () => null,
      headerRight: () => (
        <View style={{marginRight: (mConst.wGapUnit * 3) / 5}}>
          <Text style={{fontSize: 18, color: mConst.textBaseColor, fontWeight: 'bold'}}>{screenName}</Text>
        </View>
      ),
    })
  reactComp.pushOption = (screenName, link) =>
    navigation.setOptions({
      title: screenName,
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerTitleStyle: {fontSize: mUtils.wScale(21), alignSelf: 'center', fontFamily: fontCheck(screenName) ? 'NotoSansKR-Medium' : 'Roboto-Bold'},
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={reactComp.pop}>
          <FastImage style={{width: 10, height: 18}} source={backBtnImage} />
        </TouchableOpacity>
      ),
      headerRight: () =>
        link ? (
          <TouchableOpacity style={{paddingHorizontal: 20}} onPress={reactComp.notReady}>
            <FastImage style={{width: 20, height: 20}} source={linkImage} />
          </TouchableOpacity>
        ) : null,
    })
  reactComp.logOutOption = (screenName, logout) =>
    navigation.setOptions({
      title: screenName,
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerTitleStyle: {fontSize: mUtils.wScale(21), alignSelf: 'center', fontFamily: fontCheck(screenName) ? 'NotoSansKR-Medium' : 'Roboto-Bold'},
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={reactComp.pop}>
          <FastImage style={{width: 10, height: 18}} source={backBtnImage} />
        </TouchableOpacity>
      ),
      headerRight: () =>
        logout ? (
          <TouchableOpacity
            style={{paddingHorizontal: 20}}
            onPress={() => {
              reactComp.alert('로그아웃', '로그아웃 하시겠습니까?', [
                {
                  onPress: () => logout(),
                },
                {onPress: () => null},
              ])
            }}
          >
            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 16, textAlign: 'right', color: '#999999'}}>로그아웃</Text>
          </TouchableOpacity>
        ) : null,
    })
  reactComp.modalOption = screenName =>
    navigation.setOptions({
      title: screenName,
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerTitleStyle: {fontSize: mUtils.wScale(21), alignSelf: 'center', fontFamily: fontCheck(screenName) ? 'NotoSansKR-Medium' : 'Roboto-Bold'},
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={() => reactComp.goBack()}>
          <FastImage style={{width: 30, height: 30}} source={closeBtnImage} />
        </TouchableOpacity>
      ),
    })
  reactComp.menuOption = () =>
    navigation.setOptions({
      title: 'PRMagnet',
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerTitleStyle: {fontSize: mUtils.wScale(23), color: mConst.getBaseColor(), alignSelf: 'center'},
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 12}} onPress={reactComp.openMenu}>
          <FastImage style={{width: mUtils.wScale(35), height: mUtils.wScale(35)}} source={menuBtnImage} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{paddingHorizontal: mConst.wGapUnit / 3}} onPress={null}>
          <FastImage style={{width: mUtils.wScale(35), height: mUtils.wScale(35)}} source={alarmImage} />
        </TouchableOpacity>
      ),
    })
  reactComp.pushTo = (screenName, params) => navigation.navigate(screenName, params)
  reactComp.pop = () => navigation.pop()
  reactComp.goBack = () => navigation.goBack()
  reactComp.popToTop = () => navigation.popToTop()
  reactComp.openMenu = () => navigation.openDrawer()
  reactComp.closeMenu = () => navigation.closeDrawer()
  reactComp.goMenu = (screenName, params) => {
    navigation.closeDrawer()
    navigation.navigate(screenName, params)
  }
  reactComp.reset = (screenName, params) => navigation.dispatch(CommonActions.reset({routes: [{name: screenName, params}]}))
  reactComp.onFocus = cb => (reactComp.removeFocus = navigation.addListener('focus', cb))

  reactComp.changeInputText = property => text => {
    reactComp.setState({
      [property]: text.trim(),
    })
  }
  reactComp.changeInputTextArea = property => text => {
    reactComp.setState({
      [property]: text,
    })
  }
  reactComp.changeInputNumber = property => num => {
    reactComp.setState({
      [property]: num,
    })
  }
  reactComp.alert = (title, content, button) => {
    alert(title, content, button)
  }
  reactComp.showErrorMsg = (e, msg = '네트워크가 불안정합니다. 다시 시도해주세요.', onPress) => {
    const serverMsg = _.get(e, 'response.data.msg', msg)
    alert('', serverMsg, [{text: '확인', onPress}])
  }
  reactComp.notReady = () => {
    alert('', '서비스 준비 중입니다.')
  }
}

export default cBind
