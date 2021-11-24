import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity, Linking,Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Modal from 'react-native-modal';
import _ from 'lodash';

import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import API from '../../../common/aws-api';
import Text from '../../common/Text';
import LinkSheetUnit from '../../common/LinkSheetBrandUnit';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';
import styles from './styles';
import { utils } from '@react-native-firebase/app';

const goLeftImage = require('../../../images/navi/go_left.png');
const goRightImage = require('../../../images/navi/go_right.png');

class ReturnScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      listIndex: 0,
      checked: false,
      allChecked: false,
      data: {},
      checkedList: [],
      selectEachList : [],
      targetSampleList : [],
      isvisible: {open: false, phone: '', name: ''},
      loading: true,
      moreLoading : false
    }
  }

  async UNSAFE_componentWillMount() {
    const {reqNo, selectEachList = []} = this.params;
    if (reqNo) {
      this.modalOption('Return', false)
    } else {
      this.pushOption('Return', false)
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
    try {
      const response = await API.getReturnArrayDetail(item.date,item.showroom_list,item.req_no_list);
      const dataTmp = await _.get(response, 'right');
      await this.allSendOutCheck(dataTmp)
      this.setState({data: dataTmp[0], listIndex : nextIndex})
      //console.log('픽업 스케쥴 상세 조회 성공', JSON.stringify(_.get(response, 'right')))
    } catch (error) {      
      this.setState({loading: false})
      console.log('픽업 스케쥴 상세 조회 실패', error)
    }
  }

  handleLoadData = async listIndex => {
    const {selectEachList, reqNo,showroom_no} = this.params
    const pReqNo = reqNo || _.get(selectEachList, `[${listIndex}].req_no`)
    try {
      const response = await API.getReturnDetail(pReqNo,showroom_no)
      this.setState({data: _.get(response, 'right'), listIndex})
      await this.allSendOutCheck(_.get(response, 'right'))
      //console.log('Return 스케쥴 상세 조회 성공', JSON.stringify(response))
    } catch (error) {
      this.setState({loading: false})
      console.log('Return 스케쥴 상세 조회 실패', error)
    }
  }

  handlePressUnPickup = (item,roomName,name) => {
    const {data} = this.state;
    const sampleNo = item.sample_no;    
    const sendPush = async () => {
      try {
        const response = await API.pushReturnOneFail(data.req_no, sampleNo)
        this.alert('미수령 알림 전송 완료', '미수령 알림을 전송하였습니다.')
        //console.log('픽업 단일 미수령 푸시 완료')
      } catch (error) {
        //console.log('픽업 단일 미수령 푸시 실패', error)
      }
    }
    this.alert('상품 미수령 알림', `'${name}'님께 상품미수령 알림을 보내시겠습니까?`, [{onPress: sendPush}, {}])
  }
  /* handlePress = (name, sampleNo) => {
    const {data} = this.state;    
    const sendPush = async () => {
      try {
        const response = await API.pushReturnOneFail(_.get(data, 'req_no'), sampleNo);
        this.alert('미수령 알림 전송 완료', '미수령 알림을 전송하였습니다.');
      } catch (error) {
        
      }
    }
    this.alert('상품 미수령 알림', `'${name}'님께 상품미수령 알림을 보내시겠습니까?`, [{onPress: sendPush}, {}])
  } */
  handlePressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}});
  }

  allSendOutCheck = async(data) => {    
    let AllData = 0;
    let sendOutData = 0;    
    let targetSampleList = [];
    const data2 = data === undefined ? this.state.data : data
    if ( data2.length === undefined ) {
      targetList = data2.showroom_list;
    }else{
      targetList = data2[0].showroom_list;
    }

    await targetList.forEach(function(element,index){     
      if ( element.sample_list != null ) {
        element.sample_list.forEach(function(element2,index2){            
          if ( element2.sample_no ) {
            AllData++;
            if ( element2.returncheck_yn ) {
              sendOutData++;
            }else{
              targetSampleList.push(element2.sample_no);
            }
          }
        })
      }
    }); 
    console.log('targetSampleList',targetSampleList)
    this.setState({
        allChecked : AllData === sendOutData ? true :false,
        loading:false,
        moreLoading:false,
        targetSampleList
      })
  }

  actionHandleCheckItem = async(item,len,name,sampleNo,sampleName,roomName) => {
    const {data,selectEachList} = this.state;
    try { 
      const response = await API.pushReturnOneSuccess(_.get(data, 'req_no'), sampleNo);
      //console.log('response', response)
      if ( response.success ) {
        this.alert('수령완료', `${name}님께 ${sampleName} 수령 완료`, [
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
    //console.log('sampleNo',item.req_no,sampleNo);
    if (!this.state.checkedList.includes(sampleNo)) {
      Alert.alert(
        mConst.appName,
        sampleName + '을(를) 반납완료처리하시겠습니까?',
        [
          {text: '네', onPress: () => this.actionHandleCheckItem(item,1,name,sampleNo,sampleName,roomName)},
          {text: '아니오', onPress: () => console.log('no')},
        ],
        {cancelable: false},
      );
    } 
  }

  handleCheckItemAll = async() => {
    const {data,targetSampleList} = this.state;
    const sendAllPush = async () => {
      try {
        const response = await API.pushReturnSuccess(_.get(data, 'req_no'),targetSampleList);
        this.setState({allChecked: true});
        console.log('전체 수령 푸시 완료22',response);
        mUtils.fn_call_toast('정상적으로 처리되었습니다.');
        //console.log('전체 수령 푸시 완료')
      } catch (error) {
        console.log('전체 수령 푸시 실패', error);
        mUtils.fn_call_toast('처리중 에러가 발생하였습니다.');
      }
    }
    if (!this.state.allChecked) {
      this.alert('전체 상품 반납 확인', '전체 상품을 수령(반납확인)하셨습니까?', [{onPress: sendAllPush}, {}])
    }
  }
  render() {
    const {reqNo} = this.params
    const {data, checkedList, allChecked, loading} = this.state;
    const returningDate = mUtils.getShowDate(mUtils.get(data, 'returning_date'))
    const fromName = mUtils.get(data, 'user_nm')
    const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'from_user_phone'))
    const toName = mUtils.get(data, 'to_user_nm')
    const toPhone = mUtils.phoneFormat(mUtils.get(data, 'to_user_phone'))

    //console.log('datadatadata',data.left)


    if (loading) return <Loading />
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
              <Text style={styles.titleSubText}>{returningDate}</Text>
            </View>
            {_.isEmpty(reqNo) && (
              <TouchableOpacity onPress={this.moveRight}>
                <FastImage source={goRightImage} style={styles.goImage} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>매체명</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'mgzn_nm', '-')}</Text>
          </View>
          <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper()}>
              <Text style={styles.middleText}>담당 기자/스타일리스트</Text>
              <View style={styles.middleDescWrapper}>
                <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'req_user_nm')}</Text>
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
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>픽업일</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'loaning_date'))}</Text>
            </View>
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>촬영일</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'shooting_date'))}</Text>
            </View>
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>반납일</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'returning_date'))}</Text>
            </View>
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>수령 주소</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'studio', '-')}</Text>
          </View>
          <Grid style={styles.grid}>
            <Row>
              <Col style={styles.col()} size={1}></Col>
              <Col style={styles.col()} size={2}></Col>
              <Col style={styles.col()} size={2}></Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>Shoot</Text>
              </Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>To</Text>
              </Col>
            </Row>
            {_.map(mUtils.get(data, 'showroom_list', []), (item, index) => {
              const samples = mUtils.get(item, 'sample_list', [])
              const roomName = mUtils.get(item, 'showroom_nm')
              const imageUrl = mUtils.get(samples, '[0].image_list[0]')
              const rowSize = _.size(samples)
              return (
                <Row key={index}>
                  <Col style={styles.col(rowSize * 2, true)} size={1}>
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
                            <Text style={styles.sText(9)}>{mUtils.moneyFormat(mUtils.get(subItem, 'price', 0))}</Text>
                          </Row>
                        </React.Fragment>
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2, true)} size={2}>
                    <FastImage source={{uri: imageUrl}} style={styles.modelImage} />
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      const newfromName = subItem?.send_user_info[0].user_nm;
                      const newfromPhone = mUtils.phoneFormat(subItem?.send_user_info[0].phone_no);
                      return (
                        <LinkSheetUnit
                          readOnly
                          key={subIndex}
                          name={fromName}
                          phone={fromPhone}
                          unitType={'from'}
                          sendUser={subItem?.use_user_info[0]}
                          returnUser={subItem?.return_user_info[0]}
                          onPressPhone={() => this.handlePressPhone(fromName, fromPhone)}
                          color={mConst.bgBlue}
                        />
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      const newSendName = subItem?.use_user_info[0].user_nm;
                      const newtoName = subItem?.return_user_info[0].user_nm;
                      const newtoPhone = mUtils.phoneFormat(subItem?.return_user_info[0].phone_no);
                      return (
                        <LinkSheetUnit
                          key={`${subItem.sample_no}${subIndex}`}
                          checked={checkedList.includes(subItem.sample_no) || subItem.returncheck_yn || allChecked}
                          name={toName}
                          phone={toPhone}
                          unitType={'to'}
                          sendUser={subItem?.use_user_info[0]}
                          returnUser={subItem?.return_user_info[0]}
                          //onPress={() => this.handlePress(toName, subItem.sample_no)}
                          onPress={() => this.handlePressUnPickup(subItem,roomName,newSendName)}
                          onPressPhone={() => this.handlePressPhone(newtoName, newtoPhone)}                          
                          onSwipeCheck={() => this.handleCheckItem(subItem,roomName,newSendName)}
                          color={mConst.bgKhaki}
                        />
                      )
                    })}
                  </Col>
                </Row>
              )
            })}
          </Grid>
        </ScrollView>
        {
          allChecked ?
          <View style={styles.bottom2}>
            <Text style={styles.bottomText}>All Returned(Completed)</Text>
          </View>
          :
          <TouchableOpacity onPress={this.handleCheckItemAll} style={styles.bottom}>
            <Text style={styles.bottomText}>All Returned</Text>
          </TouchableOpacity>
        }
        <Modal style={styles.modal} isVisible={this.state.isvisible.open} useNativeDriver={true}>
          <View style={styles.modalView}>
            <Text style={styles.modalName}>{this.state.isvisible.name}</Text>
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

export default ReturnScreen
