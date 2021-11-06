import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, TouchableOpacity} from 'react-native'
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

class ContactDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {desc: ''}
  }

  getQnaDetail = async () => {
    const {sys_inqry_no} = this.props.route.params
    const userType = mConst.getUserType()
    try {
      const response = await API.getQnaDetail({sys_inqry_no: sys_inqry_no, userType: userType})
      //console.log('getQnaDetail>>>', response)
      if (response.success) {
        this.setState({desc: response})
      }
    } catch (error) {
      //console.log('getQnaDetail>>>', error)
    }
  }

  componentDidMount() {
    this.pushOption('문의확인')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getQnaDetail()
  }

  render() {
    const {desc} = this.state
    return desc ? (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.itemBox}>
              <View>
                <Text style={styles.title}>{desc.inqry_subj}</Text>
                <Text style={styles.dt}>작성일: {mUtils.getShowDate(desc.inqry_dt, 'YYYY.MM.DD')}</Text>
              </View>
              <View style={{...styles.box, backgroundColor: desc.answer_yn ? mConst.black : mConst.white}}>
                <Text style={{...styles.boxtext, color: desc.answer_yn ? mConst.white : mConst.black}}>
                  {desc.answer_yn ? '답변완료' : '답변대기'}
                </Text>
              </View>
            </View>
            <View style={styles.descBox}>
              <Text style={styles.desc}>{desc.inqry_cntent}</Text>
              <Text style={styles.desc} />
              <Text style={styles.desc}>{desc.answer_cntent}</Text>
            </View>
          </ScrollView>
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
)(ContactDetailScreen)
