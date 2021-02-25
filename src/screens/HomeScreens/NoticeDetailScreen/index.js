import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native'
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

class NoticeDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      inqry_subj: '공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요. 공지사항 내용을 입력해주세요.',
      inqry_dt: '1611303128',
      inqry_cntent:
        '공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요.',
    }
  }

  componentDidMount() {
    this.pushOption('공지사항')
  }

  render() {
    const {inqry_subj, inqry_dt, inqry_cntent} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.itemBox}>
            <Text style={styles.title}>{inqry_subj}</Text>
            <Text style={styles.dt}>{moment(inqry_dt * 1000).format('YYYY.MM.DD')}</Text>
          </View>
          <Text style={styles.desc}>{inqry_cntent}</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NoticeDetailScreen)
