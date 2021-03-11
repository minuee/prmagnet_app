import React, {PureComponent} from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const heartImage = require('../../images/common/heart.png')
const heartOnImage = require('../../images/common/heart_on.png')
const selectedImage = require('../../images/common/selected.png')
const circleImg1 = require('../../images/navi/circle_1.png')
const circleImg2 = require('../../images/navi/circle_2.png')
const arr = ['A-Z 순', '검색하기']

export default class BrandGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      favoriteItems: [],
      selectedItems: [],
      select: 'A-Z 순',
    }
  }
  toggleFavoriteItem = val => {
    this.setState(prevstate => {
      const favoriteItems = prevstate.favoriteItems.includes(val)
        ? prevstate.favoriteItems.filter(item => item !== val)
        : prevstate.favoriteItems.concat(val)
      return {favoriteItems}
    })
  }
  toggleSelectItem = val => {
    this.setState(prevstate => {
      const selectedItems = prevstate.selectedItems.includes(val)
        ? prevstate.selectedItems.filter(item => item !== val)
        : prevstate.selectedItems.concat(val)
      return {selectedItems}
    })
  }
  render() {
    const {favoriteItems, selectedItems, select} = this.state
    const {data} = this.props
    return (
      <View style={styles.layout}>
        <Row style={styles.top}>
          {_.map(arr, (item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({select: item})
                }}
                key={index}
                style={{...styles.layout1}}
              >
                <FastImage resizeMode={'contain'} style={styles.circle} source={select === item ? circleImg1 : circleImg2} />
                <Text style={{...styles.topText, color: select === item ? '#555555' : '#999999'}}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </Row>
        {_.map(favoriteItems, (item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item)}>
              <Row style={styles.itemWrapper}>
                <View style={styles.itemSubWrapper}>
                  <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item)} style={styles.touch}>
                    <FastImage resizeMode={'contain'} source={heartOnImage} style={styles.heartImage} />
                  </TouchableOpacity>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
                {selectedItems.includes(item) && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
          )
        })}

        {_.map(data, (item, index) => {
          return _.map(
            _.filter(item.each_list, e => !favoriteItems.includes(e.brand_nm)),
            (item1, index1) => {
              return (
                <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item1.brand_nm)}>
                  <Row style={styles.itemWrapper}>
                    <View style={styles.itemSubWrapper}>
                      <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item1.brand_nm)} style={styles.touch}>
                        <FastImage resizeMode={'contain'} source={heartImage} style={styles.heartImage} />
                      </TouchableOpacity>
                      <Text style={styles.itemText}>{item1.brand_nm}</Text>
                    </View>
                    {selectedItems.includes(item1.brand_nm) && (
                      <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />
                    )}
                  </Row>
                </TouchableOpacity>
              )
            }
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mUtils.wScale(50),
    alignItems: 'center',
    paddingRight: mUtils.wScale(24),
    borderTopWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemSubWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartImage: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  itemText: {
    fontSize: 14,
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
  touch: {
    height: mUtils.wScale(30),
    justifyContent: 'center',
    paddingRight: mUtils.wScale(8),
    paddingLeft: mUtils.wScale(12),
  },
  layout: {
    borderBottomWidth: 1,
    borderColor: mConst.borderGray,
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: mUtils.wScale(16),
  },
  circle: {
    width: mUtils.wScale(16),
    height: mUtils.wScale(16),
    marginRight: mUtils.wScale(5),
  },
  top: {
    paddingLeft: mUtils.wScale(12),
    height: mUtils.wScale(50),
    backgroundColor: '#f6f6f6',
  },
})
