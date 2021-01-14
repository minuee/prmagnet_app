import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const mainFn = () =>
  describe('메인 API 테스트:', () => {
    let token = ''
    let reviewNo = ''
    it('회원 로그인 성공', async () => {
      const response = await API.login(loginData())
      token = _.get(response, 'result', null)
      console.log('####토큰1:', token)
      if (TESTLOGGING) {
        console.log('회원 로그인 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('상담 중 목록 조회 성공', async () => {
      const response = await API.getMyCounsels({token, flow_status: 1, page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('상담 중 목록 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('상담 제안 목록 조회 성공', async () => {
      const response = await API.getMyCounsels({token, flow_status: 0, page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('상담 제안 목록 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

mainFn()
