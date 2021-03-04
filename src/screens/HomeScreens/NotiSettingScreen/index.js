import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, Switch, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-date-picker'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'

const magazine = [
  {title: '디지털 쇼룸', desc: '디지털 쇼룸의 알림을 받아보세요'},
  {title: '샘플 요청', desc: '샘플 요청의 알림을 받아보세요'},
  {title: 'PR GPS 소식', desc: 'PR GPS의 새로운 소식을 받아보세요'},
  {title: '방해 금지 시간', desc: '특정 시간동안 알림을 받지않아요'},
  {title: '보도자료', desc: '보도자료의 알림을 받아보세요 '},
]

const brand = [
  {title: '샘플 요청', desc: '샘플 요청의 알림을 받아보세요'},
  {title: 'PR GPS 소식', desc: 'PR GPS의 새로운 소식을 받아보세요'},
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
      let response = await API.putSampleRequests({recv_yn: switchValue})
      console.log('putSampleRequests>>>', response)
    } catch (error) {
      console.log('putSampleRequests>>>', error)
    }
  }

  putNotice = async switchValue => {
    try {
      let response = await API.putNotice({recv_yn: switchValue})
      console.log('putNotice>>>', response)
    } catch (error) {
      console.log('putNotice>>>', error)
    }
  }

  putSR = async switchValue => {
    try {
      let response = await API.putSR({recv_yn: switchValue})
      console.log('putSR>>>', response)
    } catch (error) {
      console.log('putSR>>>', error)
    }
  }

  putPress = async switchValue => {
    try {
      let response = await API.putPress({recv_yn: switchValue})
      console.log('putPress>>>', response)
    } catch (error) {
      console.log('putPress>>>', error)
    }
  }

  putNotDis = async switchValue => {
    const {from, to} = this.state
    try {
      let response = await API.putNotDis({mode_on: switchValue, begin_dt: from, end_dt: to})
      console.log('putNotDis>>>', response)
    } catch (error) {
      console.log('putNotDis>>>', error)
    }
  }

  switch = (item, index, switchValue) => {
    const {isEnabled} = this.state
    const copy = [...isEnabled]
    copy.splice(index, 1, switchValue)
    switch (item.title) {
      case '디지털 쇼룸':
        this.putSR(switchValue)
        this.setState({isEnabled: copy})
        break
      case '샘플 요청':
        this.putSampleRequests(switchValue)
        this.setState({isEnabled: copy})
        break
      case 'PR GPS 소식':
        this.putNotice(switchValue)
        this.setState({isEnabled: copy})
        break
      case '방해 금지 시간':
        this.setState({isEnabled: copy, isvisible: {open: true, in: index}})
        break
      case '보도자료':
        this.putPress(switchValue)
        this.setState({isEnabled: copy})
        break
    }
  }

  componentDidMount() {
    this.pushOption('알림 설정')
    const {info} = this.props.route.params
    const arr =
      userType === 'M' ? [false, false, false, false, false] : [info.req_notifi_recv_yn, info.notice_notifi_recv_yn, info.not_disturb_mode_yn]
    this.setState({isEnabled: arr, from: _.defaultTo(info.not_disturb_begin_dt, new Date()), to: _.defaultTo(info.not_disturb_end_dt, new Date())})
  }

  render() {
    const {isEnabled, isvisible, from, to, selected} = this.state
    const copy = [...isEnabled]
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {_.map(userType === 'M' ? magazine : brand, (item, index) => {
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
                    console.log('from>>>>>', date.getTime() / 1000)
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
