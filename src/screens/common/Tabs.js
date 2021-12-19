import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'
import Animated, {Easing} from 'react-native-reanimated'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const {Value, createAnimatedComponent, timing, block, call, interpolate} = Animated

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
    this.tabValue = new Value(0)
    this.tabLayout = ({nativeEvent}) => {
      this.setState({tabWidth: nativeEvent.layout.width})
      this.moveBorderValue = interpolate(this.tabValue, {
        inputRange: [0, 1],
        outputRange: [0, nativeEvent.layout.width],
      })
    }
  }
  selectTab = index => {
    const {getIndex} = this.props
    const {tabIndex} = this.state
    if (tabIndex !== index) {
      if (typeof getIndex === 'function') getIndex(index)
      this.setState({tabIndex: index})
      timing(this.tabValue, {
        toValue: index,
        duration: 200,
        easing: Easing.ease,
      }).start()
    }
  }
  render() {
    const {data} = this.props
    const {tabIndex} = this.state
    const tabTotalWidth = mConst.wWidth
    const tabCount = _.size(data)
    const tabBorderWidth = 1.5
    return (
      <View style={{width: mConst.wWidth, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: -tabBorderWidth,
              height: tabBorderWidth,
              width: tabTotalWidth / tabCount,
              backgroundColor: mConst.getBaseColor(),
              left: this.moveBorderValue,
            }}
          />
          {data.map((item, index) => (
            <TouchableWithoutFeedback key={index + 'key'} onPress={() => this.selectTab(index)} onLayout={this.tabLayout}>
              <View style={{flex: 1, alignItems: 'center', padding: mUtils.wScale(25), backgroundColor: mConst.white}}>
                <Text style={{fontSize: 17, fontWeight: 'bold', color: tabIndex === index ? mConst.textBaseColor : '#7d7d7d'}}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    )
  }
}
