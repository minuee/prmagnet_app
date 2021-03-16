import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

class PersonalScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {}
  }

  componentDidMount() {
    this.pushOption('개인정보 처리지침')
  }

  render() {
    const {list} = this.state
    return <SafeAreaView style={styles.container}></SafeAreaView>
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(PersonalScreen)
