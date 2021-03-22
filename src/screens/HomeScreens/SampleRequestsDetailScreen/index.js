import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import ModalDropdown from 'react-native-modal-dropdown'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const modelImg = require('../../../images/sample/model_1.png')
const moreImg = require('../../../images/navi/more_2.png')
const starImg = require('../../../images/navi/star_1.png')
const checkImg = require('../../../images/navi/check_1.png')
const noCheckImg = require('../../../images/navi/no_check_1.png')
const plusImg = require('../../../images/navi/plus_2.png')
const minusImg = require('../../../images/navi/minus_1.png')
const checkImg2 = require('../../../images/navi/check_2.png')
const checkImg3 = require('../../../images/navi/check_3.png')
const selectImg2 = require('../../../images/navi/select_2.png')
const delImg = require('../../../images/navi/del_1.png')
const yesNo = [
  {boolean: true, text: 'Yes'},
  {boolean: false, text: 'No'},
]

const time = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]

class SampleRequestsDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: '',
      selected: [],
      defaultInfo: '',
      selectContact: '',
      selectContact1: '',
      shDate: '',
      pkDate: '',
      rtDate: '',
      startTime: '',
      endTime: '',
      destination: '',
      shippingNote: '',
      concept: '',
      celebrity: [''],
      fashionModel: [''],
      payPictorialDesc: '',
      locateShoot: '',
      todayConnect: 'No',
      numberPage: '',
      togetherBrand: '',
      message: '',
      drop: false,
      drop1: false,
      drop2: false,
    }
  }

  getSampleRequests = async () => {
    const {no} = this.props.route.params
    try {
      let response = await API.getSampleRequests({
        req_no: no,
      })
      console.log('getSampleRequests>>>', response)
      if (response.success) {
        this.setState({data: response})
      }
    } catch (error) {
      console.log('getSampleRequests>>>', error)
    }
  }

  componentDidMount() {
    this.pushOption('My Request')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getSampleRequests()
  }

  render() {
    const {
      data,
      selected,
      defaultInfo,
      selectContact,
      shDate,
      pkDate,
      rtDate,
      startTime,
      endTime,
      destination,
      shippingNote,
      concept,
      celebrity,
      fashionModel,
      payPictorialDesc,
      locateShoot,
      todayConnect,
      numberPage,
      togetherBrand,
      message,
      drop,
      drop1,
      drop2,
    } = this.state
    return data ? (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>My</Text>
            <Text style={styles.mainTitle1}>Requests</Text>
            <Text style={{...styles.subTitle, marginTop: mUtils.wScale(30)}}>
              Request product : <Text style={{color: '#7ea1b2'}}>{data.showroom_list.length}</Text>
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginLeft: mUtils.wScale(20), marginTop: mUtils.wScale(16)}}
            contentContainerStyle={{paddingRight: mUtils.wScale(20)}}
          >
            {data.showroom_list.map((item, index) => {
              return (
                <View key={index} style={{marginRight: mUtils.wScale(5), alignItems: 'center'}}>
                  <View>
                    <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.image_url}} />
                    <View style={{...styles.select, backgroundColor: 'rgba(126, 161, 178, 0.8)'}}>
                      <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
                    </View>
                  </View>
                  <Text style={{...styles.modelTitle, marginTop: mUtils.wScale(8)}}>{item.showroom_nm}</Text>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.emptyBar} />
          <View style={{paddingHorizontal: mUtils.wScale(20)}} pointerEvents={'none'}>
            <Text style={{...styles.subTitle}}>Request Information</Text>
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Magazine</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.mgzn_nm}</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Editor/Stylist</Text>
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.req_send_username}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Contact <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout2, justifyContent: 'space-between'}}>
              <ModalDropdown
                style={{width: '49%'}}
                dropdownStyle={{width: '44%'}}
                onSelect={(i, v) => this.setState({selectContact: v})}
                options={defaultInfo.contact_info}
                renderRow={item => (
                  <View style={styles.contactList}>
                    <Text style={styles.contactText}>{`${item.mgzn_user_nm}(${mUtils.allNumber(item.phone_no)})`}</Text>
                  </View>
                )}
              >
                <View style={{...styles.box1}}>
                  <Text style={styles.boxText}>{data.contact_username}</Text>
                </View>
              </ModalDropdown>

              <View style={{...styles.box1, width: '49%'}}>
                <Text style={styles.boxText}>{data.contact_phone_no}</Text>
              </View>
            </View>
            <>
              <View
                style={{
                  ...styles.layout2,
                  justifyContent: 'space-between',
                  paddingTop: mUtils.wScale(20),
                  paddingBottom: mUtils.wScale(18),
                }}
              >
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Shooting Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop: !drop, drop1: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${moment(data.shooting_date * 1000).format('MM/DD')}(${moment(data.shooting_date * 1000).format('ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Pickup Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop1: !drop1, drop: false, drop2: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${moment(data.pickup_date * 1000).format('MM/DD')}(${moment(data.pickup_date * 1000).format('ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: '32%'}}>
                  <Text style={styles.smallTitle}>Returning Date</Text>
                  <TouchableOpacity
                    style={{...styles.box1}}
                    onPress={() => {
                      this.setState({drop2: !drop2, drop: false, drop1: false})
                    }}
                  >
                    <Text style={styles.boxText}>
                      {`${moment(data.returning_date * 1000).format('MM/DD')}(${moment(data.returning_date * 1000).format('ddd')})`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingBottom: mUtils.wScale(20),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Start Time</Text>
                <View style={styles.box1}>
                  <Text style={styles.contactText}>{data.shooting_start_time}:00</Text>
                </View>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>End Time</Text>

                <View style={styles.box1}>
                  <Text style={styles.contactText}>{data.shooting_end_time}:00</Text>
                </View>
              </View>
            </View>
            <Text style={styles.smallTitle}>Shipping destination</Text>
            <TextInput style={{...styles.inputBox}} value={data.dlvy_adres_nm} />
            <TextInput style={{...styles.inputBox, marginBottom: mUtils.wScale(18)}} value={data.adres_detail} />

            <Text style={styles.smallTitle}>Shipping Notes</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
              multiline={true}
              textAlignVertical={'top'}
              value={data.dlvy_atent_matter}
              onChangeText={text => {
                this.setState({shippingNote: text})
              }}
            />
            <View
              style={{
                ...styles.layout2,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '100%'}}>
                <Text style={styles.smallTitle}>촬영컨셉</Text>
                <TextInput
                  style={{...styles.inputBox}}
                  placeholder={'컨셉'}
                  placeholderTextColor={mConst.borderGray}
                  onChangeText={text => {
                    this.setState({concept: text})
                  }}
                  value={data.photogrf_concept}
                />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Model <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
              <View style={{...styles.layout1}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.celeb_list.length > 0 ? checkImg : noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0}}>Celebrity</Text>
              </View>
              <View style={{width: '65%'}}>
                {data.celeb_list.map((item, index) => {
                  return (
                    <View style={{...styles.box2}} key={index}>
                      <TextInput
                        style={{...styles.inputBox1}}
                        placeholder={'이름'}
                        placeholderTextColor={mConst.borderGray}
                        value={item}
                        onChangeText={text => {
                          let tmp = [...celebrity]
                          tmp[index] = text
                          this.setState({celebrity: tmp})
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                width: '100%',
                marginTop: mUtils.wScale(5),
                marginBottom: mUtils.wScale(18),
              }}
            >
              <View style={{...styles.layout1}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.model_list.length > 0 ? checkImg : noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0}}>Fashion Model</Text>
              </View>
              <View style={{width: '65%'}}>
                {data.model_list.map((item, index) => {
                  return (
                    <View style={{...styles.box2}}>
                      <TextInput
                        style={{...styles.inputBox1}}
                        placeholder={'이름'}
                        placeholderTextColor={mConst.borderGray}
                        value={item}
                        onChangeText={text => {
                          let tmp = [...fashionModel]
                          tmp[index] = text
                          this.setState({fashionModel: tmp})
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Paid editorial <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.own_paid_pictorial_content ? checkImg : noCheckImg} />
                <Text style={styles.text1}>자사유가</Text>
              </View>
              <TextInput
                style={{...styles.inputBox, width: '65%'}}
                placeholder={'Brand Name'}
                placeholderTextColor={mConst.borderGray}
                value={data.own_paid_pictorial_content}
                onChangeText={text => {
                  this.setState({payPictorialDesc: text})
                }}
              />
            </View>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <View style={styles.layout2}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.other_paid_pictorial_content ? checkImg : noCheckImg} />
                <Text style={styles.text1}>타사유가</Text>
              </View>
              <TextInput
                style={{...styles.inputBox, width: '65%'}}
                placeholder={'Brand Name'}
                placeholderTextColor={mConst.borderGray}
                value={data.other_paid_pictorial_content}
                onChangeText={text => {
                  this.setState({payPictorialDesc: text})
                }}
              />
            </View>
            <Text style={styles.smallTitle}>로케촬영</Text>
            <View style={{...styles.layout2, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={data.loc_value ? checkImg : noCheckImg} />
              <TextInput
                style={{...styles.inputBox, width: '95%'}}
                placeholder={'촬영지 입력'}
                placeholderTextColor={mConst.borderGray}
                value={data.loc_value}
                onChangeText={text => {
                  this.setState({locateShoot: text})
                }}
              />
            </View>
            <Text style={styles.smallTitle}>당일연결 희망/ 가능 여부</Text>
            <View
              style={{
                ...styles.layout2,
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: mUtils.wScale(18),
                marginTop: mUtils.wScale(3),
              }}
            >
              {yesNo.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({todayConnect: item})
                    }}
                    style={{...styles.yesNoBox, borderColor: data.today_connect === item.boolean ? mConst.black : mConst.borderGray}}
                  >
                    <FastImage resizeMode={'contain'} style={styles.checkImg2} source={data.today_connect === item.boolean ? checkImg2 : checkImg3} />
                    <Text
                      style={{
                        ...styles.yesNo,
                        marginLeft: mUtils.wScale(5),
                        color: data.today_connect === item.boolean ? mConst.black : mConst.borderGray,
                      }}
                    >
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.smallTitle}>Number of Pages</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              placeholder={'Number of pages'}
              placeholderTextColor={mConst.borderGray}
              value={data.page_cnt}
              onChangeText={text => {
                this.setState({numberPage: text})
              }}
            />
            <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              placeholder={'Different brand'}
              placeholderTextColor={mConst.borderGray}
              value={data.etc_brand_info}
              onChangeText={text => {
                this.setState({togetherBrand: text})
              }}
            />
            <Text style={styles.smallTitle}>Message</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              multiline={true}
              textAlignVertical={'top'}
              value={data.message}
              onChangeText={text => {
                this.setState({message: text})
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(SampleRequestsDetailScreen)
