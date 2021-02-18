import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
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

class LinkSheetScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      swipe: true,
    }
  }
  componentDidMount() {
    this.pushOption('Return', true)
    // this.alert('수령 완료', '“스타일H김나현님께 Look #1 Knitwear 수령 완료"', [{onPress: () => null}, {onPress: () => null}])
  }
  onSwipe = gesture => {
    this.setState({swipe: gesture === 'left' ? true : false})
  }
  render() {
    const {swipe} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{paddingVertical: 10}}>
            {/* {this.closeBackOption(closeBtnImage, 'FILTER', null)} */}
            <View style={styles.titleWrapper}>
              <FastImage source={goLeftImage} style={styles.goImage} />
              <View style={styles.titleSubWrapper}>
                <Text style={styles.titleSubText}>GQ이은주ed</Text>
                <FastImage source={unfoldImage} style={styles.unfoldImage} />
              </View>
              <FastImage source={goRightImage} style={styles.goImage} />
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>Magazine</Text>
              <Text style={styles.middleDescText}>GQ</Text>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleDualWrapper}>
                <Text style={styles.middleText}>Editor/Stylist</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>이은주ed</Text>
                  <Text style={styles.middleDescText}> 010-1111-2222</Text>
                </View>
              </View>
              <View style={styles.middleDualWrapper}>
                <Text style={styles.middleText}>Assistant</Text>
                <View style={styles.middleDescWrapper}>
                  <Text style={styles.middleDescTextBold}>박지연ed</Text>
                  <Text style={styles.middleDescText}> 010-5423-9999</Text>
                </View>
              </View>
            </View>
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleTripleWrapper}>
                <Text style={styles.middleText}>Loading Date</Text>
                <Text style={styles.middleDescText}>8/4(MON)</Text>
              </View>
              <View style={styles.middleTripleWrapper}>
                <Text style={styles.middleText}>Shooting Date</Text>
                <Text style={styles.middleDescText}>8/5(SUN)</Text>
              </View>
              <View style={styles.middleTripleWrapper}>
                <Text style={styles.middleText}>Returning Date</Text>
                <Text style={styles.middleDescText}>8/6(TUE)</Text>
              </View>
            </View>
            <View style={styles.middleWrapper}>
              <Text style={styles.middleText}>Address</Text>
              <Text style={styles.middleDescText}>서울 강남구 역삼동 지연빌딩 326-33</Text>
            </View>
            <Grid style={styles.grid}>
              <Row>
                <Col style={styles.col()} size={1}></Col>
                <Col style={styles.col()} size={2}></Col>
                <Col style={styles.col()} size={2}></Col>
                <Col style={styles.col(1, true)} size={6}>
                  <Text>Shoot</Text>
                </Col>
                <Col style={styles.col(1, true)} size={6}>
                  <Text>To</Text>
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
                  <Row style={styles.row(mConst.bgBlue)}>
                    <Text style={styles.sText(12)} numberOfLines={1}>
                      GQ이은주ed
                    </Text>
                  </Row>
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}>010-4521-9999</Text>
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
                  <Row style={styles.row()}>
                    <Text style={styles.sText(12, mConst.darkGray)}>010-4521-9999</Text>
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
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LinkSheetScreen)
