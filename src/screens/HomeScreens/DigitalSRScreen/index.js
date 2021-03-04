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

const modelImg = require('../../../images/sample/model_1.png')
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

const userType = mConst.getUserType()
const arr = ['2020 F/W', '2190 F/S', '2018 F/S', '2017 S/S']

class DigitalSRScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      select: [],
      isvisible: false,
      page: 1,
      limit: 10,
      season_year: '',
      season_cd_id: '',
      notice: '',
      inquiryNum: '',
    }
  }

  selected = item => {
    const {select} = this.state
    if (select.includes(item)) {
      let copy = [...select]
      let idx = copy.indexOf(item)
      copy.splice(idx, 1)
      this.setState({select: copy})
    } else {
      this.setState({select: select.concat(item)})
    }
  }

  getDigitalSR = async () => {
    const {page, limit, season_year, season_cd_id} = this.state
    try {
      let response = await API.getDigitalSR({page: page, limit: limit, season_year: season_year, season_cd_id: season_cd_id})
      console.log('getDigitalSR>>>', response)
      if (response.success) {
        if (page === 1) {
          this.setState({data: response, page: page + 1})
        } else if (response.list.length > 0) {
          this.setState({data: {list: list.concat(response.list)}, page: page + 1})
        }
      }
    } catch (error) {
      console.log('getDigitalSR>>>', error)
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
    this.getNotice()
    this.getInquiryNum()
    this.getDigitalSR()
  }

  componentDidUpdate() {
    if (this.state.select.length === 0) {
      this.setState({...this.state, isvisible: false})
    } else {
      this.setState({...this.state, isvisible: true})
    }
  }

  renderItem = ({item}) => {
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            userType === 'M' ? this.selected(item) : this.pushTo('DigitalSRDetailScreen')
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
          {this.state.select.includes(item) ? (
            <View style={styles.select}>
              <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
            </View>
          ) : null}
        </TouchableOpacity>
        <Text style={styles.title}>{item.showroom_nm}</Text>
      </View>
    )
  }

  render() {
    const {data} = this.state
    const {notice, inquiryNum} = this.state
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
            {userType === 'M' ? (
              <TouchableOpacity style={{...styles.selectBox}}>
                <Text style={styles.selectText}>Select</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(10)}}>
            <FastImage resizeMode={'contain'} style={styles.notiImg} source={notiImg} />
            <Text style={styles.noti}>{notice}</Text>
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(3)}}>
            <FastImage resizeMode={'contain'} style={styles.telImg} source={telImg} />
            <Text style={styles.tel}>{mUtils.phoneFormat(inquiryNum)}</Text>
          </View>
          {data ? (
            <>
              <View style={{...styles.layout, justifyContent: 'space-between', paddingTop: mUtils.wScale(20), paddingBottom: mUtils.wScale(15)}}>
                <Menu>
                  <MenuTrigger
                    customStyles={{
                      TriggerTouchableComponent: TouchableOpacity,
                      //triggerTouchable: {
                      //  activeOpacity: 10,
                      //},
                    }}
                  >
                    <View style={{...styles.layout}}>
                      <Text style={styles.season}>2020 F/W</Text>
                      <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                    </View>
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    {arr.map((item, index) => {
                      return (
                        <MenuOption key={index} style={styles.menuOption} onSelect={() => {}}>
                          <Text style={styles.menuText}>{item}</Text>
                        </MenuOption>
                      )
                    })}
                  </MenuOptions>
                </Menu>
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
                data={data}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.title}_${Math.random()}`}
                contentContainerStyle={{}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
              />
            </>
          ) : (
            <Loading />
          )}
        </View>
        {this.state.isvisible ? (
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{...styles.bottomText1}}>Total Number of </Text>
                <Text style={{...styles.bottomText1, fontFamily: 'Roboto-Bold'}}>Sample Selectsd : </Text>
              </View>
              <Text style={{...styles.bottomText2, marginLeft: mUtils.wScale(3)}}>{this.state.select.length}</Text>
            </View>
            <TouchableOpacity style={styles.bottomButton}>
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
