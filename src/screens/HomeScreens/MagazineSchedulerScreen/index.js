import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import Header from '../../common/Header'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const calendarImg = require('../../../images/navi/scheduler_1.png')
const airplaneImg = require('../../../images/navi/airplane_1.png')
const dollarImg1 = require('../../../images/navi/dollar_1.png')
const dollarImg2 = require('../../../images/navi/dollar_2.png')

class MagazineSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      start: mUtils.getToday(),
      end: mUtils.getNextWeek(),
      boolean: true,
    }
  }

  getMagazineSchedular = async params => {
    try {
      const response = await API.getMagazineSchedular({
        min_date: params?.start || this.state.start,
        max_date: params?.end || this.state.end,
      })
      //console.log('getMagazineSchedular>>>>', JSON.stringify(response))
      this.setState({data: response, start: params?.start || this.state.start, end: params?.end || this.state.end})
    } catch (error) {
      //console.log('getMagazineSchedular>>>>', error)
    }
  }

  getBrandMagazineSchedular = async params => {
    try {
      const response = await API.getBrandMagazineSchedular({
        min_date: params?.start || this.state.start,
        max_date: params?.end || this.state.end,
      })
      //console.log('getBrandMagazineSchedular>>>>', JSON.stringify(response))
      this.setState({data: response, start: params?.start || this.state.start, end: params?.end || this.state.end})
    } catch (error) {
      //console.log('getBrandMagazineSchedular>>>>', error)
    }
  }

  changeSchedule = () => {
    const {start, end, boolean} = this.state
    this.pushTo('SelectScheduleScreen', {
      setDate: boolean ? this.getMagazineSchedular : this.getBrandMagazineSchedular,
      start,
      end,
      caller: 'ScheduleTab',
    })
  }

  componentDidMount() {
    //this.onFocus(this.handleOnFocus)
    const {boolean} = this.state
    if (boolean) {
      this.getMagazineSchedular()
    } else {
      this.getBrandMagazineSchedular()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log('>>>>>>>>>>', prevState.boolean, this.state.boolean)
    if (prevState.boolean !== this.state.boolean) {
      if (!this.state.boolean) {
        this.getBrandMagazineSchedular()
      } else {
        this.getMagazineSchedular()
      }
    }
  }
  //componentWillUnmount() {
  //  this.removeFocus()
  //}

  //handleOnFocus = () => {
  //  console.log(1111111)
  //  this.getMagazineSchedular()
  //}

  render() {
    const {data, start, end, boolean} = this.state
    const {user} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
        <View
          style={{
            ...styles.layout,
            justifyContent: 'space-between',
            paddingHorizontal: mUtils.wScale(20),
            marginTop: mUtils.wScale(30),
            marginBottom: mUtils.wScale(40),
          }}
        >
          <Text style={styles.title}>Scheduler</Text>
          <View style={{...styles.layout}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({boolean: true})
              }}
              style={{...styles.byBox, backgroundColor: boolean ? '#070708' : 'rgba(0, 0, 0, 0.2)'}}
            >
              <Text style={styles.by}>By Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({boolean: false})
              }}
              style={{...styles.byBox, backgroundColor: !boolean ? '#070708' : 'rgba(0, 0, 0, 0.2)', marginLeft: mUtils.wScale(5)}}
            >
              <Text style={styles.by}>By Brands</Text>
            </TouchableOpacity>
          </View>
        </View>
        {data ? (
          <>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingHorizontal: mUtils.wScale(20),
                paddingVertical: mUtils.wScale(12),
                backgroundColor: '#f6f6f6',
              }}
            >
              <View style={{...styles.layout}}>
                <FastImage resizeMode={'contain'} style={styles.calendarImg} source={calendarImg} />
                <Text style={{...styles.titleDt, marginLeft: mUtils.wScale(5)}}>
                  {mUtils.getShowDate(this.state.start, 'M/DD')}({mUtils.getShowDate(this.state.start, 'ddd')}) ~{' '}
                  {mUtils.getShowDate(this.state.end, 'M/DD')}({mUtils.getShowDate(this.state.end, 'ddd')})
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
            <ScrollView style={{paddingLeft: mUtils.wScale(20), paddingTop: mUtils.wScale(25)}}>
              {data.list.map((item, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.text1}>
                      {boolean ? mUtils.getShowDate(item.date, 'M/DD') : item.brand_nm}
                      <Text style={{fontSize: 16}}> :</Text>
                      <Text style={{fontSize: 16, color: '#7ea1b2'}}> {item.individual_schedules.length}</Text>
                    </Text>
                    {item.individual_schedules &&
                      item.individual_schedules.map((item1, index1) => {
                        return (
                          <View
                            key={index1}
                            style={{...styles.layout, justifyContent: 'space-between', height: mUtils.wScale(290), marginBottom: mUtils.wScale(35)}}
                          >
                            <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item1.img_url_adres_array[0]}} />
                            <View style={{width: '49%'}}>
                              <View style={{paddingRight: mUtils.wScale(20)}}>
                                <View style={{...styles.layout1}}>
                                  <View
                                    style={{
                                      ...styles.layout,
                                      justifyContent: 'space-between',
                                      padding: mUtils.wScale(8),
                                    }}
                                  >
                                    <Text>{item1.brand_nm}</Text>
                                    <View style={styles.layout}>
                                      {item1.own_paid_pictorial_yn && (
                                        <FastImage
                                          resizeMode={'contain'}
                                          style={{...styles.airplaneImg, marginRight: mUtils.wScale(5)}}
                                          source={dollarImg1}
                                        />
                                      )}
                                      {item1.other_paid_pictorial_yn && (
                                        <FastImage
                                          resizeMode={'contain'}
                                          style={{...styles.airplaneImg, marginRight: mUtils.wScale(5)}}
                                          source={dollarImg2}
                                        />
                                      )}
                                      {item1.loc_yn && <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />}
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      paddingHorizontal: mUtils.wScale(8),
                                      paddingTop: mUtils.wScale(10),
                                      paddingBottom: mUtils.wScale(14),
                                      backgroundColor: '#f6f6f6',
                                      borderBottomLeftRadius: mUtils.wScale(5),
                                      borderBottomRightRadius: mUtils.wScale(5),
                                    }}
                                  >
                                    <Text style={{...styles.dt}}>{mUtils.getShowDate(item1.receive_date, 'YYYY-MM-DD')}</Text>
                                    <Text style={{...styles.name}}>{item1.send_user_name}</Text>
                                    <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item1.photogrf_cntent}</Text>
                                    <Text style={{...styles.address, marginTop: mUtils.wScale(8)}}>{item1.dlvy_adres_nm}</Text>
                                    <Text style={{...styles.address, marginTop: mUtils.wScale(1)}}>{item1.adres_detail}</Text>
                                    <Text style={{...styles.address, marginTop: mUtils.wScale(8)}}>{item1.contact_user_nm}</Text>
                                    <Text style={{...styles.address}}>{mUtils.allNumber(item1.contact_phone_no)}</Text>
                                  </View>
                                </View>
                              </View>
                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                                  {item1.img_url_adres_array &&
                                    item1.img_url_adres_array.map((item2, index2) => {
                                      return <FastImage key={index2} resizeMode={'contain'} style={styles.listImg} source={{uri: item2}} />
                                    })}
                                </View>
                              </ScrollView>
                            </View>
                          </View>
                        )
                      })}
                  </View>
                )
              })}
            </ScrollView>
          </>
        ) : (
          <Loading />
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(MagazineSchedulerScreen)
