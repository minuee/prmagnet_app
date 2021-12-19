import React from 'react'
import {View, ActivityIndicator} from 'react-native'

const defaultStyle = {
  flex: 1,
  backgroundColor: 'rgba(255,255,255,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
}
const absoluteStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const loading = props => {
  const {style} = props
  return (
    <View style={[defaultStyle, style ? style : absoluteStyle]}>
      <ActivityIndicator color={'black'} size="large" />
    </View>
  )
}

export default loading
