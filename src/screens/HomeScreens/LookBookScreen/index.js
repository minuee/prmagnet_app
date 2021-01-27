import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
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

const moreImage = require('../../../images/navi/more_1.png')

class LookBookScreen extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View>
            <Text>LookBook</Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LookBookScreen)
