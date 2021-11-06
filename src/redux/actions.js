import _ from 'lodash'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const INIT = 'INIT'

function createRequestTypes(base) {
  const types = [REQUEST, SUCCESS, FAILURE, INIT]
  return types.reduce((accumulator, type) => {
    accumulator[type] = `${base}_${type}`
    return accumulator
  }, {})
}

function actionCreator(type, payload = {}) {
  return {type, payload}
}

function createActionObject(action) {
  return {
    request: (data, rest) => _.merge(actionCreator(action[REQUEST], data), rest),
    success: data => actionCreator(action[SUCCESS], data),
    failure: data => actionCreator(action[FAILURE], data),
    init: data => actionCreator(action[INIT], data),
  }
}

export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')
export const SIGNUP = createRequestTypes('SIGNUP')
export const WITHDRAW = createRequestTypes('WITHDRAW')
export const USER_TYPE = createRequestTypes('USER_TYPE')
export const SUBSCRIBE_TYPE = createRequestTypes('SUBSCRIBE_TYPE')

export const actionLogin = createActionObject(LOGIN)
export const actionLogout = createActionObject(LOGOUT)
export const actionSignup = createActionObject(SIGNUP)
export const actionWithdraw = createActionObject(WITHDRAW)
export const actionUserType = createActionObject(USER_TYPE)
export const actionSubScrbeStatus = createActionObject(SUBSCRIBE_TYPE)
/* 사용자 정의 액션 */
export const actionSetAlarm = data => actionCreator('setAlarm', data)
