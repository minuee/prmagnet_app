import React from 'react'
import {Text} from 'react-native'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'

const defaultStyle = {
  color: mConst.textBaseColor,
  includeFontPadding: false,
}

const CommonText = props => {
  const {style, children, ...rest} = props
  let fontSizeStyle = null
  if (style && style.hasOwnProperty('fontSize')) {
    fontSizeStyle = {fontSize: mUtils.wScale(style.fontSize)}
  }
  return (
    <Text {...rest} style={[defaultStyle, style, fontSizeStyle]}>
      {children}
    </Text>
  )
}

export default CommonText
