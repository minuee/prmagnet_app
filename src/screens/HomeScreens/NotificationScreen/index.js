import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import moment from 'moment'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const closeBtnImage = require('../../../images/navi/close.png')
const notiSky = require('../../../images/navi/noti_sky.png')
const notiBlack = require('../../../images/navi/noti_black.png')

class NotificationScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      next_token: '',
      has_next: true,
    }
  }

  deleteAlarm = async notice_id => {
    const userType = mConst.getUserType()
    try {
      let response = await API.deleteAlarm({notice_id: notice_id, userType: userType})
      console.log('deleteAlarm>>>', response)
      if (response.success) {
        this.getAlarmReset()
      }
    } catch (error) {
      console.log('deleteAlarm>>>', error)
    }
  }

  getAlarm = async () => {
    const {next_token, list} = this.state
    const userType = mConst.getUserType()
    try {
      let response = await API.getAlarm({next_token: next_token, userType: userType})
      console.log('getAlarm>>>', response)
      if (response.success) {
        this.setState({list: list.concat(response.list), next_token: response.next_token, has_next: response.has_next})
      }
    } catch (error) {
      console.log('getAlarm>>>', error)
    }
  }

  getAlarmReset = async () => {
    const userType = mConst.getUserType()
    try {
      let response = await API.getAlarm({next_token: '', userType: userType})
      console.log('getAlarm>>>', response)
      if (response.success) {
        this.setState(response)
      }
    } catch (error) {
      console.log('getAlarm>>>', error)
    }
  }

  handleLoadMore = async () => {
    const {has_next} = this.state
    if (has_next) {
      this.getAlarm()
    }
  }

  componentDidMount() {
    this.pushOption('알림')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getAlarm()
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.itemBox}>
        <View style={styles.items}>
          <FastImage resizeMode={'contain'} style={styles.listImg} source={item.status ? notiSky : notiBlack} />
          <View style={{marginTop: mUtils.wScale(5)}}>
            <Text style={styles.title}>{item.subj}</Text>
            <Text style={styles.desc}>{item.cntent}</Text>
            <Text style={styles.dt}>
              {/*{item.dt} · {item.dt1}*/}
              {moment(item.send_dt * 1000)
                .locale('ko')
                .format('MMM Do')}{' '}
              ·
              {moment(item.send_dt * 1000)
                .locale('ko')
                .format('LT')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          hitSlop={{top: 35, bottom: 35, left: 40, right: 40}}
          onPress={() => {
            this.deleteAlarm(item.notice_id)
          }}
        >
          <FastImage resizeMode={'contain'} style={styles.closeImg} source={closeBtnImage} />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const {list} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            style={styles.list}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => `_${item.notice_id}_${Math.random()}`}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={1}
          />
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NotificationScreen)
