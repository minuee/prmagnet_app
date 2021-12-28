import React, {PureComponent} from 'react';
import {SafeAreaView, View,Platform, ScrollView, FlatList,Dimensions,Linking, TouchableOpacity,Pressable} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();
import Modal from 'react-native-modal'
import Clipboard from '@react-native-clipboard/clipboard'
import { Tooltip } from 'react-native-elements';
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import Header from '../../common/Header';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';
import Empty from '../../common/Empty';
import NonSubscribe from '../../common/NonSubscribe';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const newImg = require('../../../images/navi/new_1.png');
const MainIcon = require('../../../images/navi/main_icon.png');
const notiImg = require('../../../images/navi/noti_1.png');
const telImg = require('../../../images/navi/tel_1.png');
const fixImg = require('../../../images/navi/fix_1.png');
const settingImg = require('../../../images/navi/setting_1.png');
const bookImg = require('../../../images/navi/book_1.png');
const moreImg = require('../../../images/navi/more_4.png');
const crownImg = require('../../../images/navi/crown_1.png');
const selectImg1 = require('../../../images/navi/select_1.png');
const selectImg2 = require('../../../images/navi/select_2.png');
const likeImg = require('../../../images/navi/like_2_1.png');
const likeImgOn = require('../../../images/navi/like_2.png');
const noCheckImg = require('../../../images/navi/disable.png')
class DigitalSRScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this);
    this.state = {
      data: '',
      select: [],
      selectOnOff: false,
      isvisible: false,
      page: 1,
      limit: 10,
      season_year: {season_year: '', season_cd_id: ''},
      notice: '',
      inquiryNum: '',
      inquiryCharge: '',
      inquiryContact: '',
      inquiryEmail: '',
      brand_id: 'all',
      loading: true,
      moreLoading : false,
      isSubScrbing : this.props.user.subScrbeStatus,
      filterData: {},
      filterInfo: {
        gender: [],
        category: [],
        color: [],
        size: [],
        sample: null,
        stillLifeImg: null,
        material: [],
      },
    }
  }

  async UNSAFE_componentWillMount () {
    this.handleOnFocus();
  }
  componentDidMount() {
    if ( this.props.user.subScrbeStatus ) {
      //this.onFocus(this.handleOnFocus);
      this.getSampleInfo();
    }else{
      this.setState({data: null,loading:false});
    }    
  }
  componentWillUnmount() {
    //this.removeFocus();
  }
  handleOnFocus = () => {
    const userType = mConst.getUserType()
    if (userType === 'B') {
      this.getNotice()
      this.getInquiryNum()
    }
    // 알림에서 브랜드 공지사항 읽기 처리를 위한 파라미터 읽어오기
    const pBrandId = mUtils.get(this.props, 'route.params.brandId', '')
    if (pBrandId) {
      this.setBrand(pBrandId)
      this.props.route.params.brandId = '' // 파라미터 초기화
    } else {
      this.postDigitalSRReset()
    }
    this.setState({selectOnOff: false, select: [],loading:false})
  }
  getSampleInfo = async () => {
    try {
      const response = await API.getSampleInfo()
      //console.log('getSampleInfo>>>', JSON.stringify(response))
      if (response.success) {
        this.setState({filterData: response})
      }
    } catch (error) {
      await API.postErrLog({error: JSON.stringify(error), desc: 'getSampleInfo'})
      this.setState({filterData: null})
    }
  }
  setFilter = filterInfo => {
    this.setState({filterInfo}, () => this.postDigitalSRReset())
  }
  setBrand = brand_id => {
    this.setState({brand_id}, () => this.postDigitalSRReset())
  }

  postFavShowroom = async no => {
    try {
      const response = await API.postFavShowroom({
        showroom_no: no,
      })
      if (response.success) {
        this.setState(state => {
          const list = state.data.list.map((item, index) => {
            if (no === item.showroom_no) {
              return {
                ...item,
                is_fav: item.is_fav ? false : true,
              }
            } else {
              return {
                ...item,
              }
            }
          })
          return {
            data: {...this.state.data, list: list},
          }
        })
      }
    } catch (error) {
      //console.log('postFavShowroom>>>>>', error)
    }
  }

  deleteFavShowroom = async no => {
    try {
      const response = await API.deleteFavShowroom({
        showroom_no: no,
      })
      //console.log('deleteFavShowroom>>>>>', response)
      if (response.success) {
        this.setState(state => {
          const list = state.data.list.map((item, index) => {
            if (no === item.showroom_no) {
              return {
                ...item,
                is_fav: item.is_fav ? false : true,
              }
            } else {
              return {
                ...item,
              }
            }
          })
          return {
            data: {...this.state.data, list: list},
          }
        })
      }
    } catch (error) {
      //console.log('deleteFavShowroom>>>>>', error)
    }
  }

  handleLoadMore = () => {
    this.postDigitalSR()
  }

  selected = item => {
    console.log('itemitemitem>>>>>', item)
    const {select} = this.state;
    if(select.includes(item)) {
      this.setState(state => {
        const list = state.select.filter((e, j) => select.indexOf(item) !== j)
        return {select: list}
      })
    }else{
      this.setState({select: select.concat(item)})
    }
  }

  postDigitalSR = async () => {
    const {data, page, limit, season_year, brand_id} = this.state;
    const userType = mConst.getUserType()
    try {
      const response = await API.postDigitalSR({
        page: page,
        limit: limit,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
      })      
      if (response.success) {
        if ( brand_id != 'all') {
          if (page === 1) {
            if (userType === 'B') {
              this.setState({
                data: response,
                page: page + 1,
                loading: true,
              })
            } else {
              this.setState({
                data: response,
                page: page + 1,
                notice: response.brand_notice.notice,
                inquiryNum: response.brand_notice.inquiry_number,
                loading: true,
              })
            }
          } else if (response.list.length > 0) {
            this.setState({data: {...data, list: data.list.concat(response.list)}, page: page + 1, loading: true})
          }
        }else{
          if (page === 1) {
            this.setState({
              data: response,
              page: page + 1,
              notice: null,
              inquiryNum: null,
              loading: true,
            })
          } else if (response.list.length > 0) {
            this.setState({data: {...data, list: data.list.concat(response.list)}, page: page + 1, loading: true})
          }
        }
      }
    } catch (error) {
      this.setState({loading: true})
      console.log('postDigitalSR>>>', error)
    }
  }

  postDigitalSRReset = async () => {
    const {season_year, brand_id, filterInfo} = this.state;

    //console.log('postDigitalSRReset',brand_id)
    const userType = mConst.getUserType()
    this.setState({loading: false})
    try {
      const response = await API.postDigitalSR({
        page: 1,
        limit: 10,
        season_year: '',//season_year.season_year,
        season_cd_id: '',//season_year.season_cd_id,
        brand_id: brand_id,
        gender_list: filterInfo.gender,
        category_list: filterInfo.category,
        color_list: filterInfo.color,
        size_list: filterInfo.size,
        wrhousng_yn: filterInfo.sample,
        still_life_img_yn: filterInfo.stillLifeImg,
        material_list: filterInfo.material,
      })
      //console.log('postDigitalSRReset>>>1111')
      if (response.success) {
        if ( brand_id != 'all') {
          if (userType === 'B') {
            this.setState({
              data: response,
              page: 2,
              season_year: response.season_list.length > 0 ? response.season_list[0] : {season_year: '', season_cd_id: ''},
              loading: true,
            })
          } else {
            this.setState({
              data: response,
              page: 2,
              loading: true,
              season_year: response.season_list.length > 0 ? response.season_list[0] : {season_year: '', season_cd_id: ''},
              notice: response.brand_notice.notice,
              inquiryNum: response.brand_notice.inquiry_number,
              inquiryCharge: response.brand_notice.inquiry_charge,
              inquiryContact: response.brand_notice.showroom_inquiry_contact,
              inquiryEmail: response.brand_notice.showroom_inquiry_email,
            })
          }
        }else{
          this.setState({
            data: response,
            page: 2,
            loading: true,
            season_year: response.season_list.length > 0 ? response.season_list[0] : {season_year: '', season_cd_id: ''},
            notice: null,
            inquiryNum:null,
          })
        }
      }
    } catch (error) {
      this.setState({loading: true})
      //console.log('postDigitalSRReset>>>', error)
    }
  }

  getNotice = async () => {
    try {
      const response = await API.getNotice()
      //console.log('getNotice>>>', response)
      this.setState({notice: response.notice_contents})
    } catch (error) {
      //console.log('getNotice>>>', error)
    }
  }

  getInquiryNum = async () => {
    try {
      const response = await API.getInquiryNum()
      console.log('getInquiryNum>>>', response)
      this.setState({inquiryNum: response.inquiry_number})
    } catch (error) {
      console.log('getInquiryNum>>>', error)
    }
  }

  callShop = (number) => {
    if ( !mUtils.isEmpty(number)) {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    }else{
        mUtils.fn_call_toast('연락처 정보가 존재하지 않습니다.')
        return true;
    }
  } 

  copyToClipboard = (target) => {    
    Clipboard.setString(target)    
    setTimeout(() => {
      this.alert('', '복사 완료')
    }, 500)
  }

  
  renderItem = ({item}) => {
    const {selectOnOff, select} = this.state
    const userType = mConst.getUserType()
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            selectOnOff ? item.all_in_yn ? this.selected(item) : console.log('ng'): this.pushTo('DigitalSRDetailScreen', {no: item.showroom_no, type: 'digital',title : item.showroom_nm})
          }}
          activeOpacity={0.5}
          style={{width: '100%', height: mUtils.wScale(275)}}
        >
          <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
          {item.is_hot ? (
            <FastImage resizeMode={'contain'} style={styles.newImg} source={crownImg} />
          ) : item.is_new ? (
            <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} />
          ) : null}
          { (userType == 'B' && item.mfrc_sample_yn ) && (
            <FastImage resizeMode={'contain'} style={styles.mainImg} source={MainIcon} />
          )
          }


          {userType !== 'B' &&
            (item?.is_fav ? (
              <TouchableOpacity
                style={styles.likeTouch}
                onPress={() => {
                  this.deleteFavShowroom(item.showroom_no)
                }}
              >
                <FastImage resizeMode={'contain'} style={styles.likeImg} source={likeImgOn} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.likeTouch}
                onPress={() => {
                  this.postFavShowroom(item.showroom_no)
                }}
              >
                <FastImage resizeMode={'contain'} style={styles.likeImg} source={likeImg} />
              </TouchableOpacity>
            ))}

          {selectOnOff && (
            item.all_in_yn ?
            (select.includes(item) ? (
              <View style={{...styles.select, backgroundColor: 'rgba(126, 161, 178, 0.8)'}}>
                <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
              </View>
            ) : (
              <View style={{...styles.select, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg1} />
              </View>
            ))
            :
            (
              <View style={{...styles.select, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <FastImage resizeMode={'contain'} style={styles.selectImg} source={noCheckImg} />
                <Text style={{fontFamily: 'Roboto-Bold',fontSize: 20,color: '#ffffff',}}>미입고</Text>
              </View>
            )
          )}
        </TouchableOpacity>
        { this.state.brand_id !== 'all' ?
        <Text style={styles.title}>{item.showroom_nm}</Text>
        :
        <Text style={styles.title}>
          { userType == 'B' ? item.showroom_nm : "["+item.brand_nm+"]"+item.showroom_nm}
        </Text>
        }
        {/* { 
          item.now_req_status_nm === '대여중' &&           
            <Text style={styles.redTitle}>{item.now_req_status_nm}{"\n"}({mUtils.dateToDate(item.duty_recpt_dt)}~{mUtils.dateToDate(item.return_prearnge_dt)})</Text>
        } */}
      </View>
    )
  }

  renderTooltip = () => {
    return (<View style={{width:'100%',padding:5,alignItems:'center',justifyContent:'center'}}>   
        <Text style={{fontFamily: 'Roboto-Regular',fontSize: 14,color: '#ffffff',}}>브랜드 선택 후 홀딩 요청이 가능합니다.(브랜드 별)</Text>
        
    </View>)
  }

  render() {
    const {data, brand_id} = this.state;    
    const {notice, inquiryNum,inquiryCharge,inquiryContact,inquiryEmail, season_year, selectOnOff, isvisible, loading, select, filterData, filterInfo} = this.state;
    const {user} = this.props;
    const userType = mConst.getUserType();
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={userType} alarmSet={user.alarm} />
        <View style={{paddingHorizontal: mUtils.wScale(20), flex: 1}}>
          <View style={{...styles.layout, justifyContent: 'space-between', marginTop: mUtils.wScale(25)}}>
            <View>
              <Text style={{...styles.mainTitle}}>Digital <Text style={styles.mainTitle1}>Showroom</Text></Text>
              
            </View>              
            {( userType !== 'B'  && this.state.brand_id !== 'all' ) && (
              <View style={styles.layout2}>
                <TouchableOpacity
                  style={{...styles.selectBox, backgroundColor: selectOnOff ? mConst.black : mConst.white, marginRight: mUtils.wScale(5)}}
                  onPress={() => {
                    this.setState({selectOnOff: !selectOnOff, select: []})
                  }}
                >
                  <Text style={{...styles.selectText, color: selectOnOff ? mConst.white : mConst.black}}>홀딩 요청</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{...styles.selectBox, backgroundColor: mConst.black}}
                  onPress={() => this.pushTo('SelectBrandScreen', {brandId: brand_id, setBrand: this.setBrand})}
                >
                  <Text style={{...styles.selectText, color: mConst.white}}>Brands</Text>
                </TouchableOpacity> */}
              </View>
            )}
          </View>
          
          {
          this.props.user.subScrbeStatus ?
          data && this.state.loading ? (
            <>
              <View style={{...styles.layout, justifyContent: 'space-between', paddingTop: mUtils.wScale(20), paddingBottom: mUtils.wScale(10)}}>
                <View>
                  {userType !== 'B' && <Text style={styles.brandText}>{data.current_brand_info?.brand_nm}</Text>}
                  <Menu>
                    {data.season_list.length > 0 ?
                    <MenuTrigger
                      customStyles={{
                        TriggerTouchableComponent: TouchableOpacity,
                      }}
                    >
                      <View style={{...styles.layout}}>
                        <Text style={styles.season}>
                          {season_year.season_year} {season_year.season_simple_text}
                        </Text>
                        <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />                        
                      </View>
                    </MenuTrigger>
                    :
                    <Text style={styles.bottomText1}>검색 결과 없음 </Text>
                    }
                    <MenuOptions optionsContainerStyle={styles.menuOptions}>
                      {data.season_list.map((item, index) => {
                        return (
                          <MenuOption
                            key={index}
                            style={styles.menuOption}
                            onSelect={() => {
                              this.setState({season_year: item, page: 1, limit: 10, loading: false}, () => {
                                this.postDigitalSR()
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
                </View>
                <View style={{...styles.layout}}>
                  {userType !== 'B' ? (
                    <>
                      { this.state.brand_id == 'all' && 
                        <Tooltip popover={this.renderTooltip('')} width={SCREEN_WIDTH*0.9} height={50} backgroundColor={'#7ea1b2'} skipAndroidStatusBar={true}>
                          <Icon name="infocirlceo" size={20} color="#000" />
                        </Tooltip>
                      }
                      <TouchableOpacity
                        style={{...styles.selectBox, backgroundColor: mConst.black,marginRight:5,marginLeft:5}}
                        onPress={() => this.pushTo('SelectBrandScreen', {brandId: brand_id, setBrand: this.setBrand})}
                      >
                        <Text style={{...styles.selectText, color: mConst.white}}>Brands</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterScreen', {setFilter: this.setFilter, data: filterData, info: filterInfo})
                        }}
                        style={{...styles.selectBox, backgroundColor: selectOnOff ? mConst.black : mConst.white, marginRight: mUtils.wScale(5)}}
                      >
                        {/* <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} /> */}
                        <Text style={styles.selectText}>Filter</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterScreen', {setFilter: this.setFilter, data: filterData, info: filterInfo})
                        }}
                        style={{...styles.selectBox, backgroundColor: selectOnOff ? mConst.black : mConst.white, marginRight: mUtils.wScale(5)}}
                      >
                        {/* <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} /> */}
                        <Text style={styles.menuTextSmall}>Filter</Text>
                      </TouchableOpacity>
                      <View style={{...styles.emptyBar}} />
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterSettingScreen')
                        }}
                      >
                        <FastImage resizeMode={'contain'} style={styles.settingImg} source={settingImg} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              {
                ( this.props.user.subScrbeStatus && brand_id != 'all' ) &&
                <View style={{marginBottom:10}}>
                  {
                  !mUtils.isEmpty(notice) &&
                  <View style={{...styles.layout}}>
                    <FastImage resizeMode={'contain'} style={styles.notiImg} source={notiImg} />                  
                      <Text style={styles.noti} numberOfLines={2} ellipsizeMode={'tail'}>
                        {mUtils.replaceAll(notice,"\n","")}
                      </Text>
                  </View>
                  }
                  {
                  !mUtils.isEmpty(inquiryNum) &&
                  <View style={{...styles.layout, marginTop: mUtils.wScale(3)}}>
                    <FastImage resizeMode={'contain'} style={styles.telImg} source={telImg} />
                    <TouchableOpacity  onPress={()=>this.callShop(inquiryNum)}>
                      <Text style={styles.tel}>{mUtils.phoneFormat2(inquiryNum)}</Text>
                    </TouchableOpacity>                    
                  </View>
                  }
                  { ( !mUtils.isEmpty(inquiryCharge) && !mUtils.isEmpty(inquiryContact) &&  !mUtils.isEmpty(inquiryEmail) ) &&
                  <View style={{...styles.layout, marginTop: mUtils.wScale(3)}}>
                    <FastImage resizeMode={'contain'} style={styles.telImg} source={telImg} />
                    {!mUtils.isEmpty(inquiryCharge) && <Text style={styles.tel}>{inquiryCharge}</Text>}
                    {!mUtils.isEmpty(inquiryContact) && (
                      <TouchableOpacity  onPress={()=>this.callShop(inquiryContact)}>
                        <Text style={styles.tel}>{mUtils.phoneFormat(inquiryContact)}</Text>
                      </TouchableOpacity>                      
                    )}                    
                    {!mUtils.isEmpty(inquiryEmail) && (
                      <TouchableOpacity onPress={() => {this.copyToClipboard(inquiryEmail)}}>
                        <Text style={styles.tel}>{inquiryEmail}</Text>
                      </TouchableOpacity>
                      )
                    }
                  </View>   
                  }               
                </View>
              }
              {data.list.length > 0 ? (
                <FlatList
                  bounces={false}
                  data={data.list}
                  renderItem={this.renderItem}
                  keyExtractor={item => `${item.title}_${Math.random()}`}
                  contentContainerStyle={{}}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={1}
                />
              ) : (
                <Empty />
              )}
            </>
          ) : (
            <Loading />
          )
          :
          <NonSubscribe />
        }
        </View>
        {selectOnOff && (
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.bottomText1}>Total </Text>
                <Text style={[styles.bottomText1, {fontFamily: 'Roboto-Bold'}]}>
                  Number of Samples <Text style={styles.bottomText1}>Selected : </Text>
                </Text>
              </View>
              <Text style={{...styles.bottomText2, marginLeft: mUtils.wScale(3)}}>{this.state.select.length}</Text>
            </View>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                this.pushTo('SampleRequestsScreen', {
                  modelList: select,
                  delSelect: this.selected,
                  brandId: data?.current_brand_info?.brand_id,
                  type: true,
                  brandName: '',
                })
              }}
            >
              <Text style={{...styles.bottomText3}}>Request Samples</Text>
            </TouchableOpacity>
          </View>
        )}
        { 
          this.state.moreLoading &&
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
  dispatch => ({})
)(DigitalSRScreen)
