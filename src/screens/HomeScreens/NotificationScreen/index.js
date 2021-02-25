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

const closeBtnImage = require('../../../images/navi/close.png')
const notiSky = require('../../../images/navi/noti_sky.png')
const notiBlack = require('../../../images/navi/noti_black.png')

class NotificationScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [
        {
          title: '[요청확인] GUCCI에서 요청확인을 했습니다.',
          desc: 'GUCCI에서 샘플요청을 확인했습니다.',
          dt: '9월9일',
          dt1: '오전 10:30',
          status: false,
        },
        {title: '[샘플발송]GQ에서 샘플 발송', desc: 'GQ에서 샘플을 발송하였습니다.', dt: '9월2일', dt1: '오전 10:30', status: true},
      ],
    }
  }

  async componentDidMount() {
    this.pushOption('알림')
    const userType = mConst.getUserType()
    try {
      let response = await API.getAlarm({next_token: next_token, userType: userType})
      console.log('getAlarm>>>', response)
    } catch (error) {
      console.log('getAlarm>>>', error)
    }
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.itemBox}>
        <View style={styles.items}>
          <FastImage resizeMode={'contain'} style={styles.listImg} source={item.status ? notiSky : notiBlack} />
          <View style={{marginTop: mUtils.wScale(5)}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.dt}>
              {item.dt} · {item.dt1}
            </Text>
          </View>
        </View>
        <TouchableOpacity hitSlop={{top: 35, bottom: 35, left: 40, right: 40}}>
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
          <FlatList style={styles.list} data={list} renderItem={this.renderItem} keyExtractor={item => item.dt} />
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NotificationScreen)
