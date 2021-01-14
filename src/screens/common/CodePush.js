import {PureComponent} from 'react'
import codePush from 'react-native-code-push'

export const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: false,
}

export class CommonCodePush extends PureComponent {
  componentDidMount() {
    codePush.sync(codePushOptions)
    codePush.notifyAppReady()
  }
  render() {
    return null
  }
}

const commonCodePush = codePush(codePushOptions)(CommonCodePush)
module.exports = commonCodePush
