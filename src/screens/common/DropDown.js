import React from 'react'
import {View, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import ModalDropdown from 'react-native-modal-dropdown'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const moreImg = require('../../images/navi/more_3.png')

const CommonDropDown = props => {
  const {half, onSelect, options, value, placeholder} = props

  return (
    <ModalDropdown
      style={styles.dropdownWrapper}
      dropdownStyle={half ? styles.dropdownInnerHalfWrapper : styles.dropdownInnerWrapper}
      onSelect={onSelect}
      renderRow={name => (
        <View style={styles.dropdownItemWrapper}>
          <Text style={styles.dropdownItemText}>{name}</Text>
        </View>
      )}
      renderSeparator={() => null}
      options={options}
    >
      <View style={half ? styles.dropdownTextHalfWrapper : styles.dropdownTextWrapper}>
        {value ? <Text style={styles.dropdownItemText}>{value}</Text> : <Text style={styles.dropdownPlaceholderText}>{placeholder}</Text>}
        <FastImage resizeMode={'contain'} source={moreImg} style={styles.dropdownIcon} />
      </View>
    </ModalDropdown>
  )
}

const styles = StyleSheet.create({
  dropdownWrapper: {
    marginVertical: mUtils.wScale(15),
  },
  dropdownInnerWrapper: {
    width: mConst.wGapUnit * 9,
  },
  dropdownTextWrapper: {
    width: mConst.wGapUnit * 9,
    height: mUtils.wScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.black,
    borderRadius: 5,
    paddingHorizontal: mUtils.wScale(15),
  },
  dropdownInnerHalfWrapper: {
    width: (mConst.wGapUnit * 9) / 2 - mUtils.wScale(6),
  },
  dropdownTextHalfWrapper: {
    width: (mConst.wGapUnit * 9) / 2 - mUtils.wScale(6),
    height: mUtils.wScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.black,
    borderRadius: 5,
    paddingHorizontal: mUtils.wScale(15),
  },
  dropdownItemText: {
    fontSize: 16,
    lineHeight: 30,
  },
  dropdownPlaceholderText: {
    fontSize: 16,
    color: mConst.textPhColor,
  },
  dropdownItemWrapper: {
    height: mUtils.wScale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownIcon: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
  },
})

export default CommonDropDown
