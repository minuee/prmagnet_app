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

const time = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]

class SampleRequestsScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      selected: [],
      defaultInfo: '',
      selectContact: '',
      selectContact1: '',
      shDate: '',
      pkDate: '',
      rtDate: '',
      startTime: '',
      endTime: '',
      destination: '',
      shippingNote: '',
      concept: '',
      celebrity: [],
      fashionModel: [],
      payPictorialDesc: '',
      locateShoot: '',
      todayConnect: false,
      numberPage: '',
      togetherBrand: '',
      message: '',
      drop: false,
      drop1: false,
      drop2: false,
    }
  }

  postSRRequestSend = async () => {
    const {
      selected,
      defaultInfo,
      selectContact,
      shDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      destination,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      payPictorialDesc,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
    } = this.state
    const {brandId} = this.props.route.params
    try {
      let response = await API.postSRRequestSend({
        brand_id: brandId,
        duty_recpt_dt: pkDate,
        photogrf_dt: shDate,
        begin_dt: startTime,
        end_dt: endTime,
        return_prearnge_dt: rtDate,
        photogrf_concept: concept,
        model_list: fashionModel,
        celeb_list: celebrity,
        picalbm_cntent: payPictorialDesc,
        page_cnt: numberPage,
        etc_brand: togetherBrand,
        today_connect: todayConnect,
        add_req_cntent: message,
        dlvy_adres_nm: destination,
        dlvy_atent_matter: shippingNote,
        showroom_list: selected,
        contact_user_id: selectContact.user_id,
        loc_value: locateShoot,
      })
      console.log('postSRRequestSend>>>>', response)
    } catch (error) {
      console.log('postSRRequestSend>>>>', error)
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
    const {drop, drop1, drop2} = this.state
    if (drop) {
      this.setState({shDate: day, drop: false})
    } else if (drop1) {
      this.setState({pkDate: day, drop1: false})
    } else if (drop2) {
      this.setState({rtDate: day, drop2: false})
    }
  }

  postSRRequest = async () => {
    const {modelList, brandId} = this.props.route.params
    let arr = modelList.map((item, index) => item.showroom_no)
    try {
      let response = await API.postSRRequest({
        showroom_list: arr,
        brand_id: brandId,
      })
      console.log('postSRRequest>>>>', response)
      this.setState({defaultInfo: response})
    } catch (error) {
      console.log('postSRRequest>>>', error)
    }
  }

  componentDidMount() {
    const {modelList} = this.props.route.params
    this.pushOption('Sample Request')
    this.setState({selected: modelList})
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.postSRRequest()
  }

  render() {
    const {
      selected,
      defaultInfo,
      selectContact,
      shDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      destination,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      payPictorialDesc,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      drop,
      drop1,
      drop2,
    } = this.state
    return defaultInfo ? (
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
                  <Text style={styles.boxText}>{defaultInfo.mgzn_nm}</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Editor/Stylist</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{defaultInfo.user_nm}</Text>
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
                    <Text style={styles.boxText}>{selectContact ? selectContact.mgzn_user_nm : 'Editor/Stylist'}</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35), width: mUtils.wScale(184)}}>
                  {defaultInfo.contact_info.map((item, index) => {
                    return (
                      <MenuOption key={index} style={styles.contactList} onSelect={() => this.setState({selectContact: item})}>
                        <Text style={styles.contactText}>{`${item.mgzn_user_nm}(${mUtils.allNumber(item.phone_no)})`}</Text>
                      </MenuOption>
                    )
                  })}
                </MenuOptions>
              </Menu>

              <View style={{...styles.box1, width: '49%'}}>
                <Text style={styles.boxText}>{selectContact ? mUtils.allNumber(selectContact.phone_no) : '연락처'}</Text>
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
                      this.setState({drop: !drop, drop1: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {shDate ? `${shDate.month}/${shDate.day}(${moment(shDate.timestamp).format('ddd')})` : '0/0(일)'}
                    </Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Pickup Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1, justifyContent: 'space-between'}}
                    onPress={() => {
                      this.setState({drop1: !drop1, drop: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {pkDate ? `${pkDate.month}/${pkDate.day}(${moment(pkDate.timestamp).format('ddd')})` : '0/0(일)'}
                    </Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Returning Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1, justifyContent: 'space-between'}}
                    onPress={() => {
                      this.setState({drop2: !drop2, drop: false, drop1: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {rtDate ? `${rtDate.month}/${rtDate.day}(${moment(rtDate.timestamp).format('ddd')})` : '0/0(일)'}
                    </Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </TouchableOpacity>
                </View>
              </View>
              {drop || drop1 || drop2 ? (
                <View style={styles.calendar}>
                  <Calendar
                    minDate={Date()}
                    monthFormat={'yyyy MMMM'}
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#dddddd',
                    }}
                    onDayPress={this.onDaySelect}
                    //markedDates={{
                    //  [dateSelect]: {
                    //    selected: true,
                    //    disableTouchEvent: true,
                    //    selectedColor: '#108ee9',
                    //    selectedTextColor: '#ffffff',
                    //  },
                    //}}
                  />
                </View>
              ) : null}
            </>
            <Text style={styles.smallTitle}>Shipping destination</Text>
            <View style={{...styles.layout, justifyContent: 'space-between'}}>
              <Menu style={{width: '100%'}}>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                  }}
                >
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText1}>{destination ? destination : 'Last delivery address(직접입력)'}</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35), width: mUtils.wScale(370)}}>
                  {defaultInfo.user.map((item, index) => {
                    return (
                      <MenuOption key={index} style={styles.contactList} onSelect={() => this.setState({destination: item.dlvy_adres_nm})}>
                        <Text style={styles.contactText}>{item.dlvy_adres_nm}</Text>
                      </MenuOption>
                    )
                  })}
                </MenuOptions>
              </Menu>
            </View>
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
              <View style={{width: '100%'}}>
                <Text style={styles.smallTitle}>촬영컨셉</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'컨셉'} placeholderTextColor={mConst.borderGray} />
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
                <TouchableOpacity>
                  <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                </TouchableOpacity>
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
                <TouchableOpacity>
                  <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                </TouchableOpacity>
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
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(SampleRequestsScreen)
