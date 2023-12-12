import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity, Linking, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import _ from 'lodash';

import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import API from '../../../common/aws-api';
import Text from '../../common/Text';
import LinkSheetUnit from '../../common/LinkSheetUnit';
import LinkSheetBrandUnit from '../../common/LinkSheetBrandUnit';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';;
import styles from './styles';
import { utils } from '@react-native-firebase/app';

const goLeftImage = require('../../../images/navi/go_left.png');
const goRightImage = require('../../../images/navi/go_right.png');

class SendOutScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      listIndex: 0,
      checked: false,
      allChecked: false,
      data: {},
      leftData: {},
      checkedList: [],
      selectEachList : [],
      targetSampleList : [],
      isMagazineTarget : [],
      reqMessage : [],
      isvisible: {open: false, phone: '', name: '', address : ''},
      loading: true,
      moreLoading : false,
      setchangeSendoutDate : null,
    }
  }
  
  async UNSAFE_componentWillMount () {
    const {reqNo, selectEachList = []} = this.params;
    if (reqNo) {
      this.modalOption('Send Out', false)
    } else {
      this.pushOption('발송 시트', false)
    }
    if ( selectEachList.length > 0 )  {      
      this.setState({selectEachList:selectEachList})
      this.handleLoadDataArray(selectEachList[0],0);
      
    }else{
      this.handleLoadData(0)
    }
  }

  componentDidMount() {    
  }
  moveLeft = () => {
    const {listIndex} = this.state
    if (listIndex > 0) {
      if ( this.state.selectEachList.length > 0  ) {
        this.setState({moreLoading:true})
        this.handleLoadDataArray(this.state.selectEachList[listIndex-1],listIndex-1);
      }else{
        this.handleLoadData(listIndex - 1)
      }
    }
  }
  moveRight = () => {    
    const {listIndex,selectEachList} = this.state;        
    if (listIndex < (this.state.selectEachList.length)-1) {
      if ( this.state.selectEachList.length > 0  ) {
        this.setState({moreLoading:true})
        this.handleLoadDataArray(this.state.selectEachList[listIndex+1],listIndex+1);
      }else{
        this.handleLoadData(listIndex + 1);
      }
      
    }
  }

  handleLoadDataArray = async(item,nextIndex) => {  
    console.log('센드아웃 스케쥴 상세 조회', item.date,item.showroom_list,item.req_no_list)    
    try {
      const response = await API.getSendoutArrayDetail(item.date,item.showroom_list,item.req_no_list);
      const dataTmp = await _.get(response, 'right');
      const leftDataTmp = await _.get(response, 'left');
      await this.allSendOutCheck(dataTmp);
      this.setState({data: dataTmp[0],leftData : leftDataTmp, listIndex : nextIndex,reqMessage:response.req_message})
      
    } catch (error) {      
      console.log('센드아웃 스케쥴 상세 조회 실패', error)
    }
  }

  handleLoadData = async listIndex => {
    const {selectEachList, reqNo,showroom_no} = this.params
    const pReqNo = reqNo || _.get(selectEachList, `[${listIndex}].req_no`)
    try {
      const response = await API.getSendoutDetail(pReqNo,showroom_no)
      this.setState({data: _.get(response, 'right'), listIndex})
      await this.allSendOutCheck(_.get(response, 'right'))
    } catch (error) {
      // this.setState({loading: false})
      console.log('Send Out 스케쥴 상세 조회 실패33', error)
    }
  }
  
  allSendOutCheck = async(data) => {
    let AllData = 0;
    let sendOutData = 0;
    let targetList = [];
    let changeSendoutDate = null;
    let targetSampleList = [];
    let isMagazineTarget = [];
    if ( data.length === undefined ) {
      targetList = data.showroom_list;
    }else{
      targetList = data[0].showroom_list;
    }
    const loaning_date = mUtils.get(data.length === undefined ? data :data[0], 'loaning_date');
    await targetList.forEach(function(element,index){     
      
      if ( element.sample_list != null ) {
        element.sample_list.forEach(function(element2,index2){            

          if ( element2.sample_no ) {      
            AllData++;
            if ( element2.sendout_yn  ) {
              sendOutData++;
            }else{
              targetSampleList.push(element2.sample_no);
            }
          }
          if ( element2.send_user_info[0].sendout_userid_type === 'RUS001') {
            isMagazineTarget.push(element2.sample_no);
          }
          if (element2.sendout_dt != null &&  mUtils.dateToDate(element2.sendout_dt) != mUtils.convertUnixToDate(loaning_date) ) {
            changeSendoutDate = mUtils.convertDateToUnix(element2.sendout_dt);
          }
        })
      }
    }); 
    
    this.setState({
      allChecked : AllData === sendOutData ? true :false,
      isMagazineTarget,
      targetSampleList,
      loading: false,
      moreLoading: false,
      setchangeSendoutDate : changeSendoutDate,
    })
  }
  handlePressPhone = (name, phone, address) => {
    this.setState({isvisible: {open: true, name, phone, address}});
  }

  actionHandleCheckItem = async(item,len,name,sampleNo,sampleName,roomName) => {
    const {data,selectEachList} = this.state;    
    try {
      const response = await API.pushSendoutOne(data.req_no, len, sampleNo);        
      if ( response.success ) {
          this.alert('발송완료', `${name}님께 ${roomName}${mConst.lf}${sampleName} 발송 완료하였습니다.`, [
          {
            onPress: async() => {     
              if ( selectEachList.length > 0  ) {
                this.setState({moreLoading:true})
                await this.handleLoadDataArray(selectEachList[0],0);
              }else{
                this.setState({moreLoading:true})
                await this.handleLoadData(0);
              }    
              setTimeout(async() => {
                await this.allSendOutCheck(this.state.data);
              }, 200)
              this.setState(prevstate => ({checkedList: prevstate.checkedList.concat(sampleNo)}))
            },
          },
        ])
      }else{
        mUtils.fn_call_toast('처리중 에러가 발생하였습니다.');  
      }
    } catch (error) {
      console.log('처리중 에러', error)
      mUtils.fn_call_toast('처리중 에러가 발생하였습니다.');
    }    
  }
  handleCheckItem = async(item,roomName,name) => {    
    const sampleNo = item.sample_no;
    const sampleName = item.category;    
    if (!this.state.checkedList.includes(sampleNo)) {
      Alert.alert(
        mConst.appName,
        sampleName + '을(를) 발송처리하시겠습니까?',
        [
          {text: '네', onPress: () => this.actionHandleCheckItem(item,1,name,sampleNo,sampleName,roomName)},
          {text: '아니오', onPress: () => console.log('no')},
        ],
        {cancelable: false},
      );
    } 
  }
  handleCheckItemAll = () => {
    const {data,targetSampleList} = this.state;
    const sendPush = async () => {
      try {
        const response = await API.pushSendout(_.get(data, 'req_no'),targetSampleList.length,targetSampleList)
        this.setState({allChecked: true})
        mUtils.fn_call_toast('정상적으로 처리되었습니다.')
      } catch (error) {
        //console.log('전체 발송 실패', error)
        mUtils.fn_call_toast('처리중 에러가 발생하였습니다.')
      }
    }
    if (!this.state.allChecked) {
      this.alert('전체 상품 발송 확인', '전체 상품을 발송 하셨습니까?', [{onPress: sendPush}, {}])
    }
  }
  render() {
    const {reqNo} = this.params;
    const {data, leftData, checkedList, allChecked,isMagazineTarget, loading,reqMessage} = this.state;
 
    const srcReturning_date = mUtils.get(data, 'returning_date');
    const returning_date = mUtils.getShowDate(srcReturning_date);
    const srcLoaning_date = mUtils.get(data, 'loaning_date');
  
    const srcTitledate = mUtils.get(leftData, 'date');
    const titledate = mUtils.getShowDate(srcTitledate);

    const fromName = mUtils.get(data, 'from_user_nm');
    const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'from_user_phone'));
    const toName = mUtils.get(data, 'to_user_nm');
    const toPhone = mUtils.phoneFormat(mUtils.get(data, 'to_user_phone'));
    if (loading) return <Loading />;

   
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{paddingVertical: 10}}>
          <View style={_.isEmpty(reqNo) ? styles.titleWrapper : styles.titleCenterWrapper}>
            {_.isEmpty(reqNo) && (
              <TouchableOpacity onPress={this.moveLeft}>
                <FastImage source={goLeftImage} style={styles.goImage} />
              </TouchableOpacity>
            )}
            <View style={styles.titleSubWrapper}>
              <Text style={styles.titleSubText}>                
                {this.props.user.userType === 'B' ? titledate : returning_date}
              </Text>
            </View>
            {_.isEmpty(reqNo) && (
              <TouchableOpacity onPress={this.moveRight}>
                <FastImage source={goRightImage} style={styles.goImage} />
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>Sheet No</Text>
            <Text style={styles.middleDescText}>
              {data.req_no}
            </Text>
          </View> */}
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>회사명</Text>
            <Text style={styles.middleDescText}>
              {mUtils.isEmpty(data.mgzn_nm) ? mUtils.get(data, 'stylist_compy_nm', '-') : mUtils.get(data, 'mgzn_nm', '-')}
            </Text>
          </View>
          <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper()}>
              <Text style={styles.middleText}>담당 기자/스타일리스트</Text>
              <View style={styles.middleDescWrapper}>
                <Text style={styles.middleDescTextBold}>{toName}</Text>
              </View>
            </View>
            <View style={styles.middleSubWrapper()}>
              <Text style={styles.middleText}>어시스턴트</Text>
              <View style={styles.middleDescWrapper}>
                <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'contact_user_nm', '-')}</Text>
                <Text style={styles.middleDescText}> {mUtils.phoneFormat(mUtils.get(data, 'contact_user_phone'))}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper(2)}>
              <Text style={styles.middleText}>픽업일</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'loaning_date'))}</Text>
            </View>
            
            { !mUtils.isEmpty(this.state.setchangeSendoutDate) ?
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleDescRedText}>
                  {mUtils.getShowDate(this.state.setchangeSendoutDate)} *일부픽업일이 변경되었습니다.
                </Text> 
                             
              </View>
              :
              <View style={styles.middleSubWrapper(2)}>
                </View>
            }
          </View>
           <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>촬영일</Text>
                <Text style={styles.middleDescText}>
                  {mUtils.getShowDate(_.get(data, 'shooting_date'))}
                  {_.get(data, 'shooting_date') != _.get(data, 'shooting_end_date') && "~"+mUtils.getShowDate(_.get(data, 'shooting_end_date'))}
                </Text>
              </View>
          </View>    
          {/* <View style={styles.middleGroupWrapper}>
          
            <View style={styles.middleSubWrapper(2)}>
              <Text style={styles.middleText}>촬영일</Text>
              <Text style={styles.middleDescText}>
                {mUtils.getShowDate(_.get(data, 'shooting_date'))}
                {_.get(data, 'shooting_date') != _.get(data, 'shooting_end_date') && "~"+mUtils.getShowDate(_.get(data, 'shooting_end_date'))}
              </Text>
            </View>
            <View style={styles.middleSubWrapper(2)}>
              <Text style={styles.middleText}>반납일</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'returning_date'))}</Text>
            </View>
          </View>    */}      
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>수령 주소</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'studio', '-')}</Text>
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>배송 관련 메모</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'dlvy_atent_matter', '-')}</Text>
          </View>
          <Grid style={styles.grid}>
            <Row>
              <Col style={styles.col()} size={1}></Col>
              <Col style={styles.col()} size={2}></Col>
              <Col style={styles.col()} size={2}></Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>From</Text>
              </Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>Shoot</Text>
              </Col>
            </Row>
            {_.map(mUtils.get(data, 'showroom_list', []), (item, index) => {
              const samples = mUtils.get(item, 'sample_list', [])
              const roomName = mUtils.get(item, 'showroom_nm')
              const roomNo = mUtils.get(item, 'showroom_no')
              const imageUrl = mUtils.get(samples, '[0].image_list[0]')
              const rowSize = _.size(samples);
              if ( rowSize > 0 ) 
              return (
                <Row key={index}>
                  <Col style={styles.col(rowSize * 2, true)} size={1} onPress={() => {this.pushTo('DigitalSRDetailScreen', {no: roomNo, type: 'digital',title : roomName})}}>
                    <Text style={styles.sText()}>{roomName}</Text>
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={2}>
                    {_.map(samples, (subItem, subIndex) => {
                      return (
                        <React.Fragment key={subIndex}>
                          <Row style={styles.row()}>
                            <Text style={styles.sText()}>{mUtils.get(subItem, 'category')}</Text>
                          </Row>
                          <Row style={styles.row()}>
                            <Text style={styles.sText(9)}>
                              {mUtils.moneyFormat(mUtils.get(subItem, 'price', 0))}
                              {( mUtils.get(subItem, 'price', 0) > 0 && !data.price_is_real ) &&  '만원대'}
                            </Text>
                          </Row>
                        </React.Fragment>
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2, true)} size={2} onPress={() => {this.pushTo('DigitalSRDetailScreen', {no: roomNo, type: 'digital',title : roomName})}}>
                    <FastImage source={{uri: imageUrl}} style={styles.modelImage} />
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      //console.log('subItem',subItem)
                      const newfromName = subItem?.send_user_info[0].user_nm;
                      const newfromPhone = mUtils.phoneFormat(subItem?.send_user_info[0].phone_no);
                      const newfromAddress = null;
                        return (
                          <LinkSheetBrandUnit
                            key={`${subItem.sample_no}${subIndex}`}                            
                            checked={checkedList.includes(subItem.sample_no) || subItem.sendout_yn || allChecked }                            
                            name={fromName}
                            phone={fromPhone}
                            unitType={'from'}
                            viewType={'sendout'}
                            loaningDate={srcLoaning_date}
                            subData={subItem}
                            sendUser={subItem?.send_user_info[0]}
                            returnUser={subItem?.use_user_info[0]}
                            onPress={() => null}
                            onPressPhone={() => this.handlePressPhone(newfromName, newfromPhone,newfromAddress)}
                            onSwipeCheck={() => this.handleCheckItem(subItem,roomName,newfromName)}
                            color={'#e1c668'}
                            isMagazineTarget={isMagazineTarget.includes(subItem.sample_no)}
                            phoneinfo={item}
                          />
                        )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                        const newtoName = subItem?.use_user_info[0].user_nm;
                        const newtoPhone = mUtils.phoneFormat(subItem?.use_user_info[0].phone_no);
                        const newfromAddress = subItem?.use_user_info[0].dlvy_adress;
                        return (
                          <LinkSheetBrandUnit
                            key={`${subItem.sample_no}${subIndex}`}
                            //readOnly={mConst.getUserType() === 'B'}
                            checked={checkedList.includes(subItem.sample_no) || subItem.pickup_yn || allChecked }
                            name={toName}
                            phone={toPhone}
                            unitType={'to'}
                            viewType={'sendout'}
                            loaningDate={srcLoaning_date}
                            subData={subItem}
                            sendUser={subItem?.use_user_info[0]}
                            returnUser={subItem?.use_user_info[0]}
                            onPress={() => null}
                            onPressPhone={() => this.handlePressPhone(toName, newtoPhone,newfromAddress)}     
                            onSwipeCheck={() => null}
                            //onSwipeCheck={() => this.handleCheckItem(subItem,roomName,newtoName)}
                            color={'#7ea1b2'}
                            isMagazineTarget={isMagazineTarget.includes(subItem.sample_no)}
                            phoneinfo={item}
                          />
                        )                      
                    })}
                  </Col>
                </Row>
              )
            })}
          
            <Row style={{padding:5}}>
              <Text style={styles.sText(12)}>{data?.send_out_notice}</Text>
            </Row>
            {reqMessage.length > 0 && (
            <TouchableOpacity 
              onPress={() => {
                this.pushTo('SampleRequestsDetailScreen', {no: reqMessage[0].req_no})
              }}
              style={{paddingHorizontal: mUtils.wScale(10)}} pointerEvents={'none'}
            >
              <Text style={{...styles.subTitle,marginBottom:5}}>요청 이력</Text>
            </TouchableOpacity>
            )}
            <View style={{paddingHorizontal: mUtils.wScale(10)}} pointerEvents={'none'}>
              { reqMessage.length > 0 && (<View><Text style={{...styles.subTitle,marginBottom:5}}>알림 메시지 이력</Text></View>)}
              { reqMessage.length > 0 && (
                reqMessage.map((d, i) => (
                  <View key={`${d}_${i}`}>
                    <Text style={styles.sText(12)}>{mUtils.dateToDateTime(d.req_hist_dt)} 발신자:{d.send_man_user_type == 'brand' ? d.send_brand_user : d.send_magazine_user} {d.notifi_subj} {d.notifi_cntent}</Text>
                  </View>
                ))
              ) }
            </View>
          </Grid>
        </ScrollView>
        {
          allChecked ?
          <View style={styles.bottom2}>
            <Text style={styles.bottomText}>전체 발송 완료(처리완료)</Text>
          </View>
          :
          this.state.isMagazineTarget.length == 0 ?
          <TouchableOpacity onPress={this.handleCheckItemAll} style={styles.bottom}>
            <Text style={styles.bottomText}>전체 발송 완료 버튼</Text>
            <Text style={styles.sbottomText}>*피스별 발송 완료는 본인 이름 우측에서 좌측으로 스와이프 후 나타나는 체크버튼 클릭 </Text>
          </TouchableOpacity>
          :null
        }
        <Modal style={styles.modal} isVisible={this.state.isvisible.open} useNativeDriver={true}>
          <View style={styles.modalView}>
            <Text style={styles.modalName}>{this.state.isvisible.name}</Text>
            <Text style={styles.modalAddress}>{this.state.isvisible.address}</Text>
            <Text style={styles.modalPhone}>{this.state.isvisible.phone}</Text>
          </View>
          <View style={styles.layout}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                this.setState({isvisible: {open: false, phone: '', name: ''}})
              }}
            >
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={async () => {
                Linking.openURL(`tel:${this.state.isvisible.phone}`)
              }}
            >
              <Text style={styles.modalText}>Call</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        { this.state.moreLoading &&
            <MoreLoading />
        }
      </SafeAreaView>
    )
  }
}


export default connect(
  state => ({
      user: state.user,
  }),
  dispatch => ({
      logout: (data, rest) => dispatch(actionLogout.success(data, rest)),
      setAlarm: data => dispatch(actionSetAlarm(data)),
  })
)(SendOutScreen)
