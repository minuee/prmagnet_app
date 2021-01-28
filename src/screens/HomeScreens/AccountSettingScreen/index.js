import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, Switch, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const profileImage = require('../../../images/navi/profile_1.png')
const goImage = require('../../../images/navi/go_1.png')

class AccountSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }

  componentDidMount() {
    this.pushOption('계정설정')
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity style={styles.img}>
              <FastImage resizeMode={'contain'} style={styles.profileImg} source={profileImage} />
            </TouchableOpacity>
            <View style={styles.top}>
              <Text style={styles.title}>이름</Text>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.desc}>최서영</Text>
                <FastImage resizeMode={'contain'} style={styles.goImg} source={goImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>직급</Text>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.desc}>인턴</Text>
                <FastImage resizeMode={'contain'} style={styles.goImg} source={goImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>이메일</Text>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.desc}>asd123@naver.com</Text>
                <FastImage resizeMode={'contain'} style={styles.goImg} source={goImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>휴대폰 번호</Text>
              <TouchableOpacity style={styles.box}>
                <Text style={styles.desc}>010-1111-2222</Text>
                <FastImage resizeMode={'contain'} style={styles.goImg} source={goImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>비밀번호</Text>
              <TouchableOpacity style={styles.box}>
                <Text style={{...styles.desc, fontSize: 12}}>● ● ● ● ● ● ● ●</Text>
                <FastImage resizeMode={'contain'} style={styles.goImg} source={goImage} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(AccountSettingScreen)
