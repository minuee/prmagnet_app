import _ from 'lodash'

import API from '../../src/common/aws-api'

import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const userFn = () =>
  describe('사용자 API 테스트', () => {
    it('회원 로그인 성공', async () => {
      API.login(loginData(), {
        cbSuccess: response => {
          // if (TESTLOGGING) {
          //console.log('회원 로그인 성공', response)
          // }
          expect(true).toBe(true)
        },
        cbFailure: e => {
          //console.log('###로그인 실패', e)
          expect(false).toBe(true)
        },
      })
    })
    it('회원 정보 조회 성공', async () => {
      const response = await API.getUserType()
      if (TESTLOGGING) {
        //console.log('회원 정보 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

userFn()
