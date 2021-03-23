import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

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
      gender_cd_id: '',
      available_start_dt: '',
      available_end_dt: '',
      category_list: [],
      color_list: [],
      size_list: [],
      material_list: [],
      loading: true,
    }
  }

  postFavShowroom = async no => {
    try {
      let response = await API.postFavShowroom({
        showroom_no: no,
      })
      console.log('postFavShowroom>>>>>', response)
      if (response.success) {
        this.postDigitalSRReset()
      }
    } catch (error) {
      console.log('postFavShowroom>>>>>', error)
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
    const {
      data,
      page,
      limit,
      season_year,
      brand_id,
      available_start_dt,
      available_end_dt,
      category_list,
      color_list,
      size_list,
      material_list,
    } = this.state
    const userType = mConst.getUserType()
    try {
      let response = await API.postDigitalSR({
        page: page,
        limit: limit,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
        available_start_dt: available_start_dt,
        available_end_dt: available_end_dt,
        category_list: category_list,
        color_list: color_list,
        size_list: size_list,
        material_list: material_list,
      })
      console.log('postDigitalSR>>>', response)
      if (response.success) {
        if (page === 1) {
          if (userType === 'B') {
            this.setState({data: response, season_year: response.season_list[0], page: page + 1})
          } else {
            this.setState({
              data: response,
              season_year: response.season_list[0],
              page: page + 1,
              notice: response.brand_notice.notice,
              inquiryNum: response.brand_notice.inquiry_number,
            })
          }
        } else if (response.list.length > 0) {
          if (userType === 'B') {
            this.setState({data: {...data, list: data.list.concat(response.list)}, page: page + 1})
          } else {
            this.setState({
              data: {...data, list: data.list.concat(response.list)},
              page: page + 1,
              notice: response.brand_notice.notice,
              inquiryNum: response.brand_notice.inquiry_number,
            })
          }
        }
      }
    } catch (error) {
      console.log('postDigitalSR>>>', error)
    }
  }

  postDigitalSRReset = async () => {
    const {season_year, brand_id, available_start_dt, available_end_dt, category_list, color_list, size_list, material_list} = this.state
    const userType = mConst.getUserType()
    this.setState({loading: false})
    try {
      let response = await API.postDigitalSR({
        page: 1,
        limit: 10,
        season_year: season_year.season_year,
        season_cd_id: season_year.season_cd_id,
        brand_id: brand_id,
        available_start_dt: available_start_dt,
        available_end_dt: available_end_dt,
        category_list: category_list,
        color_list: color_list,
        size_list: size_list,
        material_list: material_list,
      })
      console.log('postDigitalSRReset>>>', response)
      if (response.success) {
        if (userType === 'B') {
          this.setState({data: response, page: 2, loading: true})
        } else {
          this.setState({
            data: response,
            page: 2,
            loading: true,
            notice: response.brand_notice.notice,
            inquiryNum: response.brand_notice.inquiry_number,
          })
        }
      }
    } catch (error) {
      console.log('postDigitalSRReset>>>', error)
    }
  }

  getBrandNoti = async () => {
    const {brand_id} = this.state
    try {
      let response = await API.getBrandNoti({
        brand_id: brand_id,
      })
      console.log('getBrandNoti>>>', response)
      this.setState({notice: response.notice_contents})
    } catch (error) {
      console.log('getBrandNoti>>>', error)
    }
  }

  getNotice = async () => {
    try {
      let response = await API.getNotice()
      console.log('getNotice>>>', response)
      this.setState({notice: response.notice_contents})
    } catch (error) {
      console.log('getNotice>>>', error)
    }
  }

  getInquiryNum = async () => {
    try {
      let response = await API.getInquiryNum()
      console.log('getInquiryNum>>>', response)
      this.setState({inquiryNum: response.inquiry_number})
    } catch (error) {
      console.log('getInquiryNum>>>', error)
    }
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    const userType = mConst.getUserType()
    console.log('>>>>>', userType)
    if (userType === 'B') {
      this.getNotice()
      this.getInquiryNum()
    }
    this.postDigitalSR()
    if (this.state.select.length === 0) {
      this.setState({selectOnOff: false})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {season_year} = this.state
    if (this.state.select.length === 0) {
      this.setState({...this.state, isvisible: false})
    } else {
      this.setState({...this.state, isvisible: true})
    }
    console.log(':::::::', prevState)
    if (prevState.season_year.season_cd_id !== season_year.season_cd_id) {
      this.postDigitalSRReset()
    }
  }

  renderItem = ({item}) => {
    const {selectOnOff, select} = this.state
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            selectOnOff ? this.selected(item) : this.pushTo('DigitalSRDetailScreen', {no: item.showroom_no})
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

          {item?.is_fav ? (
            <TouchableOpacity
              style={styles.likeTouch}
              onPress={() => {
                this.postFavShowroom(item.showroom_no)
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
          )}

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
    const {data} = this.state
    const {notice, inquiryNum, season_year, selectOnOff, isvisible, loading, select} = this.state
    const userType = mConst.getUserType()
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={userType} />
        <View style={{paddingHorizontal: mUtils.wScale(20), flex: 1}}>
          <View style={{...styles.layout, justifyContent: 'space-between', marginTop: mUtils.wScale(25)}}>
            <View>
              <Text style={{...styles.mainTitle}}>Digital</Text>
              <Text style={styles.mainTitle1}>Showroom</Text>
            </View>
            {userType === 'M' && (
              <TouchableOpacity
                style={{...styles.selectBox, backgroundColor: selectOnOff ? mConst.black : mConst.white}}
                onPress={() => {
                  this.setState({selectOnOff: !selectOnOff, select: []})
                }}
              >
                <Text style={{...styles.selectText, color: selectOnOff ? mConst.white : mConst.black}}>Select</Text>
              </TouchableOpacity>
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
                  {userType === 'M' && <Text style={styles.brandText}>{data.current_brand_info.brand_nm}</Text>}
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
                              this.setState({season_year: item})
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
                  {userType === 'M' ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.pushTo('FilterScreen')
                      }}
                    >
                      <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('LookTab')
                        }}
                      >
                        <FastImage resizeMode={'contain'} style={styles.bookImg} source={bookImg} />
                      </TouchableOpacity>
                      <View style={{...styles.emptyBar}} />
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterSettingScreen')
                        }}
                      >
                        <FastImage resizeMode={'contain'} style={styles.settingImg} source={settingImg} />
                      </TouchableOpacity>
                      <View style={{...styles.emptyBar}} />
                      <TouchableOpacity
                        onPress={() => {
                          this.pushTo('FilterScreen')
                        }}
                      >
                        <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
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
            </>
          ) : (
            <Loading />
          )}
        </View>
        {isvisible ? (
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{...styles.bottomText1}}>Total Number of </Text>
                <Text style={{...styles.bottomText1, fontFamily: 'Roboto-Bold'}}>Sample Selectsd : </Text>
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
        ) : null}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(DigitalSRScreen)
