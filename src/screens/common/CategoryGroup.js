import React, {PureComponent, useState} from 'react'
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

export default CategoryGroup = props => {
  const {data, value, hide, setFilter} = props
  return (
    <>
      {_.map(data, (item, index) => (
        <CategoryItem key={index} data={item} value={value} hide={hide} setFilter={setFilter} />
      ))}
    </>
  )
}

const CategoryItem = props => {
  const {data, value, hide, setFilter} = props
  const [fold, setFold] = useState(true)
  if (hide) return null
  return (
    <>
      <TouchableOpacity onPress={() => setFold(!fold)}>
        <Row style={styles.itemWrapper}>
          <Text style={styles.itemHeadText}>{data.sample_catgry_lrge_cl_nm}</Text>
          <FastImage source={fold ? foldImage : unfoldImage} style={styles.foldImage} />
        </Row>
      </TouchableOpacity>
      {_.map(data.each_list, (item, index) => {
        if (!fold) {
          return (
            <TouchableOpacity key={index} onPress={() => setFilter(item.sample_catgry_middle_cl_cd)}>
              <Row style={styles.itemWrapper}>
                <Text style={styles.itemText}>{item.sample_catgry_middle_cl_nm}</Text>
                {value.includes(item.sample_catgry_middle_cl_cd) && <FastImage source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
          )
        }
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
    borderBottomWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemWrapper2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mUtils.wScale(50),
    alignItems: 'center',
    paddingLeft: mUtils.wScale(12),
    paddingRight: mUtils.wScale(24),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: 'bold',
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
