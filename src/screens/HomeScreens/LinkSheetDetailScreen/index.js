import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Linking} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'
import Modal from 'react-native-modal'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import LinkSheetUnit from '../../common/LinkSheetUnit'
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
  handleLongPress = (name, sampleNo) => {
    this.alert('상품 미수령 알림', `'${name}'님께 상품미수령 알림을 보내시겠습니까?`, [
      {
        onPress: () => {
          setTimeout(() => {
            this.alert('미수령 알림 전송 완료', '미수령 알림을 전송하였습니다.')
          }, 100)
        },
      },
      {},
    ])
  }
  handleLongPressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}})
  }
  render() {
    const {swipe, data} = this.state
    const fromName = mUtils.get(data, 'send_user_nm')
    const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'phone_no'))
    const toName = mUtils.get(data, 'brand_user_nm')
    const toPhone = mUtils.phoneFormat(mUtils.get(data, 'brand_phone_no'))
    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{paddingVertical: 10}}>
            {/* {this.closeBackOption(closeBtnImage, 'FILTER', null)} */}
            <View style={styles.titleWrapper}>
              <FastImage source={goLeftImage} style={styles.goImage} />
              <View style={styles.titleSubWrapper}>
                <Text style={styles.titleSubText}>
                  {fromName}-&gt;{toName}
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
                  <Text style={styles.middleDescTextBold}>{fromName}</Text>
                  <Text style={styles.middleDescText}> {fromPhone}</Text>
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
              {_.map(mUtils.get(data, 'showroom_list', []), (item, index) => {
                const samples = mUtils.get(item, 'individual_samples', [])
                const roomName = mUtils.get(item, 'individual_samples[0].showroom_nm')
                const rowSize = _.size(samples)
                return (
                  <Row key={index}>
                    <Col style={styles.col(rowSize * 2, true)} size={1}>
                      <Text style={styles.sText()}>{roomName}</Text>
                    </Col>
                    <Col style={styles.col(rowSize * 2)} size={2}>
                      {_.map(samples, (subItem, subIndex) => {
                        return (
                          <React.Fragment key={subIndex}>
                            <Row style={styles.row()}>
                              <Text style={styles.sText()}>{mUtils.get(subItem, 'sample_category')}</Text>
                            </Row>
                            <Row style={styles.row()}>
                              <Text style={styles.sText(9)}>{mUtils.moneyFormat(mUtils.get(subItem, 'price', 0))}</Text>
                            </Row>
                          </React.Fragment>
                        )
                      })}
                    </Col>
                    <Col style={styles.col(rowSize * 2, true)} size={2}>
                      <FastImage source={model2Image} style={styles.modelImage} />
                    </Col>
                    <Col style={styles.col(rowSize * 2)} size={6}>
                      {_.map(samples, (subItem, subIndex) => {
                        return (
                          <LinkSheetUnit
                            name={fromName}
                            phone={fromPhone}
                            index={subIndex}
                            onLongPress={() => this.handleLongPress(fromName, subItem.sample_no)}
                            onLongPressPhone={() => this.handleLongPressPhone(fromName, fromPhone)}
                            color={mConst.bgBlue}
                          />
                        )
                      })}
                    </Col>
                    <Col style={styles.col(rowSize * 2)} size={6}>
                      {_.map(samples, (subItem, subIndex) => {
                        return (
                          <LinkSheetUnit
                            name={toName}
                            phone={toPhone}
                            index={subIndex}
                            onLongPress={() => this.handleLongPress(toName, subItem.sample_no)}
                            onLongPressPhone={() => this.handleLongPressPhone(toName, toPhone)}
                            color={mConst.bgKhaki}
                          />
                        )
                      })}
                    </Col>
                  </Row>
                )
              })}
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
                  this.setState({isvisible: {open: false, phone: '', name: ''}})
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
