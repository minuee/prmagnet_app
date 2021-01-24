import React, {PureComponent} from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const selectedImage = require('../../images/common/selected.png')

export default class ColorGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedItems: [],
    }
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
    const {selectedItems} = this.state
    const {data} = this.props
    return (
      <>
        {_.map(data, (item, index) => {
          const colorText = item.charAt(0).toUpperCase() + item.substring(1)
          return (
            <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item)}>
              <Row style={styles.itemWrapper}>
                <View style={styles.colorWrapper}>
                  <View style={styles.colorCircle(item)} />
                  <Text style={styles.colorText}>{item === 'gold' ? 'Gold/Silver' : colorText}</Text>
                </View>
                {selectedItems.includes(item) && <FastImage source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
          )
        })}
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
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorWrapper: {
    flexDirection: 'row',
  },
  colorCircle: color => ({
    width: mUtils.wScale(24),
    height: mUtils.wScale(24),
    borderRadius: mUtils.wScale(12),
    borderWidth: color === 'white' ? 1 : 0,
    borderColor: '#e6e6e6',
    backgroundColor: color,
  }),
  colorText: {
    fontSize: 14,
    paddingLeft: mUtils.wScale(8),
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
})
