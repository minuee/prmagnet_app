import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const accidentFn = () =>
  describe('사고 API 테스트:', () => {
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
    it('사고 목록 조회 성공', async () => {
      const response = await API.getAccidents({token, page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('사고 목록 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('사고 목록 검색 성공', async () => {
      const response = await API.getAccidents({token, search_value: '역주행', page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('사고 목록 검색 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('사고 상세 조회 성공', async () => {
      const response = await API.getAccidents({token, accident_no: '49'})
      if (TESTLOGGING) {
        console.log('사고 상세 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

accidentFn()
