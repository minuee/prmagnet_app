import React, {PureComponent} from 'react';
import {SafeAreaView, FlatList, View, TouchableOpacity,Alert} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import moment from 'moment';

import {actionSetAlarm} from '../../../redux/actions';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import Empty from '../../common/Empty';
import NonSubscribe from '../../common/NonSubscribe';

const closeBtnImage = require('../../../images/navi/close.png');
const notiSky = require('../../../images/navi/noti_sky.png');
const notiBlack = require('../../../images/navi/noti_black.png');
const userType = mConst.getUserType();

class NotificationScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      loading: true,
    }
  }

  deleteAlarm = async(notice_id, i, notifi_type) => {
    console.log('deleteAlarm>>>', notice_id,notifi_type)
    Alert.alert(
      mConst.appName,
      '정말로 삭제하시겠습니까?',
      [
        {text: '네', onPress: () => this.actionDeleteAlarm(notice_id, i, notifi_type)},
        {text: '아니오', onPress: () => console.log('no')},
      ],
      {cancelable: false},
    );
}
  actionDeleteAlarm = async (notice_id, i, notifi_type) => {
  
    try {
      const response = await API.deleteAlarm({notice_id: notice_id, notifi_type: notifi_type})
      console.log('deleteAlarm>>>', response)
      if (response.success) {
        this.setState(state => {
          const resetList = state.list.filter((item, j) => i !== j)
          return {
            list: resetList,
          }
        })
        mUtils.fn_call_toast('삭제되었습니다.');
      }
    } catch (error) {
      console.log('deleteAlarm>>>', error)
      mUtils.fn_call_toast('오류가 발생하였습니다.');
    }
  }

  getAlarm = async () => {
    const {page, limit, list} = this.state
    const {setAlarm} = this.props
    try {
      const response = await API.getAlarm({page})
      //console.log('getAlarm>>>', response)
      if (response.success) {
        setAlarm({alarm: false})
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1, loading: false})
        } else {
          this.setState({loading: false})
        }
      }
    } catch (error) {
      this.setState({loading: false})
      //console.log('getAlarm>>>', error)
    }
  }

  handleLoadMore = async () => {
    this.getAlarm()
  }

  componentDidMount() {
    this.pushOption('알림')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    if ( this.props.user.subScrbeStatus ) {
      this.setState({loading: true}, () => {
        this.getAlarm()
      })
    }else{
      this.setState({data: null,loading:false})
    }
  }

  handleMove = (type, reqNo, noticeId, brandId) => {
    if (mConst.getUserType() === 'B') {
      if (type === 'cms') {
        this.pushTo('NoticeDetailScreen', {no: noticeId})
      } else if (type === 'req') {
        this.pushTo('HomeDetailScreen', {type: true, title: 'New Sample Requests'})
      } else if (type === 'send') {
        this.pushTo('SendOutScreen', {reqNo})
      } else if (type === 'recv') {
        this.pushTo('ReturnScreen', {reqNo})
      }
    } else {
      if (type === 'brand') {
        this.pop()
        this.pushTo('ShowTab', {screen: 'ShowScreen', params: {brandId}})
      } else if (type === 'cms') {
        this.pushTo('NoticeDetailScreen', {no: noticeId})
      } else if (type === 'recv') {
        this.pushTo('PickupsScreen', {reqNo})
      } else if (type === 'req' || type === 'send') {
        this.pushTo('SendOutScreen', {reqNo})
      }
    }
  }

  renderItem = ({item, index}) => {    
    return (
      <View style={styles.itemBox}>
        <TouchableOpacity
          hitSlop={{top: 35, bottom: 35, left: 40, right: 40}}
          onPress={() => this.handleMove(item.notice_type, item.req_no, item.notice_id, item.brand_id)}
        >
          <View style={styles.items}>
            <FastImage resizeMode={'contain'} style={styles.listImg} source={userType !== 'B' ? notiSky : notiBlack} />
            <View style={{marginTop: mUtils.wScale(5), width: '80%'}}>
              <Text style={styles.title}>{item.subj}</Text>
              <Text style={styles.desc}>{item.cntent}</Text>
              <Text style={styles.dt}>
                {moment(item.send_dt * 1000)
                  .locale('ko')
                  .format('MMM Do')}{' '}
                ·
                {moment(item.send_dt * 1000)
                  .locale('ko')
                  .format('LT')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{top: 35, bottom: 35, left: 40, right: 40}}
          onPress={() => {
            this.deleteAlarm(item.notice_id, index, item.notice_type)
          }}
        >
          <FastImage resizeMode={'contain'} style={styles.closeImg} source={closeBtnImage} />
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const {list, loading} = this.state;
    if ( this.state.loading  ) {
      return (
          <Loading />
      )
    }else{
      return (
        <>
          <SafeAreaView style={styles.container}>
              {
                this.props.user.subScrbeStatus ?
                _.size(list) === 0 ? (
                  <Empty />
                ) : (
                  <FlatList
                    style={styles.list}
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={item => `_${item.notice_id}_${Math.random()}`}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={1}
                  />
                )
                :
                <NonSubscribe />
              }
          </SafeAreaView>
        </>
      )
    }
  }
}

export default connect(
  state => ({ user: state.user,}),
  dispatch => ({
    setAlarm: data => dispatch(actionSetAlarm(data)),
  })
)(NotificationScreen)
