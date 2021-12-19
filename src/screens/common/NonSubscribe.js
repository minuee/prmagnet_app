import React from 'react'
import {View} from 'react-native'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const NonSubscribe = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
      <Text style={{fontSize: 18, color: mConst.textGray}}>구독 후 이용해 주세요.</Text>
    </View>
  )
}

export default NonSubscribe;
