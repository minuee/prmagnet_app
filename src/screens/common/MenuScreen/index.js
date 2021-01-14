import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import {actionLogout} from '../../../redux/actions'
import mConst from '../../../common/constants'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

class MenuScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.imgGo = require('../../../images/navi/go.png')
    this.imgClose = require('../../../images/navi/close.png')
  }
  handleLogout = callOnce(() => {
    const {logout} = this.props
    logout()
  })
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.headerLeftWrapper} onPress={this.closeMenu}>
            <FastImage style={styles.headerLeftImage} source={this.imgClose} />
          </TouchableOpacity>
          <View style={styles.headerRightWrapper}>
            <Text style={styles.headerRightText}>FashionPR</Text>
          </View>
        </View>
        <View style={styles.menuGroupWrapper}>
          <Text style={styles.menuTitleText}>#서비스 소개</Text>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>이용과정 안내</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>유의사항 안내</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>서비스 이용료 안내</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuHorizonLine} />
        <View style={styles.menuGroupWrapper}>
          <Text style={styles.menuTitleText}>#결제관리</Text>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>구독서비스 안내</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>결제수단</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuHorizonLine} />
        <View style={styles.menuGroupWrapper}>
          <Text style={styles.menuTitleText}>#고객지원</Text>
          <TouchableOpacity style={styles.menuWrapper} onPress={null}>
            <Text style={styles.menuSubTitleText}>관리자에게 의견보내기</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuWrapper} onPress={this.handleLogout}>
            <Text style={styles.menuSubTitleText}>로그아웃</Text>
            <FastImage source={this.imgGo} style={styles.goImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.menuHorizonLine} />
        <View style={styles.middleWrapper}></View>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    logout: (data, rest) => dispatch(actionLogout.success(data, rest)),
  })
)(MenuScreen)
