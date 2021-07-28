import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import styles from './styles'
import API from '../../../../common/aws-api'
import Loading from '../../../common/Loading'
import Empty from '../../../common/Empty'

class ContactConfirm extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {list: [], page: 1, limit: 10, search_text: '', loading: false}
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemBox}
        onPress={() => {
          this.props.navigation.navigate('ContactDetailScreen', {sys_inqry_no: item.sys_inqry_no})
        }}
      >
        <View>
          <Text style={styles.title}>{item.inqry_subj}</Text>
          <Text style={styles.dt}>작성일: {mUtils.getShowDate(item.inqry_dt, 'YYYY.MM.DD')}</Text>
        </View>
        <View style={{...styles.box, backgroundColor: item.answer_yn ? mConst.getBaseXColor() : mConst.white}}>
          <Text style={{...styles.boxtext, color: item.answer_yn ? mConst.white : mConst.getBaseXColor()}}>
            {item.answer_yn ? '답변완료' : '답변대기'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  getQnaList = async () => {
    const {list, page, limit, search_text} = this.state
    const userType = mConst.getUserType()
    try {
      const response = await API.getQnaList({page: page, limit: limit, search_text: search_text, userType: userType})
      console.log('getQnaList>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1, loading: false})
        } else {
          this.setState({loading: false})
        }
      }
    } catch (error) {
      this.setState({loading: false})
      console.log('getQnaList>>>', error)
    }
  }
  handleLoadMore = async () => {
    this.getQnaList()
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.setState({loading: true}, () => {
      this.getQnaList()
    })
  }

  render() {
    const {list, page, limit, search_text, loading} = this.state
    return loading ? (
      <Loading />
    ) : (
      <>
        {_.size(list) === 0 ? (
          <Empty />
        ) : (
          <SafeAreaView style={styles.container}>
            <FlatList
              style={styles.list}
              data={list}
              renderItem={this.renderItem}
              keyExtractor={item => item.inqry_dt}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
            />
          </SafeAreaView>
        )}
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ContactConfirm)
