import {useEffect} from 'react'
import codePush from 'react-native-code-push'

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: false,
}

const CodePush = () => {
  if (typeof __DEV__ === 'undefined' || !__DEV__) {
    useEffect(() => {
      codePush.sync(codePushOptions)
      codePush.notifyAppReady()
    })
  }
  return null
}

const commonCodePush = codePush(codePushOptions)(CodePush)
module.exports = commonCodePush
