import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'

import mConst from '../../common/constants'
import Text from '../common/Text'

const imgBack = require('../../images/navi/back.png')

const PushHeader = props => {
  const {onPress, title} = props
  return (
    <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <TouchableOpacity style={{paddingHorizontal: 12}} onPress={onPress}>
        <FastImage style={{width: 30, height: 30}} source={imgBack} />
      </TouchableOpacity>
      {title && (
        <View style={{marginRight: (mConst.wGapUnit * 3) / 5}}>
          <Text style={{fontSize: 18, color: mConst.textBaseColor, fontWeight: 'bold'}}>{title}</Text>
        </View>
      )}
    </View>
  )
}

export default PushHeader
