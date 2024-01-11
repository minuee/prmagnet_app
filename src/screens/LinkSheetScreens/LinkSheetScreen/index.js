import React, {PureComponent} from 'react';
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import _ from 'lodash';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import dayjs from 'dayjs';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import API from '../../../common/aws-api';
import Text from '../../common/Text';
import Header from '../../common/Header';
import Empty from '../../common/Empty';
import Loading from '../../common/Loading';
import NonSubscribe from '../../common/NonSubscribe';
import styles from './styles';
import MoreLoading from '../../common/MoreLoading';

const moreImg = require('../../../images/navi/more_4.png');
const schedulerImg = require('../../../images/navi/scheduler_1.png');
const checkImg = require('../../../images/navi/check_6.png');
const noCheckImg = require('../../../images/navi/no_check_3.png');
const settingImg = require('../../../images/navi/setting_1.png');
class LinkSheetScreen extends React.Component {
    constructor(props) {
        super(props);
        cBind(this);
        const titles = mConst.getUserType() === 'B' ? ['Send Out', 'Return'] : ['Pickups', 'Send Out'] // TODO 임시 주석처리
        this.state = {
            start: mUtils.getThreePrevDay(),////mUtils.getToday(),
            end: mUtils.getThreeNextDay(),
            // start: mUtils.getDayValue(2021, 7, 25), // TODO 테스트 데이타 관계로 일단 임시 값으로 설정
            // end: mUtils.getDayValue(2021, 8, 7),
            brandId: '',
            dataList: [],
            brands: [],
            titles,
            selectTitle: titles[0],
            loading: true,
            moreLoading:false,
            selectDate: [],
            totalCount: 0,
            isNotClear : 'all'
        }
    }

    async UNSAFE_componentWillMount() {
        this.handleOnFocus();
        //this.onFocus(this.handleOnFocus);
    }
    componentDidMount() {
        
        //console.log('###apiPath:', mConst.getApiPath())
    }

    componentWillUnmount() {
       // this.removeFocus();
    }

    handleOnFocus = params => {
        const moreLoading = this.state.moreLoading;
        this.setState({selectDate:[],totalCount:0})
        if ( this.props.user.subScrbeStatus ) {
            this.setState({loading: moreLoading? false : true}, () => {
                const {brandId} = this.state;
                const {start, end} = _.get(this.props, 'route.params', {}) // onFocus에서는 이렇게 불러와야 함 navigation.js 33번째 줄 참조
                if (start && end) {
                    this.handleLoadData(start, end, brandId,this.state.isNotClear)
                    this.setState({start, end})
                } else {
                    this.handleLoadData(this.state.start, this.state.end, brandId,this.state.isNotClear)
                }
            })
        }else{
            this.setState({data: null,loading:false})
        }
    }

    dataReset = async(data) => {  
        let newDataArray = [];
        data.forEach(async(topelement) => {
            let newLeftIdxArray = [];
            let newLeftArray = [];      
            let showroomData = [];      
            await topelement.each_list.forEach((element) => {
              if ( !newLeftIdxArray.includes(element.showroom_list[0].req_no)) {
                newLeftIdxArray.push(element.showroom_list[0].req_no);
                newLeftArray.push(element)
              }
              showroomData.push({reqNo : element.showroom_list[0].req_no , showroom_no : element.showroom_list[0].showroom_no});  
              })
            newDataArray.push({
              date : topelement.date,
              day : topelement.day,
              month : topelement.month,
              year : topelement.year,
              each_list : newLeftArray,
              showroomData
            })
        })
        return newDataArray;
    }


    handleLoadData = async (start, end, brandId,not_finished='all') => {
        const {selectTitle} = this.state;
        if (selectTitle === 'Return') {
            try {

                const response = await API.getReturnSchedule({start_date: start, fin_date: end,not_finished})
                const newData =  await this.dataReset(_.get(response, 'list', []));
                this.setState({dataList: newData, loading: false,moreLoading:false})
                //this.setState({dataList: _.get(response, 'list', []), loading: false,moreLoading:false})
  
            } catch (error) {
                this.setState({loading: false,moreLoading:false})
  
            }
        } else if (selectTitle === 'Pickups') {
            try {

                const response = await API.getPickupSchedule({start_date: start, fin_date: end, brand_id: brandId,not_finished})
                const newData =  await this.dataReset(_.get(response, 'list', []));
                this.setState({dataList: newData, loading: false,moreLoading:false})
                //this.setState({dataList: _.get(response, 'list', []), loading: false,moreLoading:false})

            } catch (error) {
                this.setState({loading: false,moreLoading:false})

            }
        } else if (selectTitle === 'Send Out') {
            try {
    
                const response = await API.getSendoutSchedule({start_date: start, fin_date: end, brand_id: brandId,not_finished})
                const newData =  await this.dataReset(_.get(response, 'list', []));
                this.setState({dataList: newData, loading: false,moreLoading:false})
                //this.setState({dataList: _.get(response, 'list', []), loading: false,moreLoading:false})

            } catch (error) {
                this.setState({loading: false,moreLoading:false})
                console.log('Sendout 스케쥴 조회 실패', error)
            }
        }
    }

    handleSetDates = ({start, end}) => {
        if (start && end) {
            this.setState({start, end})
            this.handleLoadData(start,end,this.state.brandId)
        }
    }

    handleChangeSchedule = () => {
        const {start, end} = this.state;
        this.pushTo('SelectScheduleScreen', {setDate: this.handleSetDates, start, end, caller: 'LinkSheetScreen'})
    }

    handleChangeTitle = item => {
        this.setState({selectTitle: item, selectDate: [], totalCount: 0,moreLoading:true}, this.handleOnFocus)
    }

    handleLinkSheetDetail = async() => {
        const {selectTitle, selectDate, dataList} = this.state;
        const selectDate2 = await selectDate.sort(function(a, b) {
            return a.date > b.date;
        });
        if (selectTitle === 'Send Out') {
            if ( mConst.getUserType() == 'B' ) {
                this.pushTo('SendOutBScreen', {selectEachList:selectDate2})
            }else{
                this.pushTo('SendOutScreen', {selectEachList:selectDate2})
            }            
        } else if (selectTitle === 'Pickups') {
            this.pushTo('PickupsScreen', {selectEachList:selectDate2})
        } else if (selectTitle === 'Return') {
            this.pushTo('ReturnScreen', {selectEachList:selectDate2})
        }
    }

    
   /*  const {selectTitle} = this.state;
    let openDatetime = Math.floor(new Date()/1000);// + (60*60*9);
    const koreaSdata = date - (60*60*9);
    const itemWeeklyNo = dayjs.unix(koreaSdata).format("d");
    const nowWeeklyNo = dayjs.unix(openDatetime).format("d");
    console.log('nohhandleEachDetail itemWeeklyNo',itemWeeklyNo )
    console.log('nohhandleEachDetail nowWeeklyNo',nowWeeklyNo )
    if ( itemWeeklyNo == 6  ) { //토요앨
    openDatetime = Math.floor(new Date()/1000) + (60*60*33);
    }else if ( itemWeeklyNo == 0) { //일요일
    openDatetime = Math.floor(new Date()/1000) + (60*60*57);
    }else{
    openDatetime = Math.floor(new Date()/1000) + (60*60*9);
    }
    console.log('nohhandleEachDetail',mUtils.convertDateToUnix(date),openDatetime )
    if ( selectTitle === 'Pickups' && date >  openDatetime ) {
        this.alert('픽업일이후부터 조회가 가능합니다.');
        return;
    }
    if ( selectTitle === 'Send Out' && mUtils.convertDateToUnix(date) > Math.floor(new Date()/1000) && mConst.getUserType()  != 'B' ) {
        this.alert('촬영일이후부터 조회가 가능합니다.');
        return;
    }
 */
   
    handleLinkSheetDetailEach = async(req_no,showroomData,date, sdate = null) => {
        const {selectTitle} = this.state;
        
        if ( selectTitle === 'Pickups' ) {
            let openDatetime = Math.floor(new Date()/1000) - (60*60*9);
            const koreaSdata = date + (60*60*9);
            const itemWeeklyNo = dayjs.unix(koreaSdata).format("d");
            const nowWeeklyNo = dayjs.unix(openDatetime).format("d");
            if ( itemWeeklyNo == 6  ) { //토요앨
                openDatetime = Math.floor(new Date()/1000) + (60*60*33);
            }else if ( itemWeeklyNo == 0) { //일요일
                openDatetime = Math.floor(new Date()/1000) + (60*60*57);
            }else if ( itemWeeklyNo == 1) { //월요일
                openDatetime = Math.floor(new Date()/1000) + (60*60*81);
            }else{
                openDatetime = Math.floor(new Date()/1000) + (60*60*9);
            }
            console.log('date > openDatetime ',date ,openDatetime  )
            if (  date > openDatetime ) {
                this.alert('픽업일이후부터 조회가 가능합니다.');
                return;
            }
        }
        if ( selectTitle === 'Send Out' ) {
            console.log('nohhandleEachDetail d22te',selectTitle,mUtils.convertDateToUnix(sdate))
            console.log('nohhandleEachDetail d22te',selectTitle,Math.floor(new Date()/1000))

            let openDatetime = Math.floor(new Date()/1000) - (60*60*9);
            const koreaSdata = mUtils.convertDateToUnix(sdate) + (60*60*9);
            const itemWeeklyNo = dayjs.unix(koreaSdata).format("d");
            console.log('nohhandleEachDetail itemWeeklyNo',itemWeeklyNo)
            if ( itemWeeklyNo == 6  ) { //토요앨
                openDatetime = Math.floor(new Date()/1000) + (60*60*33);
            }else if ( itemWeeklyNo == 0) { //일요일
                openDatetime = Math.floor(new Date()/1000) + (60*60*57);
            }else if ( itemWeeklyNo == 1) { //월요일
                openDatetime = Math.floor(new Date()/1000) + (60*60*81);
            }else{
                openDatetime = Math.floor(new Date()/1000) + (60*60*9);
            }
            console.log('ddddd', mUtils.convertDateToUnix(sdate),openDatetime)
            if ( mUtils.convertDateToUnix(sdate) > openDatetime && mConst.getUserType()  != 'B' ) {
                this.alert('촬영일이후부터 조회가 가능합니다.');
                return;
            }
        }
        let newShowroomIdxArray = [];
        await showroomData.forEach((element) => {
          if ( req_no == element.reqNo) {
            newShowroomIdxArray.push(element.showroom_no);
          }
        })     
        const selectDate2 = [{date,showroom_list : newShowroomIdxArray,req_no_list : [req_no]}]
        if (selectTitle === 'Send Out') {
            if ( mConst.getUserType() == 'B' ) {
                this.pushTo('SendOutBScreen', {selectEachList:selectDate2})
            }else{
                this.pushTo('SendOutScreen', {selectEachList:selectDate2})
            }
        } else if (selectTitle === 'Pickups') {
            this.pushTo('PickupsScreen', {selectEachList:selectDate2})
        } else if (selectTitle === 'Return') {
            this.pushTo('ReturnScreen', {selectEachList:selectDate2})
        }
    }

    fn_selectDate = async(data) => {
        const count = data.each_list.length;        
        const {selectDate, totalCount} = this.state;        
        let showroomData = [];
        let reqNoData = [];
        await data.each_list.forEach((item,i) => 
            {
                showroomData.push(item.showroom_list[0].showroom_no);
                reqNoData.push(item.showroom_list[0].req_no);;
            }
        )        
        let op = await selectDate.filter(item => (item.date === data.date));
        if (op.length === 0) {
            this.setState({
                selectDate: [...selectDate,{date:data.date,showroom_list : showroomData,req_no_list : reqNoData}],
                totalCount: totalCount + Number(count)                
            })
        } else {            
            this.setState({
                selectDate:  selectDate.filter((d) => d.date !== data.date), 
                totalCount: totalCount - Number(count)
            })
        }
    }

    handleStateChange = async(bool) => {

        this.setState({moreLoading:true, isNotClear:bool=='all'?'not':'all'})
        this.handleLoadData(this.state.start, this.state.end, this.state.brandId,bool=='all'?'not':'all')
    }

    renderData = (subItem,idx,selectTitle) => {

        if (  mConst.getUserType() === 'B'  ) {
            if ( selectTitle === 'Send Out' ) {
                return (
                    <>
                        <Text style={{...styles.brand, marginTop: mUtils.wScale(5)}} >
                            {mUtils.isEmpty(subItem.target_user_nm) ? '-' : subItem.target_user_nm}
                            { subItem.target_id_type === 'RUS001' ? " "+subItem.target_user_position + "("+subItem.target_company_nm +")"
                            :
                            " "+subItem.target_user_position
                            }
                        </Text>
                        <Text style={{...styles.name, fontFamily: mConst.getUserType() === 'B' ? 'NotoSansKR-Bold' : 'NotoSansKR-Regular'}}>
                        → {subItem.req_user_nm} {subItem.req_user_position}
                        </Text>
                        
                    </>
                )
            }else{
                return (
                    <>
                        <Text style={{...styles.name, fontFamily: 'NotoSansKR-Bold'}}>
                        
                            {subItem.req_user_nm}{" "}{subItem.req_user_position} → 
                        </Text>
                        <Text style={{...styles.brand, marginTop: mUtils.wScale(5)}} >
                            {mUtils.isEmpty(subItem.target_user_nm) ? '-' :  " "+subItem.target_user_nm}
                            {subItem.target_id_type === 'RUS001' ? " "+subItem.target_user_position + "("+subItem.target_company_nm +")" :subItem.target_user_position}
                        </Text>
                        
                    </>
                )
            }
        }else{
            if ( selectTitle === 'Send Out' ) {
                return (
                    <>
                        <Text style={{...styles.name}}>
                            {subItem.req_user_nm} {mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position}  →
                            
                        </Text>
                        <Text style={{...styles.name, fontFamily:  'NotoSansKR-Bold'}}>
                            {subItem.target_user_nm} {mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position}
                        </Text>
                    </>
                )
            }else{
                return (
                    <>
                        <Text style={{...styles.name, fontFamily:  'NotoSansKR-Bold'}}>
                            {subItem.target_user_nm} {mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position} →
                        </Text>
                        <Text style={{...styles.name}}>
                            {subItem.req_user_nm} {mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position} {/* {subItem.req_user_position} */}
                        </Text>
                    </>
                )

            }
        }       
    }

    renderLogo =(subItem,idx,selectTitle) => {
        if (  mConst.getUserType() === 'B'  ) {
            if ( subItem.target_id_type === 'RUS000' ) {
                return (
                    <Text style={{...styles.name,color:'#555'}} >
                        {subItem.req_company_nm}
                    </Text>
                )
                /* return (
                    <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                ) */
            }else{
                return (
                    <Text style={{...styles.name,color:'#555'}}>
                        {subItem.req_company_nm}
                    </Text>
                )
                /* return (
                    <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                ) */
            }
        }else{
            if ( subItem.target_id_type === 'RUS000' ) {
                return (
                    <Text style={{...styles.name, fontFamily:  'NotoSansKR-Bold'}}>
                        {subItem.brand_nm}
                    </Text>
                )
            }else{
                return (
                    <Text style={{...styles.name, fontFamily:  'NotoSansKR-Bold'}}>
                        {subItem.target_company_nm}
                    </Text>
                )
                /* return (
                    <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                ) */
            }

        }
    }
    /* <Menu>
    <MenuTrigger
        customStyles={{
            TriggerTouchableComponent: TouchableOpacity,
            triggerTouchable: {activeOpacity: 90,style: {width: '45%',},},
        }}
    >
        <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(20), marginBottom: mUtils.wScale(30)}}>
            <Text style={styles.mainTitle}>{selectTitle}</Text>
            <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
        </View>
    </MenuTrigger>
    <MenuOptions optionsContainerStyle={styles.menuOptions}>
        {
            this.state.titles.map((item, index) => {
            return (
                <MenuOption 
                    key={index} 
                    style={styles.menuOption} 
                    onSelect={() => this.handleChangeTitle(item)}
                >
                    <Text style={styles.menuText}>{item}</Text>
                </MenuOption>
            )
            })
        }
    </MenuOptions>
</Menu> */
    render() {
        const {start, end, brandId, dataList, brands, selectTitle, loading, selectDate, totalCount} = this.state;
        const {user} = this.props;        
        if ( this.state.loading  ) {
            return (
                <Loading />
            )
        }else{
            return (
                <SafeAreaView style={styles.container}>
                    <Header pushTo={this.pushTo} userType={user.userType} alarmSet={user.alarm} />
                    { 
                        this.props.user.subScrbeStatus ?
                        
                        (
                        <View style={styles.menuDefaultWrap}>
                            {
                                this.state.titles.map((item, index) => {
                                return (
                                    <TouchableOpacity 
                                        style={selectTitle == item ? styles.menuSelectBox :styles.menuDefaultBox} 
                                        onPress={()=>this.handleChangeTitle(item)}
                                        key={index}
                                    >
                                        <Text style={{color:'#fff'}}>{item == 'Pickups' ? "픽업시트" : item == 'Send Out' ? "발송시트" : "반납시트"} </Text>
                                    </TouchableOpacity>
                                )
                                })
                            }
                        </View>
                        )
                        :
                        <NonSubscribe />
                    }
                    {
                        this.props.user.subScrbeStatus &&
                        <>
                            <View style={{justifyContent:'flex-end',flexDirection:'row',paddingHorizontal:20,paddingBottom:5}}>
                                { ( selectTitle === "Send Out" || selectTitle === "sendout" )  
                                ?
                                mConst.getUserType() === 'B'  ?
                                <>
                                    <View style={styles.defaultBox2}>
                                        <Text style={{color:'#cccccc'}}>■ <Text style={{color:'#000'}}>발송완료</Text></Text>
                                    </View>
                                    <TouchableOpacity style={this.state.isNotClear == 'all' ? styles.defaultBox : styles.checkBox} onPress={()=>this.handleStateChange(this.state.isNotClear)}>
                                        <Text style={{color:'#ed6c59'}}>■ 미발송</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.defaultNoneBox} onPress={() => {this.pushTo('SheetSettingScreen') }} >
                                        <FastImage resizeMode={'contain'} style={styles.settingImg} source={settingImg} />
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <View style={styles.defaultBox2}>
                                        <Text style={{color:'#cccccc'}}>■ <Text style={{color:'#000'}}>반납완료</Text></Text>
                                    </View>
                                    <TouchableOpacity style={this.state.isNotClear == 'all' ? styles.defaultBox : styles.checkBox} onPress={()=>this.handleStateChange(this.state.isNotClear)}>
                                        <Text style={{color:'#ed6c59'}}>■ 미반납</Text>
                                    </TouchableOpacity>
                                </> 
                                :
                                ( selectTitle === "Pickup" || selectTitle === "Pickups" ) 
                                ?
                                <>
                                    <View style={styles.defaultBox2}>
                                        <Text style={{color:'#cccccc'}}>■ <Text style={{color:'#000'}}>수령완료</Text></Text>
                                    </View>
                                    <TouchableOpacity style={this.state.isNotClear == 'all' ? styles.defaultBox : styles.checkBox} onPress={()=>this.handleStateChange(this.state.isNotClear)}>
                                        <Text style={{color: this.state.isNotClear == 'all' ? '#ed6c59' : '#ed6c59'}}>■ 미수령</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <View style={styles.defaultBox}>
                                        <Text style={{color:'#cccccc'}}>■ <Text style={{color:'#000'}}>반납완료</Text></Text>
                                    </View>
                                    <TouchableOpacity style={this.state.isNotClear == 'all' ? styles.defaultBox : styles.checkBox} onPress={()=>this.handleStateChange(this.state.isNotClear)}>
                                        <Text style={{color:'#ed6c59'}}>■ 미반납</Text>
                                    </TouchableOpacity>
                                </>
                                }
                            </View>
                            <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
                                <View style={styles.layout1}>
                                    <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
                                    <Text style={styles.date}>
                                        {mUtils.getShowDate(start, 'YYYY/MM/DD')} - {mUtils.getShowDate(end, 'YYYY/MM/DD')}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.handleChangeSchedule}>
                                    <Text style={styles.change}>변경</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{paddingBottom: mUtils.wScale(25)}}>
                                {
                                dataList.length == 0 ?
                                <Empty />
                                :
                                _.map(dataList, (item, index) => {     
                                let op2 = selectDate.filter(dItems => (dItems.date === item.date));                               
                                return (
                                    <View key={index} style={{width: '100%', marginTop: mUtils.wScale(25)}}>
                                        <View
                                            //onPress={() => this.fn_selectDate(item)}
                                            style={{...styles.layout1, marginBottom: mUtils.wScale(15), paddingHorizontal: mUtils.wScale(20)}}
                                        >
                                            <Text style={{...styles.subDt}}>
                                                {mUtils.getShowDate(item.date)}
                                                <Text style={{fontSize: 16}}>
                                                    : <Text style={{fontSize: 16, color: '#7ea1b2'}}>{item.each_list.length}</Text>
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={{...styles.layout, flexWrap: 'wrap', paddingHorizontal: mUtils.wScale(20)}}>
                                    {
                                    _.map(item.each_list, (subItem2, subIndex) => {
                                        
                                        if ( !mUtils.isEmpty(subItem2.showroom_list[0])) {
                                            const subItem = subItem2.showroom_list[0];     
                                        
                                            if ( selectTitle === "Send Out" || selectTitle === "sendout" )    {
                                                return (
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        style={styles.brandBox}
                                                        onPress={() =>this.handleLinkSheetDetailEach(subItem.req_no,item.showroomData,item.date, subItem.photo_sdate)}
                                                        //onPress={() =>this.pushTo(mConst.getUserType() == 'B' ? 'SendOutBScreen' : 'SendOutScreen',{reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
                                                    >     
                                                        { mConst.getUserType() == 'B' ?                                                   
                                                            <View style={{...styles.box1, backgroundColor: ( subItem.sendout_yn || subItem.target_id_type === 'RUS001' ) ? mUtils.isEmpty(subItem.mgzn_color) ? '#ddd' : subItem.mgzn_color : '#ed6c59'}}>
                                                                {this.renderLogo(subItem,subIndex,selectTitle)}
                                                            </View>
                                                        :
                                                            <View style={{...styles.box1, backgroundColor:  subItem.return_yn ? mUtils.isEmpty(subItem.brand_color) ? '#ddd' : subItem.brand_color : '#ed6c59'}}>
                                                            {this.renderLogo(subItem,subIndex,selectTitle)}
                                                        </View>
                                                        }
                                                        <View style={styles.box2}>
                                                            {this.renderData(subItem,subIndex,selectTitle)}
                                                        </View>
                                                    </TouchableOpacity>
                                                )

                                            }else if ( selectTitle === "Pickup" || selectTitle === "Pickups" )  {
                                                return (
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        style={styles.brandBox}
                                                        //onPress={() =>this.pushTo('PickupsScreen',{reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
                                                        onPress={() =>this.handleLinkSheetDetailEach(subItem.req_no,item.showroomData,item.date)}
                                                    >                                                        
                                                        <View style={{...styles.box1, backgroundColor: ( subItem.pickup_yn || subItem.target_id_type === 'RUS001' ) ? mUtils.isEmpty(subItem.brand_color) ? '#ddd' :subItem.brand_color : '#ed6c59'}}>
                                                            {this.renderLogo(subItem,subIndex,selectTitle)}
                                                        </View>
                                                        
                                                        <View style={styles.box2}>
                                                            {this.renderData(subItem,subIndex,selectTitle)}
                                                        </View>
                                                    </TouchableOpacity>
                                                )

                                            }else { //REturn                   
                                                return (
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        style={styles.brandBox}
                                                        onPress={() =>this.handleLinkSheetDetailEach(subItem.req_no,item.showroomData,item.date)}
                                                        //onPress={() =>this.pushTo('ReturnScreen',{reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
                                                    >
                                                        <View style={{...styles.box1, backgroundColor:  ( subItem.returncheck_yn || (subItem.return_yn && subItem.return_user_magazine )) ? mUtils.isEmpty(subItem.mgzn_color) ? '#ddd' :subItem.mgzn_color : '#ed6c59'}}>
                                                            {this.renderLogo(subItem,subIndex,selectTitle)}
                                                        </View>
                                                        
                                                        <View style={styles.box2}>
                                                            {this.renderData(subItem,subIndex,selectTitle)}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        }
                                        })
                                    }
                                    </View>
                                </View>
                                )
                                })
                            }
                        </ScrollView>
                    </>
                }
                {
                    selectDate.length > 0 && (
                    <View style={styles.bottomSheet}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={{...styles.bottomText1}}>Total Number of </Text>
                                <Text style={{...styles.bottomText1, fontFamily: 'Roboto-Bold', alignSelf: 'flex-end'}}>{this.state.selectTitle} : </Text>
                            </View>
                            <Text style={{...styles.bottomText2, marginLeft: mUtils.wScale(3)}}>{totalCount}</Text>
                        </View>
                        <TouchableOpacity style={styles.bottomButton} onPress={() => {this.handleLinkSheetDetail()}}>
                            <Text style={{...styles.bottomText3}}>Create Document</Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
                { this.state.moreLoading &&
                    <MoreLoading />
                }
            </SafeAreaView>
            )
        }
    }
}

export default connect(
    state => ({user: state.user,}),
    dispatch => ({})
)(LinkSheetScreen)
