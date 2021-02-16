import axios from 'axios'
import _ from 'lodash'

import mConst from './constants'

global.mApiUri = mConst.getApiUri()

const commonAPI = (path, data, method) => {
  const payload = _.cloneDeep(_.get(data, 'payload', data))
  const token = _.get(payload, 'token', '')
  if (payload) delete payload.token
  return axios({
    baseURL: global.mApiUri,
    url: path,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    withCredentials: true,
    data: method === 'post' ? payload : undefined,
    params: method === 'get' ? payload : undefined,
    timeout: 10000,
  })
    .then(response => response.data)
    .catch(e => e)
}
const commonGetAPI = (path, data) => {
  return commonAPI(path, data, 'get')
}
const commonPostAPI = (path, data) => {
  return commonAPI(path, data, 'post')
}
const commonMultipartAPI = (path, token, formData) => {
  return axios({
    baseURL: global.mApiUri,
    url: path,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data',
      Authorization: token,
    },
    withCredentials: true,
    data: formData,
  })
    .then(response => response.data)
    .catch(e => e)
}
const getPayloadResult = response => _.get(response, 'payload.success_yn', false)
const getPayload = response => _.get(response, 'payload')
const getTestResult = response => _.get(response, 'success_yn', _.get(response, 'response.data.success_yn'))

const API = {
  // * Info
  signup: data => commonPostAPI('/v2/info/signup', data), // 회원 가입
  login: data => ({success_yn: true}), //commonPostAPI('/v2/info/login', data), // 회원 로그인
  logout: data => ({success_yn: true}), //commonPostAPI('/v2/info/logout', data), // 회원 로그아웃
  withdraw: data => commonPostAPI('/v2/info/withdraw', data), // 회원 탈퇴

  getResult: response => getPayloadResult(response),
  getData: response => getPayload(response),
  getTestResult: response => getTestResult(response),
}

export default API
