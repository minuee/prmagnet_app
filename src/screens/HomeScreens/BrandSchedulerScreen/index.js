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

  getSchedular = async () => {
    const {start, end} = this.state
    console.log('>>>>>>>', start, end)
    try {
      let response = await API.getSchedular({
        min_date: start,
        max_date: end,
      })
      console.log('getSchedular>>>>', JSON.stringify(response))
      this.setState({data: response})
    } catch (error) {
      console.log('getSchedular>>>>', error)
    }
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
                  {start === end
                    ? `${mUtils.getShowDate(start, 'M/DD')}(${mUtils.getShowDate(start, 'ddd')})`
                    : `${mUtils.getShowDate(start, 'M/DD')}(${mUtils.getShowDate(start, 'ddd')}) ~ ${mUtils.getShowDate(
                        end,
                        'M/DD'
                      )}(${mUtils.getShowDate(end, 'ddd')})`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.pushTo('SelectScheduleScreen', {start, end, caller: 'BrandSchedulerScreen'})
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
                      {item.memo_list &&
                        item.memo_list.map((item2, index2) => {
                          return (
                            <TouchableOpacity
                              key={index2}
                              style={{...styles.layout3, borderColor: item2.color ? item2.color : mConst.borderGray}}
                              onPress={() => {
                                this.pushTo('ScheduleMemoScreen', {type: true})
                              }}
                            >
                              <Text style={styles.smallTitle}>{item.showroom_nm}</Text>
                              <Text style={{...styles.smallDesc}}>{item2.content}</Text>
                            </TouchableOpacity>
                          )
                        })}
                    </View>
                    <View style={{width: '49%'}}>
                      {item.req_list.length > 0 && (
                        <View style={styles.layout5}>
                          <View style={{...styles.layout6, backgroundColor: data.list[index].req_list[0].mgzn_color}}>
                            <Text style={styles.title}>{data.list[index].req_list[0].company_name}</Text>
                            <View style={styles.layout}>
                              <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                              {data.list[index].req_list[0].loc_yn && (
                                <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
                              )}
                            </View>
                          </View>
                          <View style={styles.layout7}>
                            <Text style={{...styles.name}}>{data.list[index].req_list[0].req_user_nm}</Text>
                            <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                              {data.list[index].req_list[0].company_name} / {mUtils.getShowDate(data.list[index].req_list[0].req_dt, 'YYYY-MM-DD')}
                            </Text>
                            <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{data.list[index].req_list[0].address}</Text>

                            <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                              {data.list[index].req_list[0].contact_user_nm}
                              {'\n'}
                              {mUtils.allNumber(mUtils.get(data.list[index].req_list[0].contact_user_phone))}
                            </Text>
                          </View>
                        </View>
                      )}
                      {toggle.includes(item.showroom_no) &&
                        item.req_list
                          .filter((e, i) => i !== 0)
                          .map((item1, index1) => {
                            return (
                              <View key={index1} style={{...styles.layout5, marginTop: mUtils.wScale(10)}}>
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
                                    {item1.company_name} / {mUtils.getShowDate(item1.req_dt, 'YYYY-MM-DD')}
                                  </Text>
                                  <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item1.address}</Text>

                                  <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                    {item1.contact_user_nm}
                                    {'\n'}
                                    {mUtils.allNumber(mUtils.get(item1.contact_user_phone))}
                                  </Text>
                                </View>
                              </View>
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
                this.pushTo('ScheduleMemoScreen', {type: false})
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
