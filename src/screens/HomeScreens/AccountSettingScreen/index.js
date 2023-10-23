import React, {PureComponent} from 'react'
import {SafeAreaView, View, Alert,ScrollView, TouchableOpacity, PermissionsAndroid, Platform,Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal'
import {Storage} from '@psyrenpark/storage'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import {logout} from '../../../common/aws-auth'
import {actionLogout} from '../../../redux/actions'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import MoreLoading from '../../common/MoreLoading';
const profileImg = require('../../../images/navi/profile_1.png')
const cameraImg = require('../../../images/navi/camera_1.png')
const DEFAULT_PROFILE_IMAGE =  require('../../../images/navi/default_profile.png')

class AccountSettingScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      isvisible: false,
      moreLoading : false,
      img: '',
      isNewImage : false,
      newimageUrl : null,
      image : {},
      thumbnail_img : '',
      attachFileSize : 0,
      photoarray : null,
    }
  }

  componentDidMount() {
    this.pushOption('계정설정')
  }

  putProfile = async (url, uri) => {
    const {info} = this.props.route.params;
    let sendParams = null;
    if (  mConst.getUserType() === 'B' ) {
      sendParams = {
        user_type :  'B',
        user_nm: info.brand_user_nm,
        post_no: info.post_no,
        adres: info.adres,
        adres_detail: info.adres_detail,
        brand_pos_cd: info.user_position_id,
        phone_no: info.phone_no,
        team_user_id: info.teammate_id,
        img_url_adres: `public/${url}`,
      }
    }else{
      sendParams = {
        user_type :  'M',
        user_nm: info.mgzn_user_nm,
        post_no: info.post_no,
        adres: info.adres,
        brand_pos_cd: info.user_position_id,
        phone_no: info.phone_no,
        team_user_id: info.teammate_id,
        img_url_adres: `public/${url}`,
      }

    }

    try {
      const response = await API.putProfile(sendParams)
      mUtils.fn_call_toast('정상적으로 수정되었습니다..');
      this.setState({moreLoading:false})
    } catch (error) {
      this.setState({moreLoading: false})
      mUtils.fn_call_toast('에러가 발생되어 등록에 실패하였습니다.');
    }
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
        //console.log('Camera permission denied')
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
            //console.log('camera', response)
            this.putImageFunction(response)
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
            //console.log('gallery', response)
            this.putImageFunction(response)
          }
        )
    }
  }

  putImageFunction = async image => {
    this.setState({moreLoading: true})
    const fileType = await mUtils.getExtensionOfFilename(image.uri);
    const response = await fetch(image.uri);
    const file = await response.blob();
    //console.log('>>>>>>', file)
    const date = new Date()
    try {
      var data = await Storage.put(
        {
          key: mConst.getUserType() === 'B' ? `profile/brand/${date.getTime()}` + fileType : `profile/magazine/${date.getTime()}` + fileType,
          object: file,
          config: {
            contentType: 'image',
            level: 'public',
          },
        }
        //loadingFunction
      )
      //console.log(data.key)
      this.putProfile(data.key, image.uri)
    } catch (error) {
      mUtils.fn_call_toast('에러가 발생되어 등록에 실패하였습니다.');
      this.setState({moreLoading: false})
      console.log('putImageFunction>>>', error)
    }
  }

  close = () => {
    this.setState({isvisible: false})
  }

  handleLogout = callOnce(() => {
    const {logoutSuccess, logoutFailure} = this.props
    logout({
      cbSuccess: async response => {
        logoutSuccess(response)
        //console.log('###로그아웃 성공:', response)
      },
      cbFailure: async e => {
        logoutFailure(e)
        //console.log('###로그아웃 실패', e)
      },
    })
  })

  setupUpdateData = async() => {

    Alert.alert(
      mConst.appName,
      '정보를 수정하시겠습니까?',
      [
        {text: '네', onPress: () => this.putImageFunction(this.state.photoarray)},
        {text: '아니오', onPress: () => console.log('no')},
      ],
      {cancelable: false},
    );
}

  changeProfile = async(cropit, circular = false, mediaType = 'photo') => {
        
    ImagePicker.openPicker({
        width: 900,
        height: 900,
        multiple:false,
        cropping: true,
        cropperCircleOverlay: circular,
        sortOrder: 'none',
        compressImageMaxWidth: 1000,
        compressImageMaxHeight: 1000,
        compressImageQuality: 1,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        cropperStatusBarColor: 'white',
        cropperToolbarColor: 'white',
        cropperActiveWidgetColor: 'white',
        cropperToolbarWidgetColor: '#3498DB',
        loadingLabelText:'처리중...',
        forceJpg:true
    })
      .then((response) => {
            try {
                if( response.mime.indexOf('image') != -1) {
                    if (response.path) {
                        //console.log('response.uri', response)
                        if ( parseInt((response.size)/1024/1024) > 6 ) {
                            mUtils.fn_call_toast('이미지는 5mb이하로 올려주세요')
                            return;
                        }else{                          
                            this.setState({
                                isNewImage : true,
                                thumbnail_img : response.path,
                                attachFileSize :  response.size,
                                photoarray : {
                                    type : response.mime === undefined ? 'jpg' :  response.mime,
                                    uri : response.path, 
                                    height:response.height,
                                    width:response.width,
                                    fileSize:response.size,
                                    fileName:response.filename
                                }
                            })
                        }
                    }
                }else{
                    mUtils.fn_call_toast('정상적인 이미지 파일이 아닙니다.')
                    return;
                }
            }catch(e){
                //console.log("eerorr ", e) ;
                mUtils.fn_call_toast('오류가 발생하였습니다. 다시 시도해주세요')
                return;
            }
        })
       
      .catch((e) => {
        //console.log(e);
        mUtils.fn_call_toast('이미지 선택을 취소하였습니다.')
        //Alert.alert(e.message ? e.message : e);
      });
  }

  renderProfileImage = (info) => {
    if ( !mUtils.isEmpty(this.state.thumbnail_img) && this.state.isNewImage) {
      return (
          <Image
              source={{uri:this.state.thumbnail_img}}
              resizeMode={"cover"}
              style={[styles.profileImg,{borderRadius:45}]}
          />
      )
    }else if ( !mUtils.isEmpty(info.img_full_path)) {
      return (
        <FastImage resizeMode={'contain'} style={styles.profileImg} source={{uri: info.img_full_path}} />
      )    
    }else {
      return (
        <Image source={DEFAULT_PROFILE_IMAGE} resizeMode={'contain'} style={styles.profileImg} />
      )
    }   
  }

  render() {
    const {isvisible, img} = this.state
    const {info} = this.props.route.params
    console.log('info', info, mConst.getUserType())
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity
              style={styles.img}
              onPress={() => {
                //this.setState({isvisible: true})
                this.changeProfile()
              }}
            >
              
              {this.renderProfileImage(info)}
              <FastImage resizeMode={'contain'} style={styles.cameraImg} source={cameraImg} />
            </TouchableOpacity>
            <View style={styles.top}>
              <Text style={styles.title}>이름</Text>
              <View style={styles.box}>
                <Text style={styles.desc}>{ mConst.getUserType() === 'B' ? info.brand_user_nm : info.mgzn_user_nm}</Text>
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
            <Text style={{...styles.alert}}>
              * 프로필 이미지 수정 가능합니다.{"\n"}
              * 그 외 프로필수정은 PC에서만 가능합니다.
            </Text>            
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
          {this.state.isNewImage &&
          <TouchableOpacity style={styles.bottomButtonWarp}>
              <TouchableOpacity 
                  onPress={()=>this.setupUpdateData()}
                  style={styles.buttonWrapOn }
              >
                  <Text style={{fontSize:17,color:'#fff'}}>프로필 변경하기</Text>
              </TouchableOpacity>
          </TouchableOpacity>     
          }
          { this.state.moreLoading &&
              <MoreLoading />
          }
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
