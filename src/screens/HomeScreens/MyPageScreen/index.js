import React, {PureComponent} from 'react';
import {SafeAreaView, FlatList, View, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from "react-native-version-check";
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import AppLink from '../../../common/AppLink';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import {actionLogout} from '../../../redux/actions';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';

class MyPageScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {info: ''}
  }

  getUserInfo = async () => {
    try {
      const response = await API.getUserInfo()
      console.log('response>>>', response)
      this.setState({info: response})
    } catch (error) {
      console.log('getUserInfo>>>', error)
    }
  }
  componentDidMount() {
    this.pushOption('마이페이지')
    //console.log('DeviceInfo>>>', DeviceInfo.getVersion());

    //패키지명
    //console.log('getPackageName>>>', VersionCheck.getPackageName());
    //현재 버전
    //console.log('getCurrentVersion>>>', VersionCheck.getCurrentVersion());
    //현재 빌드번호
    //console.log('getCurrentBuildNumber>>>', VersionCheck.getCurrentBuildNumber());

    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getUserInfo()
  }


  moveAppStore = async() => {
    const appStoreId = DEFAULT_CONSTANTS.iosAppStoreID;
    const playStoreId = DEFAULT_CONSTANTS.androidPackageName;
    if ( Platform.OS === 'ios') {
        AppLink.openInStore({ appStoreId}).then(() => {
            setTimeout(() => {
                RNExitApp.exitApp()
            },1000)                
        })
        .catch((err) => {
            // handle error
        });
    }else{
        AppLink.openInStore({ playStoreId}).then(() => {
            RNExitApp.exitApp();
        })
        .catch((err) => {
        // handle error
        });
    }

    //openInStore(DEFAULT_CONSTANTS.appName,DEFAULT_CONSTANTS.iosAppStoreID,'en',DEFAULT_CONSTANTS.androidPackageName)
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
                <FastImage resizeMode={'contain'} style={styles.profileImg} source={{uri: info.img_full_path}} />
              </View>
              <View style={{marginLeft: mUtils.wScale(10)}}>
                <Text style={styles.name}>{mConst.getUserType() === 'B' ? info.brand_user_nm : info.mgzn_user_nm}</Text>
                {mConst.getUserType() === 'B' ? (
                  <Text style={styles.info}>
                    {info.brand_nm} • {info.user_position}
                  </Text>
                ) : (
                  <Text style={styles.info}>
                    {info.mgzn_nm} • {info.user_position}
                  </Text>
                )}
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotiSettingScreen', {
                  info: info,
                })
              }}
            >
              <Text style={styles.text1}>알림</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingTop: mUtils.wScale(40)}}
              onPress={() => {
                navigation.navigate('NoticeListScreen')
              }}
            >
              <Text style={styles.text1}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingTop: mUtils.wScale(40)}}
              onPress={() => {
                navigation.navigate('TermsScreen')
              }}
            >
              <Text style={styles.text1}>이용약관</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingTop: mUtils.wScale(40)}}
              onPress={() => {
                navigation.navigate('PrivacyScreen')
              }}
            >
              <Text style={styles.text1}>개인정보 처리방침</Text>
            </TouchableOpacity>
            <View style={styles.version}>
              <Text style={styles.text1}>버전 정보</Text>
              <Text style={styles.text2}>{VersionCheck.getCurrentVersion()}</Text>
              { mConst.AppStoreVersion != VersionCheck.getCurrentVersion() &&
                (
                    <TouchableOpacity style={styles.miniBox} onPress={()=>this.moveAppStore()}>
                        <Text style={styles.text2}>업데이트</Text>
                    </TouchableOpacity>
                )
              }              
            </View>
            {/* TODO 임시 테스트용 로그아웃 설정 Start--------------------------------------------------------- */}
            {/* <TouchableOpacity
              style={{paddingTop: mUtils.wScale(40)}}
              onPress={() => {
                this.props.logoutSuccess()
              }}
            >
              <Text style={styles.text1}>로그아웃(임시)</Text>
            </TouchableOpacity> */}
            {/* TODO 임시 테스트용 로그아웃 설정 End--------------------------------------------------------- */}
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
  dispatch => ({
    logoutSuccess: data => dispatch(actionLogout.success(data)),
  })
)(MyPageScreen)
