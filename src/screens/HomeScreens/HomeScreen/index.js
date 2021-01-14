import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'

import {actionLogout} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/services'
import Text from '../../common/Text'
import styles from './styles'

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {}
  }
  componentDidMount() {
    this.menuOption()
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>HomeScreen</Text>
        {(mConst.PRODUCTION || mConst.STAGE) && <CodePush />}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    logout: (data, rest) => dispatch(actionLogout.success(data, rest)),
  })
)(HomeScreen)
