import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import moment from 'moment'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import styles from './styles'
import API from '../../../../common/aws-api'
import Loading from '../../../common/Loading'

const closeBtnImage = require('../../../../images/navi/close.png')

class ContactConfirm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {list: [], page: 1, limit: 10, search_text: ''}
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
          <Text style={styles.dt}>작성일: {moment(item.inqry_dt * 1000).format('YYYY.MM.DD')}</Text>
        </View>
        <View style={{...styles.box, backgroundColor: item.answer_yn ? mConst.black : mConst.white}}>
          <Text style={{...styles.boxtext, color: item.answer_yn ? mConst.white : mConst.black}}>{item.answer_yn ? '답변완료' : '답변대기'}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  getQnaList = async () => {
    const {list, page, limit, search_text} = this.state
    try {
      let response = await API.getQnaList(page, limit, search_text)
      console.log('getQnaList>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({...this.state, list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
      console.log('getQnaList>>>', error)
    }
  }
  handleLoadMore = async () => {
    this.getQnaList()
  }
  async componentDidMount() {
    this.getQnaList()
  }

  render() {
    const {list, page, limit, search_text} = this.state
    return list.length > 0 ? (
      <>
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
      </>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ContactConfirm)
