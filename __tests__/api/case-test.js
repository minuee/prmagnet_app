import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const caseFn = () =>
  describe('청구사례 조회 API 테스트:', () => {
    let token = ''
    let caseNo = ''
    let userNo = 0
    it('회원 로그인 성공', async () => {
      const response = await API.login(loginData())
      token = _.get(response, 'result', null)
      console.log('####토큰1:', token)
      if (TESTLOGGING) {
        console.log('회원 로그인 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 조회 성공', async () => {
      const response = await API.getCases({token, page_no: 1, num_of_rows: 10})
      caseNo = _.get(response, 'result[0].case_no', 0)
      userNo = _.get(response, 'result[0].user_no', 0)
      console.log('####caseNo:', caseNo)
      if (TESTLOGGING) {
        console.log('청구사례 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 2페이지 조회 성공', async () => {
      const response = await API.getCases({token, page_no: 2, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('청구사례 2페이지 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 3페이지 조회 성공', async () => {
      const response = await API.getCases({token, page_no: 3, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('청구사례 3페이지 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 4페이지 조회 성공', async () => {
      const response = await API.getCases({token, page_no: 4, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('청구사례 4페이지 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 키워드 검색 성공', async () => {
      const response = await API.getCases({token, search_value: '올림픽도로', page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('청구사례 키워드 검색 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 카테고리 검색 성공', async () => {
      const response = await API.getCases({token, category_cd_id: 'CATEGORY_CD_ID_2', page_no: 1, num_of_rows: 10})
      if (TESTLOGGING) {
        console.log('청구사례 카테고리 검색 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('청구사례 상세 조회 성공', async () => {
      const response = await API.getUserCaseDetail({token, case_no: caseNo, user_no: userNo})
      if (TESTLOGGING) {
        console.log('청구사례 상세 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('해당 청구사례의 보험 목록 조회 성공', async () => {
      const response = await API.getInsurances({token, case_no: caseNo})
      if (TESTLOGGING) {
        console.log('해당 청구사례의 보험 목록 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

caseFn()
