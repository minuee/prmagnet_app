import React, {PureComponent} from 'react'
import {AppState, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import FastImage from 'react-native-fast-image'
import 'moment/locale/ko'
import _ from 'lodash'

import {actionLogout} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'
import Loading from '../../common/Loading'

const moreImg = require('../../../images/navi/more_5.png')

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {data: ''}
  }

  requests = () => {
    const {data} = this.state
    const userType = mConst.getUserType()
    return (
      <View>
        <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.new}>
            {userType === 'M' ? 'Confirmed' : 'New'} <Text style={{fontFamily: 'Roboto-Medium'}}>Requests : </Text>
            <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>{_.get(data, 'new_request.length', 0)}</Text>
          </Text>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => {
              this.pushTo('HomeDetailScreen', {type: true, title: userType === 'M' ? 'Confirmed Requests' : 'New Requests'})
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
          }}
        >
          {_.get(data, userType === 'M' ? 'cnfirm_request' : 'new_request', [])
            .slice(0, 6)
            .map((item, index) => {
              return (
                <View key={index} style={styles.layout3}>
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: item.mgzn_logo_url_adres}} />
                  <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>{item.editor_nm}</Text>
                  <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>{mUtils.getShowDate(item.brand_cnfirm_dt, 'YYYY-MM-DD')}</Text>
                  <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                    {item.mgzn_nm} • {item.photogrf_modl_nm}
                  </Text>
                </View>
              )
            })}
        </View>
      </View>
    )
  }

  sendOuts = () => {
    const {data} = this.state
    const userType = mConst.getUserType()
    return (
      <View>
        <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(40)}}>
          <Text style={styles.new}>
            Today's <Text style={{fontFamily: 'Roboto-Medium'}}>{userType === 'M' ? 'PickUps' : 'Send-Outs'} : </Text>
            <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}>{data.today_request.length}</Text>
          </Text>
          <TouchableOpacity
            style={styles.layout}
            onPress={() => {
              // eslint-disable-next-line quotes
              this.pushTo('HomeDetailScreen', {type: false, title: userType === 'M' ? "Today's PickUps" : "Today's Send-Outs"})
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
          }}
        >
          {data.today_request.slice(0, 6).map((item, index) => {
            return (
              <View key={index} style={styles.layout3}>
                <Text style={{...styles.brand}}>{item.brand}</Text>
                <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>{item.name}</Text>
                <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>{item.dt}</Text>
                <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                  {item.mgzn_nm} • {item.photogrf_modl_nm}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  getHome = async () => {
    const date = Math.floor(new Date().getTime() / 1000)
    try {
      let response = await API.getHome({date: date})
      console.log('getHome>>>', response)
      this.setState({data: response})
    } catch (error) {
      console.log('getHome>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getHomeError'})
    }
  }

  componentDidMount() {
    const {user} = this.props
    global.mUserType = user.userType
    // FCM 설정(PUSH 권한 요청)
    this.setupFcm()
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = () => {
    this.getHome()
  }
  setupFcm = async () => {
    const fcmToken = await mUtils.getFcmToken()
    if (fcmToken) {
      const handleDataMessage = msg => {
        this.alert(_.get(msg, 'data.title'), _.get(msg, 'data.body'))
      }
      messaging().onMessage(message => {
        console.log('fcm-msg:', message)
        if (_.isEmpty(message.data)) {
          this.alert(_.get(message, 'notification.title'), _.get(message, 'notification.body'))
        } else {
          handleDataMessage(message)
        }
      })
      messaging().setBackgroundMessageHandler(message => {
        console.log('fcm-bg-msg:', message)
        if (!_.isEmpty(message.data)) {
          handleDataMessage(message)
        }
      })
    }
  }
  render() {
    const {user} = this.props
    const {data} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={styles.screenTitleText}>Home</Text>
          {data ? (
            <>
              {this.requests()}
              {this.sendOuts()}
            </>
          ) : (
            <Loading />
          )}
        </ScrollView>
        {(mConst.PRODUCTION || mConst.STAGE) && <CodePush />}
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
  })
)(HomeScreen)
