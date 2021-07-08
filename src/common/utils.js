import messaging from '@react-native-firebase/messaging'
import moment from 'moment'
import _ from 'lodash'

import mConst from './constants'
import mStorage from './storage'

const EMAIL_FORMAT = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i
const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{8,16}$/i
const MOBILE_FORMAT = /^01([0|1|6|7|8|9]+)-?([0-9]{3,4})-?([0-9]{4})$/i
const TO_FIXED_POS = 3

const utils = {
  get(object, path, defaultValue = '') {
    return _.defaultTo(_.get(object, path, defaultValue), defaultValue)
  },
  numberWithCommas(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return x
    let parts = x.toString().replace(/,/g, '').split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  },
  removeCommas(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return x
    return String(x).replace(/,/g, '')
  },
  parseFloatWtihCommas(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return parseFloat(String(x).replace(/,/g, ''))
  },
  getCeil(x, pos = 0) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return Math.ceil(parseFloat(x) * Math.pow(10, pos)) / Math.pow(10, pos)
  },
  getFloor(x, pos = 0) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return Math.floor(parseFloat(x) * Math.pow(10, pos)) / Math.pow(10, pos)
  },
  getRounds(x, pos = 0) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return Math.round(parseFloat(x) * Math.pow(10, pos)) / Math.pow(10, pos)
  },
  getRoundsFixed(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return Math.round(parseFloat(x) * Math.pow(10, TO_FIXED_POS)) / Math.pow(10, TO_FIXED_POS)
  },
  getFloorFixed(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return 0
    return Math.floor(parseFloat(x) * Math.pow(10, TO_FIXED_POS)) / Math.pow(10, TO_FIXED_POS)
  },
  computePlusFixed(x, y) {
    if (x === undefined || x === null || x === '' || _.isNaN(x) || y === undefined || y === null || y === '' || _.isNaN(y)) return 0
    return (
      (Math.floor(parseFloat(x) * Math.pow(10, TO_FIXED_POS)) + Math.floor(parseFloat(y) * Math.pow(10, TO_FIXED_POS))) / Math.pow(10, TO_FIXED_POS)
    )
  },
  computeMinusFixed(x, y) {
    if (x === undefined || x === null || x === '' || _.isNaN(x) || y === undefined || y === null || y === '' || _.isNaN(y)) return 0
    return (
      (Math.floor(parseFloat(x) * Math.pow(10, TO_FIXED_POS)) - Math.floor(parseFloat(y) * Math.pow(10, TO_FIXED_POS))) / Math.pow(10, TO_FIXED_POS)
    )
  },
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  getRandomString(length) {
    return Math.random().toString(36).substr(2, length)
  },
  serialFormat(val) {
    return val.toString().replace(/\B(?=(\d{4})+(?!\d))/g, '-')
  },
  passwordFormat(val) {
    return val.toString().replace(/./g, '*')
  },
  moneyFilter(val, bCoin) {
    if (val === undefined || val === null || val === '' || _.isNaN(val)) return '0'
    val = String(val)
    // 코인일 경우(소숫점 세자리까지만 입력 가능)
    if (bCoin) {
      // 시작값이 소수점이라면 맨앞에 0 추가
      if (val.indexOf('.') === 0) {
        val = '0' + val
      }
      const pattern = /^[1-9]{1}[0-9]*$/g
      if (!pattern.test(val)) {
        val = String(val).replace(/[^0-9.]/g, '')
      }
      // 시작값이 연속된 0이라면 한개만 유지하고 나머지 제거
      if (/^[0][0]/.test(val)) {
        val = String(val).substr(1, val.length)
      }
      // 소수일 때
      if (val.indexOf('.') > 0) {
        const dotNum = val.indexOf('.')
        val = val.replace(/[^0-9]/g, '')
        val = val.split('')
        val.splice(dotNum, 0, '.')
        val = val.join('')
      } else {
        // 정수일 때 0으로 시작한다면 0 제거 (값 0은 제외)
        if (/^[0]+/.test(val) && val.length != 1) {
          val = val.replace(/^[0]+/, '')
        }
      }
      // 소숫점 세자리까지만 나오게 처리
      if (val.indexOf('.') > 0 && val.length - val.indexOf('.') > 4) {
        val = val.substring(0, val.indexOf('.') + 4)
      }
    } else {
      // 캐쉬일 경우(양의 정수만 입력 가능)
      const pattern = /^[1-9]{1}[0-9]*$/g
      if (!pattern.test(val)) {
        val = String(val).replace(/[^0-9]/g, '')
      }
      // 정수일 때 0으로 시작한다면 0 제거 (값 0은 제외)
      if (/^[0]+/.test(val) && val.length != 1) {
        val = val.replace(/^[0]+/, '')
      }
    }
    return val
  },
  numberFilter(val, bZeroLength) {
    if (val === undefined || val === null || val === '' || _.isNaN(val)) {
      return bZeroLength ? '' : '0'
    }
    val = String(val)
    const pattern = /^[1-9]{1}[0-9]*$/g
    if (!pattern.test(val)) {
      val = String(val).replace(/[^0-9]/g, '')
    }
    return val
  },
  phoneFilter(val) {
    if (val === undefined || val === null) {
      return ''
    }
    val = String(val)
    const pattern = /^[0-9-]$/g
    if (!pattern.test(val)) {
      val = String(val)
        .replace(/(-)+/g, '-')
        .replace(/[^0-9-]/g, '')
    }
    return val
  },
  englishNameFilter(val) {
    if (val === undefined || val === null || val === '') return val
    val = String(val)
    const pattern = /^[A-Za-z ]*$/g
    if (!pattern.test(val)) {
      val = String(val).replace(/[^A-Za-z ]/g, '')
    }
    if (/[ ]{2,}/.test(val)) {
      val = val.replace(/[ ]{2,}/, ' ')
    }
    return val
  },
  emailIdCut(val) {
    val = val.split('@')
    return val[0]
  },
  dateFormat(val, format) {
    let ddd = val
    if (String(val).indexOf('-') >= 0) {
      ddd = ddd.replace(/-/gi, '/')
    }
    let date = new Date(ddd)

    let years = date.getFullYear()
    let Month = date.getMonth() + 1
    if (Month < 10) {
      Month = '0' + Month
    }
    let days = date.getDate()
    if (days < 10) {
      days = '0' + days
    }
    let hour = date.getHours()
    if (hour < 10) {
      hour = '0' + hour
    }
    let min = date.getMinutes()
    if (min < 10) {
      min = '0' + min
    }
    if (format === undefined) {
      return years + '-' + Month + '-' + days
    } else {
      return years + '-' + Month + '-' + days + ' ' + hour + ':' + min
    }
  },
  moneyFormat(val) {
    if (val === undefined || val === null || val === '' || _.isNaN(val) || val == 0) return ''
    // 캐쉬일 경우(양의 정수만 입력 가능)
    const pattern = /^[1-9]{1}[0-9]*$/g
    if (!pattern.test(val)) {
      val = String(val).replace(/[^0-9]/g, '')
    }
    // 정수일 때 0으로 시작한다면 0 제거 (값 0은 제외)
    if (/^[0]+/.test(val) && val.length != 1) {
      val = val.replace(/^[0]+/, '')
    }
    let parts = val.toString().replace(/,/g, '').split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  },
  phoneFormat(val) {
    if (val === undefined || val === null || val === '') return val
    val = String(val).replace(/-/g, '')
    if (val.length <= 7) {
      return val.replace(/([0-9]{3})([0-9]{1})/, '$1-$2')
    } else {
      return val.replace(/([0-9]{3})([0-9]{4})([0-9]{1})/, '$1-$2-$3')
    }
  },
  cardNumFormat(val) {
    if (val === undefined || val === null || val === '') return val
    val = String(val).replace(/-/g, '')
    if (val.length <= 7) {
      return val.replace(/([0-9]{4})([0-9]{1})/, '$1-$2')
    } else if (val.length <= 11) {
      return val.replace(/([0-9]{4})([0-9]{4})([0-9]{1})/, '$1-$2-$3')
    } else {
      return val.replace(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{1})/, '$1-$2-$3-$4')
    }
  },
  expDateFormat(val) {
    if (val === undefined || val === null || val === '') return val
    val = String(val).replace(/-/g, '')
    if (val.length <= 2) {
      return val
    } else {
      return val.replace(/([0-9]{2})([0-9]{2})/, '$1/$2')
    }
  },
  koreaDateFormat(val, format) {
    let ddd = val
    if (String(val).indexOf('-') >= 0) {
      ddd = ddd.replace(/-/gi, '/')
    }
    let date = new Date(ddd)

    date.setHours(date.getHours() + 9)
    let years = date.getFullYear()
    let Month = date.getMonth() + 1
    if (Month < 10) {
      Month = '0' + Month
    }
    let days = date.getDate()
    if (days < 10) {
      days = '0' + days
    }
    let hour = date.getHours()
    if (hour < 10) {
      hour = '0' + hour
    }
    let min = date.getMinutes()
    if (min < 10) {
      min = '0' + min
    }
    if (format === undefined) {
      return years + '-' + Month + '-' + days
    } else {
      return years + '-' + Month + '-' + days + ' ' + hour + ':' + min
    }
  },
  floorText(val) {
    let text = ''
    if (val === 'A') {
      text = '전층'
    } else if (val === 'W') {
      text = '여성복'
    } else if (val === 'M') {
      text = '남성복'
    } else if (val === 'AC') {
      text = '악세사리'
    }
    return text
  },
  isEmail(email) {
    if (!_.isString(email)) {
      return false
    }
    return !!email.match(EMAIL_FORMAT)
  },
  isPassword(password) {
    if (!_.isString(password)) {
      return false
    }
    return !!password.match(PASSWORD_RULE)
  },
  isMobile(mobile) {
    if (!_.isString(mobile)) {
      return false
    }
    return !!mobile.match(MOBILE_FORMAT)
  },
  getEmailId(email) {
    if (email != null && email && email.indexOf('@') >= 0) {
      return email.substring(0, email.indexOf('@'))
    }
    return email
  },
  getEmailIdInfo(email, isSocial) {
    if (email === mConst.GUESTUSER) return ''
    if (isSocial) {
      if (email.endsWith('@facebook.com')) return '페이스북 연동'
      if (email.endsWith('@naver.com')) return '네이버 연동'
      if (email.endsWith('@apple.com')) return '애플 연동'
    }
    return email
  },
  isSocialEmail(email) {
    if ((email && email.endsWith('@facebook.com')) || email.endsWith('@naver.com') || email.endsWith('@apple.com')) {
      return true
    }
    return false
  },
  timeCount(second) {
    const strTimeLeft = `${Math.floor(second / 60).toString()}:${second % 60 < 10 ? '0' : ''}${second % 60}`
    return strTimeLeft
  },
  expireDday(data) {
    const now = new Date()
    const then = new Date(data) // 크리스마스
    let gap = then.getTime() - now.getTime()
    gap = Math.floor(gap / (24 * 60 * 60 * 1000)) + 1
    let result = gap <= 0 ? 'D-Day' : 'D-' + gap
    return result
  },
  isValidDate(year, month, day) {
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
      return false
    }
    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      monthLength[1] = 29
    }
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1]
  },
  wScale(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return x
    return Math.floor((x * mConst.wWidth) / 414)
  },
  hScale(x) {
    if (x === undefined || x === null || x === '' || _.isNaN(x)) return x
    return Math.floor((x * mConst.wHeight) / 896)
  },
  getToday() {
    const now = new Date()
    now.setHours(0, 0, 0)
    return Math.floor(now.getTime() / 1000)
  },
  getNextWeek() {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(23, 59, 59)
    return Math.floor(nextWeek.getTime() / 1000)
  },
  getDayValue(year, month, date, isEnd = false) {
    const day = new Date(year, month - 1, date)
    isEnd ? day.setHours(23, 59, 59) : day.setHours(0, 0, 0)
    return Math.floor(day.getTime() / 1000)
  },
  getShowDate(dbTime, format = 'M/D(ddd)') {
    // 파라미터는 Date.getTime() / 1000 값임
    if (!dbTime) return '-'
    return moment(dbTime * 1000)
      .locale('en')
      .format(format)
      .toUpperCase()
  },
  getCalendarMinDate() {
    const minDate = new Date()
    minDate.setMonth(minDate.getMonth() - 3)
    minDate.setDate(1)
    return minDate
  },
  getDateStamp(dbTime) {
    return new Date(dbTime * 1000).getTime()
  },
  getCalendarDateObj(dbTime) {
    const calDate = moment(new Date(dbTime * 1000))
    return {dateString: calDate.format('YYYY-MM-DD'), day: calDate.date(), month: calDate.month(), year: calDate.year()}
  },
  allNumber(number) {
    const result = number
      .replace(/[^0-9]/g, '')
      .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
      .replace('--', '-')
    return result
  },
  async getFcmToken() {
    const getToken = async () => {
      if (mConst.bIos) {
        // On iOS, if your app wants to receive remote messages from FCM (via APNs)
        await messaging().registerDeviceForRemoteMessages()
      }
      let newFcmToken = await messaging().getToken()
      if (newFcmToken) {
        await mStorage.saveFcmToken(newFcmToken)
      }
      return newFcmToken
    }
    let fcmToken = await mStorage.loadFcmToken()
    if (!fcmToken) {
      let authStatus = await messaging().hasPermission()
      if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED && authStatus !== messaging.AuthorizationStatus.PROVISIONAL) {
        await messaging().requestPermission()
      }
      authStatus = await messaging().hasPermission()
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        fcmToken = await getToken()
      } else {
        fcmToken = 'DEFAULT_FCM_TOKEN'
      }
    }
    console.log('fcmToken:', fcmToken)
    return fcmToken
  },
  async getFcmEnabled() {
    return await messaging().hasPermission()
  },
}

export default utils
