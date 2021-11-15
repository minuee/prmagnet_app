import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Grid, Col, Row} from 'react-native-easy-grid';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import _ from 'lodash';

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import LinkSheetUnit from '../../common/LinkSheetUnit'
import Loading from '../../common/Loading'
import MoreLoading from '../../common/MoreLoading';
import styles from './styles'
import { utils } from '@react-native-firebase/app'

const goLeftImage = require('../../../images/navi/go_left.png')
const goRightImage = require('../../../images/navi/go_right.png')

class SendOutScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      listIndex: 0,
      checked: false,
      allChecked: false,
      data: {},
      checkedList: [],
      isvisible: {open: false, phone: '', name: ''},
      loading: true,
      moreLoading : false
    }
  }
  
  async UNSAFE_componentWillMount () {
    const {reqNo, selectEachList = []} = this.params;
    console.log('this.paramsselectEachList',selectEachList)
    if (reqNo) {
      this.modalOption('Send Out', false)
    } else {
      this.pushOption('Send Out', false)
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
    console.log('handleLoadDataArray222', item)
    try {
      const response = await API.getSendoutArrayDetail(item.date,item.showroom_list);
      const dataTmp = await _.get(response, 'right');
      console.log('픽업 스케쥴 상세 조회 성공', dataTmp)
      await this.allSendOutCheck(dataTmp);
      this.setState({data: dataTmp[0], listIndex : nextIndex, loading: false,moreLoading:false})
      
    } catch (error) {      
      console.log('픽업 스케쥴 상세 조회 실패', error)
    }
  }

  handleLoadData = async listIndex => {
    const {selectEachList, reqNo,showroom_no} = this.params
    const pReqNo = reqNo || _.get(selectEachList, `[${listIndex}].req_no`)
    try {
      const response = await API.getSendoutDetail(pReqNo,showroom_no)
      this.setState({data: _.get(response, 'right'), listIndex, loading: false})
      await this.allSendOutCheck(_.get(response, 'right'))
      //console.log('Send Out 스케쥴 상세 조회 성공', JSON.stringify(response))
    } catch (error) {
      // this.setState({loading: false})
      console.log('Send Out 스케쥴 상세 조회 실패', error)
    }
  }
  allSendOutCheck = async(data,sampleNo=0) => {
    //console.log('allSendOutCheck',data.showroom_list[1].sample_list)
    let AllData = 0;
    let sendOutData = 0;
    await data[sampleNo].showroom_list.forEach(function(element,index){     
      //console.log('element.sample_list',element.sample_list)
      if ( element.sample_list != null ) {
        element.sample_list.forEach(function(element2,index2){            
          if ( element2.sample_no ) {
            AllData++;
            if ( element2.check_yn || sampleNo === element2.sample_no ) {
              sendOutData++;
              if ( sampleNo > 0 ) {
                this.state.data.showroom_list[index].sample_list[index2].check_yn = true;
              }
            }
          }
        })
      }
    }); 
    //console.log('AllData',AllData)
    //console.log('sendOutData',sendOutData)
    this.setState({allChecked : AllData === sendOutData ? true :false})
  }
  handlePressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}})
  }
  handleCheckItem = (name, roomName, sampleName, sampleNo) => {
    const {data} = this.state
    if (!this.state.checkedList.includes(sampleNo)) {
      const sendPush = async () => {
        try {
          const response = await API.pushSendoutOne(_.get(data, 'req_no'), _.get(data, 'showroom_list.length'), sampleNo)
          await this.allSendOutCheck(data,sampleNo)
          //console.log('Send Out 단일 발송 완료')
        } catch (error) {
          //console.log('Send Out 단일 발송 실패', error)
        }
      }
      this.alert('발송완료', `${name}님께 ${roomName}${mConst.lf}${sampleName} 발송 완료하였습니다.`, [
        {
          onPress: () => {
            sendPush()
            this.setState(prevstate => ({checkedList: prevstate.checkedList.concat(sampleNo)}))
          },
        },
      ])
    }
  }
  handleCheckItemAll = () => {
    const {data} = this.state
    console.log('###req_no, len:', _.get(data, 'req_no'), _.get(data, 'showroom_list.length'))
    const sendPush = async () => {
      try {
        const response = await API.pushSendout(_.get(data, 'req_no'), _.get(data, 'showroom_list.length'))
        this.setState({allChecked: true})
        console.log('전체 발송 완료')
      } catch (error) {
        console.log('전체 발송 실패', error)
      }
    }
    if (!this.state.allChecked) {
      this.alert('전체 상품 발송 확인', '전체 상품을 발송 하셨습니까?', [{onPress: sendPush}, {}])
    }
  }
  render() {
    const {reqNo} = this.params;
    const {data, checkedList, allChecked, loading} = this.state;
    const returning_date = mUtils.getShowDate(mUtils.get(data, 'returning_date'));
    const fromName = mUtils.get(data, 'from_user_nm');
    const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'from_user_phone'));
    const toName = mUtils.get(data, 'to_user_nm');
    const toPhone = mUtils.phoneFormat(mUtils.get(data, 'to_user_phone'));
    if (loading) return <Loading />;

    console.log('AllDdatadataata',data,this.props.user.userType)

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
              <Text style={styles.titleSubText}>{returning_date}</Text>
            </View>
            {_.isEmpty(reqNo) && (
              <TouchableOpacity onPress={this.moveRight}>
                <FastImage source={goRightImage} style={styles.goImage} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>매체명</Text>
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
          {mConst.getUserType() === 'B' ? (
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
          ) : (
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>픽업일</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'loaning_date'))}</Text>
              </View>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>촬영일</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'shooting_date'))}</Text>
              </View>
            </View>
          )}
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
                <Text>{mConst.getUserType() === 'B' ? 'From' : 'Shoot'}</Text>
              </Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>{mConst.getUserType() === 'B' ? 'Shoot' : 'To'}</Text>
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
                      return (
                        <LinkSheetUnit
                          key={`${subItem.sample_no}${subIndex}`}
                          readOnly={mConst.getUserType() !== 'B'}
                          checked={checkedList.includes(subItem.sample_no) || subItem.check_yn || allChecked}
                          name={fromName}
                          phone={fromPhone}
                          sendUser={subItem?.use_user_info[0]}
                          returnUser={subItem?.use_user_info[0]}
                          onPress={() => null}
                          onPressPhone={() => this.handlePressPhone(fromName, fromPhone)}
                          onSwipeCheck={() => this.handleCheckItem(toName, roomName, subItem.category, subItem.sample_no)}
                          color={mConst.getUserType() === 'B' ? '#e1c668' : '#d78979'}
                        />
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      return (
                        <LinkSheetUnit
                          key={`${subItem.sample_no}${subIndex}`}
                          readOnly={mConst.getUserType() === 'B'}
                          checked={checkedList.includes(subItem.sample_no) || subItem.check_yn || allChecked}
                          name={toName}
                          phone={toPhone}
                          sendUser={subItem?.return_user_info[0]}
                          returnUser={subItem?.return_user_info[0]}
                          onPress={() => null}
                          onPressPhone={() => this.handlePressPhone(toName, toPhone)}
                          onSwipeCheck={() => this.handleCheckItem(toName, roomName, subItem.category, subItem.sample_no)}
                          color={mConst.getUserType() === 'B' ? '#7ea1b2' : '#b8c18c'}
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
            <Text style={styles.bottomText}>All Sent Out(Completed)</Text>
          </View>
          :
          <TouchableOpacity onPress={this.handleCheckItemAll} style={styles.bottom}>
            <Text style={styles.bottomText}>All Sent Out</Text>
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


export default connect(
  state => ({
      user: state.user,
  }),
  dispatch => ({
      logout: (data, rest) => dispatch(actionLogout.success(data, rest)),
      setAlarm: data => dispatch(actionSetAlarm(data)),
  })
)(SendOutScreen)
