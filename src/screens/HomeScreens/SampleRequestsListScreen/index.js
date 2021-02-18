import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header1 from '../../common/Header1'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')

class SampleRequestsListScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: [
        {title: 'GUCCI', filming_dt: '2020-08-05', request_dt: '2020-08-05', status: 'Pending'},
        {title: 'GUCCI', filming_dt: '2020-08-05', request_dt: '2020-08-05', status: 'Pending'},
        {title: 'GUCCI', filming_dt: '2020-08-05', request_dt: '2020-08-05', status: 'Pending'},
      ],
    }
  }

  renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity style={styles.layout3}>
          <View style={styles.layout4}>
            <Text style={styles.title}>{item.title}</Text>
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
                  onSelect={() => {}}
                >
                  <Text style={styles.delete}>Edit</Text>
                </MenuOption>
                <MenuOption
                  style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                  onSelect={() => {
                    this.alert('샘플요청 삭제', '선택하신 샘플을 삭제 하시겠습니까?', [
                      {
                        onPress: () => {
                          setTimeout(() => {
                            this.alert('요청삭제 완료', '요청이 삭제되었습니다.', [{onPress: () => null}])
                          }, 100)
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
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mUtils.wScale(5)}}>
            <View>
              <Text style={{...styles.dt}}>
                Filming date{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>{item.filming_dt}</Text>
              </Text>
              <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                Request date{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>{item.request_dt}</Text>
              </Text>
            </View>
            <View style={styles.smallBox}>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.emptyBar} />
      </>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header1 />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>My Requests</Text>
          <TouchableOpacity style={styles.layout2} hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}>
            <Text style={styles.rightSmall}>Latest</Text>
            <FastImage resizeMode={'contain'} style={styles.latestImg} source={moreImage3} />
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={false}
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.dt}_${Math.random()}`}
        />
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(SampleRequestsListScreen)
