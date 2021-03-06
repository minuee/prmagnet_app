import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native'
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

class NoticeDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {data: '', loading: false}
  }
  getNoticeDetail = async () => {
    const {no} = this.params
    try {
      const response = await API.getNoticeDetail({notice_no: no})
      //console.log('getNoticeDetail>>>', response)
      if (response.success) {
        this.setState({data: response, loading: false})
      }
    } catch (error) {
      this.setState({loading: false})
      //console.log('getNoticeDetail>>>', error)
    }
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
      this.getNoticeDetail()
    })
  }

  render() {
    const {data, loading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView>
            <View style={styles.itemBox}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.dt}>{mUtils.getShowDate(data.reg_dt, 'YYYY.MM.DD')}</Text>
            </View>
            { !mUtils.isEmpty(data.img_full_url) &&
              <View style={styles.imageWrap}>
                <FastImage 
                  resizeMode={'contain'} 
                  style={{width: '100%',aspectRatio:2}} 
                  source={{uri: data.img_full_url}} 
                />
              </View>
            }
            <Text style={styles.desc}>{data.content}</Text>
          </ScrollView>
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NoticeDetailScreen)
