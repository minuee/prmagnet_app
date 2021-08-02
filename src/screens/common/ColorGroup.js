import React from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const selectedImage = require('../../images/common/selected.png')
const multiImage = require('../../images/common/multi.png')

export default ColorGroup = props => {
  const {data, value, hide, setFilter} = props
  if (hide) return null
  return (
    <>
      {_.map(data, (item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => setFilter(item.cd_id)}>
            <Row style={styles.itemWrapper}>
              <View style={styles.colorWrapper}>
                {item.cd_nm === '멀티컬러' ? (
                  <FastImage source={multiImage} style={styles.colorCircle()} />
                ) : (
                  <View style={styles.colorCircle(item.color_value)} />
                )}
                <Text style={styles.colorText}>{item.cd_nm}</Text>
              </View>
              {value.includes(item.cd_id) && <FastImage source={selectedImage} style={styles.selectedImage} />}
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
  colorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: color => ({
    width: mUtils.wScale(24),
    height: mUtils.wScale(24),
    borderRadius: mUtils.wScale(12),
    borderWidth: color === '#ffffff' ? 1 : 0,
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
