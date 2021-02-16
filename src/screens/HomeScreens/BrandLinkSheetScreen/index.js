import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'

const moreImg = require('../../../images/navi/more_4.png')
const schedulerImg = require('../../../images/navi/scheduler_1.png')
const noCheckImg = require('../../../images/navi/no_check_2.png')
const brandImg = require('../../../images/navi/brand_1.png')

class BrandLinkSheetScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: [
        {brand: 'BAZAAR', name: '이진선 ed', img: require('../../../images/navi/brand_1.png')},
        {brand: 'BAZAAR', name: '이진선 ed', img: require('../../../images/navi/brand_1.png')},
        {brand: 'BAZAAR', name: '이진선 ed', img: require('../../../images/navi/brand_1.png')},
        {brand: 'BAZAAR', name: '이진선 ed', img: require('../../../images/navi/brand_1.png')},
        {brand: 'BAZAAR', name: '이진선 ed', img: require('../../../images/navi/brand_1.png')},
      ],
      title: ['Send Out', 'Return'],
      selectTitle: 'Send Out',
    }
  }
  render() {
    const {data, selectTitle} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header />
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
            {this.state.title.map((item, index) => {
              return (
                <MenuOption
                  key={index}
                  style={styles.menuOption}
                  onSelect={() => {
                    this.setState({...this.state, selectTitle: item})
                  }}
                >
                  <Text style={styles.menuText}>{item}</Text>
                </MenuOption>
              )
            })}
          </MenuOptions>
        </Menu>

        <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
          <View style={styles.layout1}>
            <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
            <Text style={styles.date}>8/2(SUN) - 8/8(SAT)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingBottom: mUtils.wScale(25)}}>
          <View style={{width: '100%', marginTop: mUtils.wScale(25)}}>
            <TouchableOpacity style={{...styles.layout1, marginBottom: mUtils.wScale(15), paddingHorizontal: mUtils.wScale(20)}}>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
              <Text style={{...styles.subDt}}>
                8/2(SUN)
                <Text style={{fontSize: 16}}>
                  {' '}
                  : <Text style={{fontSize: 16, color: '#7ea1b2'}}>8</Text>
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={{...styles.layout, flexWrap: 'wrap', paddingHorizontal: mUtils.wScale(20)}}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity style={{...styles.brandBox}} key={index}>
                    <View style={styles.box1}>
                      <FastImage resizeMode={'contain'} style={styles.brandImg} source={item.img} />
                    </View>
                    <View style={styles.box2}>
                      <Text style={{...styles.name}}>{item.name}</Text>
                      <Text style={{...styles.brand, marginTop: mUtils.wScale(5)}}>{item.brand}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(BrandLinkSheetScreen)
