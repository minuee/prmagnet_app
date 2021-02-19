import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import {logout} from '../../../common/aws-auth'
import {actionLogout} from '../../../redux/actions'

const profileImage = require('../../../images/navi/profile_1.png')
const goImage = require('../../../images/navi/go_1.png')

class AccountSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }

  handleLogout = callOnce(() => {
    const {logoutSuccess, logoutFailure} = this.props
    logout({
      cbSuccess: async response => {
        logoutSuccess(response)
        console.log('###로그아웃 성공:', response)
      },
      cbFailure: async e => {
        logoutFailure(e)
        console.log('###로그아웃 실패', e)
      },
    })
  })

  componentDidMount() {
    this.logOutOption('계정설정', this.handleLogout)
  }

  render() {
    const {info} = this.props.route.params
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.img}>
              <FastImage resizeMode={'contain'} style={styles.profileImg} source={info.img_url_adres} />
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>이름</Text>
              <View style={styles.box}>
                <Text style={styles.desc}>{info.brand_user_nm}</Text>
              </View>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>직급</Text>
              <View style={styles.box}>
                <Text style={styles.desc}>{info.user_position}</Text>
              </View>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>이메일</Text>
              <View style={styles.box}>
                <Text style={styles.desc}>{info.email_adres}</Text>
              </View>
            </View>
            <View style={styles.top}>
              <Text style={styles.title}>휴대폰 번호</Text>
              <View style={styles.box}>
                <Text style={styles.desc}>
                  {info.phone_no
                    .replace(/[^0-9]/g, '')
                    .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
                    .replace('--', '-')}
                </Text>
              </View>
            </View>
            <Text style={{...styles.alert}}>* 프로필수정은 PC에서만 가능합니다.</Text>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    logoutSuccess: data => dispatch(actionLogout.success(data)),
    logoutFailure: data => dispatch(actionLogout.failure(data)),
  })
)(AccountSettingScreen)
