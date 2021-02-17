import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {ScrollView} from 'react-native'

const circleImg1 = require('../../../images/navi/circle_1.png')
const circleImg2 = require('../../../images/navi/circle_2.png')

class ByBrandsSearchScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      topList: ['인기순', 'A-Z 순', '검색하기'],
      selectList: '인기순',
    }
  }

  componentDidMount() {
    this.modalOption('Select Brands')
  }

  render() {
    const {topList, selectList} = this.state
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View
            style={{
              ...styles.layout,
              backgroundColor: '#f6f6f6',
              paddingHorizontal: mUtils.wScale(20),
              paddingVertical: mUtils.wScale(15),
              marginTop: mUtils.wScale(10),
            }}
          >
            {topList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({...this.state, selectList: item})
                  }}
                  key={index}
                  style={{...styles.layout, marginRight: mUtils.wScale(16)}}
                >
                  <FastImage resizeMode={'contain'} style={styles.circle} source={selectList === item ? circleImg1 : circleImg2} />
                  <Text style={{...styles.topText, color: selectList === item ? '#555555' : '#999999'}}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <ScrollView></ScrollView>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.leftButton}>
              <Text style={styles.leftText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
              <Text style={styles.rightText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(ByBrandsSearchScreen)
