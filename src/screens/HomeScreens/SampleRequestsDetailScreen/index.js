import React, {PureComponent} from 'react';
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, TextInput, Alert} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ModalDropdown from 'react-native-modal-dropdown';
import _ from 'lodash';
import dayjs from 'dayjs';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';

const modelImg = require('../../../images/sample/model_1.png');
const moreImg = require('../../../images/navi/more_2.png');
const starImg = require('../../../images/navi/star_1.png');
const checkImg = require('../../../images/navi/check_1.png');
const noCheckImg = require('../../../images/navi/no_check_1.png');
const plusImg = require('../../../images/navi/plus_2.png');
const minusImg = require('../../../images/navi/minus_1.png');
const checkImg2 = require('../../../images/navi/check_2.png');
const checkImg3 = require('../../../images/navi/check_3.png');
const selectImg2 = require('../../../images/navi/select_2.png');
const delImg = require('../../../images/navi/del_1.png');
const yesNo = [{boolean: true, text: 'Yes'},{boolean: false, text: 'No'},];
const newCheckImg = require('../../../images/common/checkblue.png')
const noCheckImg2 = require('../../../images/navi/red.png');
const newCheckImg2 = require('../../../images/navi/xred.png');
const time = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
const todayTimeStamp = mUtils.getToday();
const reqStatusEditList = ["RS0000","RS0001","RS0002"];
class SampleRequestsDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      select: [],
      selected: [],
      defaultInfo: '',
      selectContact: '',
      selectContact1: '',
      shDate: '',
      pkDate: '',
      rtDate: '',
      startTime: '',
      endTime: '',
      destination: '',
      shippingNote: '',
      concept: '',
      celebrity: [''],
      fashionModel: [''],
      payPictorialDesc: '',
      is_media : true,
      media_nm : '',
      nonmedia_content : '',
      nonmedia_release : '',
      release_dt : '',
      release_end_dt: '',
      with_brand_list : '',
      with_brand_direct : '',
      with_wait_brand_list: '',
      with_wait_brand_direct: '',
      locateShoot: '',
      todayConnect: 'No',
      numberPage: '',
      togetherBrand: '',
      message: '',
      drop: false,
      drop1: false,
      drop2: false,
      acceptCount : 0
    }
  }

  setConfirmCount = async(data) => {
    //console.log('response.showroom_list>>>', data.showroom_list)
    let acceptCount = 0;
    
    await data.showroom_list.forEach((d, i) => {          
      if (d.showroom_status === 'selected') acceptCount++;
    });
    
    this.setState({        
      acceptCount
    })
  }

  getSampleRequests = async (req_no = null) => {
    const {no} = this.props.route.params || req_no;
    try {
      const response = await API.getSampleRequests({
        req_no: no,
      })
      if (response.success) {
        this.setConfirmCount(response);
        console.log("response",response.showroom_list)
        this.setState({
          data: response,
          req_no : no
        })
      }
    } catch (error) {
      console.log('getSampleRequests>>> weee', error)
    }
  }

  componentDidMount() {
    this.pushOption(mConst.getUserType() === 'B' ? 'Request Detail' : 'My Request Detail')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getSampleRequests()
  }

  handleOnDelete = async() => {
    try {
      const response = await API.deleteMyRequests({
        req_no: [this.state.req_no],
      })
      //console.log('deleteMyRequests>>>>', response)
      setTimeout(() => {
        this.alert('홀딩 요청 삭제 완료', '홀딩 요청이 삭제되었습니다.', [
          {
            onPress: () => this.goBack()//this.getSampleRequests(this.state.req_no)
          },
        ])
      }, 100)
    } catch (error) {
      //console.log('deleteMyRequests>>>', error)
    }
  }

  handleCopyRequest = async() => {
    /* if ( mUtils.convertDateToUnix(this.state.data.shooting_date)*1000 < Math.floor(new Date()/1000)  ) {
      this.alert('촬영일이후부터 조회가 가능합니다.');
      return;
    } */
    try {
      const response = await API.postSRCopyRequestSend({
        req_no :  this.state.req_no,
        brand_id:  this.state.data.brand_id,
        photogrf_dt: this.state.data.shooting_date,
        photogrf_end_dt: this.state.data.shooting_end_date,
        showroom_list: this.state.data.showroom_list,
        req_user_id: this.state.data.req_user_id,
       })
      //console.log('postSRRequestSend>>>>', response)
      if (response.success) {
        mUtils.fn_call_toast('정상적으로 신청되었습니다.');
          setTimeout(() => {
            this.goBack()
          }, 1500);
      }
    } catch (error) {
      console.log('postSRRequestSend>>>>', error)
    }
  }

  handleOnCancle = async() => {
    try {
      const response = await API.cancleMyRequests({
        req_no: [this.state.req_no],
      })
      //console.log('deleteMyRequests>>>>', response)
      setTimeout(() => {
        this.alert('홀딩 요청 취소 완료', '홀딩 요청이 취소되었습니다.', [
          {
            onPress: () => this.getSampleRequests(this.state.req_no)
          },
        ])
      }, 100)
    } catch (error) {
      //console.log('deleteMyRequests>>>', error)
    }
  }

  selected = item => {
    const {select} = this.state;
    if(select.includes(item)) {
      this.setState(state => {
        const list = state.select.filter((e, j) => select.indexOf(item) !== j)
        return {select: list}
      })
    }else{
      this.setState({select: select.concat(item)})
    }
  }

  handleCopyBtn = async() => {    
    this.alert('홀딩요청 복사', '홀딩요청을 복사하시겠습니까?\n신청대기로 생성됩니다.', [
      {
        onPress: () => {
          this.actionCopy(this.state.data)
        },
      },
      {onPress: () => null},
      ])

  };

  actionCopy = async(value) => {
    
    let newShowroomList = [];
    await value.showroom_list.forEach((d, i) => {
      newShowroomList.push(d.showroom_no)
    });   
    try {
      const response = await API.postSRRequestSend({
        brand_id: value.brand_id,
        duty_recpt_dt: value.pickup_date,
        photogrf_dt: value.shooting_date,
        photogrf_end_dt: value.shooting_end_date,
        release_dt : value.release_dt,
        release_end_dt : value.release_end_dt,
        begin_dt: value.shooting_start_time,
        end_dt: value.shooting_end_time,
        return_prearnge_dt: value.returning_date,
        photogrf_concept: value.photogrf_concept,
        model_list: value.model_list,
        item_model_list: value.item_model_list,
        celeb_list: value.celeb_list,
        own_paid_pictorial_content: value.own_paid_pictorial_content,
        other_paid_pictorial_content: value.other_paid_pictorial_content,
        page_cnt: value.page_cnt,
        etc_brand: value.etc_brand_info,
        today_connect: value.today_connect,
        add_req_cntent: value.message,
        dlvy_adres_no : value.dlvy_adres_no,    
        dlvy_adres_nm: value.dlvy_adres_nm,
        adres_detail: value.adres_detail,
        dlvy_atent_matter: value.dlvy_atent_matter,
        showroom_list: newShowroomList,
        contact_user_id: value.contact_user_id,
        req_user_id: value.req_user_id,
        loc_yn: value.loc_yn,
        loc_value: value.loc_value,
        picalbm_chk:value.picalbm_chk,
        is_media:value.is_media,
        media_nm:value.media_nm,
        nonmedia_content:value.nonmedia_content,
        nonmedia_release:value.nonmedia_release,
        with_brand_list : value.with_brand_list,
        with_brand_direct :value.with_brand_direct,
        with_wait_brand_list :value.with_wait_brand_list,
        with_wait_brand_direct:value.with_wait_brand_direct,
        is_copy : true
      })
      if (response.success) {
        mUtils.fn_call_toast('정상적으로 등록되었습니다.');
        setTimeout(() => {
          this.goBack()
        }, 1500);
      }
    } catch (error) {
      console.log('getSampleRequests>>>', error)
    }
  }

  
  render() {
    const {
      data,
      selected,
      defaultInfo,
      selectContact,
      shDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      destination,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      payPictorialDesc,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      is_media,
      media_nm,
      nonmedia_content,
      nonmedia_release,
      drop,
      drop1,
      drop2,
      release_dt ,
      release_end_dt,
      with_brand_list ,
      with_brand_direct ,
      with_wait_brand_list,
      with_wait_brand_direct,
      acceptCount
    } = this.state;

   
    return data ? (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>
              {mConst.getUserType() !== 'B' && "My " }
            <Text style={styles.mainTitle1}>Request Detail</Text></Text>
            {
            ( ( data.shooting_date > todayTimeStamp && reqStatusEditList.includes(data.req_status_cd) ) || data.req_status_nm == 'tempsave' ) &&  mConst.getUserType() != 'B' && 
            <View style={{position:'absolute',right:20,top:mUtils.wScale(25),width:60,height:25}}>
              <TouchableOpacity
                style={{...styles.selectBox, backgroundColor: mConst.bgBlue,width:60,height:25,justifyContent:'center'}}
                onPress={() => this.pushTo('SampleRequestsScreen', {type: false, brandId: data.brand_id, no: this.state.req_no, brandName: data.brand_nm})}
              >
                <Text style={{...styles.selectText, color: mConst.white}}>수정</Text>
              </TouchableOpacity>
            </View>
            }
            { 
              mConst.getUserType() !== 'B' && data.brand_logo_url_adres !== null ? (
              <View style={{height:mUtils.wScale(25),justifyContent:'flex-start',alignItems:'flex-start',marginTop:20,}}>
                <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: data.brand_logo_url_adres}} />
              </View>
              )
              :
              mConst.getUserType() == 'B' && data.mgzn_logo_url_adres !== null ? (
                <View style={{height:mUtils.wScale(25),justifyContent:'flex-start',alignItems:'flex-start',marginTop:20,}}>
                    <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: data.mgzn_logo_url_adres}} />
                </View>
              )
              :
              null
            }
            {!mUtils.isEmpty(data.canc_dt) && 
            <View style={{marginTop:5,}}>
              <Text style={{...styles.subTitle2}}>
                {mConst.getUserType() == 'B' ? '홀딩 요청 취소된 문서입니다.' :' 홀딩 요청 취소하신 문서입니다.'}{"\r"}
                (취소일자 : {dayjs(data.canc_dt).format("YYYY-MM-DD")})
              </Text>
            </View>
            }
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',height:30}}>
              <Text style={{...styles.subTitle}}>
                Request product : <Text style={{color: '#7ea1b2'}}>{data.showroom_list.length} {/* 승인 : {acceptCount} */}</Text>
              </Text>
              { 
              ( data.req_status_cd != 'RS0000' && data.req_status_cd != 'RS0001' && data.req_status_cd != 'RS0002' ) &&
              <TouchableOpacity
                style={{...styles.selectBox, backgroundColor: mConst.bgBlue,width:60,height:20}}
                onPress={() => this.handleCopyBtn()}
              >
                <Text style={{...styles.selectText, color: mConst.white}}>복사</Text>
              </TouchableOpacity>
              }
            </View>
            
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: mUtils.wScale(20), marginTop: mUtils.wScale(16)}}
            contentContainerStyle={{paddingRight: mUtils.wScale(20)}}
          >
            {data.showroom_list.map((item, index) => {
              return (
                <View key={index} style={{marginRight: mUtils.wScale(5), alignItems: 'center', width:mUtils.wScale(160)}}>
                  <View>
                    <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
                    {
                      item.showroom_status === 'selected' ?
                      <View style={{...styles.select2, borderColor: '#558197',borderWidth:5, maxWidth:mUtils.wScale(200)}}>
                        <FastImage resizeMode={'contain'} style={styles.selectImg} source={newCheckImg} />
                      </View> 
                      :
                      item.showroom_status === 'rejected' ?
                      <View style={{...styles.select2, borderColor: '#df8484',borderWidth:5, maxWidth:mUtils.wScale(200)}}>
                        <FastImage resizeMode={'contain'} style={styles.selectImg} source={newCheckImg2} />
                      </View> 
                      :
                      <View style={{...styles.select2, borderColor: '#ccc',borderWidth:5, maxWidth:mUtils.wScale(200)}} />
                    }
                  </View>
                  <Text style={{...styles.modelTitle, marginTop: mUtils.wScale(8)}}>
                    {item.showroom_nm}
                  </Text>
                  <Text style={styles.redTitle} numberOfLines={2} ellipsizeMode="tail">
                    {item.new_category_list !== null &&
                      item.new_category_list.map((d,idx) =>  <Text style={styles.redTitle} key={idx}>{idx>0 && ","} {d.category_nm}{!d.is_input && '(미입고)'}</Text>)
                    }
                    {item.all_in_yn && " (ALL IN)"}
                  </Text>
                  { ( item.showroom_status === 'rejected'  && !mUtils.isEmpty(item.replacement_showroom_no) ) &&
                    <View style={styles.replaceWrap}>
                      <TouchableOpacity
                        style={{...styles.selectBox, backgroundColor: mConst.bgBlue}}
                        onPress={() => {this.pushTo('DigitalSRDetailScreen', {no: item.replacement_showroom_no, type: 'digital',title : item.replacement_showroom_nm})}}
                      >
                        <Text style={{...styles.selectText, color: mConst.white}}>대체제안</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{...styles.selectBox, backgroundColor: mConst.bgBlue,marginLeft:1}}
                        onPress={() => {
                          this.pushTo('SampleRequestsScreen', {
                            modelList: this.state.select.concat({...item,showroom_no : item.replacement_showroom_no,showroom_nm:item.replacement_showroom_nm,image_url:item.replacement_image_url}),
                            delSelect: this.selected,
                            brandId: data?.brand_id,
                            type: true,
                            copyData:data,
                            brandName: '',
                          })
                        }}
                      >
                        <Text style={{...styles.selectText, color: mConst.white}}>대체홀딩신청</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              )
            })}
          </ScrollView>
          { data?.req_message?.length > 0 && (
          <View style={styles.emptyBar} />
          )}
          { data?.req_message?.length > 0 && (
          <View style={{paddingHorizontal: mUtils.wScale(20)}} pointerEvents={'none'}>
            <Text style={{...styles.subTitle,marginBottom:5}}>알림 메시지 이력</Text>
            { 
              data?.req_message.map((d, i) => (
                <View key={`${d}_${i}`} style={{backgroundColor : d.send_man_user_type == 'brand' ? "#ffd966" : "#fff"}}>
                  <Text style={{...styles.boxText}}>{mUtils.dateToDateTime(d.req_hist_dt)} 발신자:{d.send_man_user_type == 'brand' ? d.send_brand_user : d.send_magazine_user} {d.notifi_subj} {d.notifi_cntent}</Text>
                </View>
              ))
            }
          </View>
          )}
          <View style={styles.emptyBar} />
          <View style={{paddingHorizontal: mUtils.wScale(20)}} pointerEvents={'none'}>
            <Text style={{...styles.subTitle}}>Request Information{data?.req_message?.length}</Text>
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>회사명</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.mgzn_nm}</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>담당 기자/스타일리스트</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.req_send_username}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.smallTitle}>연결 연락처</Text>
            <View style={{...styles.layout2, justifyContent: 'space-between'}}>
              <ModalDropdown
                style={{width: '49%'}}
                dropdownStyle={{width: '44%'}}
                onSelect={(i, v) => this.setState({selectContact: v})}
                options={mUtils.isEmpty(defaultInfo.contact_info) ?[] :defaultInfo.contact_info}
                renderRow={item => (
                  <View style={styles.contactList}>
                    <Text style={styles.contactText}>{`${item.mgzn_user_nm}(${mUtils.allNumber(item.phone_no)})`}</Text>
                  </View>
                )}
              >
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.contact_username}</Text>
                </View>
              </ModalDropdown>

              <View style={{...styles.box1, width: '49%'}}>
                <Text style={styles.boxText}>{data.contact_phone_no}</Text>
              </View>
            </View>
            <>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>촬영시작일</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop: !drop, drop1: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${mUtils.getShowDate(data.shooting_date, 'MM/DD')}(${mUtils.getShowDate(data.shooting_date, 'ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>촬영종료일</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop: !drop, drop1: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${mUtils.getShowDate(data.shooting_end_date, 'MM/DD')}(${mUtils.getShowDate(data.shooting_end_date, 'ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(10),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>픽업일</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop1: !drop1, drop: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${mUtils.getShowDate(data.pickup_date, 'MM/DD')}(${mUtils.getShowDate(data.pickup_date, 'ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>반납일</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop2: !drop2, drop: false, drop1: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${mUtils.getShowDate(data.returning_date, 'MM/DD')}(${mUtils.getShowDate(data.returning_date, 'ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingBottom: mUtils.wScale(20),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>촬영 시작 시간</Text>
                <View style={styles.box1}>
                  <Text style={styles.contactText}>{data.shooting_start_time}:00</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>촬영 종료 시각</Text>

                <View style={styles.box1}>
                  <Text style={styles.contactText}>{data.shooting_end_time}:00</Text>
                </View>
              </View>
            </View>
            <Text style={styles.smallTitle}>수령 주소</Text>
            <TextInput style={{...styles.inputBox}} value={data.dlvy_adres_nm} />
            <TextInput style={{...styles.inputBox, marginBottom: mUtils.wScale(18)}} value={data.adres_detail} />
            <Text style={styles.smallTitle}>배송 관련 메모</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
              multiline={true}
              textAlignVertical={'top'}
              value={data.dlvy_atent_matter}
              onChangeText={text => {
                this.setState({shippingNote: text})
              }}
            />
            <View style={{...styles.layout, justifyContent: 'space-between', width: '100%',marginTop: mUtils.wScale(20)}}>
              <View style={{...styles.layout1}}>
                
                <Text style={{...styles.smallTitle, marginBottom: 0, marginRight:4}}>매체촬영</Text>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.is_media ? checkImg : noCheckImg} />
                <View style={{marginLeft:10}}></View>
                
                <Text style={{...styles.smallTitle, marginBottom: 0, marginRight:4}}>매체 외 촬영</Text>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={!data.is_media ? checkImg : noCheckImg} />
              </View>
            </View>
            { data.is_media && 
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(5),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '100%'}}>
                <Text style={styles.smallTitle}>매체명</Text>
                <TextInput
                  style={{...styles.inputBox}}
                  placeholder={'회사명과 화보 진행할 매체명이 상이할 경우 기재 부탁드립니다.'}
                  placeholderTextColor={mConst.borderGray}
                  onChangeText={text => {
                    this.setState({media_nm: text})
                  }}
                  value={data.media_nm}
                />
              </View>
            </View>
            }
            { data.is_media && 
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(5),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '100%'}}>
                <Text style={styles.smallTitle}>촬영 컨셉</Text>
                <TextInput
                  style={{...styles.inputBox}}
                  placeholder={'컨셉'}
                  placeholderTextColor={mConst.borderGray}
                  onChangeText={text => {
                    this.setState({concept: text})
                  }}
                  value={data.photogrf_concept}
                />
              </View>
            </View>
            }
            {
              data.is_media && 
              <>
                <Text style={styles.smallTitle}>페이지 수</Text>
                <TextInput
                  style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                  placeholder={'Number of pages'}
                  placeholderTextColor={mConst.borderGray}
                  value={data.page_cnt}
                  onChangeText={text => {
                    this.setState({numberPage: text})
                  }}
                />
              </>
            }
            {
              !data.is_media &&
              <>
                <Text style={styles.smallTitle}>행사/촬영 내용</Text>
                <TextInput
                  style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                  multiline={true}
                  textAlignVertical={'top'}
                  value={data.nonmedia_content}
                  placeholder=""
                  onChangeText={text => {
                    this.setState({nonmedia_content: text})
                  }}
                />
              </>
            }
            {
              !data.is_media &&
              <>
                <Text style={styles.smallTitle}>릴리즈 일정</Text>
                <TextInput
                  style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                  multiline={true}
                  textAlignVertical={'top'}
                  value={data.nonmedia_release}
                  placeholder=""
                  onChangeText={text => {
                    this.setState({nonmedia_release: text})
                  }}
                />
              </>
            }
            {
              !data.is_media &&
              (
                <View style={{width: '100%',marginBottom:20}}>
                  <Text style={styles.smallTitle}>릴리즈 일정(기간)</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                  >
                    <Text style={styles.boxText}>
                      {`${mUtils.getShowDate(data.release_dt, 'MM/DD')}(${mUtils.getShowDate(data.release_dt, 'ddd')})`}
                      { data.release_dt != data.release_end_dt && (
                        `~${mUtils.getShowDate(data.release_end_dt, 'MM/DD')}(${mUtils.getShowDate(data.release_end_dt, 'ddd')})`
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
            <Text style={styles.smallTitle}>모델</Text>
            <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
              <View style={{...styles.layout1}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.celeb_list.length > 0 ? checkImg : noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0}}>셀러브리티</Text>
              </View>
              <View style={{width: '65%'}}>
                {data.celeb_list.map((item, index) => {
                  return (
                    <View key={index} style={{...styles.box2}}>
                      <TextInput
                        style={{...styles.inputBox1}}
                        placeholder={'이름'}
                        placeholderTextColor={mConst.borderGray}
                        value={item}
                        onChangeText={text => {
                          let tmp = [...celebrity]
                          tmp[index] = text
                          this.setState({celebrity: tmp})
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                width: '100%',                
                marginBottom: mUtils.wScale(5),
              }}
            >
              <View style={{...styles.layout1}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.model_list.length > 0 ? checkImg : noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0}}>패션 모델</Text>
              </View>
              <View style={{width: '65%'}}>
                {data.model_list.map((item, index) => {
                  return (
                    <View key={index} style={{...styles.box2}}>
                      <TextInput
                        style={{...styles.inputBox1}}
                        placeholder={'이름'}
                        placeholderTextColor={mConst.borderGray}
                        value={item}
                        onChangeText={text => {
                          let tmp = [...fashionModel]
                          tmp[index] = text
                          this.setState({fashionModel: tmp})
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                width: '100%',                
                marginBottom: mUtils.wScale(18),
              }}
            >
              <View style={{...styles.layout1}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.item_model_list.length > 0 ? checkImg : noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0}}>아이템</Text>
              </View>
              <View style={{width: '65%'}}>
                {data.item_model_list.map((item, index) => {
                  return (
                    <View key={index} style={{...styles.box2}}>
                      <TextInput
                        style={{...styles.inputBox1}}
                        placeholder={'이름'}
                        placeholderTextColor={mConst.borderGray}
                        value={item}
                        onChangeText={text => {
                          let tmp = [...fashionModel]
                          tmp[index] = text
                          this.setState({fashionModel: tmp})
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            {/* <Text style={styles.smallTitle}>유가 여부</Text>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage 
                  resizeMode={'contain'} 
                  style={styles.checkImg} 
                  source={ ( data.own_paid_pictorial_content || data.own_paid_pictorial_content ) ? noCheckImg : checkImg} />
                <Text style={styles.text1}>유가없음</Text>
              </View>
            </View> */}
            <Text style={styles.smallTitle}>유가 여부</Text>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage 
                  resizeMode={'contain'} 
                  style={styles.checkImg} 
                  source={ ( data.own_paid_pictorial_content || data.own_paid_pictorial_content ) ? noCheckImg : checkImg} />
                <Text style={styles.text1}>유가없음</Text>
              </View>
            </View>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.own_paid_pictorial_content ? checkImg : noCheckImg} />
                <Text style={styles.text1}>자사유가</Text>
              </View>
              <TextInput
                style={{...styles.inputBox, width: '65%'}}
                placeholderTextColor={mConst.borderGray}
                value={data.own_paid_pictorial_content}
                onChangeText={text => {
                  this.setState({payPictorialDesc: text})
                }}
              />
            </View>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.other_paid_pictorial_content ? checkImg : noCheckImg} />
                <Text style={styles.text1}>타사유가</Text>
              </View>
              <TextInput
                style={{...styles.inputBox, width: '65%'}}
                placeholderTextColor={mConst.borderGray}
                value={data.other_paid_pictorial_content}
                onChangeText={text => {
                  this.setState({payPictorialDesc: text})
                }}
              />
            </View>
            <Text style={styles.smallTitle}>로케촬영/해외일정</Text>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.loc_value ? checkImg : noCheckImg} />
              <TextInput
                style={{...styles.inputBox, width: '95%'}}
                placeholder={'촬영지 입력'}
                placeholderTextColor={mConst.borderGray}
                value={data.loc_value}
                onChangeText={text => {
                  this.setState({locateShoot: text})
                }}
              />
            </View>
            
            <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(8)}}
              placeholder={'추가 설명이 필요시 입력해주세요.'}
              placeholderTextColor={mConst.borderGray}
              value={data.etc_brand_info}
              onChangeText={text => {
                this.setState({togetherBrand: text})
              }}
            />
            <View style={{padding:mUtils.wScale(10)}}>
              <Text style={styles.smallTitle2}>컨펌 <Text style={styles.smallTitle3}>■(선택)</Text>□(직접입력)</Text>
            </View>
            <View style={styles.buttonOuterWrap}>
                {data?.withbrand_text?.length > 0 ?
                  data?.withbrand_text.reverse().map((d,idx3) => (
                    <View key={idx3} style={styles.selectButtonWrap}>
                      <Text style={[styles.smallTitle2,{color:'#fff'}]}>{d}</Text>
                    </View>
                  ))
                  :
                  <View style={styles.nullButtonWrap}>
                    <Text style={styles.smallTitle2}>-</Text>
                  </View>
                }
                { data?.with_brand_direct && (
                  <View style={styles.defaultButtonWrap}>
                    <Text style={styles.smallTitle2}>{data?.with_brand_direct}</Text>
                  </View>
                )}
            </View>
            <View style={{padding:mUtils.wScale(10)}}>
              <Text style={styles.smallTitle2}>회신대기중 <Text style={styles.smallTitle3}>■(선택)</Text>□(직접입력)</Text>
            </View>
            <View style={styles.buttonOuterWrap}>
              {data?.withwaitbrand_text?.length > 0 ?
                data?.withwaitbrand_text.reverse().map((d,idx3) => (
                  <View key={idx3} style={styles.selectButtonWrap}>
                    <Text style={[styles.smallTitle2,{color:'#fff'}]}>{d}</Text>
                  </View>
                ))
                :
                <View style={styles.nullButtonWrap}>
                  <Text style={styles.smallTitle2}>-</Text>
                </View>
              }
              { data?.with_wait_brand_direct && (
                <View style={styles.defaultButtonWrap}>
                  <Text style={styles.smallTitle2}>{data?.with_wait_brand_direct}</Text>
                </View>
              )}
              </View>
            <Text style={styles.smallTitle}>메세지</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(13), marginBottom: mUtils.wScale(18)}}
              multiline={true}
              textAlignVertical={'top'}
              value={data.message}
              placeholder="가입 전인 기자님/ 실장님 촬영의 경우 성함 기재 부탁드립니다."
              onChangeText={text => {
                this.setState({message: text})
              }}
            />
          </View>
          
        </ScrollView>
        {
          ( data.req_status_cd == 'RS0000' )  &&
          (
            <View style={styles.twiceButtonWrap}>
              <TouchableOpacity 
                onPress={() => 
                  this.alert('홀딩 요청', '홀딩 요청하시겠습니까?', [
                  {
                    onPress: () => {
                      this.handleCopyRequest()
                    },
                  },
                  {onPress: () => null},
                  ])
                } 
                style={styles.twiceBottom}
              >
                <Text style={styles.bottomText}>홀딩요청</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => 
                  this.alert('홀딩 요청 삭제', '홀딩 요청을 삭제하시겠습니까?', [
                  {
                    onPress: () => {
                      this.handleOnDelete()
                    },
                  },
                  {onPress: () => null},
                  ])
                } 
                style={[styles.twiceBottom,{backgroundColor:'#7ea1b2'}]}
              >
                <Text style={styles.bottomText}>홀딩요청 삭제</Text>
              </TouchableOpacity>
            </View>
          )
          
        }
        {
           (( data.req_status_cd == 'RS0001' || data.req_status_cd == 'RS0010' ) && mConst.getUserType() != 'B'  ) &&
          <TouchableOpacity 
            onPress={() => 
              this.alert('홀딩 요청 삭제', '홀딩 요청을 삭제하시겠습니까?', [
              {
                onPress: () => {
                  this.handleOnDelete()
                },
              },
              {onPress: () => null},
              ])
            } 
            style={styles.bottom}
          >
            <Text style={styles.bottomText}>홀딩요청 삭제</Text>
          </TouchableOpacity>
        }
        {
          ( data.req_status_cd == 'RS0003' && !data.is_sendout  && dayjs.unix(data.shooting_date).format("YYYY-MM-DD") > dayjs(new Date()).format('YYYY-MM-DD'))  &&
          <TouchableOpacity  
            onPress={() => 
              this.alert('홀딩 요청 취소', '홀딩 요청을 취소하시겠습니까?', [
              {
                onPress: () => {
                  this.handleOnCancle()
                },
              },
              {onPress: () => null},
              ])
          } 
            style={styles.bottom}
          >
            <Text style={styles.bottomText}>홀딩요청 취소</Text>
          </TouchableOpacity>
        }
      </SafeAreaView>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(SampleRequestsDetailScreen)
