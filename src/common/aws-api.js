import {Api} from '@psyrenpark/api'
import _ from 'lodash'

import {login} from './aws-auth'
import mConst from './constants'

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
  getUserInfo: () => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/my-info`
    var init = {}

    return Api.get(apiName, path, init)
  },
  postQna: ({subject, content}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/brand/qna`
    var myInit = {
      body: {
        subject: subject,
        content: content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getQnaList: ({page, limit, search_text}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/qna-list`
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  getQnaDetail: ({sys_inqry_no}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/qna/${sys_inqry_no}`
    var init = {
      queryStringParameters: {
        sys_inqry_no: sys_inqry_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getAlarm: ({next_token}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/alarm`
    var init = {
      queryStringParameters: {
        next_token: next_token,
      },
    }
    return Api.get(apiName, path, init)
  },
  deleteAlarm: ({notice_id}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/alarm-delete`
    var init = {
      queryStringParameters: {
        notice_id: notice_id,
      },
    }
    return Api.del(apiName, path, init)
  },
  getPickupSchedule: ({start_date, fin_date, brand_id}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/pickup-schedule`
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
    var path = `${mConst.getApiPath()}/sendout-schedule`
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
    var path = `${mConst.getApiPath()}/pickup-detailed/${req_no}`
    var init = {}
    return Api.get(apiName, path, init)
  },
  getSendoutDetail: req_no => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/sendout-detailed/${req_no}`
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
  getShare: ({lookbook_no, lookbook_nm}) => {
    var apiName = v1Api
    var path = `/brand/lookbook/:${lookbook_no}/share-uuid`
    var init = {
      queryStringParameters: {
        lookbook_nm: lookbook_nm,
      },
    }
    return Api.get(apiName, path, init)
  },
  getLookBookDetail: ({lookbook_no, page, limit}) => {
    var apiName = v1Api
    var path = `/brand/lookbook-showroom-list/${lookbook_no}`
    var init = {
      queryStringParameters: {
        lookbook_no: lookbook_no,
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHome: ({date}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/home`
    var init = {
      queryStringParameters: {
        date: date,
      },
    }
    return Api.get(apiName, path, init)
  },
  getDigitalSR: ({page, limit, season_year, season_cd_id}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-list`
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        season_year: season_year,
        season_cd_id: season_cd_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getNotice: () => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notice`
    var init = {}
    return Api.get(apiName, path, init)
  },
  getInquiryNum: () => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/inquiry-number`
    var init = {}
    return Api.get(apiName, path, init)
  },
  getSRInquiry: () => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-inquiry`
    var init = {}
    return Api.get(apiName, path, init)
  },
  postNotice: ({notice}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notice`
    var myInit = {
      body: {
        notice_contents: notice,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  postInquiryNum: ({inquiryNum}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/inquiry-number`
    var myInit = {
      body: {
        inquiry_number: inquiryNum,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  postSRInquiry: ({SRInquiryNum, email}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-inquiry`
    var myInit = {
      body: {
        showroom_inquiry_contact: SRInquiryNum,
        showroom_inquiry_email: email,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  putSampleRequests: ({recv_yn}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notify-control/sample-request`
    var myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putNotice: ({recv_yn}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notify-control/notice`
    var myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putSR: ({recv_yn}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notify-control/showroom`
    var myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putPress: ({recv_yn}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notify-control/press`
    var myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putNotDis: ({mode_on, begin_dt, end_dt}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notify-control/not-disturb-mode`
    var myInit = {
      body: {
        mode_on: mode_on,
        begin_dt: begin_dt,
        end_dt: end_dt,
      },
    }
    return Api.put(apiName, path, myInit)
  },
}

export default API
