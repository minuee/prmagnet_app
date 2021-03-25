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
      selectedDate: '',
      selectedTimeStamp: '',
      selected: '',
      day: '',
      selectedColor: '',
    }
  }

  getShowRoomList = async date => {
    try {
      let response = await API.getShowRoomList({
        date: date,
      })
      console.log('getShowRoomList>>>', response)
      this.setState({
        look: response.list,
      })
    } catch (error) {
      console.log('getShowRoomList>>>', error)
    }
  }

  getMemo = async () => {
    const {no, date} = this.params
    try {
      let response = await API.getMemo({
        showroom_no: no,
        date: date,
      })
      console.log('getMemo>>>>>>', response)
      //this.setState({desc: response.content, color: response.selectedColor, selectedTimeStamp: })
    } catch (error) {
      console.log('getMemo>>>>>>', error)
    }
  }

  componentDidMount() {
    const {no, date} = this.params
    let day = Math.floor(new Date().getTime() / 1000)
    this.modalOption('')
    this.onFocus(this.handleOnFocus)
    this.setState({
      selectedDate: moment(day.timestamp).format('YYYY.MM.DD'),
      selectedTimeStamp: day.timestamp / 1000,
      day: moment(day.timestamp).format('dd'),
    })
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = () => {
    //this.getSampleRequests()
  }
  onSelect = (idx, value) => {
    this.setState({select: value})
  }

  onDayPress = day => {
    this.setState({
      selectedDate: moment(day.timestamp).format('YYYY.MM.DD'),
      selectedTimeStamp: day.timestamp / 1000,
      day: moment(day.timestamp).format('dd'),
      drop: false,
    })
    this.getShowRoomList(day.timestamp / 1000)
  }

  render() {
    const {color1, color2, select, look, selectedDate, selected, drop, desc, day, selectedColor} = this.state
    const {type} = this.props.route.params
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.layout}>
            {color1.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.color,
                    backgroundColor: item,
                    borderWidth: selectedColor === item ? 3 : 0,
                    borderColor: selectedColor === item ? 'rgba(0, 0, 0, 0.5)' : '',
                  }}
                  onPress={() => {
                    this.setState({selectedColor: item})
                  }}
                />
              )
            })}
          </View>
          <View style={styles.layout}>
            {color2.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.color,
                    backgroundColor: item,
                    borderWidth: selectedColor === item ? 3 : 0,
                    borderColor: selectedColor === item ? 'rgba(0, 0, 0, 0.5)' : '',
                  }}
                  onPress={() => {
                    this.setState({selectedColor: item})
                  }}
                />
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
              <Text style={styles.select}>{selectedDate && day ? `${selectedDate} (${day})` : '0000.00.00 (요일)'}</Text>
              <FastImage resizeMode={'contain'} source={moreImg} style={styles.moreImg} />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <DropDown options={look} value={select} onSelect={this.onSelect} />
          </View>

          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <TextInput
              style={styles.layout3}
              multiline={true}
              textAlignVertical={'top'}
              placeholder={'메모 입력해주세요.'}
              placeholderTextColor={mConst.gray}
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
                      setTimeout(() => {
                        this.alert('삭제 완료', '메모를 삭제 하였습니다.', [{onPress: () => this.goBack()}])
                      }, 100)
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
              this.alert('메모 추가', '해당 메모를 추가하시겠습니까?', [
                {
                  onPress: () => {
                    this.goBack()
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
