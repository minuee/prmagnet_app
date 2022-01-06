import React from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import Header from '../../common/Header'
import _ from 'lodash'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import Empty from '../../common/Empty'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import { multicastChannel } from 'redux-saga'

const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')
const todayTimeStamp = mUtils.getToday();
const reqStatusEditList = ["pending","confirmed"];
class SampleRequestsListScreen extends React.Component {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      search_text: '',
      loading: false,
    }

  }

  
  deleteMyRequests = async (no, index) => {
    try {
      const response = await API.deleteMyRequests({
        req_no: [no],
      })
      //console.log('deleteMyRequests>>>>', response)
      setTimeout(() => {
        this.alert('요청삭제 완료', '요청이 삭제되었습니다.', [
          {
            onPress: () =>
              this.setState(state => {
                const result = state.list.filter((item, i) => i !== index)
                //console.log('>>>>>>>>>>>', result)
                return {
                  list: result,
                }
              }),
          },
        ])
      }, 100)
    } catch (error) {
      //console.log('deleteMyRequests>>>', error)
    }
  }

  getMagazineSample = async () => {
    const {list, page, limit, search_text} = this.state
    //console.log('??>?>?', page)
    try {
      const response = await API.getMagazineSample({
        page: page,
        limit: limit,
        search_text: search_text,
      })
      //console.log('getMagazineSample>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
      //console.log('getMagazineSample>>>', error)
    }
  }

  getMagazineSampleReset = async () => {
    const {list, page, limit, search_text} = this.state
    try {
      const response = await API.getMagazineSample({
        page: 1,
        limit: limit,
        search_text: search_text,
        loading: false,
      })
      //console.log('getMagazineSampleReset>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: response.list, page: 2, loading: false})
        } else {
          this.setState({loading: false})
        }
      }
    } catch (error) {
      this.setState({loading: false})
      //console.log('getMagazineSampleReset>>>', error)
    }
  }

  handleLoadMore = async () => {
    this.getMagazineSample()
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.setState({loading: true}, () => {
      this.getMagazineSampleReset()
    })
  }


  renderItem = ({item, index}) => {
    //console.log('itemitem>>>',index,todayTimeStamp,item.expected_photograph_date)
    return (
      <React.Fragment key={index}>

        <TouchableOpacity
          style={styles.layout3}
          onPress={() => {
            this.pushTo('SampleRequestsDetailScreen', {no: item.req_no})
          }}
        >
          <View style={styles.layout4}>
            <Text style={styles.title}>{item.brand_nm}</Text>
            {//item.editable === true && (
            ( item.expected_photograph_date > todayTimeStamp && reqStatusEditList.includes(item.req_status_nm) )? (
              <Menu>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerTouchable: {
                      activeOpacity: 90,
                      style: {
                        flex: 1,
                      },
                    },
                  }}
                  style={styles.layout5}
                >
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImage1} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35)}}>
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(17), paddingBottom: mUtils.wScale(12), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {
                      this.pushTo('SampleRequestsScreen', {type: false, brandId: item.brand_id, no: item.req_no, brandName: item.brand_nm})
                      
                    }}
                  >
                    <Text style={styles.delete}>Edit</Text>
                  </MenuOption>
                  { item.req_status_nm === 'pending' &&
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {
                      this.alert('샘플요청 삭제', '선택하신 샘플을 삭제 하시겠습니까?', [
                        {
                          onPress: () => {
                            this.deleteMyRequests(item.req_no, index)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>Delete</Text>
                  </MenuOption>
                  }
                </MenuOptions>
              </Menu>
            )
            :
            ( item.req_status_nm === 'pending' || item.req_status_nm === 'canceled' ) ? 
            (
              <Menu>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerTouchable: {
                      activeOpacity: 90,
                      style: {
                        flex: 1,
                      },
                    },
                  }}
                  style={styles.layout5}
                >
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImage1} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35)}}>                                   
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {
                      this.alert('샘플요청 삭제', '선택하신 샘플을 삭제 하시겠습니까?', [
                        {
                          onPress: () => {
                            this.deleteMyRequests(item.req_no, index)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )
            :
            null
          }
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mUtils.wScale(5)}}>
            <View>
              <Text style={{...styles.dt}}>
                촬영일{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>
                  {mUtils.getShowDate(item.expected_photograph_date, 'YYYY-MM-DD')}
                  {item.expected_photograph_date != item.expected_photograph_end_date && "~"+mUtils.getShowDate(item.expected_photograph_end_date, 'YYYY-MM-DD')}
                </Text>
              </Text>
              <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                요청일{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>{mUtils.getShowDate(item.req_dt, 'YYYY-MM-DD')}</Text>
              </Text>
            </View>
            <View style={styles.smallBox}>
              <Text style={styles.status}>{mUtils.convertReqStatus(item.req_status_nm)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.emptyBar} />
      </React.Fragment>
    )
  }

  render() {
    const {user} = this.props
    const {list, loading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>My Requests</Text>
          <TouchableOpacity
              style={{...styles.selectBox, backgroundColor: mConst.black}}
              onPress={() => {this.pushTo('ShowTab')}}
            >
              <Text style={{...styles.selectText, color: mConst.white}}>홀딩 요청</Text>
            </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <>
            {list.length > 0 ? (
              <FlatList
                bounces={false}
                style={styles.list}
                data={list}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.req_no}_${Math.random()}`}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
              />
            ) : (
              <Empty />
            )}
          </>
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
)(SampleRequestsListScreen)
