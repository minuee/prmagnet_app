import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, Switch, Platform} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

class AccountSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }

  componentDidMount() {
    this.pushOption('계정설정')
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}></ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(AccountSettingScreen)
