import React, {PureComponent} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const foldImage = require('../../images/common/fold.png')
const unfoldImage = require('../../images/common/unfold.png')
const selectedImage = require('../../images/common/selected.png')

export default class CategoryGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fold: true,
      selectedItems: [],
    }
  }
  toggleFold = () => {
    this.setState(prevstate => ({fold: !prevstate.fold}))
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
    const {fold, selectedItems} = this.state
    const {data} = this.props
    return (
      <>
        {_.map(data, (item, index) => {
          if (index === 0) {
            return (
              <TouchableOpacity key={index} onPress={this.toggleFold}>
                <Row style={styles.itemWrapper}>
                  <Text style={styles.itemHeadText}>{item}</Text>
                  <FastImage source={fold ? foldImage : unfoldImage} style={styles.foldImage} />
                </Row>
              </TouchableOpacity>
            )
          } else if (!fold) {
            return (
              <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item)}>
                <Row style={styles.itemWrapper}>
                  <Text style={styles.itemText}>{item}</Text>
                  {selectedItems.includes(item) && <FastImage source={selectedImage} style={styles.selectedImage} />}
                </Row>
              </TouchableOpacity>
            )
          }
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
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemText: {
    fontSize: 14,
    color: '#555555',
  },
  foldImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13 / 2),
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
})
