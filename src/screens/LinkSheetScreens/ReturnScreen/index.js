import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Linking} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import Modal from 'react-native-modal'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import LinkSheetUnit from '../../common/LinkSheetUnit'
import Loading from '../../common/Loading'
import styles from './styles'

const goLeftImage = require('../../../images/navi/go_left.png')
const goRightImage = require('../../../images/navi/go_right.png')

class ReturnScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      listIndex: 0,
      checked: false,
      allChecked: false,
      data: {},
      checkedList: [],
      isvisible: {open: false, phone: '', name: ''},
      loading: true,
    }
  }
  componentDidMount() {
    this.handleLoadData()
  }
  handleLoadData = async () => {
    const {reqNo} = this.props
    console.log('###ReturnScreen-reqNo:', reqNo)
    try {
      const response = await API.getReturnDetail(reqNo)
      this.setState({data: _.get(response, 'right'), loading: false})
      console.log('Return 스케쥴 상세 조회 성공', JSON.stringify(response))
    } catch (error) {
      // this.setState({loading: false})
      console.log('Return 스케쥴 상세 조회 실패', error)
    }
  }
  handleLongPress = (name, sampleNo) => {
    const {data} = this.state
    console.log('###reqNo:', _.get(data, 'req_no'))
    const sendPush = async () => {
      try {
        const response = await API.pushReturnFail(_.get(data, 'req_no'))
        this.alert('미수령 알림 전송 완료', '미수령 알림을 전송하였습니다.')
        console.log('선택 미수령 푸시 완료')
      } catch (error) {
        console.log('선택 미수령 푸시 실패', error)
      }
    }
    this.alert('상품 미수령 알림', `'${name}'님께 상품미수령 알림을 보내시겠습니까?`, [{onPress: sendPush}, {}])
  }
  handleLongPressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}})
  }
  handleCheckItem = (name, sampleName, sampleNo) => {
    if (!this.state.checkedList.includes(sampleNo)) {
      const sendPush = async () => {
        try {
          const response = await API.pushReturnSuccess(_.get(data, 'req_no'))
          this.setState({allChecked: true})
          console.log('전체 수령 푸시 완료')
        } catch (error) {
          console.log('전체 수령 푸시 실패', error)
        }
      }
      this.alert('수령완료', `${name}님께 ${sampleName} 수령 완료`, [
        {
          onPress: () => {
            sendPush()
            this.setState(prevstate => ({checkedList: prevstate.checkedList.concat(sampleNo)}))
          },
        },
      ])
    }
  }
  handleCheckItemAll = () => {
    const {data} = this.state
    const sendPush = async () => {
      try {
        const response = await API.pushReturnSuccess(_.get(data, 'req_no'))
        this.setState({allChecked: true})
        console.log('전체 수령 푸시 완료')
      } catch (error) {
        console.log('전체 수령 푸시 실패', error)
      }
    }
    if (!this.state.allChecked) {
      this.alert('전체 상품 수령 확인', '전체 상품을 수령 하셨습니까?', [{onPress: sendPush}, {}])
    }
  }
  render() {
    const {data, checkedList, allChecked, loading} = this.state
    const {moveLeft, moveRight} = this.props
    const returningDate = mUtils.getShowDate(mUtils.get(data, 'returning_date'))
    const fromName = mUtils.get(data, 'from_user_nm')
    const fromPhone = mUtils.phoneFormat(mUtils.get(data, 'from_user_phone'))
    const toName = mUtils.get(data, 'to_user_nm')
    const toPhone = mUtils.phoneFormat(mUtils.get(data, 'to_user_phone'))
    if (loading) return <Loading />
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{paddingVertical: 10}}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={() => moveLeft()}>
              <FastImage source={goLeftImage} style={styles.goImage} />
            </TouchableOpacity>
            <View style={styles.titleSubWrapper}>
              <Text style={styles.titleSubText}>{returningDate}</Text>
            </View>
            <TouchableOpacity onPress={() => moveRight()}>
              <FastImage source={goRightImage} style={styles.goImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>Magazine</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'mgzn_nm', '-')}</Text>
          </View>
          <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper()}>
              <Text style={styles.middleText}>Editor/Stylist</Text>
              <View style={styles.middleDescWrapper}>
                <Text style={styles.middleDescTextBold}>{fromName}</Text>
              </View>
            </View>
            <View style={styles.middleSubWrapper()}>
              <Text style={styles.middleText}>Assistant</Text>
              <View style={styles.middleDescWrapper}>
                <Text style={styles.middleDescTextBold}>{mUtils.get(data, 'contact_user_nm', '-')}</Text>
                <Text style={styles.middleDescText}> {mUtils.phoneFormat(mUtils.get(data, 'contact_user_phone'))}</Text>
              </View>
            </View>
          </View>
          <View style={styles.middleGroupWrapper}>
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>Loaning Date</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'loaning_date'))}</Text>
            </View>
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>Shooting Date</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'shooting_date'))}</Text>
            </View>
            <View style={styles.middleSubWrapper(3)}>
              <Text style={styles.middleText}>Returning Date</Text>
              <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'returning_date'))}</Text>
            </View>
          </View>
          <View style={styles.middleWrapper}>
            <Text style={styles.middleText}>Address</Text>
            <Text style={styles.middleDescText}>{mUtils.get(data, 'studio', '-')}</Text>
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
            {_.map(mUtils.get(data, 'showroom_list', []), (item, index) => {
              const samples = mUtils.get(item, 'sample_list', [])
              const roomName = mUtils.get(item, 'showroom_nm')
              const imageUrl = mUtils.get(samples, '[0].image_list[0]')
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
                            <Text style={styles.sText()}>{mUtils.get(subItem, 'category')}</Text>
                          </Row>
                          <Row style={styles.row()}>
                            <Text style={styles.sText(9)}>{mUtils.moneyFormat(mUtils.get(subItem, 'price', 0))}</Text>
                          </Row>
                        </React.Fragment>
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2, true)} size={2}>
                    <FastImage source={{uri: imageUrl}} style={styles.modelImage} />
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      return <LinkSheetUnit readOnly key={subIndex} name={fromName} phone={fromPhone} color={mConst.bgBlue} />
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      return (
                        <LinkSheetUnit
                          key={subIndex}
                          checked={checkedList.includes(subItem.sample_no) || allChecked}
                          name={toName}
                          phone={toPhone}
                          onLongPress={() => this.handleLongPress(toName, subItem.sample_no)}
                          onLongPressPhone={() => this.handleLongPressPhone(toName, toPhone)}
                          onSwipeCheck={() => this.handleCheckItem(toName, subItem.category, subItem.sample_no)}
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
        <TouchableOpacity onPress={this.handleCheckItemAll} style={styles.bottom}>
          <Text style={styles.bottomText}>All Returned</Text>
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
    )
  }
}

export default ReturnScreen
