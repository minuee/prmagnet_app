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
  setUserActive : () => {
    const apiName = v1Cdn
    const path = '/batch/active-update'
    const init = {}

    return Api.get(apiName, path, init)
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

  getBrandSeason: () => {
    var apiName = v1Cdn
    var path = '/cdn/brand/search-season'
    var init = {}

    return Api.get(apiName, path, init)
  },
  getBrandSearch: search_text => {
    var apiName = v1Cdn
    var path = '/cdn/brand/search-company'
    var init = {
      queryStringParameters: {
        search_text: search_text,
      },
    }

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
  getSampleInfo: () => {
    const apiName = v1Cdn
    const path = '/cdn/sample/info'
    const init = {
      queryStringParameters: {},
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
    const path = `${mConst.getApiPath()}/qna`
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
  getAlarm: ({page, limit}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/alarm`
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
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
  getRequestHistory : () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/search/reqhistory`
    const init = {
    };

    return Api.get(apiName, path, init);
  },
  getFavShowroom: ({
    brand_id,
    season_year,
    season_cd_id,
    gender_cd_id,
    available_start_dt,
    available_end_dt,
    category_list,
    color_list,
    size_list,
    material_list,
  }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/fav-show` // TODO 임시 주석처리
    //const path = '/stylist/fav-show' // TODO 테스트용
    const init = {
      body: {
        brand_id,
        season_year,
        season_cd_id,
        gender_cd_id,
        available_start_dt,
        available_end_dt,
        category_list,
        color_list,
        size_list,
        material_list,
      },
    }
    return Api.post(apiName, path, init)
  },
  getFavPress: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/fav-press` // TODO 임시 주석처리
    //const path = '/stylist/fav-press' // TODO 테스트용
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
    const path = `${mConst.getApiPath()}/fav-show/${showroom_no}` // TODO 임시 주석처리
    //const path = '/stylist/fav-show' // TODO 테스트용
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
  postFavShowroom: ({showroom_no}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/fav-show/${showroom_no}` // TODO 임시 주석처리
    //const path = '/stylist/fav-show' // TODO 테스트용
    const myInit = {
      body: {
        showroom_no: showroom_no,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  getSendoutSchedule: ({start_date, fin_date, brand_id,not_finished}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/sendout-schedule`
    const init = {
      queryStringParameters:
        mConst.getUserType() === 'B'
          ? {
              start_date,
              fin_date,
              not_finished
            }
          : {
              start_date,
              fin_date,
              brand_id,
              not_finished
            },
    }    
    return Api.get(apiName, path, init)
  },
  getPickupSchedule: ({start_date, fin_date, brand_id,not_finished}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-schedule-mobile`
    const init = {
      queryStringParameters: {
        start_date,
        fin_date,
        brand_id,
        not_finished
      },
    }
    return Api.get(apiName, path, init)
  },
  getReturnSchedule: ({start_date, fin_date,not_finished}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-schedule`
    const init = {
      queryStringParameters: {
        start_date,
        fin_date,
        not_finished
      },
    }
    return Api.get(apiName, path, init)
  },
  getSendoutDetail: (req_no,showroom_no) => {
    const apiName = v1Api
    //const path = `${mConst.getApiPath()}/sendout-detailed/req/${req_no}`
    const path = `${mConst.getApiPath()}/sendout-detailed/req/${req_no}?showroom_no=` + showroom_no;
    const init = {}
    return Api.get(apiName, path, init)
  },
  getSendoutArrayDetail: (date,showroom_no,reqnoList2) => {

    const showroomList = JSON.stringify(showroom_no);
    const reqnoList = JSON.stringify(reqnoList2);
    const apiName = v1Api;        
    const path = `${mConst.getApiPath()}/sendout-detailed/${date}?date=${date}&showroomList=${showroomList}&reqnoList=${reqnoList}`;
    const init = {}

    return Api.get(apiName, path, init)
  },
  getPickupDetail: (req_no,showroom_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-detailed/req/${req_no}?showroom_no=` + showroom_no;
   
    const init = {}
    return Api.get(apiName, path, init)
  },
  getReturnDetail: (req_no,showroom_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-detailed/req/${req_no}?showroom_no=` + showroom_no;
    const init = {}

    return Api.get(apiName, path, init)
  },
  getReturnArrayDetail: (date,showroom_no,reqnoList2) => {
    const showroomList = JSON.stringify(showroom_no);
    const reqnoList = JSON.stringify(reqnoList2);
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-detailed/${date}?date=${date}&showroomList=${showroomList}&reqnoList=${reqnoList}`;
    const init = {}
    return Api.get(apiName, path, init)
  },
  getPickupArrayDetail: (date,showroom_no,reqnoList2) => {
    const showroomList = JSON.stringify(showroom_no);
    const reqnoList = JSON.stringify(reqnoList2);
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-detailed/${date}?date=${date}&showroomList=${showroomList}&reqnoList=${reqnoList}`;
    const init = {}
    return Api.get(apiName, path, init)
  },
  pushSendout: (req_no, showroom_len,targetSampleList) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/sendout-push`
    const myInit = {
      body: {req_no, len: showroom_len,targetSampleList},
    }
    return Api.post(apiName, path, myInit)
  },
  pushSendoutOne: (req_no, showroom_len, sample_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/sendout-push-individual`
    const myInit = {
      body: {req_no, len: showroom_len, sample_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushPickupSuccess: (req_no,targetSampleList) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-success`
    const myInit = {
      body: {req_no,targetSampleList},
    }
    return Api.post(apiName, path, myInit)
  },
  pushPickupOneSuccess: (req_no, sample_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-success-individual`
    const myInit = {
      body: {req_no, sample_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushPickupFail: req_no => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-fail`
    const myInit = {
      body: {req_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushPickupOneFail: (req_no, sample_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/pickup-fail-individual`
    const myInit = {
      body: {req_no, sample_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushReturnSuccess: (req_no,targetSampleList) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-success`
    const myInit = {
      body: {req_no,targetSampleList},
    }
    return Api.post(apiName, path, myInit)
  },
  pushReturnOneSuccess: (req_no, sample_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-success-individual`
    const myInit = {
      body: {req_no, sample_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushReturnFail: req_no => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-fail`
    const myInit = {
      body: {req_no},
    }
    return Api.post(apiName, path, myInit)
  },
  pushReturnOneFail: (req_no, sample_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/return-fail-individual`
    const myInit = {
      body: {req_no, sample_no},
    }
    return Api.post(apiName, path, myInit)
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
  getShare: ({lookbook_no}) => {
    const apiName = v1Api
    const path = `/brand/lookbook/${lookbook_no}/share-uuid`
    const init = {}
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
  getNewHome: ({date}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/newhome`
    const init = {
      queryStringParameters: {
        date: date,
      },
    }

    return Api.get(apiName, path, init)
  },
  
  getHomeNR: ({page, limit}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/new-request`
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },

  getHomeRelease: ({page, limit}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/new-release`
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHomeCR: ({page, limit}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/confirmed-request`
    const init = {
      queryStringParameters: {
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },
  getHomeTR: ({date, type,page, limit}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/home/today-request`
    const init = {
      queryStringParameters: {
        date: date,
        type,
        page: page,
        limit: limit,
      },
    }

    return Api.get(apiName, path, init)
  },
  postDigitalSR: ({
    page,
    limit,
    brand_id,
    season_year,
    season_cd_id,
    gender_list,
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
        page,
        limit,
        brand_id,
        season_year,
        season_cd_id,
        gender_list,
        available_start_dt,
        available_end_dt,
        category_list,
        color_list,
        size_list,
        material_list,
      },
    }

    return Api.post(apiName, path, init)
  },

  getSheetNotice: () => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/send-out/notice`
    const init = {}
    return Api.get(apiName, path, init)
  },
  postSheetNotice: ({notice}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/send-out/notice`
    const myInit = {
      body: {
        content: notice,
      },
    }
    return Api.post(apiName, path, myInit)
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
  postSRInquiry: ({SRInquiryNum,SRInquiryNum2,SRInquiryNum3, email,email2,email3,inquiry_charge,inquiry_charge2,inquiry_charge3}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-inquiry`
    const myInit = {
      body: {
        showroom_inquiry_contact: SRInquiryNum,
        showroom_inquiry_contact2: SRInquiryNum2,
        showroom_inquiry_contact3: SRInquiryNum3,
        showroom_inquiry_email: email,
        showroom_inquiry_email2: email2,
        showroom_inquiry_email3: email3,
        inquiry_charge : inquiry_charge,
        inquiry_charge2 : inquiry_charge2,
        inquiry_charge3 : inquiry_charge3
      },
    }
    return Api.post(apiName, path, myInit)
  },

  postlimitNumber: ({ limit_days }) => {
    var apiName = v1Api;
    var path = "/brand/limit-days";
    var init = {
      body: {
        limit_days,
      },
    };

    return Api.post(apiName, path, init);
  },

  postDisplayPrice: ({ isRealPrice }) => {
    var apiName = v1Api;
    var path = "/brand/display-price";
    var init = {
      body: {
        displayReal:isRealPrice,
      },
    };

    return Api.post(apiName, path, init);
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
  putAdminNotice: ({recv_yn}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/notify-control/admin-notice`
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
    const path = `${mConst.getApiPath()}/showroom-mobile/${showroom_no}`
    console.log('getSRDetail>>path>', path)
    const init = {}
    //('path',path)
    return Api.get(apiName, path, init)
  },
  getLookBookSRDetail: (lookbook_no, showroom_no) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/lookbook-showroom/${lookbook_no}/${showroom_no}`
    const init = {}
    return Api.get(apiName, path, init)
  },
  putProfile: ({user_type ='B',user_nm, post_no, adres, adres_detail,brand_pos_cd, phone_no, team_user_id, img_url_adres}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/my-profile`;
    let myInit = {
      body: {
        user_nm: user_nm,
        post_no: post_no,
        adres: adres,
        adres_detail : adres_detail,
        brand_pos_cd: brand_pos_cd,
        phone_no: phone_no,
        team_user_id: team_user_id,
        img_url_adres: img_url_adres,
      },
    }
    if ( user_type !== 'B') {
      myInit = {
        body: {
          user_nm: user_nm,
          post_no: post_no,
          adres: adres,          
          mgzn_pos_cd: brand_pos_cd,
          phone_no: phone_no,
          team_user_id: team_user_id,
          img_url_adres: img_url_adres,
        },
      }
    }
    
    //('putProfile path',path,myInit)
    return Api.put(apiName, path, myInit)
  },
  getAllSearch: ({search_text}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/search`
    const init = {
      queryStringParameters: {
        search_text: encodeURI(search_text),
        ismobile:true
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
    const apiName = v1Api;
    const path = `${mConst.getApiPath()}/showroom-request`;

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
    photogrf_end_dt,
    release_dt,
    release_end_dt,
    begin_dt,
    end_dt,
    return_prearnge_dt,
    photogrf_concept,
    model_list,
    celeb_list,
    item_model_list,
    page_cnt,
    etc_brand,
    today_connect,
    add_req_cntent,
    dlvy_adres_no,
    dlvy_adres_nm,
    adres_detail,
    dlvy_atent_matter,
    showroom_list,
    contact_user_id,
    loc_value,
    own_paid_pictorial_content,
    other_paid_pictorial_content,
    is_media ,
    media_nm ,
    nonmedia_content ,
    nonmedia_release ,
    with_brand_list,
    with_brand_direct,
    with_wait_brand_list,
    with_wait_brand_direct,
    is_copy = false
  }) => {

    if ( release_dt == NaN ) release_dt = null;
    if ( release_end_dt == NaN ) release_end_dt = null;
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-send`
    const myInit = {
      body: {
        brand_id: brand_id,
        duty_recpt_dt: duty_recpt_dt,
        photogrf_dt: photogrf_dt,
        photogrf_end_dt : photogrf_end_dt,
        release_dt  : release_dt,
        release_end_dt : release_end_dt,
        begin_dt: begin_dt,
        end_dt: end_dt,
        return_prearnge_dt: return_prearnge_dt,
        photogrf_concept: photogrf_concept,
        model_list: model_list,
        celeb_list: celeb_list,
        item_model_list : item_model_list,
        page_cnt: page_cnt,
        etc_brand: etc_brand,
        today_connect: today_connect,
        add_req_cntent: add_req_cntent,
        dlvy_adres_no : dlvy_adres_no,
        dlvy_adres_nm: dlvy_adres_nm,
        adres_detail: adres_detail,
        dlvy_atent_matter: dlvy_atent_matter,
        showroom_list: showroom_list,
        contact_user_id: contact_user_id,
        loc_value: loc_value,
        own_paid_pictorial_content: own_paid_pictorial_content,
        other_paid_pictorial_content: other_paid_pictorial_content,
        is_media ,
        media_nm ,
        nonmedia_content ,
        nonmedia_release ,
        confirm_withBrand : with_brand_list,
        confirm_withBrandDirect : with_brand_direct,
        wait_withBrand  : with_wait_brand_list,
        wait_withBrandDirect : with_wait_brand_direct,
        is_copy
      },
    }
    console.log('postSRRequestSend>>>> add', myInit);
    return Api.post(apiName, path, myInit)
  },
  postSendMessage: ({
    req_no,
    add_message
   }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/request/addmessage`
    const myInit = {
      body: {
        req_no,
        add_message
      },
    }
    //console.log("myInit",myInit)
    return Api.post(apiName, path, myInit)
  },

  postSRCopyRequestSend: ({
    req_no,
    brand_id,
    req_user_id,
    photogrf_dt,
    photogrf_end_dt,
    showroom_list,
   }) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-copy-request-send`
    const myInit = {
      body: {
        req_no,
        brand_id,
        req_user_id,
        photogrf_dt,
        photogrf_end_dt,
        showroom_list,
      },
    }
    //console.log("myInit",myInit)
    return Api.post(apiName, path, myInit)
  },
  cancleMyRequests: ({req_no}) => {

    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-cancel`
    const init = {
      body: {
        req_list: req_no,
        cancel_list :  req_no
      },
    }
    return Api.put(apiName, path, init)
  },
  deleteMyRequests: ({req_no}) => {

    const apiName = v1Api
    const path = `${mConst.getApiPath()}/showroom-request-delete`
    const init = {
      body: {
        req_list: req_no,
        del_list : req_no
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
    photogrf_end_dt,
    release_dt,
    release_end_dt,
    begin_dt,
    end_dt,
    return_prearnge_dt,
    photogrf_concept,
    model_list,
    celeb_list,
    item_model_list,
    page_cnt,
    etc_brand,
    today_connect,
    add_req_cntent,
    dlvy_adres_no,
    dlvy_adres_nm,
    adres_detail,
    dlvy_atent_matter,
    showroom_list,
    contact_user_id,
    loc_value,
    own_paid_pictorial_content,
    other_paid_pictorial_content,
    is_media ,
    media_nm ,
    nonmedia_content ,
    nonmedia_release ,
    with_brand_list,
    with_brand_direct,
    with_wait_brand_list,
    with_wait_brand_direct,
    is_tempsave
  }) => {
    const apiName = v1Api;
    const path = `${mConst.getApiPath()}/showroom-request-update`;
 /*    if( with_brand_list?.length > 0 ) {
      with_brand_list.reverse();
    } */

    if ( release_dt == NaN ) release_dt = null;
    if ( release_end_dt == NaN ) release_end_dt = null;
  
    const myInit = {
      body: {
        req_no,
        duty_recpt_dt,
        photogrf_dt,
        photogrf_end_dt,
        release_dt,
        release_end_dt,
        begin_dt,
        end_dt,
        return_prearnge_dt,
        photogrf_concept,
        model_list,
        celeb_list,
        item_model_list,
        page_cnt,
        etc_brand,
        today_connect,
        add_req_cntent,
        dlvy_adres_no,
        dlvy_adres_nm,
        adres_detail,
        dlvy_atent_matter,
        showroom_list,
        contact_user_id,
        loc_value,
        own_paid_pictorial_content,
        other_paid_pictorial_content,
        is_media ,
        media_nm ,
        nonmedia_content ,
        nonmedia_release ,
        confirm_withBrand : with_brand_list,
        confirm_withBrandDirect : with_brand_direct,
        wait_withBrand  : with_wait_brand_list,
        wait_withBrandDirect : with_wait_brand_direct,
        is_tempsave
      },
    }
    console.log('editSRRequestSend>>>> modify', myInit);
    return Api.post(apiName, path, myInit)
  },
  getSchedular: ({min_date, max_date, season_year, season_cd_id, gender,limit, page, search_word = ""}) => {
    
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/my-schedule`
    var init = {
      queryStringParameters: {
        min_date,
        max_date,
        season_year,
        season_cd_id,
        gender,
        search_word,
        limit,
        page
      },
    }

    return Api.get(apiName, path, init)
  },
  getBrandHoliday: ({year, brand_id}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/brand-holiday`
    var init = {
      queryStringParameters: {
        year,
        brand_id,
      },
    }
    return Api.get(apiName, path, init)
  },

  getWidthBrandList: () => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/with-brandlist`
    var init = {
      queryStringParameters: {
      },
    }
    return Api.get(apiName, path, init)
  },
  getMagazineSchedular: ({min_date, max_date}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/my-schedule-date`
    var init = {
      queryStringParameters: {
        min_date: min_date,
        max_date: max_date,
      },
    }
    return Api.get(apiName, path, init)
  },
  getBrandMagazineSchedular: ({min_date, max_date}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/my-schedule-brand`
    var init = {
      queryStringParameters: {
        min_date: min_date,
        max_date: max_date,
      },
    }
    return Api.get(apiName, path, init)
  },
  getShowroomMemo: ({showroom_no}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-memo`
    var init = {
      queryStringParameters: {
        showroom_no: showroom_no
      },
    }
    return Api.get(apiName, path, init)
  },
  getMemo: ({showroom_no, date}) => {

    var apiName = v1Api
    var path = `${mConst.getApiPath()}/memo`
    var init = {
      queryStringParameters: {
        showroom_no: showroom_no,
        date: date,
      },
    }
    return Api.get(apiName, path, init)
  },
  getShowRoomList: ({date}) => {

    var apiName = v1Api
    var path = `${mConst.getApiPath()}/showroom-list/for-memo-new`
    var init = {
      queryStringParameters: {
        date: date,
      },
    }
    return Api.get(apiName, path, init)
  },
  postMemo: ({showroom_no, date, color, content}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/memo`
    const myInit = {
      body: {
        showroom_no: showroom_no,
        date: date,
        color: color,
        content: content,
      },
    }
    return Api.post(apiName, path, myInit)
  },
  putMemo: ({memo_no, showroom_no, date, color, content}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/memo/${memo_no}`
    const myInit = {
      body: {
        memo_no: memo_no,
        showroom_no: showroom_no,
        date: date,
        color: color,
        content: content,
      },
    }
    return Api.put(apiName, path, myInit)
  },
  delMemo: ({memo_no}) => {
    const apiName = v1Api
    const path = `${mConst.getApiPath()}/memo/${memo_no}`
    const myInit = {
      body: {
        memo_no: memo_no,
      },
    }
    return Api.del(apiName, path, myInit)
  },
  getNoticeList: ({page, limit}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notice-list`
    var init = {
      queryStringParameters: {
        page: page,
        limit: limit,
      },
    }
    return Api.get(apiName, path, init)
  },
  getNoticeDetail: ({notice_no}) => {
    var apiName = v1Api
    var path = `${mConst.getApiPath()}/notice/${notice_no}`
    var init = {
      queryStringParameters: {},
    }
    return Api.get(apiName, path, init)
  },
}

export default API
