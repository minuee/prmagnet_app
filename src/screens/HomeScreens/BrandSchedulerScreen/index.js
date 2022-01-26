/* eslint-disable indent */
import React, {PureComponent} from 'react';
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {actionSetIsMemoUpdate} from '../../../redux/actions';
import FastImage from 'react-native-fast-image';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import _ from 'lodash';

import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import Header from '../../common/Header';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import Empty from '../../common/Empty';
import NonSubscribe from '../../common/NonSubscribe';

const moreImg = require('../../../images/navi/more_4.png');
const fixImg = require('../../../images/navi/fix_1.png');
const schedulerImg = require('../../../images/navi/scheduler_1.png');
const modelImg = require('../../../images/sample/model_2.png');
const dollarImg1 = require('../../../images/navi/dollar_1.png');
const airplaneImg = require('../../../images/navi/airplane_1.png');
const dollarImg2 = require('../../../images/navi/dollar_2.png');
const plusImg = require('../../../images/navi/plus_1.png');
const minusImg = require('../../../images/navi/minus_2.png');
const memoImg = require('../../../images/navi/memo_1.png');
const linkImg = require('../../../images/navi/link_1.png');

const genderData = [
  {key: 'All Gender', value: null},
  {key: 'Women', value: 'SSS001'},
  {key: 'Men', value: 'SSS002'},
  {key: 'Genderless', value: 'SSS003'},
]

class BrandSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      loading : true,
      data: '',
      start: mUtils.getToday(),
      end: mUtils.getNextWeek(),
      // start: mUtils.getDayValue(2021, 7, 25),
      // end: mUtils.getDayValue(2021, 7, 28),
      season_year: {season_year: '', season_simple_text: '', season_cd_id: ''},
      gender: genderData[0],
      toggle: [],
    }
  }
  
  async UNSAFE_componentWillMount() {    
    this.props.navigation.addListener('focus', () => {   
        console.log('focusfocusfocusfocussimples',this.props.simples.isMemoUpdate);        
        if ( this.props.simples.isMemoUpdate ) {
          this.getSchedular();
          this.props.setIsMemoUpdate(false)
        }
        
    })
  }

  componentDidMount() {
    
    if ( this.props.user.subScrbeStatus ) {
      this.getSchedular();
    }else{
        this.setState({data: null,loading:false})
    }    
  }
  getSchedular = async params => {
    try {
      const response = await API.getSchedular({
        min_date: params?.start || this.state.start,
        max_date: params?.end || this.state.end,
        season_year: this.state.season_year.season_year || null,
        season_cd_id: this.state.season_year.season_cd_id || null,
        gender: this.state.gender.value || null,
      })
      this.setState(prevState => ({
        data: response,
        start: params?.start || this.state.start,
        end: params?.end || this.state.end,
        season_year: prevState.season_year.season_year ? prevState.season_year : response.season_list[0],
        loading : false
      }))
    } catch (error) {
      this.setState({data: null,loading:false})
      //console.log('getSchedular>>>>', error)
    }
  }
  changeSchedule = () => {
    const {start, end} = this.state
    this.pushTo('SelectScheduleScreen', {setDate: this.getSchedular, start, end, caller: 'ScheduleTab'})
  }
  toggleShow = showroomNo => {
    this.setState(prevstate => {
      const toggle = prevstate.toggle.includes(showroomNo)
        ? prevstate.toggle.filter(item => item !== showroomNo)
        : prevstate.toggle.concat(showroomNo)
      return {toggle}
    })
  }

  moveDetail = async(item,idx) => {
    this.pushTo('SampleRequestsDetailScreen', {no: item.req_no});
  }

  render() {
    const {data, toggle, start, end, season_year, gender} = this.state;
    const {user} = this.props;
    const dates = mUtils.getDayArray(this.state.start, this.state.end);
    if ( this.state.loading  ) {
      return (
          <Loading />
      )
    }else{
      return (
        <SafeAreaView style={styles.container}>
          <Header pushTo={this.pushTo} alarmSet={user.alarm} />          
            <View style={styles.layout}>
              <Text style={styles.mainTitle}>Scheduler</Text>
              
              <View style={styles.menuGroup}>
                <Menu>
                  <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity}}>
                    <View style={styles.layout0}>
                      <Text style={styles.season}>
                        {season_year.season_year} {season_year.season_simple_text}
                      </Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    {data?.season_list?.map((item, index) => {
                      return (
                        <MenuOption
                          key={index}
                          style={styles.menuOption}
                          onSelect={() => {
                            this.setState({season_year: item}, () => {
                              this.getSchedular()
                            })
                          }}
                        >
                          <Text style={styles.menuText}>
                            {item.season_year} {item.season_simple_text}
                          </Text>
                        </MenuOption>
                      )
                    })}
                  </MenuOptions>
                </Menu>
                <Menu>
                  <MenuTrigger customStyles={{TriggerTouchableComponent: TouchableOpacity}} >
                    <View style={[styles.layout0, {marginLeft: mUtils.wScale(15)}]}>
                      <Text style={styles.season}>{gender.key}</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    {genderData.map((item, index) => {
                      return (
                        <MenuOption
                          key={index}
                          style={styles.menuOption}
                          onSelect={() => {
                            this.setState({gender: item}, () => {
                              this.getSchedular()
                            })
                          }}
                        >
                          <Text style={styles.menuText}>{item.key}</Text>
                        </MenuOption>
                      )
                    })}
                  </MenuOptions>
                </Menu>
              </View>
             
            </View>       
            { this.props.user.subScrbeStatus  &&
            <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
              <View style={styles.layout1}>
                <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
                <Text style={styles.date}>
                  {mUtils.getShowDate(this.state.start, 'YYYY/MM/DD')} - {mUtils.getShowDate(this.state.end, 'YYYY/MM/DD')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.changeSchedule()
                }}
              >
                <Text style={styles.change}>변경</Text>
              </TouchableOpacity>
            </View>
            }
            <>
           {/*  {
              data.map((mItem, mIndex) => {
                <View style={styles.dayTextWrapper}>
                  <Text style={styles.dayText}>{mUtils.getShowDate(Math.floor(item.valueOf() / 1000))}</Text>
                </View>
              })
            } */}
            </>

            <>
              {
                this.props.user.subScrbeStatus  ?
                _.size(_.get(data, 'list')) === 0 ? (
                  <Empty />
                ) : (
                  <>
                    <ScrollView style={{paddingVertical: mUtils.wScale(25),backgroundColor :'#f1f2ea'}}>
                      {
                      mUtils.get(data, 'list', []).map((dItem, dIndex) => {
                        const memoList = mUtils.get(dItem, 'memo_list', []);
                        const reqList = mUtils.get(dItem, 'req_list', []);
                        //console.log('reqListreqList',reqList)
                        return (
                          <>
                          <View key={dIndex} style={{...styles.layout4}}>
                            <View style={[{width: mUtils.wScale(80)}]}>
                              <FastImage resizeMode={'cover'} style={styles.modelImg} source={{uri: dItem.image_list}} />
                              <Text style={{...styles.title, marginVertical: mUtils.wScale(10)}}>{dItem.showroom_nm}</Text>
                              <TouchableOpacity
                                  style={{...styles.memoFixed}}
                                  onPress={() => {
                                    this.pushTo('ShowroomMemoScreen', {no: dItem.showroom_no, date: '', name: dItem.showroom_nm})
                                  }}
                                >
                                  <FastImage resizeMode={'contain'} style={styles.memoSmallImg} source={memoImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={{width: mUtils.wScale(290),}}>
                              {//(memoList.length > 0 || reqList.length > 0) && (
                                <FlatList
                                  ref={ref => (this.swiperRef = ref)}
                                  horizontal={true}
                                  nestedScrollEnabled={true}
                                  showsHorizontalScrollIndicator={false}
                                  style={{width: mUtils.wScale(290)}}
                                  pagingEnabled={true}
                                  keyExtractor={(item, index) => index.toString()}
                                  data={dates}
                                  renderItem={({item, index}) => {
                                    const curMemos = memoList.filter(m => mUtils.isSameDay(item, m.memo_dt))
                                    const curReqs = reqList.filter(r => mUtils.isDayBetween(item, r.start_dt, r.end_dt))
                                    return (
                                      <View style={{flexDirection: 'column'}}>                                        
                                        <View style={styles.dayTextWrapper}>
                                          <Text style={styles.dayText}>{mUtils.getShowDate(Math.floor(item.valueOf() / 1000))}</Text>
                                        </View>
                                       {/*  {(curMemos.length > 0 || curReqs.length > 0) && (
                                          <View style={styles.dayTextWrapper}>
                                            <Text style={styles.dayText}>{mUtils.getShowDate(Math.floor(item.valueOf() / 1000))}</Text>
                                          </View>
                                        )} */}
                                        {curMemos.map((mItem, mIndex) => {
                                          return (
                                            // <Text style={{width: 190}}>메모:{mItem.content}</Text>
                                            <TouchableOpacity
                                              key={mIndex}
                                              style={[styles.dayMemoUnit, {borderColor: mItem.color ? mItem.color : mConst.borderGray}]}
                                              onPress={() => {
                                                this.pushTo('ScheduleMemoScreen', {
                                                  no: dItem.showroom_no,
                                                  date: mItem.memo_dt,
                                                  name: dItem.showroom_nm,
                                                })
                                              }}
                                            >
                                              <Text style={{...styles.smallDesc}}  numberOfLines={2} ellipsizeMode={'tail'}>{mItem.content}</Text>
                                              <Text style={{...styles.brandDate}}>{mUtils.getShowDate(mItem.memo_dt, 'YYYY-MM-DD')}</Text>
                                            </TouchableOpacity>
                                          )
                                        })}
                                        {curReqs.map((rItem, rIndex) => {
                                          const key = `${dItem.showroom_no}_${mUtils.getDateString(item)}`;
                                          
                                          if (!toggle.includes(key)) {
                                            //console.log('toggle.includes(key)22',rIndex,toggle.includes(key))
                                            if (rIndex === 2)
                                              return (
                                                <View key={rIndex} style={styles.moreUnit}>
                                                  <TouchableOpacity onPress={() => this.toggleShow(key)}>
                                                    <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
                                                  </TouchableOpacity>
                                                </View>
                                              )
                                            if (rIndex > 2) return null
                                          }
                                          return (
                                            <View key={rIndex} style={{overflow:'hidden'}}>
                                              <View style={[styles.dayReqUnit, {marginBottom: mUtils.wScale(5)}]}>
                                                <View style={{...styles.layout6, backgroundColor: rItem.mgzn_color}}>
                                                  <Text style={rItem.company_name.length > 8 ? styles.shortTitle : styles.title}>{rItem.company_name}</Text>
                                                  <View style={styles.layout}>
                                                    <FastImage resizeMode={'contain'} style={rItem.company_name.length > 8 ? styles.dollarImg1Short : styles.dollarImg1} source={dollarImg1} />
                                                    <FastImage resizeMode={'contain'} style={rItem.company_name.length > 8 ? styles.airplaneImgShort : styles.airplaneImg} source={airplaneImg} />
                                                  </View>
                                                </View>
                                                <TouchableOpacity 
                                                  onPress={() => this.moveDetail(rItem,rIndex)}
                                                  style={styles.layout7}
                                                >
                                                  <Text style={{...styles.name}}>{rItem.req_user_nm}</Text>
                                                  {/* <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>
                                                    {rItem.company_name} / {'\n'}
                                                    {mUtils.getShowDate(rItem.start_dt, 'YYYY-MM-DD')} ~{' '}
                                                    {mUtils.getShowDate(rItem.end_dt, 'YYYY-MM-DD')}
                                                  </Text>
                                                  <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>{rItem.address}</Text> */}

                                                  <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                                                    {rItem.contact_user_nm}
                                                    {'\n'}
                                                    {mUtils.allNumber(rItem.contact_user_phone)}
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                              {toggle.includes(key) && curReqs.length - 1 === rIndex && (
                                                <View key={rIndex} style={styles.moreUnit}>
                                                  <TouchableOpacity onPress={() => this.toggleShow(key)}>
                                                    <FastImage resizeMode={'contain'} style={styles.plusImg} source={minusImg} />
                                                  </TouchableOpacity>
                                                </View>
                                              )}
                                            </View>
                                          )
                                        })}
                                        
                                      </View>
                                    )
                                  }}
                                />
                              //)
                            }
                            </View>
                          </View>
                          <View style={styles.devider} />
                          </>
                        )
                      })
                      }
                    </ScrollView>
                    <TouchableOpacity
                      style={{...styles.layout8}}
                      onPress={() => {
                        this.pushTo('ScheduleMemoScreen', {no: '', date: '', name: ''})
                      }}
                    >
                      <FastImage resizeMode={'contain'} style={styles.memoImg} source={memoImg} />
                    </TouchableOpacity>
                  </>
                )
                :
              <NonSubscribe />
            }
            
          </>
        </SafeAreaView>
      )
    }
  }
}

export default connect(
  state => ({
    user: state.user,
    simples: state.simples,
  }),
  dispatch => ({
    setIsMemoUpdate: data => dispatch(actionSetIsMemoUpdate(data)),
  })
)(BrandSchedulerScreen)
