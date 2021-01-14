import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'

const TESTLOGGING = true

const codesFn = () =>
  describe('공통코드 API 테스트:', () => {
    it('카테고리 목록 조회 성공', async () => {
      const response = await API.getCategoryies()
      if (TESTLOGGING) {
        console.log('카테고리 목록 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('사고 타입 목록 조회 성공', async () => {
      const response = await API.getAccidentTypes({category_cd_id: 'CATEGORY_CD_ID_1'})
      if (TESTLOGGING) {
        console.log('사고 타입 목록 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('손해 타입 목록 조회 성공', async () => {
      const response = await API.getDamageTypes()
      if (TESTLOGGING) {
        console.log('손해 타입 목록 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('지역 목록 조회 성공', async () => {
      const response = await API.getLocations()
      if (TESTLOGGING) {
        console.log('지역 목록 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('보험 목록 조회 성공', async () => {
      const response = await API.getInsuranceType()
      if (TESTLOGGING) {
        console.log('보험 목록 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
    it('보험 상세 조회 성공', async () => {
      const response = await API.getInsuranceDetail()
      if (TESTLOGGING) {
        console.log('보험 상세 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

codesFn()
