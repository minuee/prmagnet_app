import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'

const topList = ['공지사항', '문의번호', '쇼룸문의', '기간설정']
const reg = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/

class FilterSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      select: topList[0],
      notice: '',
      inquiryNum: '',
      SRInquiryNum: '',
      email: '',
      inquiry_charge : '',
      limit_days : 1
    }
  }

  postNotice = async () => {
    const {notice} = this.state;
    try {
      const response = await API.postNotice({
        notice: notice,
      })
      //console.log('postNotice>>>', response)
      if (response.success) {
        this.postInquiryNum()
      }
    } catch (error) {
      console.log('postNotice>>>', error)
    }
  }

  postInquiryNum = async () => {
    const {inquiryNum} = this.state
    try {
      const response = await API.postInquiryNum({
        inquiryNum: inquiryNum,
      })
      //console.log('postInquiryNum>>>', response)
      if (response.success) {
        this.postSRInquiry()
      }
    } catch (error) {
      console.log('postInquiryNum>>>', error)
    }
  }

  postSRInquiry = async () => {
    const {SRInquiryNum, email,inquiry_charge} = this.state
    try {
      const response = await API.postSRInquiry({
        SRInquiryNum: SRInquiryNum,
        email: email,
        inquiry_charge : inquiry_charge
      })
      //console.log('postSRInquiry>>>', response)
      if (response.success) {
        this.postTerm();
      }
    } catch (error) {
      console.log('postSRInquiry>>>', error)
    }
  }

  postTerm = async () => {
    const {limit_days} = this.state
    try {
      const response = await API.postlimitNumber({
        inquiry_charge :  mUtils.isEmpty(limit_days) ? 30 : parseInt(limit_days)
      })
      //console.log('postSRInquiry>>>', response)
      if (response.success) {
        this.goBack()
      }
    } catch (error) {
      console.log('postTerm>>>', error)
    }
  }

  getNotice = async () => {
    try {
      const response = await API.getNotice()
      //console.log('getNotice>>>', response)
      if (response.success) {
        this.setState({notice: response.notice_contents})
      }
    } catch (error) {
      //console.log('getNotice>>>', error)
    }
  }

  getInquiryNum = async () => {
    try {
      const response = await API.getInquiryNum()
      console.log('getInquiryNum>>>', response)
      if (response.success) {
        this.setState({inquiryNum: response.inquiry_number, limit_days : response.limit_days})
      }
    } catch (error) {
      //console.log('getInquiryNum>>>', error)
    }
  }

  getSRInquiry = async () => {
    try {
      const response = await API.getSRInquiry()
      console.log('getSRInquiry>>>', response)
      if (response.success) {
        this.setState({SRInquiryNum: response.showroom_inquiry_contact, email: response.showroom_inquiry_email,inquiry_charge: response.inquiry_charge})
      }
    } catch (error) {
      //console.log('getSRInquiry>>>', error)
    }
  }

  componentDidMount() {
    this.modalOption('Settings')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getNotice()
    this.getInquiryNum()
    this.getSRInquiry()
  }

  handleSelectTop = select => {
    this.setState({select: select})
  }
  selectView() {
    const {notice, inquiryNum, SRInquiryNum, email,inquiry_charge,limit_days} = this.state;
    console.log('limit_days',limit_days)
    switch (this.state.select) {
      case '공지사항':
        return (
          <TextInput
            style={styles.desc}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'공지사항을 입력해 주세요.'}
            placeholderTextColor={mConst.gray}
            value={notice}
            onChangeText={text => {
              this.setState({notice: text})
            }}
          />
        )
      case '문의번호':
        return (
          <View style={{flex: 1}}>
            <TextInput
              keyboardType={'number-pad'}
              style={styles.numberBox}
              placeholder={'문의번호를 입력해 주세요.'}
              placeholderTextColor={mConst.gray}
              value={mUtils.isEmpty(inquiryNum) ? null : mUtils.allNumber(inquiryNum)}
              onChangeText={text => {
                this.setState({inquiryNum: text})
              }}
            />
          </View>
        )
      case '기간설정':
        return (
          <View style={{flex: 1}}>
            <TextInput
              keyboardType={'number-pad'}
              style={styles.numberBox}
              placeholder={'홀딩요청 최대기간 일수로 입력하세요(최대60일)'}
              placeholderTextColor={mConst.gray}
              value={limit_days.toString()}
              onChangeText={text => {
                this.setState({limit_days: text})
              }}
            />
          </View>
        )
      case '쇼룸문의':
        return (
          <View style={{flex: 1}}>
             <TextInput
              style={styles.numberBox}
              placeholder={'담당자명을 입력하세요'}
              placeholderTextColor={mConst.gray}
              value={inquiry_charge}
              onChangeText={text => {
                this.setState({inquiry_charge: text})
              }}
            />
            <TextInput
              keyboardType={'number-pad'}              
              style={{...styles.numberBox, marginTop: mUtils.wScale(10)}}
              placeholder={'연락처를 입력하세요'}
              placeholderTextColor={mConst.gray}              
              value={mUtils.isEmpty(SRInquiryNum) ? null : mUtils.allNumber(SRInquiryNum)}
              onChangeText={text => {
                this.setState({SRInquiryNum: text})
              }}
            />
            <TextInput
              style={{...styles.numberBox, marginTop: mUtils.wScale(10)}}
              placeholder={'이메일을 입력하세요'}
              placeholderTextColor={mConst.gray}
              value={email}
              onChangeText={text => {
                this.setState({email: text})
              }}
            />
          </View>
        )
    }
  }
  render() {
    const {select} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerWrapper}>
            {_.map(topList, (item, index) => {
              const selected = item === select
              return (
                <TouchableOpacity
                  style={selected ? styles.headerBorderOn : styles.headerBorder}
                  key={index}
                  onPress={() => this.handleSelectTop(item)}
                >
                  <Text style={selected ? styles.headerTextOn : styles.headerText}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          {this.selectView()}
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => {this.postNotice()}}
          >
            <Text style={styles.rightText}>Confirm</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterSettingScreen)
