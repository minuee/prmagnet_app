import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {ScrollView} from 'react-native'
import {ColorPropType} from 'react-native'

const circleImg1 = require('../../../images/navi/circle_1.png')
const circleImg2 = require('../../../images/navi/circle_2.png')
const heartOnImg = require('../../../images/common/heart_on.png')
const heartImg = require('../../../images/common/heart.png')
const checkImg = require('../../../images/navi/check_4.png')

class ByBrandsSearchScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      topList: ['인기순', 'A-Z 순', '검색하기'],
      selectList: '인기순',
      list: [
        {no: 1, like: true, brand: 'GUCCI', popularity: 6},
        {no: 2, like: false, brand: 'CHANEL', popularity: 10},
        {no: 3, like: false, brand: 'BATHING APE', popularity: 2},
        {no: 4, like: true, brand: 'BAP', popularity: 1},
        {no: 5, like: false, brand: 'A COLD WALL', popularity: 3},
        {no: 6, like: false, brand: 'CELINE', popularity: 15},
      ],
      selectBrand: 'GUCCI',
    }
  }

  _nameSort = () => {
    this.state.list.sort(function (a, b) {
      var brandA = a.brand.toUpperCase()
      var brandB = b.brand.toUpperCase()
      if (brandA < brandB) {
        return -1
      }
      if (brandA > brandB) {
        return 1
      }
      return 0
    })
  }

  _popularSort = () => {
    this.state.list.sort(function (a, b) {
      if (a.popularity > b.popularity) {
        return -1
      }
      if (a.popularity < b.popularity) {
        return 1
      }
      return 0
    })
  }

  UNSAFE_componentWillMount() {
    this._popularSort()
  }

  componentDidMount() {
    this.modalOption('Select Brands')
  }

  _renderItem = item => {
    return (
      <View style={{...styles.layout1}}>
        <TouchableOpacity
          style={{...styles.layout}}
          onPress={() => {
            let copy = [...this.state.list]
            copy.splice(item.index, 1, {...item.item, like: !item.item.like})
            this.setState({...this.state, list: copy})
          }}
        >
          <FastImage resizeMode={'contain'} style={styles.heartImg} source={item.item.like ? heartOnImg : heartImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.layout,
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: mUtils.wScale(13),
            paddingRight: mUtils.wScale(20),
          }}
          onPress={() => {
            this.setState({...this.state, selectBrand: item.item.brand})
          }}
        >
          <Text style={styles.brandText}>{item.item.brand}</Text>
          {this.state.selectBrand === item.item.brand ? <FastImage resizeMode={'contain'} style={styles.checkImg} source={checkImg} /> : null}
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {topList, selectList, list} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              ...styles.layout,
              backgroundColor: '#f6f6f6',
              paddingHorizontal: mUtils.wScale(20),
              paddingVertical: mUtils.wScale(15),
              marginTop: mUtils.wScale(10),
            }}
          >
            {topList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({...this.state, selectList: item})
                    if (item === 'A-Z 순') {
                      this._nameSort()
                    } else if (item === '인기순') {
                      this._popularSort()
                    }
                  }}
                  key={index}
                  style={{...styles.layout, marginRight: mUtils.wScale(16)}}
                >
                  <FastImage resizeMode={'contain'} style={styles.circle} source={selectList === item ? circleImg1 : circleImg2} />
                  <Text style={{...styles.topText, color: selectList === item ? '#555555' : '#999999'}}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <FlatList data={list} renderItem={this._renderItem} keyExtractor={item => item.no} />
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton}>
              <Text style={styles.leftText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ByBrandsSearchScreen)
