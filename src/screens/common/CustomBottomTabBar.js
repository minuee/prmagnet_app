import React, {PureComponent} from 'react'
import {Keyboard} from 'react-native'
import {BottomTabBar} from '@react-navigation/bottom-tabs'

import mConst from '../../common/constants'

class CustomBottomTabBar extends PureComponent {
  state = {visible: true}
  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }
  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow)
    Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide)
  }
  keyboardDidShow = () => this.setState({visible: false})
  keyboardDidHide = () => this.setState({visible: true})
  render() {
    const {visible} = this.state
    if (mConst.bAndroid && !visible) return null
    return <BottomTabBar {...this.props} />
  }
}

export default CustomBottomTabBar
