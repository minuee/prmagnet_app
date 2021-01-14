import _ from 'lodash'

import mUtils from '../../src/common/utils'
import API from '../../src/common/services'
import {userData} from './test-util'

const testUserList = [
  '011-1111-1111',
  '011-1111-1112',
  '011-1111-1113',
  '011-1111-1114',
  '011-1111-1115',
  '011-1111-1116',
  '011-1111-1117',
  '011-1111-1118',
  '011-1111-1119',
  '011-1111-1110',
  '012-1111-1111',
  '012-1111-1112',
  '012-1111-1113',
  '012-1111-1114',
  '012-1111-1115',
  '012-1111-1116',
  '012-1111-1117',
  '012-1111-1118',
  '012-1111-1119',
  '012-1111-1110',
]

tRegUserData = (mobileNo, index) => {
  if (mobileNo.startsWith('012')) return userData(mobileNo, '', 'user')
  return userData(mobileNo, '', 'host', `테스트손사${index}`, `1000-100-00${index}`, `손사회사명${index}`, `aa${index}@yopmail.com`)
}

const regUserFn = (mobileNo, index) =>
  describe(`테스트 계정 일괄 생성 - mobileNo: ${mobileNo}`, () => {
    const uData = tRegUserData(mobileNo, index)
    it('테스트 계정 회원 가입 성공', async () => {
      const response = await API.signup(uData)
      expect(API.getTestResult(response)).toBe(true)
    })
    it('테스트 계정 회원 로그인 성공', async () => {
      const response = await API.login(uData)
      expect(API.getTestResult(response)).toBe(true)
    })
  })

_.map(testUserList, regUserFn) // 배열로 일괄 테스트
