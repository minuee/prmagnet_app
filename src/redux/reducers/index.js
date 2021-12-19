import {combineReducers} from 'redux';

import user from './user';
import simples from './simples';

export default combineReducers({
  user,
  simples
})
