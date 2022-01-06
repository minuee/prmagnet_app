import React, {PureComponent} from 'react';
import {Alert,SafeAreaView,Dimensions, View, ScrollView, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import dayjs from 'dayjs';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import {Platform} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
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
const yesNo = [
  {boolean: true, text: 'Yes'},
  {boolean: false, text: 'No'},
]

LocaleConfig.locales['en'] = {
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
}
LocaleConfig.defaultLocale = 'en'

const time = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]

const convertHolidays = array => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item]: {textColor: 'red'},
    }
  }, {})
}

class SampleRequestsScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      selected: [],
      defaultInfo: '',
      selectContact: '',
      selectRegID: {
        user_id: '',
        mgzn_user_nm: ''
      },
      shDate: '',
      shEndDate: '',
      pkDate: '',
      rtDate: '',
      startTime: '00',
      endTime: '23',
      dlvy_adres_no: 0,
      destination: '',
      destinationDetail: '',
      shippingNote: '',
      concept: '',
      celebrity: [''],
      fashionModel: [''],
      myPay: '',
      otherPay: '',
      locateShoot: '',
      todayConnect: false,
      numberPage: '',
      togetherBrand: '',
      message: '',
      drop: false,
      drop_end:false,
      drop1: false,
      drop2: false,
      isvisible: false,
      year: dayjs().format('YYYY'),
      reservation_list : [],
      holidays: [],
      holidays2: [],
      editableLoke : false,
      editableOwn: false,
      editableYukaEtc: false,
      editableNone: true,
      editableCele : false,
      editableModel : false,
      myInformation : {
        user_id : '',
        user_nm : ''
      }
    }
  }
  

  getBrandHoliday = async (year, brand_id) => {
    //console.log('this.state.reservation_list>>>>', this.state.reservation_list)
    let reservationArray =  [];
    this.state.reservation_list.forEach((d2, i2) => {
      if ( !mUtils.isEmpty(d2.photogrf_dt)) reservationArray = reservationArray.concat(d2.photogrf_dt);
      if ( !mUtils.isEmpty(d2.duty_recpt_dt)) reservationArray = reservationArray.concat(d2.duty_recpt_dt);
      if ( !mUtils.isEmpty(d2.return_prearnge_dt)) reservationArray = reservationArray.concat(d2.return_prearnge_dt);
    });
    
    try {
      const response = await API.getBrandHoliday({year, brand_id})
      //console.log('getBrandHoliday>>>>', JSON.stringify(response))
      if (response.success) {
        const holidayArray = await _.get(response, 'list', []).map(d => dayjs.unix(d).format('YYYY-MM-DD'));
        const unavailDt = reservationArray.concat(holidayArray);
        this.setState({holidays:unavailDt,holidays2:holidayArray});
        //this.setState({holidays: _.get(response, 'list', []).map(d => dayjs.unix(d).format('YYYY-MM-DD'))})
      }
      // this.setState({data: response, start: params ? params.start : this.state.start, end: params ? params.end : this.state.end})
    } catch (error) {
      //console.log('getBrandHoliday>>>>', error)
    }
  }

  postSRRequestSend = async () => {
    const {
      selected,
      defaultInfo,
      selectContact,
      selectRegID,
      shDate,
      shEndDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      dlvy_adres_no,
      destination,
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      myPay,
      otherPay,
      editableLoke,
      editableOwn,
      editableYukaEtc,
      editableNone,
      editableCele,
      editableModel
    } = this.state
    const {brandId} = this.props.route.params
    let list = selected.map((item, index) => item.showroom_no)
    //console.log('111>>>>>', startTime,endTime)
    if (!selectRegID) return this.alert('', '담당기자/스타일리스트를 선택해주세요')
    if (!selectContact) return this.alert('', '연결 연락처를 선택해 주세요.')
    if (!shDate) return this.alert('', '촬영일을 선택해 주세요.')
    if (!shEndDate) return this.alert('', '촬영일을 선택해 주세요.')
    if (!pkDate) return this.alert('', '픽업일을 선택해 주세요.')
    if (!rtDate) return this.alert('', '반납일을 선택해 주세요.')
    //if (!startTime) return this.alert('', '촬영 시작 시각을 선택해 주세요.')
    //if (!endTime) return this.alert('', '촬영 종료 시각을 선택해 주세요.')
    if (!destination) return this.alert('', '수령 주소를 입력해 주세요.')
    if (!destinationDetail) return this.alert('', '수령 상세 주소를 입력해 주세요.')
    //if (!shippingNote) return this.alert('', '배송 관련 메모를 입력해 주세요.')
    //if (!concept) return this.alert('', '촬영 컨셉을 입력해 주세요.')
    if (!_.get(celebrity, '[0]') && !_.get(fashionModel, '[0]')) return this.alert('', '모델을 입력해 주세요.')
    //if (!myPay && !otherPay) return this.alert('', '유가 여부를 입력해 주세요.')
    //if (!numberPage) return this.alert('', '페이지 수를 입력해 주세요.')
    
    try {
      const response = await API.postSRRequestSend({
        brand_id: brandId,
        duty_recpt_dt: String(Math.floor(Number(pkDate.timestamp / 1000))),
        photogrf_dt: String(Math.floor(Number(shDate.timestamp) / 1000)),
        photogrf_end_dt: String(Math.floor(Number(shEndDate.timestamp) / 1000)),
        begin_dt: startTime,
        end_dt: endTime,
        return_prearnge_dt: String(Math.floor(Number(rtDate.timestamp) / 1000)),
        photogrf_concept: concept,
        model_list: fashionModel[0] === '' ? [] : fashionModel,
        celeb_list: celebrity[0] === '' ? [] : celebrity,
        page_cnt: numberPage,
        etc_brand: togetherBrand,
        today_connect: todayConnect,
        add_req_cntent: message,
        dlvy_adres_no: dlvy_adres_no,
        dlvy_adres_nm: destination,
        adres_detail: destinationDetail,
        dlvy_atent_matter: shippingNote,
        showroom_list: list,
        contact_user_id: selectContact.user_id,
        reg_user_id: selectRegID.user_id,
        loc_value: locateShoot,
        own_paid_pictorial_content: myPay,
        other_paid_pictorial_content: otherPay,
      })
      //console.log('postSRRequestSend>>>>', response)
      if (response.success) {
        mUtils.fn_call_toast('정상적으로 신청되었습니다.');
          setTimeout(() => {
            this.goBack()
          }, 1500);
      }
    } catch (error) {
      //console.log('postSRRequestSend>>>>', error)
    }
  }

  editSRRequestSend = async () => {
    const {
      selected,
      selectContact,
      selectRegID,
      shDate,
      shEndDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      dlvy_adres_no,
      destination,
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      myPay,
      otherPay,
      editableLoke,
      editableOwn,
      editableYukaEtc,
      editableNone,
      editableCele,
      editableModel
    } = this.state
    const {no} = this.props.route.params
    let list = selected.map((item, index) => item.showroom_no);
    
    try {
      const response = await API.editSRRequestSend({
        req_no: no,
        duty_recpt_dt: String(Math.floor(Number(pkDate.timestamp / 1000))),
        photogrf_dt: String(Math.floor(Number(shDate.timestamp) / 1000)),
        photogrf_end_dt: String(Math.floor(Number(shEndDate.timestamp) / 1000)),
        begin_dt: startTime,
        end_dt: endTime,
        return_prearnge_dt: String(Math.floor(Number(rtDate.timestamp) / 1000)),
        photogrf_concept: concept,
        model_list: fashionModel[0] === '' ? [] : fashionModel,
        celeb_list: celebrity[0] === '' ? [] : celebrity,
        page_cnt: numberPage,
        etc_brand: togetherBrand,
        today_connect: todayConnect,
        add_req_cntent: message,
        dlvy_adres_no: dlvy_adres_no,
        dlvy_adres_nm: destination,
        adres_detail: destinationDetail,
        dlvy_atent_matter: shippingNote,
        showroom_list: list,
        contact_user_id: selectContact.user_id,
        reg_user_id: selectContact.user_id,
        loc_value: locateShoot,
        own_paid_pictorial_content: myPay,
        other_paid_pictorial_content: otherPay,
      })
      console.log('editSRRequestSend222>>>>', response)
      if (response.success) {
        mUtils.fn_call_toast('정상적으로 수정되었습니다.');
        setTimeout(() => {
          this.goBack()
        }, 1500);
      }
    } catch (error) {
      //console.log('editSRRequestSend>>>>', error)
    }
  }

  delModel = (item, index) => {
    const {delSelect, type} = this.props.route.params
    this.setState(state => {
      const result = state.selected.filter((e, j) => index !== j)
      if (type) {
        if (result.length === 0) {
          mUtils.fn_call_toast('정상적으로 삭제되었습니다.');
          setTimeout(() => {
            this.goBack()
          }, 1500);
        }
      }
      return {selected: result}
    })
    if (type) {
      delSelect(item)
    }
  }

  onDaySelect = async(date) => {
    const {drop,drop_end, drop1, drop2, holidays,holidays2,shDate,shEndDate} = this.state;
    /* console.log('onDaySelect',date,drop1,drop2)
    const dateFormat = date.dateString;
    const TodayFormat = moment().format("YYYY-MM-DD");
    let reservationArray =  [];
    await this.state.reservation_list.forEach((d2, i2) => {
      reservationArray = reservationArray.concat(d2);
    });        
    const isCheck = (element) => ( element.photogrf_dt == dateFormat || element.duty_recpt_dt == dateFormat || element.return_prearnge_dt == dateFormat);
    if ( reservationArray.some(isCheck) ) {
      alert('해당일자에는 이미 예약이 되어 있습니다.');
      setShootingDt(dayjs.unix(data.shooting_date).toISOString())       
      return false;
    }else if ( TodayFormat >=  dateFormat) {
      alert('오늘보다 이전일자로는 예약이 불가합니다.');
      setShootingDt(dayjs.unix(data.shooting_date).toISOString())  
      return false;
    }else{ */
      if (drop) {      
        let pDt =
          moment(date.timestamp).subtract({day: 1}).day() === 0
            ? moment(date.timestamp).subtract({day: 3}).format('YYYY-MM-DD')
            : moment(date.timestamp).subtract({day: 1}).day() === 6
            ? moment(date.timestamp).subtract({day: 2}).format('YYYY-MM-DD')
            : moment(date.timestamp).subtract({day: 1}).format('YYYY-MM-DD')
        for (let i = 0; i < holidays.length; i++) {
          holidays.find(
            v =>
              v === pDt &&
              (pDt =
                moment(pDt).subtract({day: 1}).day() === 0
                  ? moment(pDt).subtract({day: 3}).format('YYYY-MM-DD')
                  : moment(pDt).subtract({day: 1}).day() === 6
                  ? moment(pDt).subtract({day: 2}).format('YYYY-MM-DD')
                  : moment(pDt).subtract({day: 1}).format('YYYY-MM-DD'))
          )
        }
        const pDtObj = moment(pDt)
        this.setState({
          shDate: date,
          shEndDate: date,
          drop: false,
          pkDate: {
            month: pDtObj.format('M'),
            day: pDtObj.format('D'),
            timestamp: pDtObj.valueOf(),
          }
        })
      }else if (drop_end) {     
        
        if ( shDate.timestamp > date.timestamp ) {
          Alert.alert(
            mConst.appName,
            '촬영시작일보다 작은 일자를 선택하셨습니다.',
            [
              {text: '확인', onPress: () => console.log('no')},
            ],
            {cancelable: false},
          );
        }else{
          let diffDays = moment(date.timestamp).diff(moment(shDate.timestamp),'days');
          console.log('shDateshDate',shDate) 
          console.log('datedatedate',date) 
          console.log('diffDays',diffDays) 
          if ( diffDays > mConst.sampleRequestLimitDays) {
            Alert.alert(
              mConst.appName,
              '최대 7일까지 가능합니다',
              [
                {text: '확인', onPress: () => console.log('no')},
              ],
              {cancelable: false},
            );
          }else{
            let rDt =
              moment(date.timestamp).add({day: 1}).day() === 6
                ? moment(date.timestamp).add({day: 3}).format('YYYY-MM-DD')
                : moment(date.timestamp).add({day: 1}).day() === 0
                ? moment(date.timestamp).add({day: 2}).format('YYYY-MM-DD')
                : moment(date.timestamp).add({day: 1}).format('YYYY-MM-DD')
            for (let i = 0; i < holidays.length; i++) {
              holidays.find(
                v =>
                  v === rDt &&
                  (rDt =
                    moment(rDt).add({day: 1}).day() === 6
                      ? moment(rDt).add({day: 3}).format('YYYY-MM-DD')
                      : moment(rDt).add({day: 1}).day() === 0
                      ? moment(rDt).add({day: 2}).format('YYYY-MM-DD')
                      : moment(rDt).add({day: 1}).format('YYYY-MM-DD'))
              )
            }
            const rDtObj = moment(rDt)
            this.setState({
              shEndDate: date,
              drop_end: false,
              rtDate: {
                month: rDtObj.format('M'),
                day: rDtObj.format('D'),
                timestamp: rDtObj.valueOf(),
              },
            })
          }
        }
      } else if (drop1) {
        this.setState({pkDate: date, drop1: false})
      } else if (drop2) {
        this.setState({rtDate: date, drop2: false})
      }
    //}
  }

  postSRRequest = async () => {
    const {brandId, type, no} = this.props.route.params
    try {
      const response = await API.postSRRequest({
        brand_id: brandId,
      })
      console.log('postSRRequest>>>', response)
      this.setState({defaultInfo: response})
    } catch (error) {
      //console.log('postSRRequest>>>', error)
    }
  }

  getSampleRequests = async () => {
    const {brandId, type, no} = this.props.route.params
    try {
      const response = await API.getSampleRequests({
        req_no: no,
      })
      console.log('getSampleRequests>>>>', response)
      this.setState({
        selected: response.showroom_list,
        selectContact: {
          user_id: response.contact_user_id,
          mgzn_user_nm: response.contact_username,
          phone_no: response.contact_phone_no,
        },
        
        shDate: {
          month: mUtils.getShowDate(response.shooting_date, 'M'),
          day: mUtils.getShowDate(response.shooting_date, 'D'),
          timestamp: response.shooting_date * 1000,
        },
        shEndDate: {
          month: mUtils.getShowDate(response.shooting_end_date, 'M'),
          day: mUtils.getShowDate(response.shooting_end_date, 'D'),
          timestamp: response.shooting_end_date * 1000,
        },
        pkDate: {
          month: mUtils.getShowDate(response.pickup_date, 'M'),
          day: mUtils.getShowDate(response.pickup_date, 'D'),
          timestamp: response.pickup_date * 1000,
        },
        rtDate: {
          month: mUtils.getShowDate(response.returning_date, 'M'),
          day: mUtils.getShowDate(response.returning_date, 'D'),
          timestamp: response.returning_date * 1000,
        },
        startTime: response.shooting_start_time,
        endTime: response.shooting_end_time,
        dlvy_adres_no: response.dlvy_adres_no,
        destination: response.dlvy_adres_nm,
        destinationDetail: response.adres_detail,
        shippingNote: response.dlvy_atent_matter,
        concept: response.photogrf_concept,
        celebrity: _.size(response.celeb_list) === 0 ? [''] : response.celeb_list,
        fashionModel: _.size(response.model_list) === 0 ? [''] : response.model_list,
        locateShoot: response.loc_value,
        todayConnect: response.today_connect,
        numberPage: response.page_cnt,
        togetherBrand: response.etc_brand_info,
        message: response.message,
        myPay: response.own_paid_pictorial_content,
        otherPay: response.other_paid_pictorial_content,
        reservation_list : response.reservation_list,
        editableLoke : mUtils.isEmpty(response.loc_value) ? false : true,
        editableOwn: mUtils.isEmpty(response.own_paid_pictorial_content) ? false : true,
        editableYukaEtc: mUtils.isEmpty(response.other_paid_pictorial_content) ? false : true,
        editableNone: mUtils.isEmpty(response.own_paid_pictorial_content) && mUtils.isEmpty(response.other_paid_pictorial_content)  ? true : false,
        editableCele: _.size(response.celeb_list) === 0 ?  false : true,
        editableModel: _.size(response.model_list) === 0 ? false : true,
      })
    } catch (error) {
      //console.log('getSampleRequests>>>>', error)
    }
  }

  async UNSAFE_componentWillMount () {
    const {modelList, type, brandName, brandId} = this.props.route.params;
    
    this.pushOption(brandName ? brandName : 'Sample Request')
    if (type) {
      this.setState({selected: modelList})
    }
    const myInformation = await AsyncStorage.getItem('myInformation');
    
    if ( !mUtils.isEmpty(myInformation)) {
      const myLoacalData = JSON.parse(myInformation);
      this.setState({
        myInformation : myLoacalData,
        selectRegID: {
          user_id: myLoacalData.user_id,
          mgzn_user_nm: myLoacalData.user_nm,          
        },
      })
      
    }else if ( !mUtils.isEmpty(props.user.userToken)) {
      this.setState({
        selectRegID: {
          user_id: props.user.userToken.user_id,
          mgzn_user_nm: props.user.userToken.user_nm
        },
      })
      
    }
    this.handleOnFocus();
  }

  componentDidMount() {    
   
  }
  componentWillUnmount() {
    //this.removeFocus()
  }

  handleOnFocus = async() => {
    const {modelList, type, brandName} = this.props.route.params
    await this.postSRRequest();
    
    if (!type) {      
      await this.getSampleRequests()
    }
    const {brandId} = this.props.route.params
    const {year} = this.state;
    this.getBrandHoliday(year, brandId)
  }

  updateAddress = (v) => {
    
    this.setState({
      dlvy_adres_no:v.dlvy_adres_no,
      destination: v.dlvy_adres_nm,
      destinationDetail: v.adres_detail
    })
  }

  setCele = async(bool) => {
    this.setState({editableCele:!bool,celebrity:['']});
  }

  setModel = async(bool) => {
    this.setState({editableModel:!bool,fashionModel:['']});
  }
  setLoke = async(bool) => {
    this.setState({editableLoke:!bool,locateShoot:null});
  }

  setYuga = async(mode,bool) => {
    if ( mode === 'own') {
      if ( bool ) { //자사유가해제
        this.setState({
          editableNone:false,editableOwn: false,editableYukaEtc:false,        
          myPay : null, otherPay : null
        })
      }else{//자사유가선택
        this.setState({
          editableNone:false,editableOwn: true,editableYukaEtc:false,
          myPay : null, otherPay : null
        })
      }

    }else if ( mode === 'etc') {
      if ( bool ) { //자사유가해제
        this.setState({
          editableNone:false,editableOwn: false,editableYukaEtc:false,        
          myPay : null, otherPay : null
        })
      }else{//자사유가선택
        this.setState({
          editableNone:false,editableOwn: false,editableYukaEtc:true,
          myPay : null, otherPay : null
        })
      }
    }else{
      if ( bool ) { //유가없음해제
        this.setState({
          editableNone:false,editableOwn: false,editableYukaEtc:false,        
          myPay : null, otherPay : null
        })
      }else{//유가없음선택
        this.setState({
          editableNone:true,editableOwn: false,editableYukaEtc:false,
          myPay : null, otherPay : null
        })
      }
    }
  }

  renderTooltip = () => {
    return (<View style={{width:'100%',padding:5,alignItems:'center',justifyContent:'center'}}>   
        <Text style={{fontFamily: 'Roboto-Regular',fontSize: 14,color: '#ffffff',}}>수정불가한 사항(패션모델/셀럽, 페이지수, 촬영일, 픽업일, 반납일, 촬영컨셉, 메시지, 함께 들어가는 브랜드)의 수정을 원할 시 홀딩 취소 후 새로 요청해 주시기 바랍니다.</Text>
        
    </View>)
  }

  render() {
    const {
      selected,
      defaultInfo,
      selectContact,
      selectRegID,
      shDate,
      shEndDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      dlvy_adres_no,
      destination,
      destinationDetail,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      drop,
      drop_end,
      drop1,
      drop2,
      myPay,
      otherPay,
      isvisible,
      holidays,
    } = this.state
    const {type} = this.props.route.params;
    return defaultInfo ? (
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={100}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: mUtils.wScale(20),flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flex:3,flexDirection:'row',alignItems:'center'}}>
                <Text style={{...styles.mainTitle, }}>{type ? 'Sample ' : 'My '}</Text>
                <Text style={styles.mainTitle1}>Requests {!type && 'Edit'}</Text>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                { !type && 
                  <Tooltip popover={this.renderTooltip('')} width={SCREEN_WIDTH*0.9} height={90} backgroundColor={'#7ea1b2'} skipAndroidStatusBar={true}>
                    <Icon name="infocirlceo" size={20} color="#000" />
                  </Tooltip>
                }
              </View>
            </View>
            <View style={{paddingHorizontal: mUtils.wScale(20)}}>
              <Text style={{...styles.subTitle, marginTop: mUtils.wScale(20)}}>
                Request product : <Text style={{color: '#7ea1b2'}}>{selected.length}</Text>
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginLeft: mUtils.wScale(20), marginTop: mUtils.wScale(16)}}
              contentContainerStyle={{paddingRight: mUtils.wScale(20)}}
            >
              {selected.map((item, index) => {
                return (
                  <View key={index} style={{marginRight: mUtils.wScale(5), alignItems: 'center'}}>
                    <View>
                      <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
                      <View style={{...styles.select, backgroundColor: 'rgba(126, 161, 178, 0.8)'}}>
                        <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
                      </View>
                      {selected.length !== 1 && (
                        <TouchableOpacity
                          style={styles.del}
                          onPress={() => {
                            this.delModel(item, index)
                          }}
                        >
                          <FastImage resizeMode={'contain'} style={styles.delImg} source={delImg} />
                        </TouchableOpacity>
                      )}
                    </View>
                    <Text style={{...styles.modelTitle, marginTop: mUtils.wScale(8)}}>{item.showroom_nm}</Text>
                  </View>
                )
              })}
            </ScrollView>
            <View style={styles.emptyBar} />
            <View style={{paddingHorizontal: mUtils.wScale(20)}}>
              <Text style={{...styles.subTitle}}>Request Information</Text>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>매체명</Text>
                  <View style={{...styles.box1}}>
                    <Text style={styles.boxText}>{defaultInfo.mgzn_nm}</Text>
                  </View>
                </View>
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>
                    담당 기자/스타일리스트 <Text style={{color: '#7eb2b2'}}>*</Text>
                  </Text>
                  {/* <Text style={styles.boxText}>{defaultInfo.user_nm}</Text> */}
                  <ModalDropdown
                    style={{width: '98%'}}
                    dropdownStyle={{width: '44%'}}
                    onSelect={(i, v) => this.setState({selectRegID: v})}                  
                    options={mUtils.isEmpty(defaultInfo.contact_info) ?[] :defaultInfo.contact_info}
                    renderRow={item => (
                      <View style={styles.contactList}>
                        <Text style={styles.contactText}>{`${item.mgzn_user_nm}`}</Text>
                      </View>
                    )}
                  >
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>{selectRegID ? selectRegID.mgzn_user_nm : 'Editor/Stylist'}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </ModalDropdown>                  
                </View>
              </View>
              <Text style={styles.smallTitle}>
                연결 연락처 <Text style={{color: '#7eb2b2'}}>*</Text>
              </Text>
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
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText}>{selectContact ? selectContact.mgzn_user_nm : 'Editor/Stylist'}</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </ModalDropdown>

                <View style={{...styles.box1, width: '49%'}}>
                  <Text style={styles.boxText}>{selectContact ? mUtils.allNumber(selectContact.phone_no) : '연락처'}</Text>
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
                    <Text style={styles.smallTitle}>
                      촬영시작일 <Text style={{color: '#7eb2b2'}}>*</Text>
                    </Text>
                    {type ?                    
                    <TouchableOpacity
                      style={{...styles.box1, justifyContent: 'space-between'}}
                      onPress={() => {
                        this.setState({drop: !drop,drop_end:false, drop1: false, drop2: false})
                      }}
                    >
                      <Text style={styles.boxText}>
                        {shDate ? `${shDate.month}/${shDate.day}(${moment(shDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                    :
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>
                        {shDate ? `${shDate.month}/${shDate.day}(${moment(shDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                    }
                  </View>
                  <View style={{width: '49%'}}>
                    <Text style={styles.smallTitle}>
                      촬영종료일 <Text style={{color: '#7eb2b2'}}>*</Text>
                    </Text>
                    {type && this.state.shDate ?                    
                    <TouchableOpacity
                      style={{...styles.box1, justifyContent: 'space-between'}}
                      onPress={() => {
                        this.setState({drop: false,drop_end : !drop_end, drop1: false, drop2: false})
                      }}
                    >
                      <Text style={styles.boxText}>
                        {shEndDate ? `${shEndDate.month}/${shEndDate.day}(${moment(shEndDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                    :
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>
                        {shEndDate ? `${shEndDate.month}/${shEndDate.day}(${moment(shEndDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                    }
                  </View>
                </View>
                <View
                  style={{
                    ...styles.layout2,
                    justifyContent: 'space-between',
                    paddingTop: mUtils.wScale(20),
                    paddingBottom: mUtils.wScale(18),
                  }}
                >
                  <View style={{width: '49%'}}>
                    <Text style={styles.smallTitle}>
                      픽업일 <Text style={{color: '#7eb2b2'}}>*</Text>
                    </Text>
                    <View
                      style={{...styles.box1, justifyContent: 'space-between'}}
                      //onPress={() => {this.setState({drop1: !drop1, drop: false, drop2: false})}}
                    >
                      <Text style={styles.boxText}>
                        {pkDate ? `${pkDate.month}/${pkDate.day}(${moment(pkDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </View>
                  <View style={{width: '49%'}}>
                    <Text style={styles.smallTitle}>
                      반납일 <Text style={{color: '#7eb2b2'}}>*</Text>
                    </Text>
                    <View
                      style={{...styles.box1, justifyContent: 'space-between'}}
                      //onPress={() => {this.setState({drop2: !drop2, drop: false, drop1: false})}}
                    >
                      <Text style={styles.boxText}>
                        {rtDate ? `${rtDate.month}/${rtDate.day}(${moment(rtDate.timestamp).format('ddd')})` : '0/0(일)'}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </View>
                </View>
                {drop || drop_end || drop1 || drop2 ? (
                  <View style={styles.calendar}>
                    <Calendar
                      minDate={Date()}
                      monthFormat={'yyyy MMMM'}
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#dddddd',
                      }}
                      onDayPress={this.onDaySelect}
                      //markedDates={{
                      //  [dateSelect]: {
                      //    selected: true,
                      //    disableTouchEvent: true,
                      //    selectedColor: '#108ee9',
                      //    selectedTextColor: '#ffffff',
                      //  },
                      //}}
                      markingType={'period'}
                      markedDates={convertHolidays(holidays)}
                    />
                  </View>
                ) : null}
              </>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingBottom: mUtils.wScale(20),
                }}
              >
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>촬영 시작 시각</Text>
                  <ModalDropdown
                    dropdownStyle={{width: '44%'}}
                    onSelect={(i, v) => this.setState({startTime: v})}
                    renderRow={item => (
                      <View style={styles.contactList}>
                        <Text style={styles.contactText}>{item}:00</Text>
                      </View>
                    )}                    
                    options={mUtils.isEmpty(time) ?[] : time}
                  >
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>{startTime ? `${startTime}:00` : '00:00'}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </ModalDropdown>
                </View>
                <View style={{width: '49%'}}>
                  <Text style={styles.smallTitle}>촬영 종료 시각</Text>
                  <ModalDropdown
                    dropdownStyle={{width: '44%'}}
                    onSelect={(i, v) => this.setState({endTime: v})}
                    renderRow={item => (
                      <View style={styles.contactList}>
                        <Text style={styles.contactText}>{item}:00</Text>
                      </View>
                    )}                    
                    options={mUtils.isEmpty(time) ?[] : time}
                  >
                    <View style={{...styles.box1, justifyContent: 'space-between'}}>
                      <Text style={styles.boxText}>{endTime ? `${endTime}:00` : '00:00'}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </ModalDropdown>
                </View>
              </View>
              <Text style={styles.smallTitle}>
                수령 주소 <Text style={{color: '#7eb2b2'}}>*</Text>
              </Text>
              <View style={{...styles.layout2, justifyContent: 'space-between'}}>
                <ModalDropdown
                  style={{width: '100%'}}
                  dropdownStyle={{width: '91%'}}
                  onSelect={(i, v) => this.updateAddress(v)}
                  renderRow={item => (
                    <View style={styles.contactList}>
                      <Text style={styles.contactText}>{item.dlvy_adres_nm}</Text>
                      <Text style={styles.contactText}>{item.adres_detail}</Text>
                    </View>
                  )}                  
                  options={mUtils.isEmpty(defaultInfo.user) ?[] : defaultInfo.user}
                >
                  <View style={{...styles.box1, justifyContent: 'space-between'}}>
                    <Text style={styles.boxText1}>최근 배송지</Text>
                    <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                  </View>
                </ModalDropdown>
              </View>
              <View style={{...styles.layout2, marginTop: mUtils.wScale(6)}}>
                <TextInput
                  style={{...styles.inputBox, width: '80%'}}
                  value={destination}
                  onChangeText={text => {
                    this.setState({destination: text})
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isvisible: true})
                  }}
                  style={styles.postBox}
                >
                  <Text style={styles.postCode}>주소검색</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={{...styles.inputBox, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(18)}}
                value={destinationDetail}
                onChangeText={text => {
                  this.setState({destinationDetail: text})
                }}
              />

              <Text style={styles.smallTitle}>배송 관련 메모</Text>
              <TextInput
                style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
                multiline={true}
                textAlignVertical={'top'}
                value={shippingNote}
                onChangeText={text => {
                  this.setState({shippingNote: text})
                }}
              />
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '100%'}}>
                  <Text style={styles.smallTitle}>촬영컨셉</Text>
                  <TextInput
                    editable={type ? true :false}
                    style={{...styles.inputBox}}
                    placeholder={'컨셉'}
                    placeholderTextColor={mConst.borderGray}
                    value={concept}
                    onChangeText={text => {
                      this.setState({concept: text})
                    }}
                  />
                </View>
              </View>
              <Text style={styles.smallTitle}>
                모델 <Text style={{color: '#7eb2b2'}}>*</Text>
              </Text>
              <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
                {type ?    
                <TouchableOpacity 
                  onPress={() => this.setCele(this.state.editableCele )}
                  style={{...styles.layout1}}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableCele ? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>셀러브리티</Text>
                </TouchableOpacity>
                :
                <View style={{...styles.layout1}}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableCele ? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>셀러브리티</Text>
                </View>
                }
                {type ?    
                <View style={{width: '65%'}}>
                  {celebrity.map((item, index) => {
                    return (
                      <View key={index} style={{...styles.box2}}>
                        <TextInput
                          editable={this.state.editableCele}
                          style={{...styles.inputBox1, width: '70%'}}
                          placeholder={'이름'}
                          placeholderTextColor={mConst.borderGray}
                          value={item}
                          onChangeText={text => {
                            let tmp = [...celebrity]
                            tmp[index] = text
                            this.setState({celebrity: tmp})
                          }}
                        />
                        {index === 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({celebrity: [...celebrity, '']})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              let result = celebrity.filter((e, i) => i !== index)
                              this.setState({celebrity: result})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={minusImg} />
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  })}
                </View>
                :
                <View style={{width: '65%'}}>
                  {celebrity.map((item, index) => {
                    return (
                      <View key={index} style={{...styles.box2}}>
                        <TextInput
                          editable={false}
                          style={{...styles.inputBox1, width: '70%'}}
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
                }
              </View>
              <View
                style={{
                  ...styles.layout,
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: mUtils.wScale(5),
                  marginBottom: mUtils.wScale(18),
                }}
              >
                {type ?
                <TouchableOpacity 
                  onPress={() => this.setModel(this.state.editableModel )}
                  style={{...styles.layout1}}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableModel? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>패션 모델</Text>
                </TouchableOpacity>
                :
                <View style={{...styles.layout1}}>
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableModel? checkImg : noCheckImg} />
                  <Text style={{...styles.smallTitle, marginBottom: 0}}>패션 모델</Text>
                </View>
                }
                {type ?
                <View style={{width: '65%'}}>
                  {fashionModel.map((item, index) => {
                    return (
                      <View key={index} style={{...styles.box2}}>
                        <TextInput
                          editable={this.state.editableModel}
                          style={{...styles.inputBox1, width: '70%'}}
                          placeholder={'이름'}
                          placeholderTextColor={mConst.borderGray}
                          value={item}
                          onChangeText={text => {
                            let tmp = [...fashionModel]
                            tmp[index] = text
                            this.setState({fashionModel: tmp})
                          }}
                        />
                        {index === 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({fashionModel: [...fashionModel, '']})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              let result = fashionModel.filter((e, i) => i !== index)
                              this.setState({fashionModel: result})
                            }}
                          >
                            <FastImage resizeMode={'contain'} style={styles.plusImg} source={minusImg} />
                          </TouchableOpacity>
                        )}
                      </View>
                    )
                  })}
                </View>
                :
                <View style={{width: '65%'}}>
                  {fashionModel.map((item, index) => {
                    return (
                      <View key={index} style={{...styles.box2}}>
                        <TextInput
                          editable={false}
                          style={{...styles.inputBox1, width: '70%'}}
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
                }
              </View>
              <Text style={styles.smallTitle}>유가 여부 </Text>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <TouchableOpacity 
                  style={styles.layout2}
                  onPress={() => this.setYuga('none',this.state.editableNone )}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableNone ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>유가없음</Text>
                </TouchableOpacity>
              </View>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <TouchableOpacity 
                  onPress={() => this.setYuga('own',this.state.editableOwn )}
                  style={styles.layout2}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableOwn ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>자사유가</Text>
                </TouchableOpacity>

                <TextInput
                  editable={this.state.editableOwn}
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'자사유가'}
                  placeholderTextColor={mConst.borderGray}
                  value={myPay}
                  onChangeText={text => {
                    this.setState({myPay: text, otherPay: '', editableNone:false})
                  }}
                />
              </View>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <TouchableOpacity 
                  onPress={() => this.setYuga('etc',this.state.editableYukaEtc )}
                  style={styles.layout2}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableYukaEtc ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>타사유가</Text>
                </TouchableOpacity>
                <TextInput
                  editable={this.state.editableYukaEtc}
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'타사유가'}
                  placeholderTextColor={mConst.borderGray}
                  value={otherPay}
                  onChangeText={text => {
                    this.setState({otherPay: text, myPay: '', editableNone:false})
                  }}
                />
              </View>
              <Text style={styles.smallTitle}>로케촬영</Text>
              <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
                <TouchableOpacity 
                  style={styles.layout2}
                  onPress={() => this.setLoke(this.state.editableLoke )}
                >
                  <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.editableLoke ? checkImg : noCheckImg} />
                  <Text style={styles.text1}>로케촬영</Text>
                </TouchableOpacity>
                <TextInput
                  editable={this.state.editableLoke}
                  style={{...styles.inputBox, width: '65%'}}
                  placeholder={'촬영지 입력'}
                  placeholderTextColor={mConst.borderGray}
                  value={locateShoot}
                  onChangeText={text => {
                    this.setState({locateShoot: text})
                  }}
                />
              </View>
              {/* <Text style={styles.smallTitle}>당일연결 희망/ 가능 여부</Text>
              <View
                style={{
                  ...styles.layout2,
                  width: '100%',
                  justifyContent: 'space-between',
                  marginBottom: mUtils.wScale(18),
                  marginTop: mUtils.wScale(3),
                }}
              >
                {yesNo.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setState({todayConnect: item.boolean})
                      }}
                      style={{...styles.yesNoBox, borderColor: todayConnect === item.boolean ? mConst.black : mConst.borderGray}}
                    >
                      <FastImage resizeMode={'contain'} style={styles.checkImg2} source={todayConnect === item.boolean ? checkImg2 : checkImg3} />
                      <Text
                        style={{
                          ...styles.yesNo,
                          marginLeft: mUtils.wScale(5),
                          color: todayConnect === item.boolean ? mConst.black : mConst.borderGray,
                        }}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View> */}
              <Text style={styles.smallTitle}>페이지 수</Text>
              <TextInput
                editable={type ? true:false}
                style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                placeholder={'Number of pages'}
                placeholderTextColor={mConst.borderGray}
                value={numberPage}
                onChangeText={text => {
                  this.setState({numberPage: text})
                }}
              />
              <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
              <TextInput
                editable={type ? true:false}
                style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                placeholder={'Different brand'}
                placeholderTextColor={mConst.borderGray}
                value={togetherBrand}
                onChangeText={text => {
                  this.setState({togetherBrand: text})
                }}
              />
              <Text style={styles.smallTitle}>메세지</Text>
              <TextInput
                editable={type ? true:false}
                style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
                multiline={true}
                textAlignVertical={'top'}
                value={message}
                onChangeText={text => {
                  this.setState({message: text})
                }}
              />
            </View>
            <TouchableOpacity
              style={{...styles.bottomButton, backgroundColor: mConst.black}}
              onPress={() => {
                if (type) {
                  Alert.alert(
                    mConst.appName,
                    '홀딩요청을 제출하시겠습니까?',
                    [
                      {text: '네', onPress: () => this.postSRRequestSend()},
                      {text: '아니오', onPress: () => console.log('no')},
                    ],
                    {cancelable: false},
                  );
                } else {
                  
                  Alert.alert(
                    mConst.appName,
                    '정보를 수정하시겠습니까?',
                    [
                      {text: '네', onPress: () => this.editSRRequestSend()},
                      {text: '아니오', onPress: () => console.log('no')},
                    ],
                    {cancelable: false},
                  );
                }
              }}
            >
              <Text style={{...styles.buttonText, color: mConst.white}}>Sample Request</Text>
            </TouchableOpacity>
          </ScrollView>
          <Modal
            isVisible={isvisible}
            useNativeDriver={true}
            onBackButtonPress={() => this.setState({isvisible: false})}
            onBackdropPress={() => this.setState({isvisible: false})}
          >
            <View style={{height: '80%', width: '100%'}}>
              <Postcode
                style={{flex: 1}}
                jsOptions={{animated: false}}
                onSelected={data => {
                  this.setState({dlvy_adres_no:'0',destination: data.address, isvisible: false})
                }}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
)(SampleRequestsScreen)
