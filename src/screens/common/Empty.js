import React from 'react'
import {View} from 'react-native'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const CommonEmpty = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',paddingVertical:40}}>
      <Text style={{fontSize: 18, color: mConst.textGray}}>목록이 존재하지 않습니다.</Text>
    </View>
  )
}

export default CommonEmpty
