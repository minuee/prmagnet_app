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
import LinkSheetUnit from '../../common/LinkSheetUnit';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';
import styles from './styles';

const goLeftImage = require('../../../images/navi/go_left.png');
const goRightImage = require('../../../images/navi/go_right.png');

class PickupsScreen extends PureComponent {
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

  async UNSAFE_componentWillMount () {
    const {reqNo, selectEachList = []} = this.params;
    //console.log('this.paramsselectEachList',selectEachList)
    if (reqNo) {
      this.modalOption('Pickups', false)
    } else {
      this.pushOption('Pickups', false)
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
      const response = await API.getPickupArrayDetail(item.date,item.showroom_list,item.req_no_list);
      const dataTmp = await _.get(response, 'right');
      await this.allSendOutCheck(dataTmp)
      this.setState({data: dataTmp[0], listIndex : nextIndex})
      //console.log('?????? ????????? ?????? ?????? ??????', JSON.stringify(_.get(response, 'right')))
    } catch (error) {      
      console.log('?????? ????????? ?????? ?????? ?????? Ma', error)
    }
  }
  handleLoadData = async listIndex => {
    const {selectEachList, reqNo,showroom_no} = this.params
    const pReqNo = reqNo || _.get(selectEachList, `[${listIndex}].req_no`)
    try {
      const response = await API.getPickupDetail(pReqNo,showroom_no)
      this.setState({data: _.get(response, 'right'), listIndex})
      await this.allSendOutCheck(_.get(response, 'right'))
      //console.log('?????? ????????? ?????? ?????? ??????22', JSON.stringify(_.get(response, 'right')))
    } catch (error) {
      // this.setState({loading: false})
      console.log('?????? ????????? ?????? ?????? ??????', error)
    }
  }
  allSendOutCheck = async(data) => {    
    let AllData = 0;
    let sendOutData = 0;
    let targetList = [];
    let targetSampleList = [];
    if ( data.length === undefined ) {
      targetList = data.showroom_list;
    }else{
      targetList = data[0].showroom_list;
    }
    await targetList.forEach(function(element,index){     
      
      if ( element.sample_list != null ) {
        element.sample_list.forEach(function(element2,index2){            
          if ( element2.sample_no ) {
            AllData++;
            if ( element2.pickup_yn ) {
              sendOutData++;
            }else{
              targetSampleList.push(element2.sample_no);
            }                
          }
        })
      }
    }); 
    
    //console.log('AllData',AllData)
    //console.log('sendOutData',sendOutData)
    this.setState({
      allChecked : AllData === sendOutData ? true :false,
      loading: false,
      moreLoading :false,
      targetSampleList
    })
  }
  handlePressUnPickup = (item,roomName,name) => {
    const {data} = this.state;
    const sampleNo = item.sample_no;    
    const sendPush = async () => {
      try {
        const response = await API.pushPickupOneFail(data.req_no, sampleNo)
        this.alert('????????? ?????? ?????? ??????', '????????? ????????? ?????????????????????.')
        //console.log('?????? ?????? ????????? ?????? ??????')
      } catch (error) {
        //console.log('?????? ?????? ????????? ?????? ??????', error)
      }
    }
    this.alert('?????? ????????? ??????', `'${name}'?????? ??????????????? ????????? ??????????????????????`, [{onPress: sendPush}, {}])
  }
  handlePressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}})
  }

  actionHandleCheckItem = async(item,len,name,sampleNo,sampleName,roomName, sender_id) => {
    const {data,selectEachList} = this.state;
    try {
      const response = await API.pushPickupOneSuccess(data.req_no, sampleNo,sender_id);
      if ( response.success ) {
        this.alert('????????????', `${name}?????? ${sampleName} ?????? ??????`, [
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
        mUtils.fn_call_toast('????????? ????????? ?????????????????????.');  
      }
    } catch (error) {
      console.log('error',error);
      mUtils.fn_call_toast('????????? ????????? ?????????????????????.');  
    }
  }

  handleCheckItem = async(item,roomName,name) => {    
    const sampleNo = item.sample_no;
    const sampleName = item.category;    
    if (!this.state.checkedList.includes(sampleNo)) {
      Alert.alert(
        mConst.appName,
        sampleName + '???(???) ?????????????????????????????????????',
        [
          {text: '???', onPress: () => this.actionHandleCheckItem(item,1,name,sampleNo,sampleName,roomName)},
          {text: '?????????', onPress: () => console.log('no')},
        ],
        {cancelable: false},
      );
    } 
  }

  /* handleCheckItem22 = (name, sampleName, sampleNo) => {
    const {data} = this.state
    if (!this.state.checkedList.includes(sampleNo)) {
      const sendPush = async () => {
        try {
          const response = await API.pushPickupOneSuccess(_.get(data, 'req_no'), sampleNo)          
          await this.allSendOutCheck(data,sampleNo)
        } catch (error) {        
        }
      }
      this.alert('????????????', `${name}??????????????? ${sampleName} ?????? ??????`, [
        {
          onPress: () => {
            sendPush()
            this.setState(prevstate => ({checkedList: prevstate.checkedList.concat(sampleNo)}))
          },
        },
      ])
    }
  } */

  handleCheckItemAll = () => {
    const {data,targetSampleList} = this.state;
    const sendPush = async () => {
      try {
        const response = await API.pushPickupSuccess(_.get(data, 'req_no'),targetSampleList)
        this.setState({allChecked: true})
        //console.log('?????? ?????? ?????? ??????')
        mUtils.fn_call_toast('??????????????? ?????????????????????.')
      } catch (error) {
        //console.log('?????? ?????? ?????? ??????', error)
        mUtils.fn_call_toast('????????? ????????? ?????????????????????.')
      }
    }
    if (!this.state.allChecked) {
      this.alert('?????? ?????? ?????? ??????', '?????? ????????? ?????? ????????????????', [{onPress: sendPush}, {}])
    }
  }
 
  render() {
    const {loading} = this.state;
    if (loading) {
      return <Loading />
    }else{
      const {reqNo} = this.params;
      const {data, checkedList, allChecked, loading} = this.state;
      const srcLoaningDate = mUtils.get(data, 'loaning_date');
      const loaningDate = mUtils.getShowDate(srcLoaningDate);
      const fromName = mUtils.get(data, 'contact_user_nm');
      const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'from_user_phone'));
      const toName = mUtils.get(data, 'to_user_nm');
      const toPhone = mUtils.phoneFormat(mUtils.get(data, 'to_user_phone'));
      console.log('data',data)
      
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
                <Text style={styles.titleSubText}>{loaningDate}</Text>
              </View>
              {_.isEmpty(reqNo) && (
                <TouchableOpacity onPress={this.moveRight}>
                  <FastImage source={goRightImage} style={styles.goImage} />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>?????????</Text>
              <Text style={styles.middleDescText}>{mUtils.get(data, 'mgzn_nm', '-')}</Text>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper()}>
                <Text style={styles.middleText}>?????? ??????/??????????????????</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>{fromName}</Text>
                </View>
              </View>
              <View style={styles.middleSubWrapper()}>
                <Text style={styles.middleText}>???????????????</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'contact_user_nm', '-')}</Text>
                  <Text style={styles.middleDescText}> {mUtils.phoneFormat(mUtils.get(data, 'contact_user_phone'))}</Text>
                </View>
              </View>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>?????????</Text>
                <Text style={styles.middleDescText}>{loaningDate}</Text>
              </View>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>?????????</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(mUtils.get(data, 'shooting_date'))}</Text>
              </View>
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>?????? ??????</Text>
              <Text style={styles.middleDescText}>{mUtils.get(data, 'studio', '-')}</Text>
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
                            key={`${subItem.sample_no}${subIndex}`}
                            checked={checkedList.includes(subItem.sample_no) || subItem.pickup_yn || allChecked}
                            name={fromName}
                            phone={fromPhone}
                            viewType={'pickup'}
                            unitType={'from'}
                            loaningDate={srcLoaningDate}
                            subData={subItem}
                            sendUser={subItem?.send_user_info[0]}
                            returnUser={subItem?.send_user_info[0]}
                            onPress={() => this.handlePressUnPickup(subItem,roomName,newfromName)}
                            onPressPhone={() => this.handlePressPhone(newfromName, newfromPhone)}
                            //onSwipeCheck={() => this.handleCheckItem(fromName, subItem.category, subItem.sample_no)}
                            onSwipeCheck={() => this.handleCheckItem(subItem,roomName,newfromName)}
                            color={mConst.bgYellow}
                          />
                        )
                      })}
                    </Col>
                    <Col style={styles.col(rowSize * 2)} size={6}>
                      {_.map(samples, (subItem, subIndex) => {
                        const newfromName = subItem?.send_user_info[0].user_nm;
                        const newtoName = subItem?.use_user_info[0].user_nm;
                        const newtoPhone = mUtils.phoneFormat(subItem?.use_user_info[0].phone_no);
                        return (
                          <LinkSheetUnit
                            readOnly
                            key={subIndex}
                            checked={checkedList.includes(subItem.sample_no) || subItem.pickup_yn || allChecked}
                            name={toName}
                            phone={toPhone}
                            unitType={'to'}
                            viewType={'pickup'}
                            loaningDate={srcLoaningDate}
                            subData={subItem}
                            sendUser={subItem?.use_user_info[0]}
                            returnUser={subItem?.use_user_info[0]}
                            onSwipeCheck={() => this.handleCheckItem(subItem,roomName,newtoName)}
                            onPress={() => this.handlePressUnPickup(subItem,roomName,newfromName)}
                            onPressPhone={() => this.handlePressPhone(newtoName, newtoPhone)}
                            color={mConst.bgOrange}
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
              <Text style={styles.bottomText}>All Picked Up(Completed)</Text>
            </View>
            :
            <TouchableOpacity onPress={this.handleCheckItemAll} style={styles.bottom}>
              <Text style={styles.bottomText}>All Picked Up</Text>
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
}

export default PickupsScreen;