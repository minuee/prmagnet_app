import React, {PureComponent} from 'react';
import {SafeAreaView, FlatList, View, TouchableOpacity, ListView} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';

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
      moreLoading : false
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
    this.setState({loading: true}, () => {
      if (type === 'request') {
        this.getHomeNR(1);//M :confirm B : New Request
      } else {
        this.getHomeTR(1,type);//Pickup
      }
    })
  }

  getHomeNR = async (nextpage = 0) => {
    const {page, limit, total_count,data} = this.state;
    console.log('page, limit,>>>', page, limit,)
    if ( page * limit <= total_count ) {
      try {
        const response = mConst.getUserType() === 'B' ? await API.getHomeNR({page: nextpage, limit}) : await API.getHomeCR({page: nextpage, limit})
        console.log('getHomeNR>>>', response)
        if (response.success) {
          this.setState({loading: false}, () => {
            if (mConst.getUserType() === 'B') {
              if (response.new_request.length > 0) {
                this.setState({
                  data: data.concat(response.new_request),
                  page: nextpage + 1,
                  total_count: response.total_count,
                  loading: false,
                })
              }
            } else {
              if (response.list.length > 0) {
                this.setState({
                  data: data.concat(response.list),
                  page: nextpage + 1,
                  total_count: response.total_count,
                  loading: false,
                })
              }
            }
          })
        }
      } catch (error) {
        console.log('getHomeNR>>>1', JSON.stringify(error))
      }
    }else{
      this.setState({loading:false})
    }
  }

  getHomeTR = async (nextpage = 1,type) => {
    console.log('getHomeTR',type);
    const date = Math.floor(new Date().getTime() / 1000);
    const {page, limit, data,total_count} = this.state;
    let strType = 'SENDOUT';
    if ( mConst.getUserType() === 'B' ) {
      strType = type == 'sendout' ? 'SENDOUT' : 'RETURN';
    }else{
      strType = type == 'pickups' ? 'SENDOUT' : 'RETURN';
    }
    if ( page * limit <= total_count ) {
      try {
        const response = await API.getHomeTR({date: date, type : strType,page: nextpage, limit: limit})
        console.log('getHomeTR>>>', response)
        if (response.success) {
          this.setState({loading: false}, () => {
            /* if (mConst.getUserType() === 'B') {
              if (response.today_request.length > 0) {
                this.setState({
                  data: data.concat(response.today_request),
                  page: nextpage + 1,
                  total_count: response.total_count,
                })
              }
            } else { */
              if (response.list.length > 0) {
                this.setState({
                  data: data.concat(response.list),
                  page: nextpage + 1,
                  total_count: response.total_count,
                })
              }
            //}
          })
        }
      } catch (error) {
        console.log('getHomeTR>>>1', error)
      }
    }else{
      this.setState({loading: false,moreLoading:false});
    }
  }

  handleLoadMore = async () => {
    const {type} = this.props.route.params;
    const {limit, total_count, page} = this.state;
    console.log('handleLoadMore>>>1', limit, total_count, page)
    if ( page * limit < total_count ) {
      const nextpage = page + 1;
      if (type === 'request') {
        this.getHomeNR(nextpage);
      } else {
        this.getHomeTR(nextpage,type);

      }
    }
  }

  

  renderItem = ({item}) => {
    const {type, title} = this.props.route.params
    const userType = mConst.getUserType()
    return (
      <TouchableOpacity
        onPress={() => {
          this.pushTo('SampleRequestsDetailScreen', {no: item.req_no})
        }}
        //disabled={title === 'Confirmed Requests' ? false : true}
        style={styles.layout3}
      >
        <FastImage
          resizeMode={'contain'}
          style={styles.brandImg}
          source={{uri: mConst.getUserType() === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
        />
        <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
          {item.editor_nm} {item.editor_posi}
        </Text>
        <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
          {' '}
          {mUtils.getShowDate(mConst.getUserType() === 'B' ? item.req_dt : item.brand_cnfirm_dt, 'YYYY-MM-DD')}
        </Text>
        {mConst.getUserType() === 'B' ? (
          <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
            {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
          </Text>
        ) : (
          <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
        )}
      </TouchableOpacity>
    )
  }

  renderPickupItem = ({item}) => {
    //console.log('rederrederreder',item);
    const {type, title} = this.props.route.params;
    const userType = mConst.getUserType();
    const subItem = item.each_list[0];
    console.log('subItem',type,subItem)
    if (  type === 'pickups' ) {
      return (
        <TouchableOpacity
            key={subItem.req_no+'_'+subItem.showroom_no}
            style={styles.layout3}
            onPress={() => this.pushTo('PickupsScreen', {reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
        >
            {
                subItem.req_user_type === 'MAGAZINE' ?
                subItem.target_id_type === "RUS001" ?
                <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres2}} />
                :
                <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                :
                <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.brand_logo_adres}} />                
            }                            
            <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>              
                {subItem.target_user_nm} ({mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position}) → 
            </Text>
            <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
                {"   "} {subItem.req_user_nm}{subItem.req_user_position}
            </Text>          
        </TouchableOpacity>
      )
    }else{
      if (mConst.getUserType() === 'B' ) {
        return (
          <TouchableOpacity
              key={subItem.req_no+'_'+subItem.showroom_no}
              style={styles.layout3}
              onPress={() => this.pushTo('SendOutBScreen', {reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
          >
              {
                  subItem.req_user_type === 'MAGAZINE' ?
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />                
                  :
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.brand_logo_adres}} />
              }                            
              <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                {subItem.target_id_type === "RUS001" && "["+subItem.mgzn_nm+"]"}{subItem.target_user_nm} ({mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position}) →
              </Text>
              <Text style={{...styles.name, marginTop: mUtils.wScale(2)}}>
                  {subItem.req_user_nm} ({mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position})
              </Text>
          </TouchableOpacity>
        )
      }else{
        return (
          <TouchableOpacity
              key={subItem.req_no+'_'+subItem.showroom_no}
              style={styles.layout3}
              onPress={() => this.pushTo('SendOutScreen', {reqNo: subItem.req_no,showroom_no: subItem.showroom_no})}
          >
              {
                  subItem.req_user_type === 'MAGAZINE' ?
                  subItem.target_id_type === "RUS001" ?
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres2}} />
                  :
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.mgzn_logo_adres}} />
                  :                  
                  <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: subItem.brand_logo_adres}} />
              }                            
              <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                {subItem.req_user_nm} ({mUtils.isEmpty(subItem.req_user_position) ? subItem.brand_nm  : subItem.req_user_position}) →
              </Text>
              <Text style={{...styles.name, marginTop: mUtils.wScale(2)}}>
                  {subItem.target_user_nm} ({mUtils.isEmpty(subItem.target_user_position) ? subItem.brand_nm  : subItem.target_user_position})
              </Text>
          </TouchableOpacity>
        )
      }
    }
  }

  render() {
    const {data, total_count, loading} = this.state
    const {type} = this.props.route.params
    return (
      <>
        <SafeAreaView style={styles.container}>
          {type === 'request' ? (
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                {mConst.getUserType() !== 'B' ? 'Confirmed' : 'New'} <Text style={{fontFamily: 'Roboto-Medium'}}>Sample Requests : </Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}> {total_count}</Text>
              </Text>
            </View>
          ) : 
          type === 'pickups' ?
          (
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Pickups</Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}> {data.length }</Text>
              </Text>
            </View>
          )
          :
          (
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                Today's <Text style={{fontFamily: 'Roboto-Medium'}}>Send Outs</Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}> {data.length}</Text>
              </Text>
            </View>
          )
          }
          <View
            style={{
              ...styles.layout2,
              backgroundColor: type === 'request' ? 'rgba(126, 161, 178, 0.2)' : 'rgba(178, 126, 126, 0.2)',
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
                renderItem={type === 'request' ? this.renderItem : this.renderPickupItem}
                keyExtractor={item => `_${item.req_no}_${Math.random()}`}
                //onEndReached={this.handleLoadMore}
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
