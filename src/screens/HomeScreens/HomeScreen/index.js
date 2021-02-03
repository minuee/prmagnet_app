import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'

import {actionLogout} from '../../../redux/actions'
import CodePush from '../../common/CodePush'
import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/services'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'

const moreImg = require('../../../images/navi/more_5.png')

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data1: [
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
      ],
      data2: [
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
        {brand: 'BAZAAR', name: '오재혁 ed', dt: '2020-08-09', custom: 'Elle • 아이즈원'},
      ],
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        {(mConst.PRODUCTION || mConst.STAGE) && <CodePush />}
        <ScrollView>
          <Text style={styles.screenTitleText}>Home</Text>
          <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={styles.new}>
              New <Text style={{fontFamily: 'Roboto-Medium'}}>Requests : </Text>
              <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>32</Text>
            </Text>
            <TouchableOpacity style={styles.layout}>
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
            {this.state.data1.map((item, index) => {
              return (
                <View key={index} style={styles.layout3}>
                  <Text style={{...styles.brand}}>{item.brand}</Text>
                  <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>{item.name}</Text>
                  <Text style={{...styles.dt}}>{item.dt}</Text>
                  <Text style={{...styles.custom, marginTop: mUtils.wScale(3)}}>{item.custom}</Text>
                </View>
              )
            })}
          </View>

          <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(40)}}>
            <Text style={styles.new}>
              Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Send-Outs : </Text>
              <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}>9</Text>
            </Text>
            <TouchableOpacity style={styles.layout}>
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
            {this.state.data1.map((item, index) => {
              return (
                <View key={index} style={styles.layout3}>
                  <Text style={{...styles.brand}}>{item.brand}</Text>
                  <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>{item.name}</Text>
                  <Text style={{...styles.dt}}>{item.dt}</Text>
                  <Text style={{...styles.custom, marginTop: mUtils.wScale(3)}}>{item.custom}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
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
