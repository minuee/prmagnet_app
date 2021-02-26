import {Api} from '@psyrenpark/api'
import _ from 'lodash'

import {login} from './aws-auth'

var projectName = 'fpr' // 각 프로젝트 단축명
var projectEnv = 'prod' // 각 프로젝트 환경 // dev, test, prod

var v1Noneauth = `${projectName}-${projectEnv}-noneauth-v1`
var v1Api = `${projectName}-${projectEnv}-api-v1`
var v1Cdn = `${projectName}-${projectEnv}-cdn-v1`

const API = {
  //------------------------------------------
  // 인증 없는 api
  /**
   * [] cdn 테스트
   * @param {string} langCode               - 예시 언어코드
   * @param {Function} LoadingCallback      - 로딩 콜백
   */
  getTestNoneauth: (
    {
      langCode, //
      // 필요에 맞게 파라미터를 넣는다.
      // ...
    },
    loadingFunction
  ) => {
    var apiName = v1Noneauth // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    var path = '/test_test_test' // test_test_test는 무조건 테스트 api로써 반드시 작동한다.
    var myInit = {
      headers: {}, // OPTIONAL
      // body: {  // post나 put일경우 사용한다.
      //
      // },
      queryStringParameters: {
        langCode: langCode,
      },
      // response: true,  // axios 원형 response 필요할 경우 ture로 설정한다.
    }
    // get, post, put, del 상황에 맞게 사용한다
    return Api.get(apiName, path, myInit, loadingFunction)
  },

  //------------------------------------------
  // 인증 있는 api
  getTestApi: (
    {
      langCode,
      // ...
      // 필요에 맞게 파라미터를 넣는다.
    },
    loadingFunction
  ) => {
    var apiName = v1Api // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    var path = '/test_test_test'
    var myInit = {
      headers: {}, // OPTIONAL
      // body: {  // post나 put일경우 사용한다.
      //
      // },
      queryStringParameters: {
        langCode: langCode,
      },
      // response: true,  // axios 원형 response 필요할 경우 ture로 설정한다.
    }
    // get, post, put, del 상황에 맞게 사용한다
    return Api.get(apiName, path, myInit, loadingFunction)
  },

  //------------------------------------------
  // 개발계에 테스트시 (디폴트 계정으로만 테스트 가능)
  getTestCdn: (
    {
      langCode,
      // ...
      // 필요에 맞게 파라미터를 넣는다.
    },
    loadingFunction
  ) => {
    var apiName = v1Cdn // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    var path = '/test_test_test'
    var myInit = {
      headers: {}, // OPTIONAL
      // body: {  // post나 put일경우 사용한다.
      //
      // },
      queryStringParameters: {
        langCode: langCode,
      },
      // response: true,  // axios 원형 response 필요할 경우 ture로 설정한다.
    }

    // 테스트 필요시
    // 테스트가 필요할경우 로딩콜백 뒤에 {url, port}를 추가한다. // 백엔드 개발자에게 테스트 요청
    // get, post, put, del 상황에 맞게 사용한다
    return Api.get(apiName, path, myInit, loadingFunction, {
      url: 'http://18.177.73.12',
      port: 3006,
    })

    // return Api.get(apiName, path, myInit, loadingFunction);
  },
  getTestResult: response => _.get(response, 'success'),
  login: (data, rest) => {
    login(data, rest)
  },
  getBrandPosition: () => {
    var apiName = v1Cdn
    var path = '/cdn/brand/position'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getBrandSearchCompany: () => {
    var apiName = v1Cdn
    var path = '/cdn/brand/search-company'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getSearchTeamMember: ({search_type, brand_id, mgzn_id, compy_nm}) => {
    var apiName = v1Cdn
    var path = '/cdn/search-team-member'
    var init = {
      queryStringParameters: {
        search_type,
        brand_id,
        mgzn_id,
        compy_nm,
      },
    }
    return Api.get(apiName, path, init)
  },
  getPrivacyPolicy: () => {
    var apiName = v1Cdn
    var path = '/cdn/privacy-policy'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getTos: () => {
    var apiName = v1Cdn
    var path = '/cdn/tos'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getMobileAuthSend: ({mobile_no}) => {
    var apiName = v1Cdn
    var path = '/cdn/mobile-auth-send'
    var init = {
      body: {
        mobile_no,
      },
    }
    return Api.post(apiName, path, init)
  },
  getMoblieAuthCheck: ({mobile_no, auth_no}) => {
    var apiName = v1Cdn
    var path = '/cdn/mobile-auth-check'
    var init = {
      queryStringParameters: {
        mobile_no,
        auth_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getMagazineSearchCompany: () => {
    var apiName = v1Cdn
    var path = '/cdn/magazine/search-company'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getMagazinePosition: () => {
    var apiName = v1Cdn
    var path = '/cdn/magazine/position'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getStylistPosition: () => {
    var apiName = v1Cdn
    var path = '/cdn/stylist/position'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getUserType: () => {
    var apiName = v1Api
    var path = '/api/user-type'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getUserInfo: ({userType}) => {
    var apiName = v1Api
    var path = `/${userType === 'M' ? 'stylist' : 'brand'}/my-info`
    var init = {}

    return Api.get(apiName, path, init)
  },
  postQna: ({subject, content, userType}) => {
    var apiName = v1Api
    var path = `/${userType === 'M' ? 'stylist' : 'brand'}/brand/qna`
    var myInit = {
      body: {
        subject: subject,
        content: content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getQnaList: ({page, limit, search_text, userType}) => {
    var apiName = v1Api
    var path = `/${userType === 'M' ? 'stylist' : 'brand'}/qna-list`
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  getQnaDetail: ({sys_inqry_no, userType}) => {
    var apiName = v1Api
    var path = `/${userType === 'M' ? 'stylist' : 'brand'}/qna/${sys_inqry_no}`
    var init = {
      queryStringParameters: {
        sys_inqry_no: sys_inqry_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getAlarm: ({next_token, userType}) => {
    var apiName = v1Api
    var path = `/${userType === 'M' ? 'stylist' : 'brand'}/alarm`
    var init = {
      queryStringParameters: {
        next_token: next_token,
      },
    }
    return Api.get(apiName, path, init)
  },
  getPickupSchedule: ({start_date, fin_date, brand_id}) => {
    var apiName = v1Api
    var path = '/stylist/pickup-schedule'
    var init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getPickupSchedule: ({start_date, fin_date, brand_id}) => {
    var apiName = v1Api
    var path = '/stylist/pickup-schedule'
    var init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getSendoutSchedule: ({start_date, fin_date, brand_id}) => {
    var apiName = v1Api
    var path = '/stylist/sendout-schedule'
    var init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getPickupDetail: req_no => {
    var apiName = v1Api
    var path = `/stylist/pickup-detailed/${req_no}`
    var init = {}
    return Api.get(apiName, path, init)
  },
  getPickupDetail: req_no => {
    var apiName = v1Api
    var path = `/stylist/sendout-detailed/${req_no}`
    var init = {}
    return Api.get(apiName, path, init)
  },
  getLookBook: ({page, limit, search_text}) => {
    var apiName = v1Api
    var path = '/brand/lookbook-list'
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
}

export default API
