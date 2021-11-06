import React, {PureComponent} from 'react'
import {AppState, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import FastImage from 'react-native-fast-image'
import 'moment/locale/ko'
import _ from 'lodash'

import {isLoggedIn} from '../../../common/aws-auth'
import {actionLogout, actionSetAlarm} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'
import Loading from '../../common/Loading'
import Empty from '../../common/Empty'

const moreImg = require('../../../images/navi/more_5.png')

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      loading : true,
      data: ''
    }
  }
  
  requests = () => {
    const {data} = this.state;
    const userType = mConst.getUserType();
    
    return (
      <View style={{flex: _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length === 0 ? 1 : 0}}>
        <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.new}>
            {userType !== 'B' ? 'Confirmed' : 'New'} <Text style={{fontFamily: 'Roboto-Medium'}}>Sample Requests : </Text>
            <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>
              {userType === 'B' ? data.new_request_total_count : data.cnfirm_request_total_count}
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => {
              this.pushTo('HomeDetailScreen', {type: true, title: userType !== 'B' ? 'Confirmed Requests' : 'New Sample Requests'})
            }}
          >
            <Text style={styles.more}>More</Text>
            <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.layout2,
            backgroundColor: 'rgba(126, 161, 178, 0.2)',
            flex: _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length === 0 ? 1 : 0,
            flexDirection: _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length === 0 ? 'column' : 'row',
            justifyContent: _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length === 0 ? 'center' : 'space-between',
            flexWrap: _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length === 0 ? 'nowrap' : 'wrap',
          }}
        >
          {_.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).length > 0 ? (
            _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []).map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.pushTo('SampleRequestsDetailScreen', {no: item.req_no})
                  }}
                  disabled={userType !== 'B' ? false : true}
                  key={index}
                  style={styles.layout3}
                >
                  <FastImage
                    resizeMode={'contain'}
                    style={styles.brandImg}
                    source={{uri: userType === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
                  />
                  <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
                    {item.editor_nm} {item.editor_posi}
                  </Text>
                  <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
                    {mUtils.getShowDate(userType === 'B' ? item.req_dt : item.brand_cnfirm_dt, 'YYYY-MM-DD')}
                  </Text>
                  {userType === 'B' ? (
                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                      {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
                    </Text>
                  ) : (
                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
                  )}
                </TouchableOpacity>
              )
            })
          ) : (
            <Empty />
          )}
        </View>
      </View>
    )
  }

  sendOuts = () => {
    const {data} = this.state
    const userType = mConst.getUserType()
    return (
      <View style={{flex: _.get(data, 'today_request', []).length === 0 ? 1 : 0, flex: data.today_request.length === 0 ? 1 : 0}}>
        <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(40)}}>
          <Text style={styles.new}>
            Today's <Text style={{fontFamily: 'Roboto-Medium'}}>{userType === 'B' ? 'Send-Outs' : 'Pickups'} : </Text>
            <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}>{data.today_request_total_count}</Text>
          </Text>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => {
              // eslint-disable-next-line quotes
              this.pushTo('HomeDetailScreen', {type: false, title: userType === 'B' ? "Today's Send-Outs" : "Today's Pickups"})
            }}
          >
            <Text style={styles.more}>More</Text>
            <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.layout2,
            backgroundColor: 'rgba(178, 126, 126, 0.2)',
            flex: _.get(data, 'today_request', []).length === 0 ? 1 : 0,
            flex: data.today_request.length === 0 ? 1 : 0,
            flexDirection: data.today_request.length === 0 ? 'column' : 'row',
            justifyContent: data.today_request.length === 0 ? 'center' : 'space-between',
            flexWrap: data.today_request.length === 0 ? 'nowrap' : 'wrap',
          }}
        >
          {data.today_request.length > 0 ? (
            data.today_request.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.layout3}
                  onPress={() => this.pushTo(userType === 'B' ? 'SendOutScreen' : 'PickupsScreen', {reqNo: item.req_no})}
                >
                  <FastImage
                    resizeMode={'contain'}
                    style={styles.brandImg}
                    source={{uri: userType === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
                  />
                  <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
                    {item.editor_nm} {item.editor_posi}
                  </Text>
                  <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>{mUtils.getShowDate(item.date, 'YYYY-MM-DD')}</Text>
                  {userType === 'B' ? (
                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                      {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
                    </Text>
                  ) : (
                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
                  )}
                </TouchableOpacity>
              )
            })
          ) : (
            <Empty />
          )}
        </View>
      </View>
    )
  }

  getHome = async () => {
    const date = Math.floor(new Date().getTime() / 1000)
    console.log('getHomedatedate>>>', date)
    try {
      const response = await API.getHome({date: date})
      console.log('getHome>>>', JSON.stringify(response))
      this.setState({data: response,loading:false})
    } catch (error) {
      console.log('getHome>>>', error)
      this.setState({data: null,loading:false})
      await API.postErrLog({error: JSON.stringify(error), desc: 'getHomeError'})
    }
  }

  componentDidMount() {
    const {user} = this.props
    global.mUserType = user.userType;
    global.subScrbeStatus = user.subScrbeStatus;
    //console.log('user.subScrbeStatus:', user.subScrbeStatus)
    // FCM 설정(PUSH 권한 요청)
    this.setupFcm()
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = async () => {
    if ( this.props.user.subScrbeStatus ) {
      this.getHome()
    }else{
      this.setState({data: null,loading:false})
    }
    
    if (!(await isLoggedIn())) {
      this.props.logout()
    }
  }
  setupFcm = async () => {
    const {setAlarm} = this.props
    const fcmToken = await mUtils.getFcmToken()
    if (fcmToken) {
      const handleDataMessage = msg => {
        this.alert(_.get(msg, 'data.title'), _.get(msg, 'data.body'))
      }
      messaging().onMessage(message => {
        //console.log('fcm-msg:', message)
        setAlarm({alarm: true})
        if (_.isEmpty(message.data)) {
          this.alert(_.get(message, 'notification.title'), _.get(message, 'notification.body'))
        } else {
          handleDataMessage(message)
        }
      })
      messaging().setBackgroundMessageHandler(message => {
        //console.log('fcm-bg-msg:', message)
        setAlarm({alarm: true})
        if (!_.isEmpty(message.data)) {
          handleDataMessage(message)
        }
      })
    }
  }
  render() {
    const {user} = this.props;
    const {data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
        <ScrollView contentContainerStyle={{flexGrow: 1, marginBottom: mUtils.wScale(37.5)}} bounces={false}>
          <Text style={styles.screenTitleText}>Home</Text>
          <>
          {
            this.state.loading
            ?
            <Loading />
            :
            data 
            ? 
              <>
                {this.requests()}
                {this.sendOuts()}
              </>
            :
            <Empty />
          }
          </>
        </ScrollView>
        <CodePush />
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    logout: (data, rest) => dispatch(actionLogout.success(data, rest)),
    setAlarm: data => dispatch(actionSetAlarm(data)),
  })
)(HomeScreen)
