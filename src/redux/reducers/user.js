import _ from 'lodash'

import {LOGIN, LOGOUT, SIGNUP, WITHDRAW} from '../actions'
import API from '../../common/services'

const initialState = {
  isLogged: false,
  mobile_no: '',
  token: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN.REQUEST: {
      const data = API.getData(action)
      return {
        ...state,
        isLogged: false,
        mobile_no: data.mobile_no,
      }
    }
    case LOGIN.SUCCESS: {
      const data = API.getData(action)
      const token = _.get(data, 'result')
      return {
        ...state,
        isLogged: true,
        token,
      }
    }
    case LOGIN.FAILURE:
      return {
        ...initialState,
        mobile_no: state.mobile_no,
      }
    case 'setUserPhone':
      const data = API.getData(action)
      if (data.phone) {
        return {
          ...initialState,
          mobile_no: data.phone,
        }
      }
      return initialState
    case LOGOUT.SUCCESS:
    case LOGOUT.FAILURE:
    case SIGNUP.FAILURE:
    case WITHDRAW.SUCCESS:
    case WITHDRAW.FAILURE:
      return initialState
    default:
      return {
        ...state,
      }
  }
}
