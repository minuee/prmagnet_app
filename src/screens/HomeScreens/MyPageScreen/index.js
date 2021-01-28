import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import DeviceInfo from 'react-native-device-info'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const profileImage = require('../../../images/navi/profile_1.png')

class MyPageScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {name: '최서영', brand: 'Vogue', position: '어시'}
  }

  componentDidMount() {
    this.pushOption('마이페이지')
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{flex: 1, paddingHorizontal: mUtils.wScale(20)}}>
            <View style={styles.topBox}>
              <View style={styles.img}>
                <FastImage resizeMode={'contain'} style={styles.profileImg} source={profileImage} />
              </View>
              <View style={{marginLeft: mUtils.wScale(10)}}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.info}>
                  {this.state.brand} • {this.state.position}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{paddingVertical: mUtils.wScale(40)}}>
              <Text style={styles.text1}>문의하기</Text>
            </TouchableOpacity>
            <Text style={styles.text1}>설정</Text>
            <TouchableOpacity style={{paddingTop: mUtils.wScale(30)}}>
              <Text style={styles.text2}>계정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: mUtils.wScale(40)}}>
              <Text style={styles.text2}>알림</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: mUtils.wScale(40)}}>
              <Text style={styles.text2}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: mUtils.wScale(40)}}>
              <Text style={styles.text2}>안내사항</Text>
            </TouchableOpacity>
            <View style={styles.version}>
              <Text style={styles.text2}>버전 정보</Text>
              <Text style={styles.text2}>{DeviceInfo.getVersion()}</Text>
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
)(MyPageScreen)
