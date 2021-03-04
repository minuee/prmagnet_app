import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Pressable, Linking} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import _ from 'lodash'
import Modal from 'react-native-modal'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import Swiper from '../../common/Swiper'
import CategoryGroup from '../../common/CategoryGroup'
import ColorGroup from '../../common/ColorGroup'
import MaterialGroup from '../../common/MaterialGroup'
import BrandGroup from '../../common/BrandGroup'
import styles from './styles'

const goLeftImage = require('../../../images/navi/go_left.png')
const goRightImage = require('../../../images/navi/go_right.png')
const unfoldImage = require('../../../images/common/unfold.png')
const model1Image = require('../../../images/sample/model_1.png')
const model2Image = require('../../../images/sample/model_2.png')
const circleCheckImage = require('../../../images/common/circle_check.png')
const circleCheckOnImage = require('../../../images/common/circle_check_on.png')

class LinkSheetDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      swipe: true,
      isvisible: {open: false, phone: '', name: ''},
      data: {},
      showList: [],
    }
  }
  componentDidMount() {
    this.pushOption('Return', true)
    // this.alert('수령 완료', '“스타일H김나현님께 Look #1 Knitwear 수령 완료"', [{onPress: () => null}, {onPress: () => null}])
    this.handleLoadData()
  }
  handleLoadData = async () => {
    const {reqNo} = this.params
    try {
      const response = await API.getPickupDetail(reqNo)
      this.setState({data: response})
      console.log('픽업 스케쥴 상세 조회 성공', JSON.stringify(response))
    } catch (error) {
      console.log('픽업 스케쥴 상세 조회 실패', error)
    }
  }
  onSwipe = gesture => {
    this.setState({swipe: gesture === 'left' ? true : false})
  }
  render() {
    const {swipe, data} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{paddingVertical: 10}}>
            {/* {this.closeBackOption(closeBtnImage, 'FILTER', null)} */}
            <View style={styles.titleWrapper}>
              <FastImage source={goLeftImage} style={styles.goImage} />
              <View style={styles.titleSubWrapper}>
                <Text style={styles.titleSubText}>
                  {mUtils.get(data, 'send_user_nm')}-&gt;{mUtils.get(data, 'brand_user_nm')}
                </Text>
                <FastImage source={unfoldImage} style={styles.unfoldImage} />
              </View>
              <FastImage source={goRightImage} style={styles.goImage} />
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>Magazine</Text>
              <Text style={styles.middleDescText}>{mUtils.get(data, 'brand_nm', '-')}</Text>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper()}>
                <Text style={styles.middleText}>Editor/Stylist</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'send_user_nm', '-')}</Text>
                  <Text style={styles.middleDescText}> {mUtils.phoneFormat(mUtils.get(data, 'phone_no', ''))}</Text>
                </View>
              </View>
              <View style={styles.middleSubWrapper()}>
                <Text style={styles.middleText}>Assistant</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'assi_user_nm', '-')}</Text>
                  <Text style={styles.middleDescText}> {mUtils.phoneFormat(mUtils.get(data, 'assi_phone_no'))}</Text>
                </View>
              </View>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>Pickup Date</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(data.pickup_date)}</Text>
              </View>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>Shooting Date</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(data.photo_date)}</Text>
              </View>
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>Address</Text>
              <Text style={styles.middleDescText}>{mUtils.get(data, 'dlvy_adres_nm', '-')}</Text>
            </View>
            <Grid style={styles.grid}>
              <Row>
                <Col style={styles.col()} size={1}></Col>
                <Col style={styles.col()} size={2}></Col>
                <Col style={styles.col()} size={2}></Col>
                <Col style={styles.col(1, true)} size={6}>
                  <Text>From</Text>
                </Col>
                <Col style={styles.col(1, true)} size={6}>
                  <Text>Shoot</Text>
                </Col>
              </Row>
              <Row>
                <Col style={styles.col(4, true)} size={1}>
                  <Text style={styles.sText()}>#1</Text>
                </Col>
                <Col style={styles.col(4)} size={2}>
                  <Row style={styles.row()}>
                    <Text style={styles.sText()}>Knitwear</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(9)}>12,000,000</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText()}>Skirt</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(9)}>6,000,000</Text>
                  </Row>
                </Col>
                <Col style={styles.col(4, true)} size={2}>
                  <FastImage source={model2Image} style={styles.modelImage} />
                </Col>
                <Col style={styles.col(4)} size={6}>
                  <Pressable
                    onLongPress={() => {
                      // eslint-disable-next-line quotes
                      this.alert('상품 미수령 알림', "'EL 손다예'님께 상품미수령 알림을 보내시겠습니까?", [
                        {
                          onPress: () => {
                            setTimeout(() => {
                              this.alert('미수령 알림 전송 완료', '미수령 알림을 전송하였습니다.', [{onPress: () => null}])
                            }, 100)
                          },
                        },
                        {onPress: () => null},
                      ])
                    }}
                  >
                    {({pressed}) => (
                      <Row style={styles.row(pressed ? 'rgba(126, 161, 178, 0.7)' : mConst.bgBlue)}>
                        <Text style={styles.sText(12)} numberOfLines={1}>
                          GQ이은주ed
                        </Text>
                      </Row>
                    )}
                  </Pressable>
                  <Pressable
                    onLongPress={() => {
                      this.setState({...this.state, isvisible: {open: true, phone: '010-4521-9999', name: 'EL손다예st'}})
                    }}
                  >
                    {({pressed}) => (
                      <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : 'white')}>
                        <Text style={styles.sText(12, mConst.darkGray)}>010-4521-9999</Text>
                      </Row>
                    )}
                  </Pressable>
                  <Row style={styles.row(mConst.bgBlue)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      GQ이은주ed
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                </Col>
                <Col style={styles.col(4)} size={6}>
                  <Swiper onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
                    <Row style={styles.row(mConst.bgKhaki)}>
                      {swipe ? (
                        <>
                          <Col style={styles.col(1, true, mConst.bgKhaki)} size={3}>
                            <Text style={styles.sText(12)} numberOfLines={1}>
                              스타일H김나현st
                            </Text>
                          </Col>
                          <Col style={styles.col(1, true)} size={1}>
                            <FastImage source={circleCheckImage} style={styles.checkImage} />
                          </Col>
                        </>
                      ) : (
                        <Text style={styles.sText(12)} numberOfLines={1}>
                          스타일H김나현st
                        </Text>
                      )}
                    </Row>
                  </Swiper>
                  <Pressable
                    onLongPress={() => {
                      console.log('1111')
                    }}
                  >
                    {({pressed}) => (
                      <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : 'white')}>
                        <Text style={styles.sText(12, mConst.darkGray)}>010-4521-9999</Text>
                      </Row>
                    )}
                  </Pressable>
                  <Row style={styles.row(mConst.bgKhaki)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      스타일H김나현st
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col style={styles.col(6, true)} size={1}>
                  <Text style={styles.sText()}>#6</Text>
                </Col>
                <Col style={styles.col(6)} size={2}>
                  <Row style={styles.row()}>
                    <Text style={styles.sText()}>Knitwear</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(9)}>12,000,000</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText()}>Skirt</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(9)}>6,000,000</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText()}>Jacket</Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(9)}>4,000,000</Text>
                  </Row>
                </Col>
                <Col style={styles.col(6, true)} size={2}>
                  <FastImage source={model1Image} style={styles.modelImage} />
                </Col>
                <Col style={styles.col(6)} size={6}>
                  <Row style={styles.row(mConst.bgBlue)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      GQ이은주ed
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                  <Row style={styles.row(mConst.bgBlue)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      GQ이은주ed
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                  <Row style={styles.row(mConst.bgBlue)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      GQ이은주ed
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                </Col>
                <Col style={styles.col(6)} size={6}>
                  <Row style={styles.row(mConst.bgKhaki)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      스타일H김나현st
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                  <Row style={styles.row(mConst.bgKhaki)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      스타일H김나현st
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                  <Row style={styles.row(mConst.bgKhaki)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      스타일H김나현st
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}></Text>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.alert('수령 완료', '“스타일H김나현님께 Look #1 Knitwear 수령 완료"')
            }}
            style={styles.bottom}
          >
            <Text style={styles.bottomText}>All Picked Up</Text>
          </TouchableOpacity>
          <Modal style={styles.modal} isVisible={this.state.isvisible.open} useNativeDriver={true}>
            <View style={styles.modalView}>
              <Text style={styles.modalName}>{this.state.isvisible.name}</Text>
              <Text style={styles.modalPhone}>{this.state.isvisible.phone}</Text>
            </View>
            <View style={styles.layout}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  this.setState({...this.state, isvisible: {open: false, phone: '', name: ''}})
                }}
              >
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={async () => {
                  Linking.openURL(`tel:${this.state.isvisible.phone}`)
                }}
              >
                <Text style={styles.modalText}>Call</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LinkSheetDetailScreen)
