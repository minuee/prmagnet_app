import _ from 'lodash'

import {SETISMEMOUPDATE_TYPE} from '../actions'
import API from '../../common/services'

const initialState = {
  isMemoUpdate: false
}

export default function simples(state = initialState, action) {  
  const data = API.getData(action)
  switch (action.type) {
    case 'setIsMemoUpdate': {      
      global.isMemoUpdate = data;
      return {
        ...state,
        isMemoUpdate : data,
      }
    }    
    default:
      return state
  }
}
