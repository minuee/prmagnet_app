import {call, put, takeEvery, all, fork} from 'redux-saga/effects'
import _ from 'lodash'

import {actionLogin, actionSignup,actionSetIsMemoUpdate} from './actions'
import API from '../common/services'

/** *************************************************************************** */
/** ****************************** WORKERS ************************************ */
/** *************************************************************************** */

function* commonFn(action, apiFn, data) {
  const response = yield call(apiFn, data)
  if (_.get(response, 'success_yn', false)) {
    yield put(action.success(response))
    if (typeof _.get(data, 'cbSuccess') === 'function') {
      data.cbSuccess(response)
    }
  } else {
    yield put(action.failure(response))
    if (typeof _.get(data, 'cbFailure') === 'function') {
      data.cbFailure(response)
    }
  }
  return response
}

function* login(data) {
  const response = yield commonFn(actionLogin, API.login, data)
  if (_.get(response, 'success_yn')) {
    // const token = _.get(response, 'result')
    // yield commonFn(actionProfile, API.getProfile, {token})
  }
}
function* signup(data) {  
  yield commonFn(actionSignup, API.signup, data)
}
/** *************************************************************************** */
/** ***************************** WATCHERS ************************************ */
/** *************************************************************************** */

function* watchLogin() {
  yield takeEvery(actionLogin.request().type, login)
}
function* watchSignup() {
  yield takeEvery(actionSignup.request().type, signup)
}


export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchSignup)])
}
