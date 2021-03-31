import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Image, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import moment from 'moment'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import DropDown from '../../common/DropDown'
import API from '../../../common/aws-api'

const moreImg = require('../../../images/navi/more_3.png')
const checkImg = require('../../../images/navi/check_5.png')

LocaleConfig.locales['en'] = {
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
}
LocaleConfig.defaultLocale = 'en'

class ScheduleMemoScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      color1: ['#c18c8c', '#c1a68c', '#b8c18c', '#8cc1a7', '#8cc1c1', '#8cafc1', '#908cc1'],
      color2: ['#af8cc1', '#e1c668', '#c1c3c3', '#b0a581', '#e1af7b', '#d78979', '#e6e667'],
      look: [],
      drop: false,
      select: '',
      desc: '',
      drop: false,
      selectedTimeStamp: '',
      selected: '',
      selectedColor: '',
      type: false,
      memo_no: '',
    }
  }

  getShowRoomList = async date => {
    console.log('?!?!!!!!', date)
    try {
      let response = await API.getShowRoomList({
        date: date,
      })
      console.log('getShowRoomList>>>', response)
      if (response.success) {
        this.setState({
          look: response.list,
        })
      }
    } catch (error) {
      console.log('getShowRoomList>>>', error)
    }
  }

  getMemo = async () => {
    const {showroom_no, selectedTimeStamp, select} = this.state
    try {
      let response = await API.getMemo({
        showroom_no: select ? select.showroom_no : '',
        date: selectedTimeStamp,
      })
      console.log('getMemo>>>>>>', response)
      if (response.memo) {
        this.setState({
          desc: response.memo.content,
          selectedColor: response.memo.color,
          selectedTimeStamp: response.memo.memo_dt,
          type: true,
          memo_no: response.memo.memo_no,
        })
      } else {
        this.setState({
          desc: '',
          type: false,
          memo_no: '',
        })
      }
    } catch (error) {
      console.log('getMemo>>>>>>', error)
    }
  }

  componentDidMount() {
    this.modalOption('')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = () => {
    const {no, date, name} = this.params
    if (no && date) {
      this.setState({select: {showroom_no: no, showroom_nm: name}, selectedTimeStamp: date}, () => {
        this.getMemo()
      })
    } else {
      this.getMemo()
    }
  }
  onSelect = (idx, value) => {
    this.setState({select: value}, () => {
      this.getMemo()
    })
  }

  onDayPress = day => {
    this.setState(
      {
        selectedTimeStamp: day.timestamp / 1000,
        drop: false,
        select: '',
      },
      () => {
        this.getShowRoomList(day.timestamp / 1000)
      }
    )
  }

  postMemo = async () => {
    const {selectedTimeStamp, select, desc, selectedColor} = this.state
    try {
      let response = await API.postMemo({
        showroom_no: select.showroom_no,
        date: selectedTimeStamp,
        color: selectedColor,
        content: desc,
      })
      console.log('postMemo>>>>', response)
      if (response.success) {
        setTimeout(() => {
          this.alert('추가 완료', '메모를 추가 완료하였습니다.', [{onPress: () => this.goBack()}])
        }, 100)
      }
    } catch (error) {
      console.log('postMemo>>>>', error)
    }
  }

  putMemo = async () => {
    const {memo_no, selectedTimeStamp, select, desc, selectedColor} = this.state
    try {
      let response = await API.putMemo({
        memo_no: memo_no,
        showroom_no: select.showroom_no,
        date: selectedTimeStamp,
        color: selectedColor,
        content: desc,
      })
      console.log('putMemo>>>>', response)
      if (response.success) {
        setTimeout(() => {
          this.alert('수정 완료', '메모를 수정 완료하였습니다.', [{onPress: () => this.goBack()}])
        }, 100)
      }
    } catch (error) {
      console.log('putMemo>>>>', error)
    }
  }

  delMemo = async () => {
    const {memo_no} = this.state
    try {
      let response = await API.delMemo({
        memo_no: memo_no,
      })
      console.log('delMemo>>>>', response)
      if (response.success) {
        setTimeout(() => {
          this.alert('삭제 완료', '메모를 삭제 완료하였습니다.', [{onPress: () => this.goBack()}])
        }, 100)
      }
    } catch (error) {
      console.log('delMemo>>>>', error)
    }
  }

  render() {
    const {color1, color2, select, look, selected, drop, desc, selectedColor, type, selectedTimeStamp} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.layout}>
            {color1.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={{
                    ...styles.color,
                    backgroundColor: item,
                  }}
                  onPress={() => {
                    this.setState({selectedColor: item})
                  }}
                >
                  {selectedColor === item && <FastImage resizeMode={'cover'} source={checkImg} style={styles.checkImg} />}
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={styles.layout}>
            {color2.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={{
                    ...styles.color,
                    backgroundColor: item,
                  }}
                  onPress={() => {
                    this.setState({selectedColor: item})
                  }}
                >
                  {selectedColor === item && <FastImage resizeMode={'cover'} source={checkImg} style={styles.checkImg} />}
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(20)}}>
            <TouchableOpacity
              style={{...styles.layout2}}
              onPress={() => {
                this.setState({drop: !drop})
              }}
            >
              <Text style={styles.select}>{selectedTimeStamp ? mUtils.getShowDate(selectedTimeStamp, 'YYYY.MM.DD (ddd)') : '0000.00.00 (요일)'}</Text>
              <FastImage resizeMode={'contain'} source={moreImg} style={styles.moreImg} />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <DropDown options={look} value={select} onSelect={this.onSelect} placeholder={'선택해주세요.'} />
          </View>

          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <TextInput
              style={styles.layout3}
              multiline={true}
              textAlignVertical={'top'}
              placeholder={'메모 입력해주세요.'}
              placeholderTextColor={'#999999'}
              value={desc}
              onChangeText={text => {
                this.setState({desc: text})
              }}
            />
          </View>
          {drop ? (
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                zIndex: 1,
                top: mUtils.wScale(175),
                paddingHorizontal: mUtils.wScale(20),
                width: '100%',
              }}
            >
              <Calendar
                monthFormat={'yyyy MMMM'}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#dddddd',
                }}
                onDayPress={this.onDayPress}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: '#108ee9',
                    selectedTextColor: '#ffffff',
                  },
                }}
              />
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.layout}>
          {type && (
            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => {
                this.alert('메모 삭제', '해당 메모를 삭제하시겠습니까?', [
                  {
                    onPress: () => {
                      this.delMemo()
                    },
                  },
                  {onPress: () => null},
                ])
              }}
            >
              <Text style={styles.leftText}>Delete</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{...styles.box, width: type ? '70%' : '100%'}}
            onPress={() => {
              this.state.memo_no
                ? this.alert('메모 수정', '해당 메모를 수정하시겠습니까?', [
                    {
                      onPress: () => {
                        this.putMemo()
                      },
                    },
                    {onPress: () => null},
                  ])
                : this.alert('메모 추가', '해당 메모를 추가하시겠습니까?', [
                    {
                      onPress: () => {
                        this.postMemo()
                      },
                    },
                    {onPress: () => null},
                  ])
            }}
          >
            <Text style={styles.bottom}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ScheduleMemoScreen)
