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
import styles from './styles'

const moreImg = require('../../../images/navi/more_4.png')
const schedulerImg = require('../../../images/navi/scheduler_1.png')
const noCheckImg = require('../../../images/navi/no_check_2.png')
const brandImg = require('../../../images/navi/brand_1.png')

class LinkSheetScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    // const titles = mConst.getUserType() === 'B' ? ['Send Out', 'Return'] : ['Pickups', 'Send Out'] // TODO 임시 주석처리
    const titles = ['Pickups', 'Send Out'] // TODO 테스트용
    this.state = {
      start: 1611100800, // mUtils.getToday(), // TODO 테스트 데이타 관계로 일단 임시 값으로 설정
      end: mUtils.getNextWeek(),
      brandId: '',
      dataList: [],
      brands: [],
      titles,
      selectTitle: titles[0],
    }
  }
  async componentDidMount() {
    this.onFocus(this.handleOnFocus)
    console.log('###apiPath:', mConst.getApiPath())
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = () => {
    const {brandId} = this.state
    const {start, end} = _.get(this.props, 'route.params', {}) // onFocus에서는 이렇게 불러와야 함 navigation.js 33번째 줄 참조
    if (start && end) {
      this.handleLoadData(start, end, brandId)
      this.setState({start, end})
    } else {
      this.handleLoadData(this.state.start, this.state.end, brandId)
    }
  }
  handleLoadData = async (start, end, brandId) => {
    const {selectTitle} = this.state
    if (selectTitle === 'Pickups') {
      try {
        const response = await API.getPickupSchedule({start_date: start, fin_date: end, brand_id: brandId})
        this.setState({dataList: _.get(response, 'request_list', []), brands: _.get(response, 'brand_list', [])})
        console.log('픽업 스케쥴 조회 성공', JSON.stringify(response))
      } catch (error) {
        console.log('픽업 스케쥴 조회 실패', error)
      }
    } else if (selectTitle === 'Send Out') {
      try {
        const response = await API.getSendoutSchedule({start_date: start, fin_date: end, brand_id: brandId})
        this.setState({dataList: _.get(response, 'request_list', []), brands: _.get(response, 'brand_list', [])})
        console.log('픽업 스케쥴 조회 성공', JSON.stringify(response))
      } catch (error) {
        console.log('픽업 스케쥴 조회 실패', error)
      }
    }
  }
  handleChangeSchedule = () => {
    const {start, end} = this.state
    this.pushTo('SelectScheduleScreen', {start, end, caller: 'LinkSheetScreen'})
  }
  handleChangeTitle = item => {
    this.setState({selectTitle: item}, () => this.handleLoadData())
  }
  handleLinkSheetDetail = reqNo => {
    const {selectTitle} = this.state
    if (selectTitle === 'Send Out') {
      this.pushTo('SendOutScreen', {reqNo})
    } else if (selectTitle === 'Pickups') {
      this.pushTo('PickupsScreen', {reqNo})
    } else if (selectTitle === 'Return') {
      this.pushTo('ReturnScreen', {reqNo})
    }
  }
  render() {
    const {start, end, brandId, dataList, brands, selectTitle} = this.state
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
              {mUtils.getShowDate(start)} - {mUtils.getShowDate(end)}
            </Text>
          </View>
          <TouchableOpacity onPress={this.handleChangeSchedule}>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingBottom: mUtils.wScale(25)}}>
          {_.map(dataList, (item, index) => {
            return (
              <View key={index} style={{width: '100%', marginTop: mUtils.wScale(25)}}>
                <TouchableOpacity style={{...styles.layout1, marginBottom: mUtils.wScale(15), paddingHorizontal: mUtils.wScale(20)}}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
                  <Text style={{...styles.subDt}}>
                    {mUtils.getShowDate(item.receive_date)}
                    <Text style={{fontSize: 16}}>
                      {' '}
                      : <Text style={{fontSize: 16, color: '#7ea1b2'}}>{_.size(item.individual_schedules)}</Text>
                    </Text>
                  </Text>
                </TouchableOpacity>
                <View style={{...styles.layout, flexWrap: 'wrap', paddingHorizontal: mUtils.wScale(20)}}>
                  {_.map(item.individual_schedules, (subItem, subIndex) => {
                    return (
                      <TouchableOpacity key={subIndex} style={{...styles.brandBox}} onPress={() => this.handleLinkSheetDetail(subItem.req_no)}>
                        <View style={styles.box1}>
                          <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.brand_logo_url_adres}} />
                        </View>
                        <View style={styles.box2}>
                          <Text style={{...styles.name}}>{subItem.brand_user_nm}</Text>
                          <Text style={{...styles.brand, marginTop: mUtils.wScale(5)}}>{subItem.brand_nm}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            )
          })}
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
)(LinkSheetScreen)
