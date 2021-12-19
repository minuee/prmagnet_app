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
import Empty from '../../common/Empty'

class NoticeListScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      loading: false,
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemBox}
        onPress={() => {
          this.pushTo('NoticeDetailScreen', {no: item.notice_no})
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.dt}>작성일: {mUtils.getShowDate(item.reg_dt, 'YYYY.MM.DD')}</Text>
      </TouchableOpacity>
    )
  }

  getNoticeList = async () => {
    const {page, limit, list} = this.state
    try {
      const response = await API.getNoticeList({page})
      //console.log('getNoticeList>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1, loading: false})
        } else {
          this.setState({loading: false})
        }
      }
    } catch (error) {
      this.setState({loading: false})
      //console.log('getNoticeList>>>', error)
    }
  }

  handleLoadMore = async () => {
    this.getNoticeList()
  }

  componentDidMount() {
    this.pushOption('공지사항')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.setState({loading: true}, () => {
      this.getNoticeList()
    })
  }

  render() {
    const {list, loading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {_.size(list) === 0 ? (
              <Empty />
            ) : (
              <FlatList
                style={styles.list}
                data={list}
                renderItem={this.renderItem}
                keyExtractor={item => item.no}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
              />
            )}
          </>
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NoticeListScreen)
