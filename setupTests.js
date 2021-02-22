import MockAsyncStorage from 'mock-async-storage'
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js'
import {Auth} from '@psyrenpark/auth'
import {Api} from '@psyrenpark/api'
import {Storage} from '@psyrenpark/storage'
import awsmobile from './src/common/aws-exports'

//! psyrenpark 라이브러리 초기화
Auth.setConfigure(awsmobile)
Api.setConfigure(awsmobile)
Storage.setConfigure(awsmobile)

const mockImpl = new MockAsyncStorage()
jest.mock('@react-native-community/async-storage', () => mockImpl)
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)
jest.useFakeTimers()

global.console = {
  log: console.log,
  warn: jest.fn(), // warning 로그 제거
  error: console.error,
  info: console.info,
  debug: console.debug,
}
