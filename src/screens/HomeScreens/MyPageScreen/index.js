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
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const profileImage = require('../../../images/navi/profile_1.png')

class MyPageScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {info: ''}
  }

  async componentDidMount() {
    this.pushOption('마이페이지')
    const userInfo = await API.getUserInfo()
    this.setState({info: userInfo})
  }

  render() {
    const {navigation} = this.props
    const {info} = this.state
    return info ? (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{flex: 1, paddingHorizontal: mUtils.wScale(20)}}>
            <View style={styles.topBox}>
              <View style={styles.img}>
                <FastImage resizeMode={'contain'} style={styles.profileImg} source={info.img_url_adres} />
              </View>
              <View style={{marginLeft: mUtils.wScale(10)}}>
                <Text style={styles.name}>{info.brand_user_nm}</Text>
                <Text style={styles.info}>
                  {info.brand_nm} • {info.user_position}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editBox}
              onPress={() => {
                navigation.navigate('AccountSettingScreen', {info: info})
              }}
            >
              <Text style={styles.edit}>프로필 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingVertical: mUtils.wScale(40)}}
              onPress={() => {
                navigation.navigate('ContactScreen')
              }}
            >
              <Text style={styles.text1}>문의하기</Text>
            </TouchableOpacity>
            <Text style={styles.text1}>설정</Text>
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
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(MyPageScreen)
