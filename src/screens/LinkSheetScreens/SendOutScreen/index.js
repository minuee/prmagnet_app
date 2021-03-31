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

class SendOutScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
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
    try {
      const response = await API.getSendoutDetail(reqNo)
      this.setState({data: _.get(response, 'right'), loading: false})
      console.log('Send Out 스케쥴 상세 조회 성공', JSON.stringify(response))
    } catch (error) {
      // this.setState({loading: false})
      console.log('Send Out 스케쥴 상세 조회 실패', error)
    }
  }
  handleLongPressPhone = (name, phone) => {
    this.setState({isvisible: {open: true, name, phone}})
  }
  handleCheckItem = (name, roomName, sampleName, sampleNo) => {
    const {data} = this.state
    if (!this.state.checkedList.includes(sampleNo)) {
      const sendPush = async () => {
        try {
          const response = await API.pushSendoutOne(_.get(data, 'req_no'), _.get(data, 'showroom_list.length'), sampleNo)
          console.log('Send Out 단일 발송 완료')
        } catch (error) {
          console.log('Send Out 단일 발송 실패', error)
        }
      }
      this.alert('발송완료', `${name}님께 ${roomName}${mConst.lf}${sampleName} 발송 완료하였습니다.`, [
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
    console.log('###req_no, len:', _.get(data, 'req_no'), _.get(data, 'showroom_list.length'))
    const sendPush = async () => {
      try {
        const response = await API.pushSendout(_.get(data, 'req_no'), _.get(data, 'showroom_list.length'))
        this.setState({allChecked: true})
        console.log('전체 발송 완료')
      } catch (error) {
        console.log('전체 발송 실패', error)
      }
    }
    if (!this.state.allChecked) {
      this.alert('전체 상품 발송 확인', '전체 상품을 발송 하셨습니까?', [{onPress: sendPush}, {}])
    }
  }
  render() {
    const {data, checkedList, allChecked, loading} = this.state
    const {moveLeft, moveRight} = this.props
    const loaningDate = mUtils.getShowDate(mUtils.get(data, 'loaning_date'))
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
              <Text style={styles.titleSubText}>{loaningDate}</Text>
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
                <Text style={styles.middleDescTextBold}>{toName}</Text>
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
          {mConst.getUserType() === 'B' ? (
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
          ) : (
            <View style={styles.middleGroupWrapper}>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>Pickup Date</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'loaning_date'))}</Text>
              </View>
              <View style={styles.middleSubWrapper(2)}>
                <Text style={styles.middleText}>Shooting Date</Text>
                <Text style={styles.middleDescText}>{mUtils.getShowDate(_.get(data, 'shooting_date'))}</Text>
              </View>
            </View>
          )}
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
                <Text>{mConst.getUserType() === 'B' ? 'From' : 'Shoot'}</Text>
              </Col>
              <Col style={styles.col(1, true)} size={6}>
                <Text>{mConst.getUserType() === 'B' ? 'Shoot' : 'To'}</Text>
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
                      return (
                        <LinkSheetUnit
                          key={subIndex}
                          readOnly={mConst.getUserType() !== 'B'}
                          checked={checkedList.includes(subItem.sample_no) || subItem.check_yn || allChecked}
                          name={fromName}
                          phone={fromPhone}
                          onLongPress={() => null}
                          onSwipeCheck={() => this.handleCheckItem(toName, roomName, subItem.category, subItem.sample_no)}
                          color={mConst.getUserType() === 'B' ? '#e1c668' : '#d78979'}
                        />
                      )
                    })}
                  </Col>
                  <Col style={styles.col(rowSize * 2)} size={6}>
                    {_.map(samples, (subItem, subIndex) => {
                      return (
                        <LinkSheetUnit
                          key={subIndex}
                          readOnly={mConst.getUserType() === 'B'}
                          checked={checkedList.includes(subItem.sample_no) || subItem.check_yn || allChecked}
                          name={toName}
                          phone={toPhone}
                          onLongPress={() => null}
                          onLongPressPhone={() => this.handleLongPressPhone(toName, toPhone)}
                          onSwipeCheck={() => this.handleCheckItem(toName, subItem.sample_nm, subItem.sample_no)}
                          color={mConst.getUserType() === 'B' ? '#7ea1b2' : '#b8c18c'}
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
          <Text style={styles.bottomText}>All Sent Out</Text>
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

export default SendOutScreen
