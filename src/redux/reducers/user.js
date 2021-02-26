import _ from 'lodash'

import {LOGIN, LOGOUT, SIGNUP, WITHDRAW, USER_TYPE} from '../actions'
import API from '../../common/services'

const initialState = {
  isLogged: false,
  userType: 'B',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN.REQUEST: {
      const data = API.getData(action)
      return {
        ...state,
        isLogged: false,
      }
    }
    case LOGIN.SUCCESS: {
      const data = API.getData(action)
      return {
        ...state,
        isLogged: true,
      }
    }
    case USER_TYPE.SUCCESS: {
      const data = API.getData(action)
      const userType = _.get(data, 'is_brand_user') ? 'B' : _.get(data, 'is_mgzn_user') ? 'M' : 'S'
      global.mUserType = userType
      return {
        ...state,
        userType,
      }
    }
    case LOGIN.FAILURE:
    case LOGOUT.SUCCESS:
    case LOGOUT.FAILURE:
    case SIGNUP.FAILURE:
    case WITHDRAW.SUCCESS:
    case WITHDRAW.FAILURE:
      return initialState
    default:
      return state
  }
}
