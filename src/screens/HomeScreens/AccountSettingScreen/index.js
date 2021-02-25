import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, TouchableOpacity, PermissionsAndroid, Platform} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import Modal from 'react-native-modal'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import {logout} from '../../../common/aws-auth'
import {actionLogout} from '../../../redux/actions'

const profileImg = require('../../../images/navi/profile_1.png')
const cameraImg = require('../../../images/navi/camera_1.png')

class AccountSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {isvisible: false}
  }

  requestCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: '카메라 권한',
        message: '카메라 접근을 허용하시면 촬영한 이미지를 프로필에 사용할 수 있어요.',
        buttonNegative: '허용 안 함',
        buttonPositive: '허용',
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.profile(type)
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  profile = type => {
    switch (type) {
      case 'camera':
        return launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            console.log('camera', response)
          }
        )
      case 'gallery':
        return launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            console.log('gallery', response)
          }
        )
    }
  }

  close = () => {
    this.setState({...this.state, isvisible: false})
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
    const {isvisible} = this.state
    const {info} = this.props.route.params
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity
              style={styles.img}
              onPress={() => {
                this.setState({...this.state, isvisible: true})
              }}
            >
              <FastImage resizeMode={'contain'} style={styles.profileImg} source={info.img_url_adres} />
              <FastImage resizeMode={'contain'} style={styles.cameraImg} source={cameraImg} />
            </TouchableOpacity>
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
          <Modal
            isVisible={isvisible}
            useNativeDriver={true}
            onBackButtonPress={() => {
              this.close()
            }}
            onBackdropPress={() => {
              this.close()
            }}
            style={styles.modal}
          >
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{...styles.select, borderBottomWidth: 0.3, borderColor: '#707070'}}
                onPress={() => {
                  Platform.OS === 'ios' ? this.profile('camera') : this.requestCameraPermission('camera')
                }}
              >
                <Text style={styles.modaltext}>사진찍기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.select}}
                onPress={() => {
                  Platform.OS === 'ios' ? this.profile('gallery') : this.requestCameraPermission('gallery')
                }}
              >
                <Text style={styles.modaltext}>갤러리</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
