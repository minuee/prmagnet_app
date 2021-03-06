import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {CommonActions} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {Header} from 'react-native-elements'

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
const alarmNewImage = require('../images/navi/alarm_new.png')

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
  reactComp.pushOption = screenName =>
    navigation.setOptions({
      title: screenName,
      headerStyle: {backgroundColor: mConst.white, shadowColor: 'transparent', elevation: 0},
      headerTitleStyle: {fontSize: mUtils.wScale(21), alignSelf: 'center'},
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 12}} onPress={reactComp.pop}>
          <FastImage style={{width: 30, height: 30}} source={backBtnImage} />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <View style={{marginRight: (mConst.wGapUnit * 3) / 5}}>
      //     <Text style={{fontSize: 18, color: mConst.textBaseColor, fontWeight: 'bold'}}>{screenName}</Text>
      //   </View>
      // ),
    })
  reactComp.closeBackOption = (left, center, right) => (
    <Header
      backgroundColor={'#ffffff'}
      barStyle="dark-content"
      statusBarProps={{
        translucent: true,
        backgroundColor: '#ffffff',
      }}
      containerStyle={{
        borderBottomWidth: 0,
      }}
      leftComponent={
        <TouchableOpacity onPress={reactComp.goBack} style={{paddingLeft: 12}}>
          <FastImage style={{width: 30, height: 30}} source={left} />
        </TouchableOpacity>
      }
      centerComponent={<Text style={{fontSize: 21, color: mConst.textBaseColor, fontWeight: 'bold'}}>{center}</Text>}
      centerContainerStyle={{justifyContent: 'center'}}
      rightComponent={
        <TouchableOpacity disabled={right ? false : true} style={{paddingLeft: 12}}>
          <FastImage style={{width: 30, height: 30}} source={right} />
        </TouchableOpacity>
      }
    />
  )

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
  reactComp.reset = screenName => navigation.dispatch(CommonActions.reset({routes: [{name: screenName}]}))
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
  reactComp.showErrorMsg = (e, msg = '??????????????? ??????????????????. ?????? ??????????????????.', onPress) => {
    const serverMsg = _.get(e, 'response.data.msg', msg)
    alert('', serverMsg, [{text: '??????', onPress}])
  }
  reactComp.notReady = () => {
    alert('', '????????? ?????? ????????????.')
  }
}

export default cBind
