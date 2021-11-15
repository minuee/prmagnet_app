import React from 'react'
import {View, ActivityIndicator,PixelRatio,Dimensions} from 'react-native'

const {width: SCREEN_WIDTH,height : SCREEN_HEIGHT} = Dimensions.get("window");

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

const moreWrap = {  
  position:'absolute',left:0,top:0,width:SCREEN_WIDTH,height:SCREEN_HEIGHT,
  justifyContent:'center',alignItems:'center'
}

const moreLoading = props => {
  const {style,paddingTop = 0} = props
  return (
    <View style={[moreWrap]}>      
      <ActivityIndicator size="large" color={'black'} style={{paddingTop:paddingTop}}/>
    </View>
  )
}

export default moreLoading;
