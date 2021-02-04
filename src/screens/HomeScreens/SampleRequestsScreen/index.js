import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'
import Modal from 'react-native-modal'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const modelImg = require('../../../images/navi/model_1.png')
const newImg = require('../../../images/navi/new_1.png')
const notiImg = require('../../../images/navi/noti_1.png')
const telImg = require('../../../images/navi/tel_1.png')
const fixImg = require('../../../images/navi/fix_1.png')
const settingImg = require('../../../images/navi/setting_1.png')
const bookImg = require('../../../images/navi/book_1.png')
const moreImg = require('../../../images/navi/more_4.png')
const crownImg = require('../../../images/navi/crown_1.png')
const selectImg1 = require('../../../images/navi/select_1.png')
const selectImg2 = require('../../../images/navi/select_2.png')

class SampleRequestsScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView style={{paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>Sample</Text>
          <Text style={styles.mainTitle1}>Requests</Text>
          <Text style={{...styles.subTitle, marginTop: mUtils.wScale(30)}}>
            Request product : <Text style={{color: '#7ea1b2'}}>4</Text>
          </Text>
          <ScrollView horizontal={true} style={{backgroundColor: 'red'}}></ScrollView>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(SampleRequestsScreen)
