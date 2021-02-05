import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Grid, Col, Row} from 'react-native-easy-grid'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import CategoryGroup from '../../common/CategoryGroup'
import ColorGroup from '../../common/ColorGroup'
import MaterialGroup from '../../common/MaterialGroup'
import BrandGroup from '../../common/BrandGroup'
import styles from './styles'

const goLeftImage = require('../../../images/navi/go_left.png')
const goRightImage = require('../../../images/navi/go_right.png')
const unfoldImage = require('../../../images/common/unfold.png')

class FilterScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {}
  }
  componentDidMount() {
    this.pushOption('Return', true)
  }
  render() {
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
            <View style={styles.horizonLine} />
            <Grid>
              <Row style={styles.headerWrapper}></Row>
              <Row>
                <Col size={35}></Col>
                <Col size={65}></Col>
              </Row>
            </Grid>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FilterScreen)
