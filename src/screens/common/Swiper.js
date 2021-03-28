import React from 'react'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import {Text} from 'react-native'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'

const config = {
  velocityThreshold: 0.01,
  directionalOffsetThreshold: 800,
}

const CommonSwiper = props => {
  const {onSwipeLeft, onSwipeRight, style, children, ...rest} = props
  return (
    <GestureRecognizer {...rest} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} config={config} style={{flex: 1, ...style}}>
      {children}
    </GestureRecognizer>
  )
}

export default CommonSwiper
