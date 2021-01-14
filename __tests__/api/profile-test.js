import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const profileFn = () =>
  describe('프로파일 조회 API 테스트:', () => {
    let token = ''
    it('회원 로그인 성공', async () => {
      const response = await API.login(loginData())
      token = _.get(response, 'result', null)
      console.log('####토큰1:', token)
      if (TESTLOGGING) {
        console.log('회원 로그인 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('프로파일 조회 성공', async () => {
      const response = await API.getProfile({token})
      if (TESTLOGGING) {
        console.log('프로파일 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('프로파일 세부 조회 성공', async () => {
      const response = await API.getStats({token})
      if (TESTLOGGING) {
        console.log('프로파일 세부 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

profileFn()
