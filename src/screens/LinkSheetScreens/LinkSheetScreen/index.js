import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import _ from 'lodash'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import Header from '../../common/Header'
import Loading from '../../common/Loading'
import styles from './styles'

const moreImg = require('../../../images/navi/more_4.png')
const schedulerImg = require('../../../images/navi/scheduler_1.png')
const checkImg = require('../../../images/navi/check_6.png')
const noCheckImg = require('../../../images/navi/no_check_3.png')
const brandImg = require('../../../images/navi/brand_1.png')

const data = {
  success: true,
  total_count: 3,
  list: [
    {
      date: '1611619200',
      month: '01',
      day: '26',
      each_count: '30',
      each_list: [
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
      ],
    },
    {
      date: '1616741786',
      month: '01',
      day: '26',
      each_count: '30',
      each_list: [
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
        {
          req_no: '20210126000012',
          mgzn_nm: '테스트매거진1',
          mgzn_color: '#c18c8c',
          req_user_nm: '테스트',
          req_user_type: 'MAGAZINE',
          mgzn_logo_adres: null,
        },
      ],
    },
  ],
}

class LinkSheetScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    const titles = mConst.getUserType() === 'B' ? ['Send Out', 'Return'] : ['Pickups', 'Send Out'] // TODO 임시 주석처리
    this.state = {
      // start: mUtils.getToday(), // TODO 테스트 데이타 관계로 일단 임시 값으로 설정
      // end: mUtils.getToday(),
      start: mUtils.getDayValue(2021, 3, 10),
      end: mUtils.getDayValue(2021, 3, 30),
      brandId: '',
      dataList: [],
      brands: [],
      titles,
      selectTitle: titles[0],
      loading: true,
      selectDate: [],
      totalCount: 0,
    }
  }
  async componentDidMount() {
    this.onFocus(this.handleOnFocus)
    console.log('###apiPath:', mConst.getApiPath())
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = params => {
    this.setState({loading: true}, () => {
      const {brandId} = this.state
      const {start, end} = _.get(this.props, 'route.params', {}) // onFocus에서는 이렇게 불러와야 함 navigation.js 33번째 줄 참조
      if (start && end) {
        this.handleLoadData(start, end, brandId)
        this.setState({start, end})
      } else {
        this.handleLoadData(this.state.start, this.state.end, brandId)
      }
    })
  }
  handleLoadData = async (start, end, brandId) => {
    const {selectTitle} = this.state
    if (selectTitle === 'Return') {
      try {
        // console.log('###Return 스케쥴 조회 params:', {start_date: start, fin_date: end, brand_id: brandId})
        const response = await API.getReturnSchedule({start_date: start, fin_date: end})
        this.setState({dataList: _.get(response, 'list', []), loading: false})
        console.log('Return 스케쥴 조회 성공', JSON.stringify(response))
      } catch (error) {
        this.setState({loading: false})
        console.log('Return 스케쥴 조회 실패', JSON.stringify(error))
      }
    } else if (selectTitle === 'Pickups') {
      try {
        // console.log('###Pickup 스케쥴 조회 params:', {start_date: start, fin_date: end, brand_id: brandId})
        const response = await API.getPickupSchedule({start_date: start, fin_date: end, brand_id: brandId})
        this.setState({dataList: _.get(response, 'list', []), loading: false})
        console.log('Pickup 스케쥴 조회 성공', JSON.stringify(response))
      } catch (error) {
        this.setState({loading: false})
        console.log('Pickup 스케쥴 조회 실패', JSON.stringify(error))
      }
    } else if (selectTitle === 'Send Out') {
      try {
        // console.log('###Sendout 스케쥴 조회 params:', {start_date: start, fin_date: end, brand_id: brandId})
        const response = await API.getSendoutSchedule({start_date: start, fin_date: end, brand_id: brandId})
        this.setState({dataList: _.get(response, 'list', []), loading: false})
        console.log('Sendout 스케쥴 조회 성공', JSON.stringify(response))
      } catch (error) {
        this.setState({loading: false})
        console.log('Sendout 스케쥴 조회 실패', error)
      }
    }
  }
  handleSetDates = ({start, end}) => {
    if (start && end) {
      this.setState({start, end})
    }
  }
  handleChangeSchedule = () => {
    const {start, end} = this.state
    console.log('>>>>>>', start, end)
    this.pushTo('SelectScheduleScreen', {setDate: this.handleSetDates, start, end, caller: 'LinkSheetScreen'})
  }
  handleChangeTitle = item => {
    this.setState({selectTitle: item, selectDate: [], totalCount: 0}, this.handleOnFocus)
  }
  handleLinkSheetDetail = () => {
    const {selectTitle, selectDate, dataList} = this.state
    const selectEachList = dataList.flatMap(data => (selectDate.includes(data.date) ? data.each_list : []))
    if (selectTitle === 'Send Out') {
      this.pushTo('SendOutScreen', {selectDate, selectEachList})
    } else if (selectTitle === 'Pickups') {
      this.pushTo('PickupsScreen', {selectDate, selectEachList})
    } else if (selectTitle === 'Return') {
      this.pushTo('ReturnScreen', {selectDate, selectEachList})
    }
  }
  selectDate = (date, count) => {
    const {selectDate, totalCount} = this.state
    if (selectDate.indexOf(date) > -1) {
      this.setState(state => {
        const list = state.selectDate.filter((e, i) => e !== date)
        return {
          selectDate: list,
          totalCount: totalCount - Number(count),
        }
      })
    } else {
      let result = selectDate.concat(date)
      this.setState({selectDate: result, totalCount: totalCount + Number(count)})
    }
  }
  render() {
    const {start, end, brandId, dataList, brands, selectTitle, loading, selectDate, totalCount} = this.state
    const {user} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} />
        <Menu>
          <MenuTrigger
            customStyles={{
              TriggerTouchableComponent: TouchableOpacity,
              triggerTouchable: {
                activeOpacity: 90,
                style: {
                  width: '45%',
                },
              },
            }}
          >
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(20), marginBottom: mUtils.wScale(30)}}>
              <Text style={styles.mainTitle}>{selectTitle}</Text>
              <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.menuOptions}>
            {this.state.titles.map((item, index) => {
              return (
                <MenuOption key={index} style={styles.menuOption} onSelect={() => this.handleChangeTitle(item)}>
                  <Text style={styles.menuText}>{item}</Text>
                </MenuOption>
              )
            })}
          </MenuOptions>
        </Menu>

        <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
          <View style={styles.layout1}>
            <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
            <Text style={styles.date}>
              {mUtils.getShowDate(start, 'YYYY/MM/DD')} - {mUtils.getShowDate(end, 'YYYY/MM/DD')}
            </Text>
          </View>
          <TouchableOpacity onPress={this.handleChangeSchedule}>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView style={{paddingBottom: mUtils.wScale(25)}}>
            {_.map(dataList, (item, index) => {
              return (
                <View key={index} style={{width: '100%', marginTop: mUtils.wScale(25)}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.selectDate(item.date, item.each_count)
                    }}
                    style={{...styles.layout1, marginBottom: mUtils.wScale(15), paddingHorizontal: mUtils.wScale(20)}}
                  >
                    {selectDate.indexOf(item.date) > -1 ? (
                      <FastImage resizeMode={'contain'} style={styles.checkImg} source={checkImg} />
                    ) : (
                      <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
                    )}
                    <Text style={{...styles.subDt}}>
                      {mUtils.getShowDate(item.date)}
                      <Text style={{fontSize: 16}}>
                        : <Text style={{fontSize: 16, color: '#7ea1b2'}}>{item.each_count}</Text>
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  <View style={{...styles.layout, flexWrap: 'wrap', paddingHorizontal: mUtils.wScale(20)}}>
                    {_.map(item.each_list, (subItem, subIndex) => {
                      console.log('#매거진색깔:', subItem.mgzn_color)
                      return (
                        <View key={subIndex} style={styles.brandBox}>
                          <View style={{...styles.box1, backgroundColor: subItem.mgzn_color}}>
                            <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                          </View>
                          <View style={styles.box2}>
                            <Text style={{...styles.name}}>{subItem.req_user_nm}</Text>
                            <Text style={{...styles.brand, marginTop: mUtils.wScale(5)}}>{subItem.mgzn_nm}</Text>
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        )}
        {selectDate.length > 0 && (
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{...styles.bottomText1}}>Total Number of </Text>
                <Text style={{...styles.bottomText1, fontFamily: 'Roboto-Bold', alignSelf: 'flex-end'}}>{this.state.selectTitle} : </Text>
              </View>
              <Text style={{...styles.bottomText2, marginLeft: mUtils.wScale(3)}}>{totalCount}</Text>
            </View>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                this.handleLinkSheetDetail()
              }}
            >
              <Text style={{...styles.bottomText3}}>Create Document</Text>
            </TouchableOpacity>
          </View>
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
)(LinkSheetScreen)
