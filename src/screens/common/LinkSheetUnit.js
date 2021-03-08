import React, {PureComponent} from 'react'
import {Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'
import Swiper from './Swiper'

const circleCheckImage = require('../../images/common/circle_check.png')
const circleCheckOnImage = require('../../images/common/circle_check_on.png')

export default class LinkSheetUnit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      swipe: false,
    }
  }
  onSwipe = gesture => {
    this.setState({swipe: gesture === 'left' ? true : false})
  }
  render() {
    const {swipe} = this.state
    const {name, phone, index, onLongPress, onLongPressPhone, onSwipeCheck, color, checked} = this.props
    return (
      <React.Fragment key={index}>
        <Swiper onSwipeLeft={() => this.onSwipe('left')} onSwipeRight={() => this.onSwipe('right')}>
          <Pressable onLongPress={onLongPress}>
            {({pressed}) => (
              <Row style={styles.row(color)}>
                {swipe ? (
                  <>
                    <Col style={styles.col(1, true, pressed ? 'rgba(0, 0, 0, 0.2)' : color)} size={3}>
                      <Text style={styles.sText(12)} numberOfLines={1}>
                        {name}
                      </Text>
                    </Col>
                    <Col style={styles.col(1, true)} size={1}>
                      <FastImage source={circleCheckImage} style={styles.checkImage} />
                    </Col>
                  </>
                ) : (
                  <Text style={styles.sText(12)} numberOfLines={1}>
                    {name}
                  </Text>
                )}
              </Row>
            )}
          </Pressable>
        </Swiper>
        <Pressable onLongPress={onLongPressPhone}>
          {({pressed}) => (
            <Row style={styles.row(pressed ? 'rgba(0, 0, 0, 0.2)' : 'white')}>
              <Text style={styles.sText(12, mConst.darkGray)}>{phone}</Text>
            </Row>
          )}
        </Pressable>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  col: (heightScale = 1, center, backgroundColor = mConst.white) => ({
    justifyContent: center ? 'center' : undefined,
    alignItems: center ? 'center' : undefined,
    height: mUtils.wScale(30) * heightScale,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: center ? StyleSheet.hairlineWidth : 0,
    backgroundColor,
  }),
  row: (backgroundColor = mConst.white) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: mUtils.wScale(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor,
  }),
  sText: (fontSize = 10, color = mConst.textBaseColor) => ({
    fontSize,
    color,
  }),
  checkImage: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
  },
})
