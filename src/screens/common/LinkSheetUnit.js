import React, {PureComponent} from 'react'
import {TouchableWithoutFeedback, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'
import SwiperUnit from './SwiperUnit'

const circleCheckImage = require('../../images/common/circle_check.png')
const circleCheckOnImage = require('../../images/common/circle_check_on.png')

export default class LinkSheetUnit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      swiped: false,
    }
  }
  onSwipe = gesture => {
    this.setState({swiped: gesture === 'left' ? true : false})
  }
  render() {
    const {swiped} = this.state
    const {name, phone, onLongPress, onLongPressPhone, onSwipeCheck, color, checked, readOnly} = this.props
    if (readOnly) {
      return (
        <>
          <Row style={styles.row(color)}>
            <Text style={styles.sText()} numberOfLines={1}>
              {name}
            </Text>
          </Row>
          <Row style={styles.row(mConst.white)}>
            <Text style={styles.sText(mConst.darkGray)}>{phone}</Text>
          </Row>
        </>
      )
    }
    return (
      <>
        <SwiperUnit onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
          {swiped || checked ? (
            <TouchableWithoutFeedback onPress={swiped ? onSwipeCheck : null}>
              <Row style={styles.row(color)}>
                <Col style={styles.col(1, true, color, checked)} size={3}>
                  <Text style={styles.sText()} numberOfLines={1}>
                    {name}
                  </Text>
                </Col>
                <Col style={styles.col(1, true, checked ? color : mConst.white, checked)} size={1}>
                  <FastImage source={checked ? circleCheckOnImage : circleCheckImage} style={styles.checkImage} />
                </Col>
              </Row>
            </TouchableWithoutFeedback>
          ) : (
            <Pressable onLongPress={onLongPress}>
              {({pressed}) => (
                <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : color)}>
                  <Text style={styles.sText()} numberOfLines={1}>
                    {name}
                  </Text>
                </Row>
              )}
            </Pressable>
          )}
        </SwiperUnit>
        <Pressable onLongPress={onLongPressPhone}>
          {({pressed}) => (
            <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : mConst.white)}>
              <Text style={styles.sText(mConst.darkGray)}>{phone}</Text>
            </Row>
          )}
        </Pressable>
      </>
    )
  }
}

const styles = StyleSheet.create({
  col: (heightScale = 1, center, backgroundColor = mConst.white, noSideBorder = false) => ({
    justifyContent: center ? 'center' : undefined,
    alignItems: center ? 'center' : undefined,
    height: mUtils.wScale(30) * heightScale,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: center ? StyleSheet.hairlineWidth : 0,
    borderLeftWidth: noSideBorder ? 0 : StyleSheet.hairlineWidth,
    borderRightWidth: noSideBorder ? 0 : StyleSheet.hairlineWidth,
    backgroundColor,
  }),
  row: (backgroundColor = mConst.white) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: mUtils.wScale(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor,
  }),
  sText: (color = mConst.textBaseColor) => ({
    fontSize: 12,
    color,
  }),
  checkImage: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
  },
})
