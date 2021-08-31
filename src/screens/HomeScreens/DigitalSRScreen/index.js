import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'
import Empty from '../../common/Empty'

const newImg = require('../../../images/navi/new_1.png')
const notiImg = require('../../../images/navi/noti_1.png')
const telImg = require('../../../images/navi/tel_1.png')
const fixImg = require('../../../images/navi/fix_1.png')
const settingImg = require('../../../images/navi/setting_1.png')
const bookImg = require('../../../images/navi/book_1.png')
const moreImg = require('../../../images/navi/more_4.png')
const crownImg = require('../../../images/navi/crown_1.png')
const selectImg1 = require('../../../images/navi/select_1.png')
const selectImg2 = require('../../../images/navi/select_2.png')
const likeImg = require('../../../images/navi/like_2_1.png')
const likeImgOn = require('../../../images/navi/like_2.png')

class DigitalSRScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
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
      brand_id: '',
      loading: true,
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
  componentDidMount() {
    this.onFocus(this.handleOnFocus)
    this.getSampleInfo()
  }
  componentWillUnmount() {
    this.removeFocus()
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
    this.setState({selectOnOff: false, select: []})
  }
  getSampleInfo = async () => {
    try {
      const response = await API.getSampleInfo()
      console.log('getSampleInfo>>>', JSON.stringify(response))
      if (response.success) {
        this.setState({filterData: response})
      }
    } catch (error) {
      console.log('getSampleInfo>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getSampleInfo'})
    }
  }
  setFilter = filterInfo => {
    // console.log('@@@filterInfo:', JSON.stringify(filterInfo))
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
      console.log('postFavShowroom>>>>>', response)
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
      console.log('postFavShowroom>>>>>', error)
    }
  }

  deleteFavShowroom = async no => {
    try {
      const response = await API.deleteFavShowroom({
        showroom_no: no,
      })
      console.log('deleteFavShowroom>>>>>', response)
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
      console.log('deleteFavShowroom>>>>>', error)
    }
  }

  handleLoadMore = () => {
    this.postDigitalSR()
  }

  selected = item => {
    const {select} = this.state
    if (select.includes(item)) {
      this.setState(state => {
        const list = state.select.filter((e, j) => select.indexOf(item) !== j)
        return {select: list}
      })
    } else {
      this.setState({select: select.concat(item)})
    }
  }

  postDigitalSR = async () => {
    const {data, page, limit, season_year, brand_id} = this.state
    const userType = mConst.getUserType()
    try {
      const response = await API.postDigitalSR({
        page: page,
        limit: limit,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
      })
      console.log('postDigitalSR>>>', response)
      if (response.success) {
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
      }
    } catch (error) {
      this.setState({loading: true})
      console.log('postDigitalSR>>>', error)
    }
  }

  postDigitalSRReset = async () => {
    const {season_year, brand_id, filterInfo} = this.state
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
      console.log('postDigitalSRReset>>>', response)
      if (response.success) {
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
          })
        }
      }
    } catch (error) {
      this.setState({loading: true})
      console.log('postDigitalSRReset>>>', error)
    }
  }

  getNotice = async () => {
    try {
      const response = await API.getNotice()
      console.log('getNotice>>>', response)
      this.setState({notice: response.notice_contents})
    } catch (error) {
      console.log('getNotice>>>', error)
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

  renderItem = ({item}) => {
    const {selectOnOff, select} = this.state
    const userType = mConst.getUserType()
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            selectOnOff ? this.selected(item) : this.pushTo('DigitalSRDetailScreen', {no: item.showroom_no, type: 'digital'})
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

          {selectOnOff &&
            (select.includes(item) ? (
              <View style={{...styles.select, backgroundColor: 'rgba(126, 161, 178, 0.8)'}}>
                <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
              </View>
            ) : (
              <View style={{...styles.select, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg1} />
              </View>
            ))}
        </TouchableOpacity>
        <Text style={styles.title}>{item.showroom_nm}</Text>
      </View>
    )
  }

  render() {
    const {data, brand_id} = this.state
    const {notice, inquiryNum, season_year, selectOnOff, isvisible, loading, select, filterData, filterInfo} = this.state
    const {user} = this.props
    const userType = mConst.getUserType()
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={userType} alarmSet={user.alarm} />
        <View style={{paddingHorizontal: mUtils.wScale(20), flex: 1}}>
          <View style={{...styles.layout, justifyContent: 'space-between', marginTop: mUtils.wScale(25)}}>
            <View>
              <Text style={{...styles.mainTitle}}>Digital</Text>
              <Text style={styles.mainTitle1}>Showroom</Text>
            </View>
            {userType !== 'B' && (
              <View style={styles.layout2}>
                <TouchableOpacity
                  style={{...styles.selectBox, backgroundColor: selectOnOff ? mConst.black : mConst.white, marginRight: mUtils.wScale(5)}}
                  onPress={() => {
                    this.setState({selectOnOff: !selectOnOff, select: []})
                  }}
                >
                  <Text style={{...styles.selectText, color: selectOnOff ? mConst.white : mConst.black}}>Select</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.selectBox, backgroundColor: mConst.black}}
                  onPress={() => this.pushTo('SelectBrandScreen', {brandId: data.current_brand_info.brand_id, setBrand: this.setBrand})}
                >
                  <Text style={{...styles.selectText, color: mConst.white}}>Brands</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(10)}}>
            <FastImage resizeMode={'contain'} style={styles.notiImg} source={notiImg} />
            <Text style={styles.noti}>{notice}</Text>
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(3)}}>
            <FastImage resizeMode={'contain'} style={styles.telImg} source={telImg} />
            <Text style={styles.tel}>{mUtils.phoneFormat(inquiryNum)}</Text>
          </View>
          {data && loading ? (
            <>
              <View style={{...styles.layout, justifyContent: 'space-between', paddingTop: mUtils.wScale(20), paddingBottom: mUtils.wScale(15)}}>
                <View>
                  {userType !== 'B' && <Text style={styles.brandText}>{data.current_brand_info.brand_nm}</Text>}
                  <Menu>
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
                    <TouchableOpacity
                      onPress={() => {
                        this.pushTo('FilterScreen', {setFilter: this.setFilter, data: filterData, info: filterInfo})
                      }}
                    >
                      <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterScreen', {setFilter: this.setFilter, data: filterData, info: filterInfo})
                        }}
                      >
                        <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
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
              {data?.list?.length > 0 ? (
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
          )}
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
                  brandId: data.current_brand_info.brand_id,
                  type: true,
                  brandName: '',
                })
              }}
            >
              <Text style={{...styles.bottomText3}}>Request Samples</Text>
            </TouchableOpacity>
          </View>
        )}
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
