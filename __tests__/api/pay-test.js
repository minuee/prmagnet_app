import _ from 'lodash'

import API from '../../src/common/services'
import mUtils from '../../src/common/utils'

const TESTLOGGING = true

const payFn = () =>
  describe('결제 관련 API 테스트:', () => {
    it('유료 손해사정사 수 조회 성공', async () => {
      const response = await API.getPayUserCount()
      if (TESTLOGGING) {
        console.log('유료 손해사정사 수 조회 성공)', response)
      }
      expect(API.getTestResult(response)).toBe(true)
    })
  })

payFn()
