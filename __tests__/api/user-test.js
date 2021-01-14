import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {userData, getPass, delayFn} from './test-util'

const getRandomPhoneNumber = () => `010-${mUtils.getRandomNumber(1000, 9999)}-${mUtils.getRandomNumber(1000, 9999)}`
const TESTLOGGING = false

const userFn = (phone, pass, type, name, regNo, companyNm, userEmail) =>
  describe(`${type === 'host' ? '손해사정사' : '사용자'} API 테스트 - Phone: ${phone}`, () => {
    let token = ''
    const uData = userData(phone, pass, type, name, regNo, companyNm, userEmail)
    it('회원 로그인 실패(없는 아이디)', async () => {
      const response = await API.login(uData)
      if (TESTLOGGING) {
        console.log('회원 로그인 실패(없는 아이디)', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
    it('회원 가입 성공', async () => {
      const response = await API.signup(uData)
      if (TESTLOGGING) {
        console.log('회원 가입 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('회원 가입 실패(중복 가입)', async () => {
      const response = await API.signup(uData)
      if (TESTLOGGING) {
        console.log('회원 가입 실패(중복 가입)', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
    it('회원 로그인 성공', async () => {
      const response = await API.login(uData)
      token = _.get(response, 'result', null)
      // console.log('####토큰1:', token)
      if (TESTLOGGING) {
        console.log('회원 로그인 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('세션 체크 성공', async () => {
      const response = await API.checkSession({token})
      if (TESTLOGGING) {
        console.log('세션 체크 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('회원 로그인 비번 실패(메시지 체크 필요)', async () => {
      const response = await API.login(userData(phone, '1123', type))
      if (TESTLOGGING) {
        console.log('회원 로그인 비번 실패(메시지 체크 필요)', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
    it('회원 로그인 전번 - 제거 시도 실패', async () => {
      const response = await API.login(userData(phone.replace(/-/g, ''), pass, type))
      if (TESTLOGGING) {
        console.log('회원 로그인 전번 - 제거 시도 실패', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
    it('회원 로그아웃 성공', async () => {
      const response = await API.logout({token})
      if (TESTLOGGING) {
        console.log('회원 로그아웃 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('로그아웃 후 회원 탈퇴 실패', async () => {
      const response = await API.withdraw({token, user_pass: getPass()})
      if (TESTLOGGING) {
        console.log('로그아웃 후 회원 탈퇴 실패', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
    delayFn(1000)
    it('회원 재로그인 성공', async () => {
      const response = await API.login(uData)
      token = _.get(response, 'result', null)
      // console.log('####토큰2:', token)
      if (TESTLOGGING) {
        console.log('회원 재로그인 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('회원 탈퇴 성공', async () => {
      const response = await API.withdraw({token, user_pass: getPass()})
      if (TESTLOGGING) {
        console.log('회원 탈퇴 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('탈퇴 후 회원 로그인 실패', async () => {
      const response = await API.login(uData)
      if (TESTLOGGING) {
        console.log('탈퇴 후 회원 로그인 실패', response)
      }
      expect(API.getTestResult(response)).toBe(false)
    })
  })

userFn(getRandomPhoneNumber(), '', 'host', '테스트손사', '1000-100-100', '손사회사명', `${mUtils.getRandomString(4)}@yopmail.com`)
userFn(getRandomPhoneNumber(), '', 'user')
