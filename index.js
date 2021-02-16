import React from 'react'
import {AppRegistry, LogBox} from 'react-native'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {RootSiblingParent} from 'react-native-root-siblings'
import {getStorybookUI, configure, addDecorator} from '@storybook/react-native'
import {withKnobs} from '@storybook/addon-knobs'
import {MenuProvider} from 'react-native-popup-menu'

import {name as appName} from './app.json'
import {loadStories} from './storybook/storyLoader'
import configureStore from './src/redux/store'
import RootScreen from './src/screens/RootScreen'
import mConst from './src/common/constants'
import './storybook/rn-addons'
import {Auth} from '@psyrenpark/auth'
import {Api} from '@psyrenpark/api'
import {Storage} from '@psyrenpark/storage'
import awsmobile from './src/common/aws-exports'

//! psyrenpark 라이브러리 초기화
Auth.setConfigure(awsmobile)
Api.setConfigure(awsmobile)
Storage.setConfigure(awsmobile)

LogBox.ignoreAllLogs()

const store = configureStore()
const persistor = persistStore(store)

const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootSiblingParent>
            <RootScreen />
          </RootSiblingParent>
        </PersistGate>
      </Provider>
    </MenuProvider>
  )
}

const withProvider = story => (
  <Provider store={store}>
    <RootSiblingParent>{story()}</RootSiblingParent>
  </Provider>
)
addDecorator(withKnobs)
addDecorator(withProvider)
configure(() => {
  loadStories()
}, module)
const StorybookUIRoot = getStorybookUI({asyncStorage: null})

AppRegistry.registerComponent(appName, () => (mConst.STORYBOOK ? StorybookUIRoot : App))
