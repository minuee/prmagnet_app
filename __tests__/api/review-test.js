import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'
import {loginData, delayFn} from './test-util'

const TESTLOGGING = true

const reviewFn = () =>
  describe('리뷰 조회 API 테스트:', () => {
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
    it('메인 리뷰 조회 성공', async () => {
      const response = await API.getMainReviews({token})
      if (TESTLOGGING) {
        console.log('메인 리뷰 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('리뷰 전체 조회 성공', async () => {
      const response = await API.getReviews({token, page_no: 1, num_of_rows: 10})
      reviewNo = _.get(response, 'result[0].review_no', 0)
      console.log('####reviewNo:', reviewNo)
      if (TESTLOGGING) {
        console.log('리뷰 전체 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('리뷰 상세 조회 성공', async () => {
      const response = await API.getReviewDetail({token, review_no: reviewNo})
      if (TESTLOGGING) {
        console.log('리뷰 상세 조회 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('메인리뷰 설정 성공', async () => {
      const response = await API.setMainReview({token, review_no: reviewNo, main_review: 1})
      if (TESTLOGGING) {
        console.log('메인리뷰 설정 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('메인리뷰 해제 성공', async () => {
      const response = await API.setMainReview({token, review_no: reviewNo, main_review: 2})
      if (TESTLOGGING) {
        console.log('메인리뷰 해제 성공', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

reviewFn()
