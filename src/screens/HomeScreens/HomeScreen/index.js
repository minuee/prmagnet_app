import React, {PureComponent} from 'react';
import {AppState, SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';
import 'moment/locale/ko';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {isLoggedIn} from '../../../common/aws-auth';
import {actionLogout, actionSetAlarm} from '../../../redux/actions';
import CodePush from '../../common/CodePushNew';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import API from '../../../common/aws-api';
import Text from '../../common/Text';
import Header from '../../common/Header';
import styles from './styles';
import Loading from '../../common/Loading';
import Empty from '../../common/Empty';
import NonSubscribe from '../../common/NonSubscribe';

import PopupScreen from './Popup';

const moreImg = require('../../../images/navi/more_5.png')

class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        cBind(this);
        this.state = {
            loading : true,
            showPopUp : false,
            isSubScrbing : false,
            data: '',
            justonce : true,
            leftData : [],
            leftShowroomData : []
        }
    }

    componentDidMount() {
        const {user} = this.props
        global.mUserType = user.userType;
        global.subScrbeStatus = user.subScrbeStatus;
        
        // FCM 설정(PUSH 권한 요청)
        this.setupFcm()
        this.onFocus(this.handleOnFocus)

        const userType = mConst.getUserType();
        console.log("userType",userType)
        if (  userType != 'B') {
            this.onPopUpNotice();
        }
    }

    componentWillUnmount() {
        this.removeFocus()
    }


    onPopUpNotice = async () => {
        const today = new Date();
        const limitDayTime = 1704067199000;
        const todayTimeStamp = new Date().getTime();
        const HOME_VISITED = await AsyncStorage.getItem('homeVisited'); 
        console.log("historyLogin",todayTimeStamp,today,HOME_VISITED)
        if ( limitDayTime > todayTimeStamp ) {
            if (HOME_VISITED && HOME_VISITED > today) {
                // 현재 date가 localStorage의 시간보다 크면 return
                return;
            }
            if (!HOME_VISITED || HOME_VISITED < today) {
                // 저장된 date가 없거나 today보다 작다면 popup 노출
                this.setState({
                    showPopUp: true
                })
            }
        }else{
            this.setState({
                showPopUp: false
            })
        }
    }

    handleOnFocus = async () => {
        if ( this.props.user.subScrbeStatus ) {
            this.getHome()
        }else{
            this.setState({data: null,loading:false,isSubScrbing:false})
        }
        if (!(await isLoggedIn())) {
            this.props.logout()
        }
    }

    getHome = async () => {
        const date = mUtils.getToday();
        try {
            const response = await API.getHome({date: date})
            console.log('getHome111',_.get(response, 'release_schedules', []))
            //console.log('getHome222each_list',_.get(response, 'today_request', [])[0].each_list)
            //console.log('getHome333showroom_list',_.get(response, 'today_request', [])[0].each_list[0].showroom_list)
            this.setState({data: response,loading:false,isSubScrbing:true})
        } catch (error) {
            this.setState({data: null,loading:false,isSubScrbing:false})
            await API.postErrLog({error: JSON.stringify(error), desc: 'getHomeError'})
        }
    }

    goDetail =  async(reqNo,showroom_no) => {
        const date = mUtils.getToday();
        //let now = new Date();
        //let dayjsDate2 = new Date(now.setDate(now.getDate() - 1)).getTime();
            
        if ( mConst.getUserType() == 'B' ) {
            let newSdata = this.state.leftShowroomData.filter((item) => item.req_no == reqNo).map( item => {
                return item.showroom_no
            });
            ///console.log('newSdata',newSdata)
            const selectDate2 = [{date : date,showroom_list : newSdata,req_no_list : [reqNo]}]    
            this.pushTo('SendOutBScreen', {selectEachList:selectDate2})
        }else{            
            let newSdata = this.state.leftShowroomData.filter((item) => item.req_no == reqNo).map( item => {
                return item.showroom_no
            });
            const selectDate2 = [{date : date,showroom_list : newSdata,req_no_list : [reqNo]}]    
            this.pushTo('SendOutScreen', {selectEachList:selectDate2})
            //this.pushTo( 'SendOutScreen', {reqNo: reqNo,showroom_no: showroom_no})
        }
            
    }

    requests = () => {
        const {data} = this.state;
        const userType = mConst.getUserType();
        const requestData =  _.get(data, userType !== 'B' ? 'cnfirm_request' : 'new_request', []);
        console.log("requestData",requestData[0])
        return (
            <View >
                <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20)}}>
                    <Text style={styles.new}>
                    {userType !== 'B' ? 'Confirmed' : 'New'} <Text style={{fontFamily: 'Roboto-Medium'}}>Requests : </Text>
                        <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>
                            {requestData.length}
                        </Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.layout}
                        onPress={() => {this.pushTo('HomeDetailScreen', {type: 'request', title: userType !== 'B' ? 'Confirmed Requests' : 'New Sample Requests'})}}
                    >
                        <Text style={styles.more}>More</Text>
                        <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                </View>
            <View style={{...styles.layout2,backgroundColor: 'rgba(126, 161, 178, 0.2)',flex: requestData.length === 0 ? 0 : 1,flexDirection: requestData.length === 0 ? 'column' : 'row',justifyContent: requestData.length === 0 ? 'center' : 'space-between',flexWrap: requestData.length === 0 ? 'nowrap' : 'wrap'}}>
                {requestData.length > 0 ? (
                    requestData.map((item, index) => {
                    if ( index < 4) {
                    return (
                    <TouchableOpacity
                        onPress={() => {this.pushTo('SampleRequestsDetailScreen', {no: item.req_no})}}
                        //disabled={userType !== 'B' ? false : true}
                        key={index}
                        style={styles.layout3}
                    >
                        
                        <Text style={{...styles.name,color:'rgba(126, 161, 178, 1)'}}>
                            {userType === 'B' ? item.mgzn_nm : item.brand_nm}
                        </Text>
                        {/* <FastImage 
                            resizeMode={'contain'} 
                            style={styles.brandImg}
                            source={{uri: userType === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
                        /> */}
                        <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
                            {item.request_nm}{item.request_posi}
                        </Text>
                        <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
                            { userType === 'B' ? mUtils.getShowDate(item.req_dt, 'YYYY-MM-DD') : mUtils.getShowDate(item.photogrf_dt, 'YYYY-MM-DD')}
                            { (userType !== 'B' && item.photogrf_dt != item.photogrf_end_dt ) && "~"+mUtils.getShowDate(item.photogrf_end_dt, 'YYYY-MM-DD') }
                        </Text>
                       {/*  {userType === 'B' ? (
                            <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                                {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
                            </Text>
                        ) : (
                            <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
                        )} */}
                       {/*  <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>Sheet No:{item.req_no}</Text> */}
                    </TouchableOpacity>
                    )
                    }
                })
                ) : (
                    <Empty />
                )}
            </View>
        </View>
        )
    }

    releaseSchedule = () => {
        const {data} = this.state;
        const userType = mConst.getUserType();
        const requestData =  _.get(data, 'release_schedules', []);
        return (
            <View style={{ marginTop: mUtils.wScale(30)}}>
                <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20)}}>
                    <Text style={styles.new}>Today's 
                     <Text style={{fontFamily: 'Roboto-Medium'}}> Release Schedules : </Text>
                        <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>
                            {requestData.length}
                        </Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.layout}
                        onPress={() => {this.pushTo('HomeDetailScreen', {type: 'release', title: 'Release Schedules'})}}
                    >
                        <Text style={styles.more}>More</Text>
                        <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                </View>
            <View style={{...styles.layout2,backgroundColor: 'rgba(126, 161, 178, 0.2)',flex: requestData.length === 0 ? 0 : 1,flexDirection: requestData.length === 0 ? 'column' : 'row',justifyContent: requestData.length === 0 ? 'center' : 'space-between',flexWrap: requestData.length === 0 ? 'nowrap' : 'wrap'}}>
                {requestData.length > 0 ? (
                    requestData.map((item, index) => {
                    if ( index < 4) {
                    return (
                    <TouchableOpacity
                        onPress={() => {this.pushTo('SampleRequestsDetailScreen', {no: item.req_no})}}
                        //disabled={userType !== 'B' ? false : true}
                        key={index}
                        style={styles.layout3}
                    >
                        {/* <FastImage 
                            resizeMode={'contain'} 
                            style={styles.brandImg}
                            source={{uri: userType === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
                        /> */}
                        <Text style={{...styles.name,color:'rgba(126, 161, 178, 1)'}}>
                            {item.mgzn_nm}
                        </Text>
                        <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
                            {item.editor_nm}{item.editor_posi}
                        </Text>
                        <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
                            { userType === 'B' ? mUtils.getShowDate(item.req_dt, 'YYYY-MM-DD') : mUtils.getShowDate(item.photogrf_dt, 'YYYY-MM-DD')}
                            { (userType !== 'B' && item.photogrf_dt != item.photogrf_end_dt ) && "~"+mUtils.getShowDate(item.photogrf_end_dt, 'YYYY-MM-DD') }
                        </Text>
                       {/*  {userType === 'B' ? (
                            <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                                {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
                            </Text>
                        ) : (
                            <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
                        )} */}
                       {/*  <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>Sheet No:{item.req_no}</Text> */}
                    </TouchableOpacity>
                    )
                    }
                })
                ) : (
                    <Empty />
                )}
            </View>
        </View>
        )
    }

    todayPickups = () => {
        const {data} = this.state;
        const userType = mConst.getUserType();
        const today_request = _.get(data, 'today_request', []);
        return (
            <View>
                <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(40)}}>
                    <Text style={styles.new}>
                        Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Pickups : </Text>
                        <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}> {today_request.length > 0 ? today_request[0].each_list.length : 0}</Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.layout}
                        onPress={() => {this.pushTo('HomeDetailScreen', {type: 'pickups', title: "Today's Pickups"})}}
                    >
                        <Text style={styles.more}>More</Text>
                        <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                </View>
            <View
                style={{...styles.layout2,backgroundColor: 'rgba(178, 126, 126, 0.2)',flex: today_request.length === 0 ? 0 : 1,flexDirection: today_request.length === 0 ? 'column' : 'row',justifyContent:today_request.length === 0 ? 'center' : 'space-between',flexWrap: today_request.length === 0 ? 'nowrap' : 'wrap',}}
            >
                {today_request.length > 0 ? (
                    today_request[0].each_list.map((item, index) => {
                    const subItem = item.showroom_list[0];
                    let showroomData = [];
                    let reqNoData = [];
                    item.showroom_list.forEach((item,i) => 
                        {
                            showroomData.push(item.showroom_no);
                            reqNoData.push(item.req_no);;
                        }
                    )  
                    const todayDate = mUtils.getToday();
                    if ( index < 4) {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.layout3}
                                onPress={() => this.pushTo('PickupsScreen', {
                                    //reqNo: subItem.req_no,
                                    //showroom_no: subItem.showroom_no,
                                    selectEachList:[{
                                        date:todayDate,
                                        showroom_list : showroomData,
                                        req_no_list : reqNoData
                                    }]
                                })}
                            >
                                {
                                    subItem.target_id_type === 'RUS000' ?
                                    <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                        {subItem?.brand_nm}
                                    </Text>
                                    :
                                    subItem.target_id_type === 'RUS001' ?
                                    <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                        {subItem?.mgzn_target_nm}
                                    </Text>
                                    :
                                    <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                        {subItem?.mgzn_target_nm}
                                    </Text>
                                }                            
                                <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
                                    {/* {item.editor_nm} {item.editor_posi} */}
                                    {subItem.target_user_nm}{mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position} → 
                                </Text>
                                <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
                                    {subItem.req_user_nm}{subItem.req_user_position}
                                </Text>
                                {/* <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>{mUtils.getShowDate(today_request[0].date, 'YYYY-MM-DD')}</Text>
                                {userType === 'B' ? (
                                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
                                        {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
                                    </Text>
                                ) : (
                                    <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
                                )} */}
                            </TouchableOpacity>
                        )
                    }
                    })
                ) : (
                <Empty />
                )}
            </View>
        </View>
        )
    }
    todaySendOuts = () => {
        const {data} = this.state;
        const userType = mConst.getUserType();
        const today_sendout = _.get(data, 'today_sendout', []);
        console.log('today_sendout',today_sendout[0])
        const targetData = mUtils.isEmpty(today_sendout[0]?.each_list) ? [] : today_sendout[0]?.each_list;
        let newLeftIdxArray = [];
        let newLeftShowroomIdxArray = [];
        let newLeftArray = [];
        
        targetData.forEach((element,index) => {
            console.log('targetData',index)
            let req_no = element.showroom_list[0].req_no;
            if ( !newLeftIdxArray.includes(req_no)) {
                newLeftIdxArray.push(req_no);
                newLeftArray.push(element)
            }
            if ( !newLeftShowroomIdxArray.includes(req_no)) {
                newLeftShowroomIdxArray.push({req_no :req_no, showroom_no: element.showroom_list[0].showroom_no});
            }
        })          
        //console.log('newLeftShowroomIdxArray',newLeftShowroomIdxArray);
        if ( this.state.justonce ) {
            this.setState({
                leftData : newLeftArray,
                justonce : false,
                leftShowroomData :newLeftShowroomIdxArray
            }) 
        }
        
        return (
            <View >
                <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
                    <Text style={styles.new}>
                        Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Send Outs : </Text>
                        <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}> {targetData.length}</Text>
                    </Text>
                    <TouchableOpacity
                        style={styles.layout}
                        onPress={() => {this.pushTo('HomeDetailScreen', {type: 'sendout', title: "Today's Send Outs"})}}
                    >
                        <Text style={styles.more}>More</Text>
                        <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </TouchableOpacity>
                </View>
            <View
                style={{...styles.layout2,backgroundColor: 'rgba(178, 126, 126, 0.2)',flex: targetData.length === 0 ? 0 : 1,flexDirection: targetData.length === 0 ? 'column' : 'row',justifyContent:targetData.length === 0 ? 'center' : 'space-between',flexWrap: targetData.length === 0 ? 'nowrap' : 'wrap',}}
            >
                {   targetData.length > 0 ? (
                    targetData.map((item, index) => {
                    if ( index < 4) {
                        const subItem = item.showroom_list[0];
                        if ( userType === 'B') {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.layout3}
                                    onPress={() =>  this.goDetail( subItem.req_no, subItem.showroom_no)}
                                >
                                   {/*  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} /> */}
                                    <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                        {subItem?.req_company_nm}
                                    </Text>
                                    <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                                        {subItem.target_user_nm}{subItem.target_user_position} →
                                    </Text>
                                    <Text style={{...styles.name, marginTop: mUtils.wScale(2)}}>
                                        {subItem.req_user_nm}{mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position}
                                    </Text>  
                                    {/* <Text style={{...styles.custom, marginTop: mUtils.wScale(2)}}> Sheet No:{subItem.req_no}</Text>  */}
                                </TouchableOpacity>
                                
                            )
                        }else{
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.layout3}
                                    //onPress={() => this.pushTo(mConst.getUserType() == 'B' ? 'SendOutBScreen' : 'SendOutScreen', {reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
                                    onPress={() =>  this.goDetail( subItem.req_no, subItem.showroom_no)}
                                >
                                    {
                                        subItem.target_id_type === 'RUS000' ?
                                        <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                            {subItem?.brand_nm}
                                        </Text>
                                        :
                                        subItem.target_id_type === 'RUS001' ?
                                        <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                            {subItem?.mgzn_target_nm}
                                        </Text>
                                        :
                                        <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                                            {subItem?.mgzn_target_nm}
                                        </Text>
                                    }                            
                                    <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                                        {subItem.req_user_nm}{mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position}  →
                                    </Text>
                                    <Text style={{...styles.name, marginTop: mUtils.wScale(2)}}>
                                        {subItem.target_user_nm}{ mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position}
                                    </Text>   
                                    
                                    {/* <Text style={{...styles.custom, marginTop: mUtils.wScale(2)}}> Sheet No:{subItem.req_no}</Text>     */}                   
                                </TouchableOpacity>
                            )
                        }
                    }
                    })
                ) : (
                <Empty />
                )}
            </View>
        </View>
        )
    }

    setupFcm = async () => {
        const {setAlarm} = this.props;
        const fcmToken = await mUtils.getFcmToken();
        if (fcmToken) {
            const handleDataMessage = msg => {
                this.alert(_.get(msg, 'data.title'), _.get(msg, 'data.body'))
            }
            messaging().onMessage(message => {
                setAlarm({alarm: true});
                if (_.isEmpty(message.data)) {
                    this.alert(_.get(message, 'notification.title'), _.get(message, 'notification.body'))
                } else {
                    handleDataMessage(message);
                }
            })
            messaging().setBackgroundMessageHandler(message => {
                setAlarm({alarm: true});
                if (!_.isEmpty(message.data)) {
                    handleDataMessage(message)
                }
            })
        }
    }

    render() {
        const {user} = this.props;
        const {data,showPopUp} = this.state;
        if ( this.state.loading  ) {
            return (
                <Loading />
            )
        }else{
            return (
                <SafeAreaView style={styles.container}>
                    <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
                    <ScrollView contentContainerStyle={{flexGrow: 1, marginBottom: mUtils.wScale(37.5)}} bounces={false}>
                        <Text style={styles.screenTitleText}>Home</Text>
                        <>
                        {
                            this.props.user.subScrbeStatus
                            ?
                            data 
                            ? 
                            <>
                                {this.requests()}
                                {mConst.getUserType() != 'B' && this.todayPickups()}
                                {this.todaySendOuts()}
                                {mConst.getUserType() == 'B' && this.releaseSchedule()}
                            </>
                            :
                            <Empty />
                            :
                            <NonSubscribe />
                        }
                        </>
                        <View style={{height:50,width:'100%'}} />
                    </ScrollView>
                    <CodePush />
                    {
                        showPopUp && (
                            <PopupScreen
                                isModalVisible={showPopUp}
                                setModalVisible={() => this.setState({showPopUp:false})}
                            />
                        )
                    }
                </SafeAreaView>
            )
        }
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
)(HomeScreen)
