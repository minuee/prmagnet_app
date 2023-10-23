import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, Switch, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'

const magazine = [
  {title: '일반 공지사항', desc: '앱 관리자의 공지사항 알림을 받아보세요'},
  {title: '브랜드 공지사항', desc: '공지사항 알림을 받아보세요'},
  {title: '샘플 요청 확인', desc: '샘플 요청 확인 알림을 받아보세요'},
  {title: '샘플 미수령', desc: '샘플 미수령 알림을 받아보세요'},
  {title: '샘플 발송', desc: '샘플 발송 알림을 받지않아요'},
  {title: '방해 금지 시간', desc: '특정 시간동안 알림을 받아보세요 '},
]

const brand = [
  {title: '일반 공지사항', desc: '앱 관리자의 공지사항 알림을 받아보세요'},
  {title: '샘플 요청', desc: '샘플 요청 알림을 받아보세요'},
  {title: '샘플 미수령', desc: '샘플 미수령 알림을 받아보세요'},
  {title: '방해 금지 시간', desc: '특정 시간동안 알림을 받지않아요'},
]

const select = ['From', 'To']

const userType = mConst.getUserType()

class NotiSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {isEnabled: '', isvisible: {open: false, in: ''}, from: '', to: '', selected: 'From'}
  }

  putSampleRequests = async switchValue => {
    try {
      const response = await API.putSampleRequests({recv_yn: switchValue})
      //console.log('putSampleRequests>>>', response)
    } catch (error) {
      //console.log('putSampleRequests>>>', error)
    }
  }

  putSampleRequestsConfirm = async switchValue => {
    try {
      const response = await API.putSampleRequestsConfirm({recv_yn: switchValue})
      //console.log('putSampleRequestsConfirm>>>', response)
    } catch (error) {
      //console.log('putSampleRequestsConfirm>>>', error)
    }
  }

  putNotReceive = async switchValue => {
    try {
      const response = await API.putNotReceive({recv_yn: switchValue})
      //console.log('putNotReceive>>>', response)
    } catch (error) {
      //console.log('putNotReceive>>>', error)
    }
  }

  putSampleSend = async switchValue => {
    try {
      const response = await API.putSampleSend({recv_yn: switchValue})
      //console.log('putSampleSend>>>', response)
    } catch (error) {
      //console.log('putSampleSend>>>', error)
    }
  }

  putBrandNotice = async switchValue => {
    try {
      const response = await API.putBrandNotice({recv_yn: switchValue})
      //console.log('putBrandNotice>>>', response)
    } catch (error) {
      //console.log('putBrandNotice>>>', error)
    }
  }

  putAdminNotice = async switchValue => {
    try {
      const response = await API.putAdminNotice({recv_yn: switchValue})      
      if ( switchValue ) { //토픽등록
        userType == 'B' ? mUtils.setFcmTopic('B') : mUtils.setFcmTopic('M');
      }else { //토픽해제
        await mUtils.setFcmTopicClear();
      }
    } catch (error) {
      console.log('putBrandNotice>>>', error)
    }
  }

  putNotDis = async switchValue => {
    const from = this.state.from.getTime() / 1000
    const to = this.state.to.getTime() / 1000
    try {
      const response = await API.putNotDis({
        mode_on: switchValue,
        begin_dt: switchValue ? (from > to ? to : from) : null,
        end_dt: switchValue ? (from > to ? from : to) : null,
      })
      //console.log('putNotDis>>>', response)
      if (response.success) {
        this.setState({isvisible: {open: false, in: ''}})
      }
    } catch (error) {
      //console.log('putNotDis>>>', error)
    }
  }

  switch = (item, index, switchValue) => {
    const {isEnabled} = this.state;
    const copy = [...isEnabled];
    copy.splice(index, 1, switchValue);

    console.log('switch>>>', item,switchValue);

    switch (item.title) {
      case '일반 공지사항':
        this.putAdminNotice(switchValue)
        this.setState({isEnabled: copy})
        break
      case '브랜드 공지사항':
        this.putBrandNotice(switchValue)
        this.setState({isEnabled: copy})
        break
      case '샘플 요청':
        this.putSampleRequests(switchValue)
        this.setState({isEnabled: copy})
        break
      case '샘플 요청 확인':
        this.putSampleRequestsConfirm(switchValue)
        this.setState({isEnabled: copy})
        break
      case '샘플 미수령':
        this.putNotReceive(switchValue)
        this.setState({isEnabled: copy})
        break
      case '샘플 발송':
        this.putSampleSend(switchValue)
        this.setState({isEnabled: copy})
        break
      case '방해 금지 시간':
        if (isEnabled[index]) {
          this.putNotDis(switchValue)
          this.setState({isEnabled: copy})
        } else {
          this.setState({isEnabled: copy, isvisible: {open: true, in: index}})
        }
        break
    }
  }

  UNSAFE_componentWillMount() {
    this.pushOption('알림 설정');
    const {info} = this.props.route.params;
    const arr = userType !== 'B' ? [false, false, false, false, false] : [info.notice_notifi_recv_yn, info.req_notifi_recv_yn, info.sample_not_recv_notifi_yn, info.not_disturb_mode_yn]
    this.setState({
      isEnabled: arr,
      from: _.defaultTo(new Date(moment.unix(info.not_disturb_begin_dt).format()), new Date()),
      to: _.defaultTo(new Date(moment.unix(info.not_disturb_end_dt).format()), new Date()),
      //from: new Date(),
      //to: new Date(),
    })
  }

  componentDidMount() {
    
  }

  render() {
    const {isEnabled, isvisible, from, to, selected} = this.state
    const copy = [...isEnabled]
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {_.map(userType !== 'B' ? magazine : brand, (item, index) => {
              return (
                <View key={index} style={styles.listBox}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                  </View>
                  <Switch
                    style={styles.switchIc}
                    trackColor={{false: mConst.borderGray, true: mConst.black}}
                    thumbColor={mConst.white}
                    ios_backgroundColor={mConst.borderGray}
                    value={isEnabled[index]}
                    onValueChange={switchValue => {
                      this.switch(item, index, switchValue)
                    }}
                  />
                </View>
              )
            })}
          </ScrollView>
          <Modal
            isVisible={isvisible.open}
            onBackdropPress={() => {
              copy.splice(isvisible.in, 1, false)
              this.setState({isEnabled: copy, isvisible: {open: false, in: ''}, from: new Date(), to: new Date()})
            }}
            useNativeDriver={true}
            style={{alignItems: 'center'}}
          >
            <View style={styles.modalView}>
              <View style={styles.layout}>
                {select.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{...styles.modalTopB, borderBottomColor: item === selected ? mConst.getBaseXColor() : '#d5d5d5'}}
                      onPress={() => {
                        this.setState({selected: item})
                      }}
                    >
                      <Text style={{...styles.modalTopT, color: item === selected ? mConst.getBaseXColor() : '#999999'}}>{item}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <DatePicker
                date={selected === 'From' ? from : to}
                onDateChange={date => {
                  if (selected === 'From') {
                    this.setState({from: date})
                  } else {
                    this.setState({to: date})
                  }
                }}
                mode={'time'}
                locale={'en'}
                style={styles.datePicker}
              />
              <View style={{...styles.layout}}>
                <TouchableOpacity
                  style={{...styles.modalBottomL}}
                  onPress={() => {
                    copy.splice(isvisible.in, 1, false)
                    this.setState({isEnabled: copy, isvisible: {open: false, in: ''}, from: new Date(), to: new Date()})
                  }}
                >
                  <Text style={{...styles.modalBottomLT}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.modalBottomR}}
                  onPress={() => {
                    //this.setState({isvisible: {open: false, in: ''}, from: new Date(), to: new Date()})
                    this.putNotDis(true)
                  }}
                >
                  <Text style={{...styles.modalBottomRT}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(NotiSettingScreen)
