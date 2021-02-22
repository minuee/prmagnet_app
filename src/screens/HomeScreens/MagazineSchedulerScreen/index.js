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
import {multicastChannel} from 'redux-saga'

const calendarImg = require('../../../images/navi/scheduler_1.png')
const airplaneImg = require('../../../images/navi/airplane_1.png')

class MagazineSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: [
        {
          modelImg: require('../../../images/sample/model_3.png'),
          brand: 'GUCCI',
          dt: '2020-08-02',
          name: '이진선 ed',
          desc: 'FW 키룩 촬영',
          address: '박현구 스튜디오',
          address1: '강남구 신사동 542-7 B1',
          name1: '김지영 as',
          phone: '010-7104-5568',
          list: [
            require('../../../images/navi/bag_1.png'),
            require('../../../images/navi/bag_1.png'),
            require('../../../images/navi/bag_1.png'),
            require('../../../images/navi/bag_1.png'),
            require('../../../images/navi/bag_1.png'),
            require('../../../images/navi/bag_1.png'),
          ],
        },
      ],
    }
  }

  render() {
    const {data} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header like pushTo={this.pushTo} />
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
            <TouchableOpacity style={{...styles.byBox, backgroundColor: '#070708'}}>
              <Text style={styles.by}>By Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.byBox, backgroundColor: 'rgba(0, 0, 0, 0.2)', marginLeft: mUtils.wScale(5)}}>
              <Text style={styles.by}>By Brands</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <Text style={{...styles.titleDt, marginLeft: mUtils.wScale(5)}}>8/2(SUN)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingLeft: mUtils.wScale(20), paddingTop: mUtils.wScale(25)}}>
          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{...styles.layout, justifyContent: 'space-between', height: mUtils.wScale(290), marginBottom: mUtils.wScale(35)}}
              >
                <FastImage resizeMode={'contain'} style={styles.modelImg} source={item.modelImg} />
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
                        <Text>{item.brand}</Text>
                        <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
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
                        <Text style={{...styles.dt}}>{item.dt}</Text>
                        <Text style={{...styles.name}}>{item.name}</Text>
                        <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{item.desc}</Text>
                        <Text style={{...styles.address, marginTop: mUtils.wScale(8)}}>{item.address}</Text>
                        <Text style={{...styles.address}}>{item.address1}</Text>
                        <Text style={{...styles.address, marginTop: mUtils.wScale(8)}}>{item.name1}</Text>
                        <Text style={{...styles.address}}>{item.phone}</Text>
                      </View>
                    </View>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                      {item.list.map((item, index) => {
                        return <FastImage key={index} resizeMode={'contain'} style={styles.listImg} source={item} />
                      })}
                    </View>
                  </ScrollView>
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
  state => ({}),
  dispatch => ({})
)(MagazineSchedulerScreen)
