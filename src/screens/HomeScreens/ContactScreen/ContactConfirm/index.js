import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'

const closeBtnImage = require('../../../../images/navi/close.png')

class ContactScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {data: [{title: '회원가입 관련 문의드립니다.', dt: '2020.07.07', status: false}]}
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemBox}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.dt}>작성일: {item.dt}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxtext}>{item.status ? '답변완료' : '답변대기'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList style={styles.list} data={this.state.data} renderItem={this.renderItem} keyExtractor={item => item.dt} />
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ContactScreen)
