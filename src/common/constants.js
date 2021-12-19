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
  appName : "PR MAGNET",
  PRODUCTION,
  STAGE,
  STORYBOOK: !PRODUCTION && !STAGE && STORYBOOK,
  TESTLOGGING,
  getApiUri: () => (PRODUCTION ? PROD_APIURI : STAGE ? STG_APIURI : DEV_APIURI),
  getUserType: () => global.mUserType || 'B',
  getSubScrbeStatus: () => global.subScrbeStatus || false,
  getBaseColor: () => (global.mUserType === 'B' ? '#7ea1b2' : '#000000'),
  getBaseXColor: () => (global.mUserType === 'B' ? '#000000' : '#7ea1b2'),
  getBaseXColorDirect: userType => (userType === 'B' ? '#000000' : '#7ea1b2'),
  getApiPath: () => (global.mUserType === 'B' ? '/brand' : global.mUserType === 'M' ? '/magazine' : '/stylist'),
  white: '#ffffff',
  black: '#000000',
  blue: '#0046ff',
  red: '#ee002c',
  gray: '#999999',
  darkGray: '#555555',
  darkBlue: '#0450c2',
  lightBlue: '#7ea1b2',
  lightGray: '#f3f3f3',
  textBaseColor: '#000000',
  textPhColor: '#b8b8b8',
  textGray: '#999999',
  borderGray: '#dddddd',
  bgBlue: '#7ea1b2',
  bgKhaki: '#b8c18c',
  bgYellow: '#e1c668',
  bgOrange: '#d78979',
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
  AppStoreVersion : Platform.OS === 'ios' ? '1.0.0' : '1.0',
  bottomSpace: isIphoneX() ? getBottomSpace() : 0,
  bottomTabHeight: 58.8 + (isIphoneX() ? getBottomSpace() : 0),
  lf: '\n',
}
