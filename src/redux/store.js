import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware, {END} from 'redux-saga';
import {persistReducer} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-community/async-storage';

import rootSaga from './sagas';
import reducer from './reducers';
import mkConst from '../common/constants';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  const store = createStore(
    persistedReducer,
    initialState,
    mkConst.PRODUCTION || mkConst.STAGE ? applyMiddleware(...middlewares) : composeWithDevTools(applyMiddleware(...middlewares))
  )
 
  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);

  return store
}
