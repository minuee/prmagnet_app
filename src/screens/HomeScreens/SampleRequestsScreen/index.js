import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import Postcode from 'react-native-daum-postcode'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import dayjs from 'dayjs'
import moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import {Platform} from 'react-native'

const modelImg = require('../../../images/sample/model_1.png')
const moreImg = require('../../../images/navi/more_2.png')
const starImg = require('../../../images/navi/star_1.png')
const checkImg = require('../../../images/navi/check_1.png')
const noCheckImg = require('../../../images/navi/no_check_1.png')
const plusImg = require('../../../images/navi/plus_2.png')
const minusImg = require('../../../images/navi/minus_1.png')
const checkImg2 = require('../../../images/navi/check_2.png')
const checkImg3 = require('../../../images/navi/check_3.png')
const selectImg2 = require('../../../images/navi/select_2.png')
const delImg = require('../../../images/navi/del_1.png')
const yesNo = [
  {boolean: true, text: 'Yes'},
  {boolean: false, text: 'No'},
]

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

const convertHolidays = array => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item]: {textColor: 'red'},
    }
  }, {})
}

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
      destinationDetail: '',
      shippingNote: '',
      concept: '',
      celebrity: [''],
      fashionModel: [''],
      myPay: '',
      otherPay: '',
      locateShoot: '',
      todayConnect: 'No',
      numberPage: '',
      togetherBrand: '',
      message: '',
      drop: false,
      drop1: false,
      drop2: false,
      isvisible: false,
      year: dayjs().format('YYYY'),
      holidays: [],
    }
  }

  getBrandHoliday = async (year, brand_id) => {
    try {
      const response = await API.getBrandHoliday({year, brand_id})
      console.log('getBrandHoliday>>>>', JSON.stringify(response))
      if (response.success) {
        this.setState({holidays: _.get(response, 'list', []).map(d => dayjs.unix(d).format('YYYY-MM-DD'))})
      }
      // this.setState({data: response, start: params ? params.start : this.state.start, end: params ? params.end : this.state.end})
    } catch (error) {
      console.log('getBrandHoliday>>>>', error)
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
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      myPay,
      otherPay,
    } = this.state
    const {brandId} = this.props.route.params
    let list = selected.map((item, index) => item.showroom_no)
    console.log('>>>>>', selected)
    try {
      let response = await API.postSRRequestSend({
        brand_id: brandId,
        duty_recpt_dt: String(Math.floor(Number(pkDate.timestamp / 1000))),
        photogrf_dt: String(Math.floor(Number(shDate.timestamp) / 1000)),
        begin_dt: startTime,
        end_dt: endTime,
        return_prearnge_dt: String(Math.floor(Number(rtDate.timestamp) / 1000)),
        photogrf_concept: concept,
        model_list: fashionModel[0] === '' ? [] : fashionModel,
        celeb_list: celebrity[0] === '' ? [] : celebrity,
        page_cnt: numberPage,
        etc_brand: togetherBrand,
        today_connect: todayConnect,
        add_req_cntent: message,
        dlvy_adres_nm: destination,
        adres_detail: destinationDetail,
        dlvy_atent_matter: shippingNote,
        showroom_list: list,
        contact_user_id: selectContact.user_id,
        loc_value: locateShoot,
        own_paid_pictorial_content: myPay,
        other_paid_pictorial_content: otherPay,
      })
      console.log('postSRRequestSend>>>>', response)
      if (response.success) {
        this.goBack()
      }
    } catch (error) {
      console.log('postSRRequestSend>>>>', error)
    }
  }

  editSRRequestSend = async () => {
    const {
      selected,
      selectContact,
      shDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      destination,
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      myPay,
      otherPay,
    } = this.state
    const {no} = this.props.route.params
    let list = selected.map((item, index) => item.showroom_no)
    try {
      let response = await API.editSRRequestSend({
        req_no: no,
        duty_recpt_dt: String(Math.floor(Number(pkDate.timestamp / 1000))),
        photogrf_dt: String(Math.floor(Number(shDate.timestamp) / 1000)),
        begin_dt: startTime,
        end_dt: endTime,
        return_prearnge_dt: String(Math.floor(Number(rtDate.timestamp) / 1000)),
        photogrf_concept: concept,
        model_list: fashionModel[0] === '' ? [] : fashionModel,
        celeb_list: celebrity[0] === '' ? [] : celebrity,
        page_cnt: numberPage,
        etc_brand: togetherBrand,
        today_connect: todayConnect,
        add_req_cntent: message,
        dlvy_adres_nm: destination,
        adres_detail: destinationDetail,
        dlvy_atent_matter: shippingNote,
        showroom_list: list,
        contact_user_id: selectContact.user_id,
        loc_value: locateShoot,
        own_paid_pictorial_content: myPay,
        other_paid_pictorial_content: otherPay,
      })
      console.log('editSRRequestSend>>>>', response)
      if (response.success) {
        this.goBack()
      }
    } catch (error) {
      console.log('editSRRequestSend>>>>', error)
    }
  }

  delModel = (item, index) => {
    const {delSelect, type} = this.props.route.params
    this.setState(state => {
      const result = state.selected.filter((e, j) => index !== j)
      if (type) {
        if (result.length === 0) {
          this.goBack()
        }
      }
      return {selected: result}
    })
    if (type) {
      delSelect(item)
    }
  }

  onDaySelect = date => {
    const {drop, drop1, drop2, holidays} = this.state
    if (drop) {
      this.setState({shDate: date, drop: false})
      let pDt =
        moment(date.timestamp).subtract({day: 1}).day() === 0
          ? moment(date.timestamp).subtract({day: 3}).format('YYYY-MM-DD')
          : moment(date.timestamp).subtract({day: 1}).day() === 6
          ? moment(date.timestamp).subtract({day: 2}).format('YYYY-MM-DD')
          : moment(date.timestamp).subtract({day: 1}).format('YYYY-MM-DD')
      for (let i = 0; i < holidays.length; i++) {
        holidays.find(
          v =>
            v === pDt &&
            (pDt =
              moment(pDt).subtract({day: 1}).day() === 0
                ? moment(pDt).subtract({day: 3}).format('YYYY-MM-DD')
                : moment(pDt).subtract({day: 1}).day() === 6
                ? moment(pDt).subtract({day: 2}).format('YYYY-MM-DD')
                : moment(pDt).subtract({day: 1}).format('YYYY-MM-DD'))
        )
      }

      let rDt =
        moment(date.timestamp).add({day: 1}).day() === 6
          ? moment(date.timestamp).add({day: 3}).format('YYYY-MM-DD')
          : moment(date.timestamp).add({day: 1}).day() === 0
          ? moment(date.timestamp).add({day: 2}).format('YYYY-MM-DD')
          : moment(date.timestamp).add({day: 1}).format('YYYY-MM-DD')
      for (let i = 0; i < holidays.length; i++) {
        holidays.find(
          v =>
            v === rDt &&
            (rDt =
              moment(rDt).add({day: 1}).day() === 6
                ? moment(rDt).add({day: 3}).format('YYYY-MM-DD')
                : moment(rDt).add({day: 1}).day() === 0
                ? moment(rDt).add({day: 2}).format('YYYY-MM-DD')
                : moment(rDt).add({day: 1}).format('YYYY-MM-DD'))
        )
      }
      const pDtObj = moment(pDt)
      const rDtObj = moment(rDt)
      this.setState({
        shDate: date,
        drop: false,
        pkDate: {
          month: pDtObj.format('MM'),
          day: pDtObj.format('DD'),
          timestamp: pDtObj.unix(),
        },
        rtDate: {
          month: rDtObj.format('MM'),
          day: rDtObj.format('DD'),
          timestamp: rDtObj.unix(),
        },
      })
    } else if (drop1) {
      this.setState({pkDate: date, drop1: false})
    } else if (drop2) {
      this.setState({rtDate: date, drop2: false})
    }
  }

  postSRRequest = async () => {
    const {brandId, type, no} = this.props.route.params
    try {
      let response = await API.postSRRequest({
        brand_id: brandId,
      })
      console.log('postSRRequest>>>>', response)
      this.setState({defaultInfo: response})
    } catch (error) {
      console.log('postSRRequest>>>', error)
    }
  }

  getSampleRequests = async () => {
    const {brandId, type, no} = this.props.route.params
    try {
      let response = await API.getSampleRequests({
        req_no: no,
      })
      console.log('getSampleRequests>>>>', response)
      this.setState({
        selected: response.showroom_list,
        selectContact: {
          user_id: response.contact_user_id,
          mgzn_user_nm: response.contact_username,
          phone_no: response.contact_phone_no,
        },
        shDate: {
          month: mUtils.getShowDate(response.shooting_date, 'MM'),
          day: mUtils.getShowDate(response.shooting_date, 'DD'),
          timestamp: response.shooting_date * 1000,
        },
        pkDate: {
          month: mUtils.getShowDate(response.pickup_date, 'MM'),
          day: mUtils.getShowDate(response.pickup_date, 'DD'),
          timestamp: response.pickup_date * 1000,
        },
        rtDate: {
          month: mUtils.getShowDate(response.returning_date, 'MM'),
          day: mUtils.getShowDate(response.returning_date, 'DD'),
          timestamp: response.returning_date * 1000,
        },
        startTime: response.shooting_start_time,
        endTime: response.shooting_end_time,
        destination: response.dlvy_adres_nm,
        destinationDetail: response.adres_detail,
        shippingNote: response.dlvy_atent_matter,
        concept: response.photogrf_concept,
        celebrity: _.size(response.celeb_list) === 0 ? [''] : response.celeb_list,
        fashionModel: _.size(response.model_list) === 0 ? [''] : response.model_list,
        locateShoot: response.loc_value,
        todayConnect: response.today_connect,
        numberPage: response.page_cnt,
        togetherBrand: response.etc_brand_info,
        message: response.message,
        myPay: response.own_paid_pictorial_content,
        otherPay: response.other_paid_pictorial_content,
      })
    } catch (error) {
      console.log('getSampleRequests>>>>', error)
    }
  }

  componentDidMount() {
    const {modelList, type, brandName, brandId} = this.props.route.params
    const {year} = this.state
    this.pushOption(brandName ? brandName : 'Sample Request')
    if (type) {
      this.setState({selected: modelList})
    }
    this.onFocus(this.handleOnFocus)
    this.getBrandHoliday(year, brandId)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    const {modelList, type, brandName} = this.props.route.params
    this.postSRRequest()
    if (!type) {
      this.getSampleRequests()
    }
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
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      drop,
      drop1,
      drop2,
      myPay,
      otherPay,
      isvisible,
      holidays,
    } = this.state
    const {type} = this.props.route.params
    return defaultInfo ? (
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={100}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: mUtils.wScale(20)}}>
              <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>{type ? 'Sample' : 'My'}</Text>
              <Text style={styles.mainTitle1}>Requests {!type && 'Edit'}</Text>
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
                      {selected.length !== 1 && (
                        <TouchableOpacity
                          style={styles.del}
                          onPress={() => {
                            this.delModel(item, index)
                          }}
                        >
                          <FastImage resizeMode={'contain'} style={styles.delImg} source={delImg} />
                        </TouchableOpacity>
                      )}
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
                  ...styles.layout2,
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
              <View style={{...styles.layout2, justifyContent: 'space-between'}}>
                <ModalDropdown
                  style={{width: '49%'}}
                  dropdownStyle={{width: '44%'}}
                  onSelect={(i, v) => this.setState({selectContact: v})}
                  options={defaultInfo.contact_info}
                  renderRow={item => (
                    <View style={styles.contactList}>
                      <Text style={styles.contactText}>{`${item.mgzn_user_nm}(${mUtils.allNumber(item.phone_no)})`}</Text>
                    </View>
                  )}
                >
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText}>{selectContact ? selectContact.mgzn_user_nm : 'Editor/Stylist'}</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </ModalDropdown>

                <View style={{...styles.box1, width: '49%'}}>
                  <Text style={styles.boxText}>{selectContact ? mUtils.allNumber(selectContact.phone_no) : '연락처'}</Text>
                </View>
              </View>
              <>
                <View
                  style={{
                    ...styles.layout2,
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
                      markingType={'period'}
                      markedDates={convertHolidays(holidays)}
                    />
                  </View>
                ) : null}
              </>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingBottom: mUtils.wScale(20),
                }}
              >
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>Start Time</Text>
                  <ModalDropdown
                    dropdownStyle={{width: '44%'}}
                    onSelect={(i, v) => this.setState({startTime: v})}
                    renderRow={item => (
                      <View style={styles.contactList}>
                        <Text style={styles.contactText}>{item}:00</Text>
                      </View>
                    )}
                    options={time}
                  >
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>{startTime ? `${startTime}:00` : '00:00'}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </ModalDropdown>
                </View>
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>End Time</Text>
                  <ModalDropdown
                    dropdownStyle={{width: '44%'}}
                    onSelect={(i, v) => this.setState({endTime: v})}
                    renderRow={item => (
                      <View style={styles.contactList}>
                        <Text style={styles.contactText}>{item}:00</Text>
                      </View>
                    )}
                    options={time}
                  >
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>{endTime ? `${endTime}:00` : '00:00'}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </ModalDropdown>
                </View>
              </View>
              <Text style={styles.smallTitle}>Shipping destination</Text>
              <View style={{...styles.layout2, justifyContent: 'space-between'}}>
                <ModalDropdown
                  style={{width: '100%'}}
                  dropdownStyle={{width: '91%'}}
                  onSelect={(i, v) => this.setState({destination: v.dlvy_adres_nm, destinationDetail: v.adres_detail})}
                  renderRow={item => (
                    <View style={styles.contactList}>
                      <Text style={styles.contactText}>{item.dlvy_adres_nm}</Text>
                      <Text style={styles.contactText}>{item.adres_detail}</Text>
                    </View>
                  )}
                  options={defaultInfo.user}
                >
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText1}>Last delivery address</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </ModalDropdown>
              </View>
              <View style={{...styles.layout2, marginTop: mUtils.wScale(6)}}>
                <TextInput
                  style={{...styles.inputBox, width: '80%'}}
                  value={destination}
                  onChangeText={text => {
                    this.setState({destination: text})
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isvisible: true})
                  }}
                  style={styles.postBox}
                >
                  <Text style={styles.postCode}>주소검색</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={{...styles.inputBox, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(18)}}
                value={destinationDetail}
                onChangeText={text => {
                  this.setState({destinationDetail: text})
                }}
              />

              <Text style={styles.smallTitle}>Shipping Notes</Text>
              <TextInput
                style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
                multiline={true}
                textAlignVertical={'top'}
                value={shippingNote}
                onChangeText={text => {
                  this.setState({shippingNote: text})
                }}
              />
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '100%'}}>
                  <Text style={styles.smallTitle}>촬영컨셉</Text>
                  <TextInput
                    style={{...styles.inputBox}}
                    placeholder={'컨셉'}
                    placeholderTextColor={mConst.borderGray}
                    value={concept}
                    onChangeText={text => {
                      this.setState({concept: text})
                    }}
                  />
                </View>
              </View>
              <Text style={styles.smallTitle}>
                Model <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
              </Text>
              <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
                <View style={{...styles.layout1}}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={celebrity[0] ? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>Celebrity</Text>
                </View>
                <View style={{width: '65%'}}>
                  {celebrity.map((item, index) => {
                    return (
                      <View style={{...styles.box2}} key={index}>
                        <TextInput
                          style={{...styles.inputBox1, width: '70%'}}
                          placeholder={'이름'}
                          placeholderTextColor={mConst.borderGray}
                          value={item}
                          onChangeText={text => {
                            let tmp = [...celebrity]
                            tmp[index] = text
                            this.setState({celebrity: tmp})
                          }}
                        />
                        {index === 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({celebrity: [...celebrity, '']})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              let result = celebrity.filter((e, i) => i !== index)
                              this.setState({celebrity: result})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={minusImg} />
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  })}
                </View>
              </View>
              <View
                style={{
                  ...styles.layout,
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: mUtils.wScale(5),
                  marginBottom: mUtils.wScale(18),
                }}
              >
                <View style={{...styles.layout1}}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={fashionModel[0] ? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>Fashion Model</Text>
                </View>
                <View style={{width: '65%'}}>
                  {fashionModel.map((item, index) => {
                    return (
                      <View style={{...styles.box2}}>
                        <TextInput
                          style={{...styles.inputBox1, width: '70%'}}
                          placeholder={'이름'}
                          placeholderTextColor={mConst.borderGray}
                          value={item}
                          onChangeText={text => {
                            let tmp = [...fashionModel]
                            tmp[index] = text
                            this.setState({fashionModel: tmp})
                          }}
                        />
                        {index === 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({fashionModel: [...fashionModel, '']})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              let result = fashionModel.filter((e, i) => i !== index)
                              this.setState({fashionModel: result})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={minusImg} />
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  })}
                </View>
              </View>
              <Text style={styles.smallTitle}>
                Paid editorial <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
              </Text>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <View style={styles.layout2}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={myPay ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>자사유가</Text>
                </View>

                <TextInput
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'Brand'}
                  placeholderTextColor={mConst.borderGray}
                  value={myPay}
                  onChangeText={text => {
                    this.setState({myPay: text, otherPay: ''})
                  }}
                />
              </View>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <View style={styles.layout2}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={otherPay ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>타사유가</Text>
                </View>
                <TextInput
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'Brand'}
                  placeholderTextColor={mConst.borderGray}
                  value={otherPay}
                  onChangeText={text => {
                    this.setState({otherPay: text, myPay: ''})
                  }}
                />
              </View>
              <Text style={styles.smallTitle}>Location shooting</Text>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <View style={styles.layout2}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={locateShoot ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>로케촬영</Text>
                </View>
                <TextInput
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'촬영지 입력'}
                  placeholderTextColor={mConst.borderGray}
                  value={locateShoot}
                  onChangeText={text => {
                    this.setState({locateShoot: text})
                  }}
                />
              </View>
              <Text style={styles.smallTitle}>당일연결 희망/ 가능 여부</Text>
              <View
                style={{
                  ...styles.layout2,
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: mUtils.wScale(18),
                  marginTop: mUtils.wScale(3),
                }}
              >
                {yesNo.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setState({todayConnect: item.boolean})
                      }}
                      style={{...styles.yesNoBox, borderColor: todayConnect === item.boolean ? mConst.black : mConst.borderGray}}
                    >
                      <FastImage resizeMode={'contain'} style={styles.checkImg2} source={todayConnect === item.boolean ? checkImg2 : checkImg3} />
                      <Text
                        style={{
                          ...styles.yesNo,
                          marginLeft: mUtils.wScale(5),
                          color: todayConnect === item.boolean ? mConst.black : mConst.borderGray,
                        }}
                      >
                        {item.text}
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
                value={numberPage}
                onChangeText={text => {
                  this.setState({numberPage: text})
                }}
              />
              <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
              <TextInput
                style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                placeholder={'Different brand'}
                placeholderTextColor={mConst.borderGray}
                value={togetherBrand}
                onChangeText={text => {
                  this.setState({togetherBrand: text})
                }}
              />
              <Text style={styles.smallTitle}>Message</Text>
              <TextInput
                style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                multiline={true}
                textAlignVertical={'top'}
                value={message}
                onChangeText={text => {
                  this.setState({message: text})
                }}
              />
            </View>
            <TouchableOpacity
              style={{...styles.bottomButton, backgroundColor: mConst.black}}
              onPress={() => {
                if (type) {
                  this.postSRRequestSend()
                } else {
                  this.editSRRequestSend()
                }
              }}
            >
              <Text style={{...styles.buttonText, color: mConst.white}}>Sample Request</Text>
            </TouchableOpacity>
          </ScrollView>
          <Modal
            isVisible={isvisible}
            useNativeDriver={true}
            onBackButtonPress={() => this.setState({isvisible: false})}
            onBackdropPress={() => this.setState({isvisible: false})}
          >
            <View style={{height: '80%', width: '100%'}}>
              <Postcode
                style={{flex: 1}}
                jsOptions={{animated: false}}
                onSelected={data => {
                  this.setState({destination: data.address, isvisible: false})
                }}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
