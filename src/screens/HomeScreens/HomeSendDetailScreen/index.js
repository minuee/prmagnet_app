import React, {PureComponent} from 'react';
import {SafeAreaView, FlatList, View, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { ButtonGroup} from 'react-native-elements'
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';
import Empty from '../../common/Empty';

class HomeDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: [], 
      page: 0, 
      limit: 30, 
      total_count: 0, 
      loading: false,
      moreLoading : false,
      justonce : true,
      leftData : [],
      screenData : [],
      leftShowroomData : [],
      newLeftShowroomIdxArray : [],
      selectedIndex: 0,
      selectedIndex2: 0
    }
  }

  componentDidMount() {
    const {title} = this.props.route.params
    this.pushOption(title)
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    const {type} = this.props.route.params;
    const {selectedIndex,selectedIndex2} = this.state;
    this.setData(this.props.route.params?.screenData,selectedIndex,selectedIndex2)
  }

  setData = async(screenData,selectedIndex,selectedIndex2) => {
    let sendoutData = [];
    console.log('screenData',selectedIndex,selectedIndex2, screenData)  
    let newLeftShowroomIdxArray = [];
    if ( !mUtils.isEmpty(screenData) ) {
        let newLeftIdxArray = [];
        let newLeftArray = [];
        if ( selectedIndex == 0 ) {
          screenData.forEach((element,index) => {
            let req_no = element.showroom_list[0].req_no;
            let isIncludesBrand = element.showroom_list.filter((element2) => element2.target_id_type == 'RUS000');
            if ( !newLeftIdxArray.includes(req_no)) {
                newLeftIdxArray.push(req_no);
                if ( selectedIndex2 == 0 || isIncludesBrand.length > 0) {
                  newLeftArray.push(element?.showroom_list)
                }
            }
            if ( !newLeftShowroomIdxArray.includes(req_no)) {
                newLeftShowroomIdxArray.push({req_no :req_no, showroom_no: element.showroom_list[0].showroom_no});
            }
          })  
          console.log('newLeftArray',newLeftArray?.length)  
          sendoutData = newLeftArray;
        }else{
          screenData.forEach((telement,tindex) => {
            let isIncludesBrand = telement.showroom_list.filter((element2) => element2.target_id_type == 'RUS000');
            telement.showroom_list.forEach((element,index) => {
              if ( selectedIndex2 == 0 || isIncludesBrand.length > 0) { 
                newLeftArray.push(element)
                newLeftShowroomIdxArray.push({req_no :element.req_no, showroom_no: element.showroom_no});
              }
              
            })
          })  
          console.log('newLeftArray2222',newLeftArray?.length)  
          sendoutData = newLeftArray;

        }
    }
    console.log('sendoutData',sendoutData?.length)  
    this.setState({
      screenData,
      data: sendoutData,
      newLeftShowroomIdxArray,
      loading : false,
    })
  }

  goDetail =  async(subItem) => {
    ///console.log('goDetail',subItem)     
    const date = mUtils.getToday();
    let newSdata = [];
    this.state.newLeftShowroomIdxArray.forEach((element) => {
      if ( this.state.selectedIndex ==  0 ) {
        if (  subItem.req_no == element.req_no) {
          newSdata.push(element.showroom_no);
        } 
      }else{
        if (  subItem.req_no == element.req_no && subItem.showroom_no ==  element.showroom_no) {
          newSdata.push(element.showroom_no);
        }
      }
        
    }) 
    ////console.log('newSdata',newSdata)     
    const selectDate2 = [{date : date,showroom_list : newSdata,req_no_list : [subItem.req_no]}]    
    this.pushTo('SendOutBScreen', {selectEachList:selectDate2})
}

  
  renderPickupItem = ({item}) => {
    const subItem = item?.length > 0 ? item[0] :  item;
    /////console.log('item',subItem)  
    return (
      <TouchableOpacity
          key={subItem.req_no+'_'+subItem.showroom_no}
          style={styles.layout3}
          //onPress={() => this.pushTo('SendOutBScreen', {reqNo: subItem.req_no})}
          onPress={() =>  this.goDetail( subItem)}
      >
          {
              subItem.req_user_type === 'MAGAZINE' ?
              <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                  {subItem.req_company_nm}
              </Text>               
              :
              <Text style={{...styles.name,color:'rgba(178, 126, 126, 1)'}}>
                  {subItem.brand_nm}
              </Text> 
          }                            
          <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
            {subItem.target_id_type === "RUS001" && "["+subItem.mgzn_nm+"]"}{subItem.target_user_nm}{mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position} →
          </Text>
          <Text style={{...styles.name, marginTop: mUtils.wScale(2)}}>
              {subItem.req_user_nm}{mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position}
          </Text>
      </TouchableOpacity>
    )
      
  }

  updateIndex = (idx) => {
    if ( idx != this.state.selectedIndex ) {
      this.setState({selectedIndex:idx})
      this.setData(this.state.screenData,idx,this.state.selectedIndex2)
    }
  }
  updateIndex2 = (idx) => {
    if ( idx != this.state.selectedIndex2 ) {
      this.setState({selectedIndex2:idx})
      this.setData(this.state.screenData,this.state.selectedIndex,idx)
    }
  }

  render() {
    const {data, total_count, loading,selectedIndex,selectedIndex2} = this.state;
    const {type} = this.props.route.params;
    const buttons = ['요청건별', '쇼룸별'];
    const buttons2 = ['전체', '브랜드'];
    return (
      <>
        <SafeAreaView style={styles.container}>
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Send Outs</Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}> {data.length}</Text>
              </Text>
            </View>
            <View
              style={{
                ...styles.layout1,
                marginTop: mUtils.wScale(15),height: mUtils.wScale(30)
              }}
            >
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: mUtils.wScale(30),}}
                  selectedButtonStyle={{backgroundColor:'#000'}}
                />
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ButtonGroup
                  onPress={this.updateIndex2}
                  selectedIndex={selectedIndex2}
                  buttons={buttons2}
                  containerStyle={{height: mUtils.wScale(30),}}
                  selectedButtonStyle={{backgroundColor:'#000'}}
                />
              </View>
            </View>
        
          <View
            style={{
              ...styles.layout2,
              backgroundColor: type !== 'request' ? 'rgba(178, 126, 126, 0.2)' : 'rgba(126, 161, 178, 0.2)',
              marginBottom: mUtils.wScale(50),
              flex: data.length === 0 ? 1 : 0,
            }}
          >
            {loading ? (
              <Loading />
            ) : data.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                style={{flexDirection: 'column'}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data}
                renderItem={this.renderPickupItem}
                keyExtractor={item => `_${item.req_no}_${Math.random()}`}
                onEndReachedThreshold={1}
              />
            )}
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(HomeDetailScreen)
