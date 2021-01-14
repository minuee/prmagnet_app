import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

class StartScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>StartScreen</Text>
        <TouchableOpacity onPress={callOnce(() => this.pushTo('LoginScreen'))}>
          <Text>로그인</Text>
        </TouchableOpacity>
        {(mConst.PRODUCTION || mConst.STAGE) && <CodePush />}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(StartScreen)
