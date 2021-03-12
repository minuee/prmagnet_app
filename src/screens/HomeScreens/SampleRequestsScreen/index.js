import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Postcode from 'react-native-daum-postcode'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import moment from 'moment'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import Header from '../../common/Header'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const modelImg = require('../../../images/sample/model_1.png')
const moreImg = require('../../../images/navi/more_2.png')
const starImg = require('../../../images/navi/star_1.png')
const checkImg = require('../../../images/navi/check_1.png')
const noCheckImg = require('../../../images/navi/no_check_1.png')
const plusImg = require('../../../images/navi/plus_2.png')
const checkImg2 = require('../../../images/navi/check_2.png')
const checkImg3 = require('../../../images/navi/check_3.png')
const selectImg2 = require('../../../images/navi/select_2.png')
const delImg = require('../../../images/navi/del_1.png')
const yesNo = ['Yes', 'No']

LocaleConfig.locales['en'] = {
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
}
LocaleConfig.defaultLocale = 'en'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)

class SampleRequestsScreen extends PureComponent {
  initialState = {
    [_today]: {disabled: true},
  }

  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      selected: [],
      yesNo: '',
      payPictorial: false,
      payPictorialDesc: '',
      shDate: '',
      pkDate: '',
      rtDate: '',
      destination: '',
      destination1: '',
      shNote: '',
      concept: '',
      shTime: '',
      celebrity: [],
      fashionModel: [],
      todayConnect: false,
      numberPage: '',
      togetherBrand: '',
      message: '',
      _markedDates: {},
    }
  }

  delModel = (item, index) => {
    const {delSelect} = this.props.route.params
    this.setState(state => {
      const result = state.selected.filter((e, j) => index !== j)
      if (result.length === 0) {
        this.goBack()
      }
      return {selected: result}
    })
    delSelect(item)
  }

  onDaySelect = day => {
    const _selectedDay = moment(day.dateString).format(_format)
    let selected = true
    console.log('>>>>>', this.state._markedDates)
    console.log('??????', Object.keys(this.state._markedDates).length)
    if (Object.keys(this.state._markedDates).length < 3) {
      if (this.state._markedDates[_selectedDay]) {
        selected = !this.state._markedDates[_selectedDay].selected
      }
      const updatedMarkedDates = {...this.state._markedDates, ...{[_selectedDay]: {selected}}}
      this.setState({_markedDates: updatedMarkedDates})
    }
  }

  componentDidMount() {
    const {modelList} = this.props.route.params
    this.pushOption('Sample Request')
    this.setState({selected: modelList})
  }

  render() {
    const {selected, drop, shDate, pkDate, rtDate} = this.state
    const {user} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>Sample</Text>
            <Text style={styles.mainTitle1}>Requests</Text>
            <Text style={{...styles.subTitle, marginTop: mUtils.wScale(30)}}>
              Request product : <Text style={{color: '#7ea1b2'}}>{selected.length}</Text>
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: mUtils.wScale(20), marginTop: mUtils.wScale(16)}}
            contentContainerStyle={{paddingRight: mUtils.wScale(20)}}
          >
            {selected.map((item, index) => {
              return (
                <View key={index} style={{marginRight: mUtils.wScale(5), alignItems: 'center'}}>
                  <View>
                    <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
                    <View style={{...styles.select, backgroundColor: 'rgba(126, 161, 178, 0.8)'}}>
                      <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
                    </View>
                    <TouchableOpacity
                      style={styles.del}
                      onPress={() => {
                        this.delModel(item, index)
                      }}
                    >
                      <FastImage resizeMode={'contain'} style={styles.delImg} source={delImg} />
                    </TouchableOpacity>
                  </View>
                  <Text style={{...styles.modelTitle, marginTop: mUtils.wScale(8)}}>{item.showroom_nm}</Text>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.emptyBar} />
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.subTitle}}>Request Information</Text>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Magazine</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>RTW</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Editor/Stylist</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>이름</Text>
                </View>
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Contact <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between'}}>
              <Menu style={{width: '49%'}}>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                  }}
                >
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText}>김미경as</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35), width: mUtils.wScale(184)}}>
                  <MenuOption>
                    <Text>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>

              <View style={{...styles.box1, width: '49%'}}>
                <Text style={styles.boxText}>이름</Text>
              </View>
            </View>
            <>
              <View
                style={{
                  ...styles.layout,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Shooting Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1, justifyContent: 'space-between'}}
                    onPress={() => {
                      this.setState({drop: !drop})
                    }}
                  >
                    <Text style={styles.boxText}>8/4(토)</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Pickup Date</Text>
                  <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText}>8/3(금)</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Returning Date</Text>
                  <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText}>8/6 (월)</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
              </View>
              {drop ? (
                <View
                  style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    top: mUtils.wScale(215),
                    paddingHorizontal: mUtils.wScale(20),
                    width: '100%',
                  }}
                >
                  <Calendar
                    minDate={Date()}
                    monthFormat={'yyyy MMMM'}
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#dddddd',
                    }}
                    maxDate={_maxDate}
                    // hideArrows={true}

                    onDayPress={this.onDaySelect}
                    markedDates={this.state._markedDates}
                  />
                </View>
              ) : null}
            </>
            <Text style={styles.smallTitle}>Shipping destination</Text>
            <TextInput style={{...styles.inputBox, marginTop: mUtils.wScale(6)}} />
            <TextInput style={{...styles.inputBox, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(18)}} />
            <Text style={styles.smallTitle}>Shipping Notes</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
              multiline={true}
              textAlignVertical={'top'}
            />
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>촬영컨셉</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'컨셉'} placeholderTextColor={mConst.borderGray} />
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Shooting time</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'시간'} placeholderTextColor={mConst.borderGray} />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Model <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
              <View style={{...styles.layout}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={checkImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0, marginLeft: mUtils.wScale(5)}}>Celebrity</Text>
              </View>
              <View style={{...styles.box2, width: '65%'}}>
                <Text style={styles.boxText}>아이린</Text>
                <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
              </View>
            </View>
            <View
              style={{...styles.layout, justifyContent: 'space-between', width: '100%', marginTop: mUtils.wScale(5), marginBottom: mUtils.wScale(18)}}
            >
              <View style={{...styles.layout}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0, marginLeft: mUtils.wScale(5)}}>Fashion Model</Text>
              </View>
              <View style={{...styles.box2, width: '65%'}}>
                <Text style={styles.boxText}></Text>
                <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              유가화보 <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
              <TextInput style={{...styles.inputBox, width: '95%'}} placeholder={'Brand Name'} placeholderTextColor={mConst.borderGray} />
            </View>
            <Text style={styles.smallTitle}>당일연결 희망/ 가능 여부</Text>
            <View
              style={{...styles.layout, width: '100%', justifyContent: 'space-between', marginBottom: mUtils.wScale(18), marginTop: mUtils.wScale(3)}}
            >
              {yesNo.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({...this.state, yesNo: item})
                    }}
                    style={{...styles.yesNoBox, borderColor: this.state.yesNo === item ? mConst.black : mConst.borderGray}}
                  >
                    <FastImage resizeMode={'contain'} style={styles.checkImg2} source={this.state.yesNo === item ? checkImg2 : checkImg3} />
                    <Text
                      style={{...styles.yesNo, marginLeft: mUtils.wScale(5), color: this.state.yesNo === item ? mConst.black : mConst.borderGray}}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.smallTitle}>Number of Pages</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              placeholder={'Number of pages'}
              placeholderTextColor={mConst.borderGray}
            />
            <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              placeholder={'Different brand'}
              placeholderTextColor={mConst.borderGray}
            />
            <Text style={styles.smallTitle}>Message</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              multiline={true}
              textAlignVertical={'top'}
            />
          </View>
          <TouchableOpacity style={{...styles.bottomButton, backgroundColor: mConst.black}}>
            <Text style={{...styles.buttonText, color: mConst.white}}>Sample Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(SampleRequestsScreen)
