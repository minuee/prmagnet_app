import React, {PureComponent} from 'react'
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const selectedImage = require('../../images/common/selected.png')

export default MaterialGroup = props => {
  const {data, value, hide, setFilter} = props
  if (hide) return null
  return (
    <>
      {_.map(data, (item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => setFilter(item.cd_id)}>
            <Row style={styles.itemWrapper}>
              <Text style={styles.itemHeadText}>{item.cd_nm}</Text>
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
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
})
