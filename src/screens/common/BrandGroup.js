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

export default class BrandGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      favoriteItems: [],
      selectedItems: [],
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
    const {favoriteItems, selectedItems} = this.state
    const {data} = this.props
    return (
      <>
        {_.map(favoriteItems, (item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item)}>
              <Row style={styles.itemWrapper}>
                <View style={styles.itemSubWrapper}>
                  <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item)}>
                    <FastImage source={heartOnImage} style={styles.heartImage} />
                  </TouchableOpacity>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
                {selectedItems.includes(item) && <FastImage source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
          )
        })}
        {_.map(
          _.filter(data, item => !favoriteItems.includes(item)),
          (item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item)}>
                <Row style={styles.itemWrapper}>
                  <View style={styles.itemSubWrapper}>
                    <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item)}>
                      <FastImage source={heartImage} style={styles.heartImage} />
                    </TouchableOpacity>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                  {selectedItems.includes(item) && <FastImage source={selectedImage} style={styles.selectedImage} />}
                </Row>
              </TouchableOpacity>
            )
          }
        )}
      </>
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
    paddingLeft: mUtils.wScale(12),
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
    width: mUtils.wScale(24),
    height: mUtils.wScale(24),
  },
  itemText: {
    fontSize: 14,
    paddingLeft: mUtils.wScale(8),
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
})
