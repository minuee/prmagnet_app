import React, {PureComponent} from 'react';
import {SafeAreaView, View,Platform, ScrollView, FlatList,Dimensions,Linking, TouchableOpacity,Pressable} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';

import Clipboard from '@react-native-clipboard/clipboard'
import mConst from '../../../common/constants';
import mUtils from '../../../common/utils';
import cBind, {callOnce} from '../../../common/navigation';
import Text from '../../common/Text';
import styles from './styles';
import API from '../../../common/aws-api';
import Loading from '../../common/Loading';
import MoreLoading from '../../common/MoreLoading';
import Empty from '../../common/Empty';

const newImg = require('../../../images/navi/new_1.png');
const MainIcon = require('../../../images/navi/main_icon.png');
const HideIcon = require('../../../images/navi/icon_hide.png');

const moreImg = require('../../../images/navi/more_4.png');
const toTopImg = require('../../../images/btn_top.png');
const selectImg1 = require('../../../images/navi/select_1.png');
const selectImg2 = require('../../../images/navi/select_2.png');

const noCheckImg = require('../../../images/navi/disable.png')
class DigitalSRScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this);
    this.state = {
      data: '',
      select: [],
      selectOnOff: true,
      isvisible: true,
      page: 1,
      limit: 10,
      season_year: {season_year: '', season_cd_id: ''},
      notice: '',
      inquiryNum: '',
      inquiryCharge: '',
      inquiryCharge2: '',
      inquiryCharge3: '',
      inquiryContact: '',
      inquiryContact2: '',
      inquiryContact3: '',
      inquiryEmail: '',
      inquiryEmail2: '',
      inquiryEmail3: '',
      brand_id: props.brandId,
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

  componentDidUpdate(prevProps) {

    if(prevProps.preData !== this.props.preData) {
      const intersection = prevProps.preData.filter(x => !this.props.preData.includes(x))
      let newData = [];
      this.state.select.map((item) => {
        if ( (intersection.findIndex(subItem => subItem.showroom_no == item.showroom_no)) == -1 ) {
          newData.push(item)
        } 
      })
      this.setState({preData: this.props.preData, select : newData});

    }
  }

  handleOnFocus = () => {
    const userType = mConst.getUserType()
    // 알림에서 브랜드 공지사항 읽기 처리를 위한 파라미터 읽어오기
    const pBrandId = this.props.brandId;
    if (pBrandId) {
      this.setBrand(pBrandId)
    } else {
      this.postDigitalSRReset()
    }
    this.setState({ select: this.props.preData,brand_id:pBrandId, loading:false})
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
    let isDupArray = select.filter((element) =>  element.showroom_no == item.showroom_no)
    console.log('isDupArray',isDupArray.length);
    if(isDupArray.length > 0 ) {
      const list = select.filter((element) =>  element.showroom_no != item.showroom_no)
      this.setState({select: list})
    }else{
      this.setState({select: select.concat(item)})
    }
  }

  postDigitalSR = async () => {
    const {data, page, limit, season_year, brand_id, filterInfo} = this.state;
    const userType = mConst.getUserType();
    try {
      const response = await API.postDigitalSR({
        page: page,
        limit: limit,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
        gender_list: filterInfo.gender,
        category_list: filterInfo.category,
        color_list: filterInfo.color,
        size_list: filterInfo.size,
        wrhousng_yn: filterInfo.sample,
        still_life_img_yn: filterInfo.stillLifeImg,
        material_list: filterInfo.material,
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
    }
  }

  postDigitalSRReset = async () => {
    const {season_year, brand_id, filterInfo} = this.state;

    const userType = mConst.getUserType()
    this.setState({loading: false})
    try {
      const response = await API.postDigitalSR({
        page: 1,
        limit: 10,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
        gender_list: filterInfo.gender,
        category_list: filterInfo.category,
        color_list: filterInfo.color,
        size_list: filterInfo.size,
        wrhousng_yn: filterInfo.sample,
        still_life_img_yn: filterInfo.stillLifeImg,
        material_list: filterInfo.material,
      })

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
              data : response,
              page : 2,
              loading : true,
              season_year : response.season_list.length > 0 ? response.season_list[0] : {season_year: '', season_cd_id: ''}
            })
          }
        }else{
          if ( season_year.season_cd_id == "" ) {
            this.setState({
              data: response,
              page: 2,
              loading: true,
              season_year: response.season_list.length > 0 ? response.season_list[0] : {season_year: '', season_cd_id: ''},
              notice: null,
              inquiryNum:null,
            })
          }else{
            this.setState({
              data: response,
              page: 2,
              loading: true,
              notice: null,
              inquiryNum:null,
            })
          }
          
        }
      }
    } catch (error) {
      this.setState({loading: true})
      //console.log('postDigitalSRReset>>>', error)
    }
  }

  renderItem = ({item}) => {
    const {selectOnOff, select} = this.state;
    const userType = mConst.getUserType()
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            item.all_in_yn ? this.selected(item) : console.log('ng')
          }}
          activeOpacity={0.5}
          style={{width: '100%', height: mUtils.wScale(275)}}
        >
          <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
          {
          item.is_new && (
            <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} />
          )
          }
          { (userType == 'B' && item.mfrc_sample_yn ) && (
            <FastImage resizeMode={'contain'} style={styles.mainImg} source={MainIcon} />
          )
          }
          { (userType == 'B' &&  item.show_yn === 'N'  ) && (
            <FastImage resizeMode={'contain'} style={styles.hideImg} source={HideIcon} />
            )
          }
          {
            item.all_in_yn ?
            (select.findIndex((sitem) => sitem.showroom_no == item.showroom_no) > 0 ? (
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
          }
        </TouchableOpacity>
        <Text style={styles.title}>{item.showroom_nm}</Text>
      </View>
    )
  }


  gotoTop = () => {
    this.scrollView.scrollTo({ x: 0,  animated: true });
  }

  renderTooltip = () => {
    return (<View style={{width:'100%',padding:5,alignItems:'center',justifyContent:'center'}}>   
        <Text style={{fontFamily: 'Roboto-Regular',fontSize: 14,color: '#ffffff',}}>브랜드 선택 후 홀딩 요청이 가능합니다.(브랜드 별)</Text>
        
    </View>)
  }

  render() {
    const {data,season_year,select,} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: mUtils.wScale(20), flex: 1,}}>        
          {
          data && this.state.loading ? (
            <>
              <View style={{...styles.layout, justifyContent: 'space-between', paddingTop: mUtils.wScale(20), paddingBottom: mUtils.wScale(10)}}>
                <View>
                  <Menu>
                    {data.season_list.length > 0 ?
                    <MenuTrigger
                      customStyles={{TriggerTouchableComponent: TouchableOpacity}}
                    >
                      <View style={[{...styles.layout},{backgroundColor:'#f7f7f7',paddingHorizontal:3}]}>
                        <Text style={styles.season}>
                        {season_year.season_year !== 'None' && season_year.season_year} {season_year.season_simple_text}
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
                              {item.season_year !== 'None' && item.season_year} {item.season_simple_text}
                            </Text>
                          </MenuOption>
                        )
                      })}
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              <View style={{paddingTop:30}}>        
                <ScrollView 
                  ref={(ref) => {this.scrollView = ref;}}
                  showsVerticalScrollIndicator={false}
                >
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
                
                </ScrollView>
              </View>
            </>
          ) : (
            <Loading />
          )
        }
        </View>
        <View style={styles.bottomSheetFixed}>
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
              this.props.handleAddShowroom(select)
            }}
          >
            <Text style={{...styles.bottomText3}}>쇼룸 추가</Text>
          </TouchableOpacity>
        </View>
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
