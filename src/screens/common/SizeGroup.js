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

//const rtwData = ['XS', 'S', 'M', 'L', 'XL'];
const rtwData = [
  { cd_id: "XS", cd_nm: "XS (여성 36/ 남성 44)" },
  { cd_id: "S", cd_nm: "S (여성 38/ 남성 46)" },
  { cd_id: "M", cd_nm: "M (여성 40/ 남성 48)" },
  { cd_id: "L", cd_nm: "L (여성 42/ 남성 50)" },
  { cd_id: "XL", cd_nm: "XL (여성 44/ 남성 52)" },
];

export default SizeGroup = props => {
  const {data, showRtw, showShoes, value, hide, setFilter} = props
  if (!hide && !showRtw && !showShoes)
    return (
      <>
        <Text style={styles.guideText}>Category에서 RTW나 Shoes 항목을</Text>
        <Text style={styles.guideText}>선택할 경우에만 선택 가능합니다.</Text>
      </>
    )
  return (
    <>
      {showRtw && <RtwSizeItem value={value} hide={hide} setFilter={setFilter} />}
      {showShoes && (
        <>
          {_.map(data, (item, index) => (
            <ShoesSizeItem key={index} data={item} value={value} hide={hide} setFilter={setFilter} />
          ))}
        </>
      )}
    </>
  )
}

const RtwSizeItem = props => {
  const {value, hide, setFilter} = props
  const [fold, setFold] = useState(true)
  if (hide) return null
  return (
    <>
      <TouchableOpacity onPress={() => setFold(!fold)}>
        <Row style={styles.itemWrapper}>
          <Text style={styles.itemHeadText}>RTW Size</Text>
          <FastImage source={fold ? foldImage : unfoldImage} style={styles.foldImage} />
        </Row>
      </TouchableOpacity>
      {_.map(rtwData, (item, index) => {
        if (!fold) {
          return (
            <TouchableOpacity key={index} onPress={() => setFilter(item.cd_id)}>
              <Row style={styles.itemWrapper}>
                <Text style={styles.itemText}>{item.cd_nm}</Text>
                {value.includes(item.cd_id) && <FastImage source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
          )
        }
      })}
    </>
  )
}

const ShoesSizeItem = props => {
  const {data, value, hide, setFilter} = props
  const [fold, setFold] = useState(true)
  if (hide) return null
  return (
    <>
      <TouchableOpacity onPress={() => setFold(!fold)}>
        <Row style={styles.itemWrapper}>
          <Text style={styles.itemHeadText}>{data.gender_cd_id === 'SSS001' ? 'Women' : 'Men'} Shoes Size</Text>
          <FastImage source={fold ? foldImage : unfoldImage} style={styles.foldImage} />
        </Row>
      </TouchableOpacity>
      {_.map(data.size_list, (item, index) => {
        if (!fold) {
          return (
            <TouchableOpacity key={index} onPress={() => setFilter(item.size_cd_id)}>
              <Row style={styles.itemWrapper}>
                <Text style={styles.itemText}>{item.size_nm}</Text>
                {value.includes(item.size_cd_id) && <FastImage source={selectedImage} style={styles.selectedImage} />}
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
  guideText: {
    fontSize: 14,
    padding: mUtils.wScale(5),
  },
})
