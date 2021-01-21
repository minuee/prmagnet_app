import {Dimensions, Platform, StatusBar} from 'react-native'
import {isIphoneX, getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper'

const PRODUCTION = false // 배포 버전 여부(개발은 false)
const STAGE = false // QA 버전 여부(개발은 false)
const STORYBOOK = false // 스토리북 적용 여부

const PROD_APIURI = 'http://211.42.197.193:3034' // AWS 실서비스 주소
const STG_APIURI = 'http://211.42.197.193:3034' // QA 서비스 주소
const DEV_APIURI = 'http://211.42.197.193:3034' // 개발 주소

const TESTLOGGING = false

const window = Dimensions.get('window')

const shadow = {
  shadowColor: 'black',
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 0.15,
  elevation: 3,
}

export default {
  PRODUCTION,
  STAGE,
  STORYBOOK: !PRODUCTION && !STAGE && STORYBOOK,
  TESTLOGGING,
  getApiUri: () => (PRODUCTION ? PROD_APIURI : STAGE ? STG_APIURI : DEV_APIURI),
  baseColor: '#7ea1b2',
  white: '#ffffff',
  black: '#000000',
  blue: '#0046ff',
  red: '#ee002c',
  gray: '#999999',
  darkGray: '#656565',
  darkBlue: '#0450c2',
  lightBlue: '#c1d2ff',
  lightGray: '#f4f4f4',
  textBaseColor: '#000000',
  textPhColor: '#b8b8b8',
  textGray: '#999999',
  borderGray: '#dddddd',
  shadow,
  navTopBgOption: {background: {color: '#ffc102'}},
  wWidth: window.width,
  wHeight: window.height,
  wGapUnit: window.width / 10,
  hGapUnit: window.height / 10,
  wRatio: window.height / window.width,
  hRatio: window.width / window.height,
  bAndroid: Platform.OS === 'android',
  bIos: Platform.OS === 'ios',
  osVersion: parseInt(Platform.Version, 10),
  statusHeight: StatusBar.currentHeight,
  navigationBarHeight: Platform.OS === 'ios' ? 60 : 56,
  bottomSpace: isIphoneX() ? getBottomSpace() : 0,
  bottomTabHeight: 50 + (isIphoneX() ? getBottomSpace() : 0),
  lf: '\n',
}
