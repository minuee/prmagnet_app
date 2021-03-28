import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const moreImg = require('../../../images/navi/more_4.png')
const fixImg = require('../../../images/navi/fix_1.png')
const schedulerImg = require('../../../images/navi/scheduler_1.png')
const modelImg = require('../../../images/sample/model_2.png')
const dollarImg1 = require('../../../images/navi/dollar_1.png')
const airplaneImg = require('../../../images/navi/airplane_1.png')
const dollarImg2 = require('../../../images/navi/dollar_2.png')
const plusImg = require('../../../images/navi/plus_1.png')
const memoImg = require('../../../images/navi/memo_1.png')
const linkImg = require('../../../images/navi/link_1.png')

const dataList = {
  list: [
    {
      showroom_no: '20210125000008',
      season_year: '2020',
      season_se_cd: 'SS0001',
      showroom_nm: '테스트 쇼룸 1',
      image_list: ['https://fpr-prod-file.s3-ap-northeast-2.amazonaws.com/public/showroomImage/3adcf69d-d03f-4e80-b2b9-5256b19b7a34.png'],
      req_list: [
        {
          end_dt: '1617181205',
          loc_yn: false,
          req_dt: '1611627925',
          req_no: '20210126000011',
          address: '서울 강남구 논현로 503',
          start_dt: '1617008405',
          mgzn_color: '#ffffff',
          req_user_nm: '테스트',
          company_name: '테스트매거진1',
          company_type: 'MAGAZINE',
          contact_user_nm: '이영표',
          mgzn_logo_adres: null,
          pchrg_picalbm_yn: true,
          contact_user_phone: '01098773333',
          own_paid_pictorial_yn: false,
          other_paid_pictorial_yn: false,
        },
      ],
      memo_list: null,
    },
    {
      showroom_no: '20210125000009',
      season_year: '2020',
      season_se_cd: 'SS0001',
      showroom_nm: '테스트 쇼룸 1',
      image_list: ['https://fpr-prod-file.s3-ap-northeast-2.amazonaws.com/public/showroomImage/3adcf69d-d03f-4e80-b2b9-5256b19b7a34.png'],
      req_list: [
        {
          end_dt: '1617181205',
          loc_yn: false,
          req_dt: '1611627925',
          req_no: '20210126000011',
          address: '서울 강남구 논현로 503',
          start_dt: '1617094805',
          mgzn_color: '#ffffff',
          req_user_nm: '테스트',
          company_name: '테스트매거진1',
          company_type: 'MAGAZINE',
          contact_user_nm: '이영표',
          mgzn_logo_adres: null,
          pchrg_picalbm_yn: true,
          contact_user_phone: '01098773333',
          own_paid_pictorial_yn: false,
          other_paid_pictorial_yn: false,
        },
        {
          end_dt: '1617181205',
          loc_yn: false,
          req_dt: '1611904143',
          req_no: '20210129000024',
          address: '서울 강남구 논현로 503',
          start_dt: '1617094805',
          mgzn_color: '#ffffff',
          req_user_nm: '테스트',
          company_name: '테스트매거진1',
          company_type: 'MAGAZINE',
          contact_user_nm: '테스트',
          mgzn_logo_adres: null,
          chrg_picalbm_yn: true,
          contact_user_phone: '01044444444',
          own_paid_pictorial_yn: false,
          other_paid_pictorial_yn: false,
        },
      ],
      memo_list: [
        {
          color: '#000000',
          content: '그냥 메모',
          memo_dt: '1617008405',
          memo_no: '20210318000012',
        },
        {
          color: '#000000',
          content: '그냥 메모',
          memo_dt: '1617094805',
          memo_no: '20210318000012',
        },
      ],
    },
  ],
  success: true,
}

class BrandSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      start: String(Math.floor(Number(new Date().getTime() / 1000))),
      //start: 1611100800,
      end: String(Math.floor(Number(new Date().getTime() / 1000))),
      //end: 1611100800,
      toggle: [],
    }
  }

  getSchedular = async params => {
    const {start, end} = _.get(this.props, 'route.params', {})
    try {
      let response = await API.getSchedular({
        min_date: params ? params.start : this.state.start,
        max_date: params ? params.end : this.state.end,
      })
      console.log('getSchedular>>>>', JSON.stringify(response))
      this.setState({data: response, start: params ? params.start : this.state.start, end: params ? params.end : this.state.end})
    } catch (error) {
      console.log('getSchedular>>>>', error)
    }
  }

  changeSchedule = () => {
    const {start, end} = this.state
    this.pushTo('SelectScheduleScreen', {get: this.getSchedular, start, end, caller: 'ScheduleTab'})
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getSchedular()
  }

  render() {
    const {data, toggle, start, end} = this.state
    //const {start, end} = _.get(this.props, 'route.params', {})
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} />
        <Text style={styles.mainTitle}>Scheduler</Text>
        {data ? (
          <>
            <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
              <View style={styles.layout1}>
                <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
                <Text style={styles.date}>
                  {mUtils.getShowDate(this.state.start, 'YYYY/MM/DD')} - {mUtils.getShowDate(this.state.end, 'YYYY/MM/DD')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.changeSchedule()
                }}
              >
                <Text style={styles.change}>변경</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(25)}}>
              {data.list.map((item, index) => {
                return (
                  <View key={index} style={{...styles.layout4}}>
                    <View style={{width: '49%'}}>
                      <FastImage resizeMode={'cover'} style={styles.modelImg} source={{uri: item.image_list[0]}} />
                      <Text style={{...styles.title, marginVertical: mUtils.wScale(10)}}>{item.showroom_nm}</Text>
                    </View>
                    <View style={{width: '49%'}}>
                      {item.req_list && item.req_list.length > 0 && item.memo_list && (
                        <>
                          {item.memo_list &&
                            item.memo_list.map((e, i) => {
                              if (e.memo_dt <= item.req_list[0].start_dt) {
                                return (
                                  <TouchableOpacity
                                    key={i}
                                    style={{...styles.layout3, borderColor: e.color ? e.color : mConst.borderGray}}
                                    onPress={() => {
                                      this.pushTo('ScheduleMemoScreen', {no: item.showroom_no, date: e.memo_dt, name: item.showroom_nm})
                                    }}
                                  >
                                    <Text style={{...styles.smallDesc}} numberOfLines={2}>
                                      {e.content}
                                    </Text>
                                    <Text style={{...styles.brandDate}}>{mUtils.getShowDate(e.memo_dt, 'YYYY-MM-DD')}</Text>
                                  </TouchableOpacity>
                                )
                              }
                            })}
                          <View style={{...styles.layout5, marginBottom: mUtils.wScale(18)}}>
                            <View style={{...styles.layout6, backgroundColor: item.req_list[0].mgzn_color}}>
                              <Text style={styles.title}>{item.req_list[0].company_name}</Text>
                              <View style={styles.layout}>
                                <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                                {item.req_list[0].loc_yn && <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />}
                              </View>
                            </View>
                            <View style={styles.layout7}>
                              <Text style={{...styles.name}}>{item.req_list[0].req_user_nm}</Text>
                              <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                                {item.req_list[0].company_name} / {'\n'}
                                {mUtils.getShowDate(item.req_list[0].start_dt, 'YYYY-MM-DD')} ~{' '}
                                {mUtils.getShowDate(item.req_list[0].end_dt, 'YYYY-MM-DD')}
                              </Text>
                              <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item.req_list[0].address}</Text>

                              <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                {item.req_list[0].contact_user_nm}
                                {'\n'}
                                {mUtils.allNumber(mUtils.get(item.req_list[0].contact_user_phone))}
                              </Text>
                            </View>
                          </View>
                        </>
                      )}
                      {toggle.includes(item.showroom_no) &&
                        item.req_list
                          .filter((e, i) => i !== 0)
                          .map((item1, index1) => {
                            return (
                              <>
                                {item.memo_list.map((item2, index2) => {
                                  if (item1.start_dt === item2.memo_dt) {
                                    return (
                                      <TouchableOpacity
                                        key={index2}
                                        style={{...styles.layout3, borderColor: item2.color ? item2.color : mConst.borderGray}}
                                        onPress={() => {
                                          this.pushTo('ScheduleMemoScreen', {no: item.showroom_no, date: item2.memo_dt, name: item.showroom_nm})
                                        }}
                                      >
                                        <Text style={{...styles.smallDesc}}>{item2.content}</Text>
                                      </TouchableOpacity>
                                    )
                                  }
                                })}
                                <View key={index1} style={{...styles.layout5, marginBottom: mUtils.wScale(5)}}>
                                  <View style={{...styles.layout6, backgroundColor: item1.mgzn_color}}>
                                    <Text style={styles.title}>{item1.company_name}</Text>
                                    <View style={styles.layout}>
                                      <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                                      <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
                                    </View>
                                  </View>
                                  <View style={styles.layout7}>
                                    <Text style={{...styles.name}}>{item1.req_user_nm}</Text>
                                    <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                                      {item1.company_name} / {'\n'}
                                      {mUtils.getShowDate(item1.start_dt, 'YYYY-MM-DD')} ~ {mUtils.getShowDate(item1.end_dt, 'YYYY-MM-DD')}
                                    </Text>
                                    <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item1.address}</Text>

                                    <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                      {item1.contact_user_nm}
                                      {'\n'}
                                      {mUtils.allNumber(mUtils.get(item1.contact_user_phone))}
                                    </Text>
                                  </View>
                                </View>
                              </>
                            )
                          })}
                      {item.req_list.length - 1 !== 0 && !toggle.includes(item.showroom_no) && (
                        <TouchableOpacity
                          style={styles.plusButton}
                          onPress={() => {
                            this.setState(state => {
                              if (!state.toggle.includes(item.showroom_no)) {
                                return {
                                  toggle: toggle.concat(item.showroom_no),
                                }
                              }
                            })
                          }}
                        >
                          <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                          <View style={styles.smallCount}>
                            <Text style={styles.smallText}>{item.req_list.length - 1}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )
              })}
            </ScrollView>
            <TouchableOpacity
              style={{...styles.layout8}}
              onPress={() => {
                this.pushTo('ScheduleMemoScreen')
              }}
            >
              <FastImage resizeMode={'contain'} style={styles.memoImg} source={memoImg} />
            </TouchableOpacity>
          </>
        ) : (
          <Loading />
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(BrandSchedulerScreen)
