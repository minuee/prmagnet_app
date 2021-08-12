/* eslint-disable indent */
import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import Empty from '../../common/Empty'

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

const genderData = [
  {key: 'All Gender', value: null},
  {key: 'Women', value: 'SSS001'},
  {key: 'Men', value: 'SSS002'},
  {key: 'Unisex', value: 'SSS003'},
]

class BrandSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      start: mUtils.getToday(),
      end: mUtils.getNextWeek(),
      season_year: {season_year: '', season_simple_text: '', season_cd_id: ''},
      gender: genderData[0],
      toggle: [],
    }
  }

  getSchedular = async params => {
    try {
      const response = await API.getSchedular({
        min_date: params?.start || this.state.start,
        max_date: params?.end || this.state.end,
        season_year: this.state.season_year.season_year || null,
        season_cd_id: this.state.season_year.season_cd_id || null,
        gender: this.state.gender.value || null,
      })
      console.log('getSchedular>>>>', JSON.stringify(response))
      this.setState(prevState => ({
        data: response,
        start: params?.start || this.state.start,
        end: params?.end || this.state.end,
        season_year: prevState.season_year.season_year ? prevState.season_year : response.season_list[0],
      }))
    } catch (error) {
      console.log('getSchedular>>>>', error)
    }
  }

  changeSchedule = () => {
    const {start, end} = this.state
    this.pushTo('SelectScheduleScreen', {setDate: this.getSchedular, start, end, caller: 'ScheduleTab'})
  }

  componentDidMount() {
    this.getSchedular()
  }

  render() {
    const {data, toggle, start, end, season_year, gender} = this.state
    const {user} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} alarmSet={user.alarm} />
        <Text style={styles.mainTitle}>Scheduler</Text>
        {data ? (
          <>
            <View style={styles.menuGroup}>
              <Menu>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                  }}
                >
                  <View style={{...styles.layout0}}>
                    <Text style={styles.season}>
                      {season_year.season_year} {season_year.season_simple_text}
                    </Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                  {data.season_list.map((item, index) => {
                    return (
                      <MenuOption
                        key={index}
                        style={styles.menuOption}
                        onSelect={() => {
                          this.setState({season_year: item, page: 1, limit: 10, loading: false}, () => {
                            this.getSchedular()
                          })
                        }}
                      >
                        <Text style={styles.menuText}>
                          {item.season_year} {item.season_simple_text}
                        </Text>
                      </MenuOption>
                    )
                  })}
                </MenuOptions>
              </Menu>
              <Menu>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                  }}
                >
                  <View style={[styles.layout0, {marginLeft: mUtils.wScale(15)}]}>
                    <Text style={styles.season}>{gender.key}</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                  {genderData.map((item, index) => {
                    return (
                      <MenuOption
                        key={index}
                        style={styles.menuOption}
                        onSelect={() => {
                          this.setState({gender: item, page: 1, limit: 10, loading: false}, () => {
                            this.getSchedular()
                          })
                        }}
                      >
                        <Text style={styles.menuText}>{item.key}</Text>
                      </MenuOption>
                    )
                  })}
                </MenuOptions>
              </Menu>
            </View>
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
            <>
              {_.size(_.get(data, 'list')) === 0 ? (
                <Empty />
              ) : (
                <>
                  <ScrollView style={{paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(25)}}>
                    {mUtils.get(data, 'list', []).map((item, index) => {
                      const memoList = mUtils.get(item, 'memo_list', [])
                      const reqList = mUtils.get(item, 'req_list', [])
                      return (
                        <View key={index} style={{...styles.layout4}}>
                          <View style={{width: '49%'}}>
                            <FastImage resizeMode={'cover'} style={styles.modelImg} source={{uri: item.image_list}} />
                            <Text style={{...styles.title, marginVertical: mUtils.wScale(10)}}>{item.showroom_nm}</Text>
                          </View>
                          <View style={{width: '49%'}}>
                            {memoList
                              ? reqList && (
                                  <>
                                    {memoList.map((item1, index1) => {
                                      return (
                                        <>
                                          <TouchableOpacity
                                            key={index1}
                                            style={{...styles.layout3, borderColor: item1.color ? item1.color : mConst.borderGray}}
                                            onPress={() => {
                                              this.pushTo('ScheduleMemoScreen', {
                                                no: item.showroom_no,
                                                date: item1.memo_dt,
                                                name: item.showroom_nm,
                                              })
                                            }}
                                          >
                                            <Text style={{...styles.smallDesc}}>{item1.content}</Text>
                                            <Text style={{...styles.brandDate}}>{mUtils.getShowDate(item1.memo_dt, 'YYYY-MM-DD')}</Text>
                                          </TouchableOpacity>
                                        </>
                                      )
                                    })}
                                    {reqList.map((item2, index2) => {
                                      return (
                                        <View key={index2} style={{...styles.layout5, marginBottom: mUtils.wScale(5)}}>
                                          <View style={{...styles.layout6, backgroundColor: item2.mgzn_color}}>
                                            <Text style={styles.title}>{item2.company_name}</Text>
                                            <View style={styles.layout}>
                                              <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                                              <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
                                            </View>
                                          </View>
                                          <View style={styles.layout7}>
                                            <Text style={{...styles.name}}>{item2.req_user_nm}</Text>
                                            <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                                              {item2.company_name} / {'\n'}
                                              {mUtils.getShowDate(item2.start_dt, 'YYYY-MM-DD')} ~ {mUtils.getShowDate(item2.end_dt, 'YYYY-MM-DD')}
                                            </Text>
                                            <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item2.address}</Text>

                                            <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                              {item2.contact_user_nm}
                                              {'\n'}
                                              {mUtils.allNumber(mUtils.get(item2.contact_user_phone))}
                                            </Text>
                                          </View>
                                        </View>
                                      )
                                    })}
                                  </>
                                )
                              : reqList.map((item2, index2) => {
                                  return (
                                    <View key={index2} style={{...styles.layout5, marginBottom: mUtils.wScale(5)}}>
                                      <View style={{...styles.layout6, backgroundColor: item2.mgzn_color}}>
                                        <Text style={styles.title}>{item2.company_name}</Text>
                                        <View style={styles.layout}>
                                          <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                                          <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
                                        </View>
                                      </View>
                                      <View style={styles.layout7}>
                                        <Text style={{...styles.name}}>{item2.req_user_nm}</Text>
                                        <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                                          {item2.company_name} / {'\n'}
                                          {mUtils.getShowDate(item2.start_dt, 'YYYY-MM-DD')} ~ {mUtils.getShowDate(item2.end_dt, 'YYYY-MM-DD')}
                                        </Text>
                                        <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item2.address}</Text>

                                        <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                          {item2.contact_user_nm}
                                          {'\n'}
                                          {mUtils.allNumber(mUtils.get(item2.contact_user_phone))}
                                        </Text>
                                      </View>
                                    </View>
                                  )
                                })}

                            {/*{item.req_list.length - 1 !== 0 && !toggle.includes(item.showroom_no) && (
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
                      )}*/}
                          </View>
                        </View>
                      )
                    })}
                  </ScrollView>
                  <TouchableOpacity
                    style={{...styles.layout8}}
                    onPress={() => {
                      this.pushTo('ScheduleMemoScreen', {no: '', date: '', name: ''})
                    }}
                  >
                    <FastImage resizeMode={'contain'} style={styles.memoImg} source={memoImg} />
                  </TouchableOpacity>
                </>
              )}
            </>
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
)(BrandSchedulerScreen)
