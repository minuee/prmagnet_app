import React from 'react'
import {SafeAreaView, Dimensions,View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import Header from '../../common/Header'
import _ from 'lodash'
import dayjs from "dayjs";
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import Empty from '../../common/Empty'
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import { multicastChannel } from 'redux-saga'
import { Tooltip } from 'react-native-elements';
const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')
const todayTimeStamp = mUtils.getToday();
const reqStatusEditList = ["pending","confirmed"];
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
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
      setTimeout(() => {
        this.alert('홀딩 요청 삭제 완료', '홀딩 요청이 삭제되었습니다.', [
          {
            onPress: () =>
            this.setState(state => {
              const result = state.list.filter((item, i) => i !== index)
              return {
                list: result,
              }
            }),
          },
        ])
      }, 100)
    } catch (error) {
    }
  }

  cancleMyRequests = async (no, index) => {
    try {
      const response = await API.cancleMyRequests({
        req_no: [no],
      })
      setTimeout(() => {
        this.alert('홀딩 요청 취소 완료', '홀딩 요청이 취소되었습니다.', [
          {
            onPress: () =>
              this.setState(state => {
                const result = state.list.filter((item, i) => i !== index)
                return {
                  list: result,
                }
              }),
          },
        ])
      }, 100)
    } catch (error) {
    }
  }

  getMagazineSample = async () => {
    const {list, page, limit, search_text} = this.state
    try {
      const response = await API.getMagazineSample({
        page: page,
        limit: limit,
        search_text: search_text,
      })
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
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
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: response.list, page: 2, loading: false})
        } else {
          this.setState({loading: false})
        }
      }
    } catch (error) {
      this.setState({loading: false})
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
    return (
      <React.Fragment key={index}>
        <TouchableOpacity
          style={styles.layout3}
          onPress={() => {this.pushTo('SampleRequestsDetailScreen', {no: item.req_no}) }}
        >
          <View style={styles.layout4}>
            <Text style={styles.title}>{item.brand_nm}</Text>
            {//item.editable === true && (
            ( item.expected_photograph_date > todayTimeStamp && reqStatusEditList.includes(item.req_status_nm) )? (
              <Menu>
                <MenuTrigger
                  customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerTouchable: {activeOpacity: 90,style: {flex: 1}},
                  }}
                  style={styles.layout5}
                >
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImage1} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35)}}>
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(17), paddingBottom: mUtils.wScale(12), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {this.pushTo('SampleRequestsScreen', {type: false, brandId: item.brand_id, no: item.req_no, brandName: item.brand_nm})}}
                  >
                    <Text style={styles.delete}>수정</Text>
                  </MenuOption>
                  { item.req_status_nm === 'pending' ?
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {
                      this.alert('홀딩 요청 삭제', '선택하신 요청을 삭제하시겠습니까?', [
                        {
                          onPress: () => {this.deleteMyRequests(item.req_no, index)},
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>삭제</Text>
                  </MenuOption>
                  :
                  ( item.req_status_nm === 'confirmed' && !item.is_sendout && dayjs.unix(item.expected_photograph_date).format("YYYY-MM-DD") > dayjs(new Date()).format('YYYY-MM-DD') ) 
                  ?
                  <MenuOption
                    style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                    onSelect={() => {
                      this.alert('홀딩 요청 취소', '홀딩 요청을 취소하시겠습니까?', [
                        {
                          onPress: () => {
                            this.cancleMyRequests(item.req_no, index)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>홀딩 요청 취소</Text>
                  </MenuOption>
                  :
                  null
                  }
                </MenuOptions>
              </Menu>
            )
            :
            ( item.req_status_nm === 'pending' || item.req_status_nm === 'canceled' || item.req_status_nm === 'rejected' ) 
            ? 
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
                      this.alert('홀딩 요청 삭제', '선택하신 요청을 삭제하시겠습니까?', [
                        {
                          onPress: () => {
                            this.deleteMyRequests(item.req_no, index)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>삭제</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )
            :
            ( item.req_status_nm === 'confirmed' && !item.is_sendout  && dayjs.unix(item.expected_photograph_date).format("YYYY-MM-DD") > dayjs(new Date()).format('YYYY-MM-DD')) 
            ?
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
                      this.alert('홀딩 요청 취소', '홀딩 요청을 취소하시겠습니까?', [
                        {
                          onPress: () => {
                            this.cancleMyRequests(item.req_no, index)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    <Text style={styles.delete}>홀딩요청취소</Text>
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

  renderTooltip = () => {
    return (<View style={{width:'100%',padding:5,alignItems:'center',justifyContent:'center'}}>   
        <Text style={{fontFamily: 'Roboto-Regular',fontSize: 14,color: '#ffffff',}}>모든 피스가 미발송 상태인 홀딩완료 건만 홀딩 취소 가능</Text>
    </View>)
  }

  render() {
    const {user} = this.props
    const {list, loading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>My Requests</Text>
          <View style={styles.layout1_right}>
            <Tooltip popover={this.renderTooltip('')} width={SCREEN_WIDTH*0.9} height={50} backgroundColor={'#7ea1b2'} skipAndroidStatusBar={true}>
              <Icon name="infocirlceo" size={20} color="#000" />
            </Tooltip>
            <TouchableOpacity
              style={{...styles.selectBox, backgroundColor: mConst.black,marginLeft:5}}
              onPress={() => {this.pushTo('ShowTab')}}
            >
              <Text style={{...styles.selectText, color: mConst.white}}>홀딩 요청</Text>
            </TouchableOpacity>
          </View>
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
