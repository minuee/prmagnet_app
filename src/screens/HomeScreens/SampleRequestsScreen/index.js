import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header1 from '../../common/Header1'
import Modal from 'react-native-modal'
import Postcode from 'react-native-daum-postcode'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const modelImg = require('../../../images/navi/model_1.png')
const moreImg = require('../../../images/navi/more_2.png')
const starImg = require('../../../images/navi/star_1.png')
const checkImg = require('../../../images/navi/check_1.png')
const noCheckImg = require('../../../images/navi/no_check_1.png')
const plusImg = require('../../../images/navi/plus_2.png')
const checkImg2 = require('../../../images/navi/check_2.png')
const checkImg3 = require('../../../images/navi/check_3.png')
const yesNo = ['Yes', 'No']

class SampleRequestsScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {img: modelImg, title: 'Look #1'},
        {img: modelImg, title: 'Look #2'},
        {img: modelImg, title: 'Look #3'},
        {img: modelImg, title: 'Look #4'},
      ],
      selected: [],
      yesNo: '',
      isvisible: false,
    }
  }

  render() {
    const {data, isvisible} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header1 />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.mainTitle, marginTop: mUtils.wScale(25)}}>Sample</Text>
            <Text style={styles.mainTitle1}>Requests</Text>
            <Text style={{...styles.subTitle, marginTop: mUtils.wScale(30)}}>
              Request product : <Text style={{color: '#7ea1b2'}}>4</Text>
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: mUtils.wScale(20), marginTop: mUtils.wScale(16)}}>
            {data.map((item, index) => {
              return (
                <View key={index} style={{marginRight: mUtils.wScale(5), alignItems: 'center'}}>
                  <TouchableOpacity>
                    <FastImage resizeMode={'contain'} style={styles.modelImg} source={item.img} />
                  </TouchableOpacity>
                  <Text style={{...styles.modelTitle, marginTop: mUtils.wScale(8)}}>{item.title}</Text>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.emptyBar} />
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <Text style={{...styles.subTitle}}>Request Information</Text>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Magazine</Text>
                <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                  <Text style={styles.boxText}>RTW</Text>
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                </TouchableOpacity>
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Editor/Stylist</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'이름'} placeholderTextColor={mConst.borderGray} />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Contact <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between'}}>
              <TouchableOpacity style={{...styles.box1, width: '49%', justifyContent: 'space-between'}}>
                <Text style={styles.boxText}>김미경as</Text>
                <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
              </TouchableOpacity>
              <TextInput style={{...styles.inputBox, width: '49%'}} placeholder={'연락처'} placeholderTextColor={mConst.borderGray} />
            </View>
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '32%'}}>
                <Text style={styles.smallTitle}>Shooting Date</Text>
                <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                  <Text style={styles.boxText}>8/4(토)</Text>
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                </TouchableOpacity>
              </View>
              <View style={{width: '32%'}}>
                <Text style={styles.smallTitle}>Pickup Date</Text>
                <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                  <Text style={styles.boxText}>8/3(금)</Text>
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                </TouchableOpacity>
              </View>
              <View style={{width: '32%'}}>
                <Text style={styles.smallTitle}>Returning Date</Text>
                <TouchableOpacity style={{...styles.box1, justifyContent: 'space-between'}}>
                  <Text style={styles.boxText}>8/6 (월)</Text>
                  <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.smallTitle}>Shipping destination</Text>
            <View style={{...styles.box2, width: '100%'}}>
              <Text style={styles.boxText}>강남대로 135-5295</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({...this.state, isvisible: true})
                }}
                style={{...styles.postBox}}
              >
                <Text style={styles.postCode}>우편번호</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={{...styles.inputBox, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(18)}} />
            <Text style={styles.smallTitle}>Shipping Notes</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(6)}}
              multiline={true}
              textAlignVertical={'top'}
            />
            <View
              style={{
                ...styles.layout,
                justifyContent: 'space-between',
                paddingTop: mUtils.wScale(20),
                paddingBottom: mUtils.wScale(18),
              }}
            >
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>촬영컨셉</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'컨셉'} placeholderTextColor={mConst.borderGray} />
              </View>
              <View style={{width: '49%'}}>
                <Text style={styles.smallTitle}>Shooting time</Text>
                <TextInput style={{...styles.inputBox}} placeholder={'시간'} placeholderTextColor={mConst.borderGray} />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              Model <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between', width: '100%'}}>
              <View style={{...styles.layout}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={checkImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0, marginLeft: mUtils.wScale(5)}}>Celebrity</Text>
              </View>
              <View style={{...styles.box2, width: '65%'}}>
                <Text style={styles.boxText}>아이린</Text>
                <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
              </View>
            </View>
            <View
              style={{...styles.layout, justifyContent: 'space-between', width: '100%', marginTop: mUtils.wScale(5), marginBottom: mUtils.wScale(18)}}
            >
              <View style={{...styles.layout}}>
                <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
                <Text style={{...styles.smallTitle, marginBottom: 0, marginLeft: mUtils.wScale(5)}}>Fashion Model</Text>
              </View>
              <View style={{...styles.box2, width: '65%'}}>
                <Text style={styles.boxText}></Text>
                <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
              </View>
            </View>
            <Text style={styles.smallTitle}>
              유가화보 <FastImage resizeMode={'contain'} style={styles.starImg} source={starImg} />
            </Text>
            <View style={{...styles.layout, justifyContent: 'space-between', marginBottom: mUtils.wScale(18)}}>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={noCheckImg} />
              <TextInput style={{...styles.inputBox, width: '95%'}} placeholder={'Brand Name'} placeholderTextColor={mConst.borderGray} />
            </View>
            <Text style={styles.smallTitle}>당일연결 희망/ 가능 여부</Text>
            <View
              style={{...styles.layout, width: '100%', justifyContent: 'space-between', marginBottom: mUtils.wScale(18), marginTop: mUtils.wScale(3)}}
            >
              {yesNo.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({...this.state, yesNo: item})
                    }}
                    style={{...styles.yesNoBox, borderColor: this.state.yesNo === item ? mConst.black : mConst.borderGray}}
                  >
                    <FastImage resizeMode={'contain'} style={styles.checkImg2} source={this.state.yesNo === item ? checkImg2 : checkImg3} />
                    <Text
                      style={{...styles.yesNo, marginLeft: mUtils.wScale(5), color: this.state.yesNo === item ? mConst.black : mConst.borderGray}}
                    >
                      {item}
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
            />
            <Text style={styles.smallTitle}>함께 들어가는 브랜드</Text>
            <TextInput
              style={{...styles.inputBox, marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              placeholder={'Different brand'}
              placeholderTextColor={mConst.borderGray}
            />
            <Text style={styles.smallTitle}>Message</Text>
            <TextInput
              style={{...styles.inputBox, height: mUtils.wScale(75), marginTop: mUtils.wScale(3), marginBottom: mUtils.wScale(18)}}
              multiline={true}
              textAlignVertical={'top'}
            />
          </View>
          <View style={styles.layout}>
            <TouchableOpacity style={{...styles.bottomButton, backgroundColor: mConst.borderGray}}>
              <Text style={{...styles.buttonText, color: mConst.black}}>Temporary Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.bottomButton, backgroundColor: mConst.black}}>
              <Text style={{...styles.buttonText, color: mConst.white}}>Sample Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={isvisible}
          useNativeDriver={true}
          onBackButtonPress={() => this.setState({...this.state, isvisible: false})}
          onBackdropPress={() => this.setState({...this.state, isvisible: false})}
        >
          <View style={{height: '80%', width: '100%'}}>
            <Postcode
              style={{flex: 1}}
              jsOptions={{animated: false}}
              onSelected={re => {
                console.log('postcode>>>>', re)
                //this.setState({...this.state, isvisible: false})
              }}
            />
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(SampleRequestsScreen)
