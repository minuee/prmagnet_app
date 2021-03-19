import {Api} from '@psyrenpark/api'
import _ from 'lodash'

import {login} from './aws-auth'
import mConst from './constants'

const projectName = 'fpr' // 각 프로젝트 단축명
const projectEnv = 'prod' // 각 프로젝트 환경 // dev, test, prod

const v1Noneauth = `${projectName}-${projectEnv}-noneauth-v1`
const v1Api = `${projectName}-${projectEnv}-api-v1`
const v1Cdn = `${projectName}-${projectEnv}-cdn-v1`

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
    const apiName = v1Noneauth // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    const path = '/test_test_test' // test_test_test는 무조건 테스트 api로써 반드시 작동한다.
    const myInit = {
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
    const apiName = v1Api // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    const path = '/test_test_test'
    const myInit = {
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
    const apiName = v1Cdn // 인증 유, 인증 무 api 구분은 이부분이 다르다.
    const path = '/test_test_test'
    const myInit = {
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
  setPushToken: ({token_value}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/push-token`
    const myInit = {
      body: {
        token_value,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getBrandPosition: () => {
    const apiName = v1Cdn
    const path = '/cdn/brand/position'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getBrandSearchCompany: () => {
    const apiName = v1Cdn
    const path = '/cdn/brand/search-company'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getBrandSearchCompanyAZ: () => {
    var apiName = v1Cdn
    var path = '/cdn/brand/search-company/a-z'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getSearchTeamMember: ({search_type, brand_id, mgzn_id, compy_nm}) => {
    const apiName = v1Cdn
    const path = '/cdn/search-team-member'
    const init = {
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
    const apiName = v1Cdn
    const path = '/cdn/privacy-policy'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getTos: () => {
    const apiName = v1Cdn
    const path = '/cdn/tos'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getMobileAuthSend: ({mobile_no}) => {
    const apiName = v1Cdn
    const path = '/cdn/mobile-auth-send'
    const init = {
      body: {
        mobile_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getMoblieAuthCheck: ({mobile_no, auth_no}) => {
    const apiName = v1Cdn
    const path = '/cdn/mobile-auth-check'
    const init = {
      queryStringParameters: {
        mobile_no,
        auth_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getMagazineSearchCompany: () => {
    const apiName = v1Cdn
    const path = '/cdn/magazine/search-company'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getMagazinePosition: () => {
    const apiName = v1Cdn
    const path = '/cdn/magazine/position'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getStylistPosition: () => {
    const apiName = v1Cdn
    const path = '/cdn/stylist/position'
    const init = {}

    return Api.get(apiName, path, init)
  },
  postErrLog: ({error, desc}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/log`
    const myInit = {
      body: {
        error: error,
        desc: desc,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getUserType: () => {
    const apiName = v1Api
    const path = '/api/user-type'
    const init = {}

    return Api.get(apiName, path, init)
  },
  getUserInfo: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/my-info`
    const init = {}

    return Api.get(apiName, path, init)
  },
  postQna: ({subject, content}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/brand/qna`
    const myInit = {
      body: {
        subject: subject,
        content: content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getQnaList: ({page, limit, search_text}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/qna-list`
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  getQnaDetail: ({sys_inqry_no}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/qna/${sys_inqry_no}`
    const init = {
      queryStringParameters: {
        sys_inqry_no: sys_inqry_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  getAlarm: ({next_token}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/alarm`
    const init = {
      queryStringParameters: {
        next_token: next_token,
      },
    }
    return Api.get(apiName, path, init)
  },
  deleteAlarm: ({notice_id, notifi_type}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/alarm-delete`
    const init = {
      queryStringParameters: {
        notice_id: notice_id,
        notifi_type: notifi_type,
      },
    }
    return Api.del(apiName, path, init)
  },
  getFavShowroom: () => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-show` // TODO 임시 주석처리
    const path = '/stylist/fav-show' // TODO 테스트용
    const init = {}
    return Api.get(apiName, path, init)
  },
  getFavPress: () => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-press` // TODO 임시 주석처리
    const path = '/stylist/fav-press' // TODO 테스트용
    const init = {}
    return Api.get(apiName, path, init)
  },
  addFavShowroom: ({showroom_no}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-show` // TODO 임시 주석처리
    const path = '/stylist/fav-show' // TODO 테스트용
    const myInit = {
      body: {
        showroom_no,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  addFavPress: ({brand_press_no}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-press` // TODO 임시 주석처리
    const path = '/stylist/fav-press' // TODO 테스트용
    const myInit = {
      body: {
        brand_press_no,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  deleteFavShowroom: ({showroom_no}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-show` // TODO 임시 주석처리
    const path = '/stylist/fav-show' // TODO 테스트용
    const myInit = {
      body: {
        showroom_no,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  deleteFavPress: ({brand_press_no}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/fav-press` // TODO 임시 주석처리
    const path = '/stylist/fav-press' // TODO 테스트용
    const myInit = {
      body: {
        brand_press_no,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  getPickupSchedule: ({start_date, fin_date, brand_id}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/pickup-schedule` // TODO 임시 주석처리
    const path = '/stylist/pickup-schedule' // TODO 테스트용
    const init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getSendoutSchedule: ({start_date, fin_date, brand_id}) => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/sendout-schedule` // TODO 임시 주석처리
    const path = '/stylist/sendout-schedule' // TODO 테스트용
    const init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getPickupDetail: req_no => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/pickup-detailed/${req_no}` // TODO 임시 주석처리
    const path = `/stylist/pickup-detailed/${req_no}` // TODO 테스트용
    const init = {}
    return Api.get(apiName, path, init)
  },
  getSendoutDetail: req_no => {
    const apiName = v1Api
    // const path = `${mConst.getApiPath()}/sendout-detailed/${req_no}` // TODO 임시 주석처리
    const path = `/stylist/sendout-detailed/${req_no}` // TODO 테스트용
    const init = {}
    return Api.get(apiName, path, init)
  },
  getLookBook: ({page, limit, search_text}) => {
    const apiName = v1Api
    const path = '/brand/lookbook-list'
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  putLookBook: ({lookbook_no_list}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/lookbook-delete`
    const myInit = {
      body: {
        lookbook_no_list: lookbook_no_list,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  getShare: ({lookbook_no, lookbook_nm}) => {
    console.log('>>>', lookbook_no)
    const apiName = v1Api
    const path = `/brand/lookbook/${lookbook_no}/share-uuid`
    console.log('???', path)
    const init = {
      queryStringParameters: {
        lookbook_nm: lookbook_nm,
      },
    }
    return Api.get(apiName, path, init)
  },
  getLookBookDetail: ({lookbook_no, page, limit}) => {
    const apiName = v1Api
    const path = `/brand/lookbook-showroom-list/${lookbook_no}`
    const init = {
      queryStringParameters: {
        lookbook_no: lookbook_no,
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHome: ({date}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home`
    const init = {
      queryStringParameters: {
        date: date,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHomeNR: ({next_token}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/new-request`
    const init = {
      queryStringParameters: {
        next_token: next_token,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHomeTR: ({date, next_token}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/today-request`
    const init = {
      queryStringParameters: {
        date: date,
        next_token: next_token,
      },
    }
    return Api.get(apiName, path, init)
  },
  postDigitalSR: ({
    page,
    limit,
    season_year,
    season_cd_id,
    brand_id,
    available_start_dt,
    available_end_dt,
    category_list,
    color_list,
    size_list,
    material_list,
  }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-list`
    const init = {
      body: {
        page: page,
        limit: limit,
        season_year: season_year,
        season_cd_id: season_cd_id,
        brand_id: brand_id,
        available_start_dt: available_start_dt,
        available_end_dt: available_end_dt,
        category_list: category_list,
        color_list: color_list,
        size_list: size_list,
        material_list: material_list,
      },
    }
    return Api.post(apiName, path, init)
  },
  getNotice: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notice`
    const init = {}
    return Api.get(apiName, path, init)
  },
  getInquiryNum: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/inquiry-number`
    const init = {}
    return Api.get(apiName, path, init)
  },
  getSRInquiry: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-inquiry`
    const init = {}
    return Api.get(apiName, path, init)
  },
  postNotice: ({notice}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notice`
    const myInit = {
      body: {
        notice_contents: notice,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  postInquiryNum: ({inquiryNum}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/inquiry-number`
    const myInit = {
      body: {
        inquiry_number: inquiryNum,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  postSRInquiry: ({SRInquiryNum, email}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-inquiry`
    const myInit = {
      body: {
        showroom_inquiry_contact: SRInquiryNum,
        showroom_inquiry_email: email,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  putSampleRequests: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/sample-request`
    const myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putSampleRequestsConfirm: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/request-confirm`
    const myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putNotReceive: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/sample-not-receive`
    const myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putSampleSend: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/sample-send`
    const myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putBrandNotice: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/brand-notice`
    const myInit = {
      body: {
        recv_yn: recv_yn,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  putNotDis: ({mode_on, begin_dt, end_dt}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/not-disturb-mode`
    const myInit = {
      body: {
        mode_on: mode_on,
        begin_dt: begin_dt,
        end_dt: end_dt,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  getSRDetail: showroom_no => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom/${showroom_no}`
    const init = {}
    return Api.get(apiName, path, init)
  },
  putProfile: ({user_nm, post_no, adres, brand_pos_cd, phone_no, team_user_id, img_url_adres}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/my-profile`
    const myInit = {
      body: {
        user_nm: user_nm,
        post_no: post_no,
        adres: adres,
        brand_pos_cd: brand_pos_cd,
        phone_no: phone_no,
        team_user_id: team_user_id,
        img_url_adres: img_url_adres,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  getAllSearch: ({search_text}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/search`
    const init = {
      queryStringParameters: {
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  getMagazineNotice: ({search_text}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/search`
    var init = {
      queryStringParameters: {
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  getBrandNoti: ({brand_id}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/brand-notice`
    var init = {
      queryStringParameters: {
        brand_id: brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },
  getMagazineSample: ({page, limit, search_text}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-request-list`
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
        search_text: search_text,
      },
    }
    return Api.get(apiName, path, init)
  },
  postSRRequest: ({brand_id}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request`
    const myInit = {
      body: {
        brand_id: brand_id,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  postSRRequestSend: ({
    brand_id,
    duty_recpt_dt,
    photogrf_dt,
    begin_dt,
    end_dt,
    return_prearnge_dt,
    photogrf_concept,
    model_list,
    celeb_list,
    page_cnt,
    etc_brand,
    today_connect,
    add_req_cntent,
    dlvy_adres_nm,
    dlvy_atent_matter,
    showroom_list,
    contact_user_id,
    loc_value,
    own_paid_pictorial_content,
    other_paid_pictorial_content,
  }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-send`
    const myInit = {
      body: {
        brand_id: brand_id,
        duty_recpt_dt: duty_recpt_dt,
        photogrf_dt: photogrf_dt,
        begin_dt: begin_dt,
        end_dt: end_dt,
        return_prearnge_dt: return_prearnge_dt,
        photogrf_concept: photogrf_concept,
        model_list: model_list,
        celeb_list: celeb_list,
        page_cnt: page_cnt,
        etc_brand: etc_brand,
        today_connect: today_connect,
        add_req_cntent: add_req_cntent,
        dlvy_adres_nm: dlvy_adres_nm,
        dlvy_atent_matter: dlvy_atent_matter,
        showroom_list: showroom_list,
        contact_user_id: contact_user_id,
        loc_value: loc_value,
        own_paid_pictorial_content: own_paid_pictorial_content,
        other_paid_pictorial_content: other_paid_pictorial_content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  deleteMyRequests: ({req_no}) => {
    console.log('>>>>>', req_no)
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-delete`
    const init = {
      body: {
        req_list: req_no,
      },
    }
    return Api.del(apiName, path, init)
  },
  getSampleRequests: ({req_no}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-request/${req_no}`
    var init = {
      queryStringParameters: {
        req_no: req_no,
      },
    }
    return Api.get(apiName, path, init)
  },
  editSRRequestSend: ({
    req_no,
    duty_recpt_dt,
    photogrf_dt,
    begin_dt,
    end_dt,
    return_prearnge_dt,
    photogrf_concept,
    model_list,
    celeb_list,
    page_cnt,
    etc_brand,
    today_connect,
    add_req_cntent,
    dlvy_adres_nm,
    dlvy_atent_matter,
    showroom_list,
    contact_user_id,
    loc_value,
    own_paid_pictorial_content,
    other_paid_pictorial_content,
  }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-update`
    const myInit = {
      body: {
        req_no: req_no,
        duty_recpt_dt: duty_recpt_dt,
        photogrf_dt: photogrf_dt,
        begin_dt: begin_dt,
        end_dt: end_dt,
        return_prearnge_dt: return_prearnge_dt,
        photogrf_concept: photogrf_concept,
        model_list: model_list,
        celeb_list: celeb_list,
        page_cnt: page_cnt,
        etc_brand: etc_brand,
        today_connect: today_connect,
        add_req_cntent: add_req_cntent,
        dlvy_adres_nm: dlvy_adres_nm,
        dlvy_atent_matter: dlvy_atent_matter,
        showroom_list: showroom_list,
        contact_user_id: contact_user_id,
        loc_value: loc_value,
        own_paid_pictorial_content: own_paid_pictorial_content,
        other_paid_pictorial_content: other_paid_pictorial_content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getSchedular: ({min_date, max_date}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/my-schedule`
    var init = {
      queryStringParameters: {
        min_date: min_date,
        max_date: max_date,
      },
    }
    return Api.get(apiName, path, init)
  },
}

export default API
