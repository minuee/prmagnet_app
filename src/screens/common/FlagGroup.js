import React, {PureComponent, useState} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const selectedImage = require('../../images/common/selected.png')

const data = [
  {key: 'All', value: null},
  {key: 'Possession', value: true},
  {key: 'Not Possession', value: false},
]

export default FlagGroup = props => {
  const {value, hide, setFilter} = props
  if (hide) return null
  return (
    <>
      {_.map(data, (item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => setFilter(item.value)}>
            <Row style={styles.itemWrapper}>
              <Text style={styles.itemText}>{item.key}</Text>
              {value == item.value && <FastImage source={selectedImage} style={styles.selectedImage} />}
            </Row>
          </TouchableOpacity>
        )
      })}
    </>
  )
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
