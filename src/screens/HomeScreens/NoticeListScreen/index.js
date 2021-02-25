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

class NoticeListScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [{inqry_subj: '공지사항 내용을 입력해주세요.공지사항 내용을 입력해주세요. 공지사항 내용을 입력해주세요.', inqry_dt: 1611303128}],
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemBox}
        onPress={() => {
          this.pushTo('NoticeDetailScreen')
        }}
      >
        <Text style={styles.title}>{item.inqry_subj}</Text>
        <Text style={styles.dt}>작성일: {moment(item.inqry_dt * 1000).format('YYYY.MM.DD')}</Text>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    this.pushOption('공지사항')
  }

  render() {
    const {list} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={list}
          renderItem={this.renderItem}
          keyExtractor={item => item.inqry_dt}
          //onEndReached={this.handleLoadMore}
          //onEndReachedThreshold={1}
        />
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NoticeListScreen)
