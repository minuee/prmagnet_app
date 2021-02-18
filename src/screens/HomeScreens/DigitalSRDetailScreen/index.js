import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Image} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Swiper from 'react-native-swiper'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const noCheckImg = require('../../../images/navi/no_check_1.png')
const checkImg = require('../../../images/navi/check_1.png')

class DigitalSRDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      model: [
        require('../../../images/sample/model_2.png'),
        require('../../../images/sample/model_2.png'),
        require('../../../images/sample/model_2.png'),
        require('../../../images/sample/model_2.png'),
      ],
      name: '2020 CUCCI FREE FOLE',
      season: 'Fall',
      gender: 'Women',
      category: '드레스',
      color: 'White',
      size: 'Samll',
      material: '코튼',
      price: '1,000,000',
      in: true,
    }
  }
  componentDidMount() {
    this.pushOption('')
  }
  render() {
    const {data} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Swiper
            loop={false}
            height={mUtils.wScale(500)}
            style={{height: mUtils.wScale(500), flex: 0}}
            containerStyle={{
              height: mUtils.wScale(500),
              flex: 0,
            }}
            activeDotColor={mConst.black}
            dotColor={mConst.white}
            dotStyle={styles.swipeDot}
            activeDotStyle={styles.swipeActiveDot}
          >
            {this.state.model.map((item, index) => {
              return <FastImage key={index} resizeMode={'cover'} style={{width: '100%', height: mUtils.wScale(500)}} source={item} />
            })}
          </Swiper>

          <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
            <Text style={styles.title}>Look #1</Text>
            <View style={styles.emptyBar} />
            <View style={styles.layout}>
              <Text style={styles.left}>Sample name</Text>
              <Text style={{...styles.right}}>{this.state.name}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Season</Text>
              <Text style={{...styles.right}}>{this.state.season}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Gender</Text>
              <Text style={{...styles.right}}>{this.state.gender}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Category</Text>
              <Text style={{...styles.right}}>{this.state.category}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Color</Text>
              <Text style={{...styles.right}}>{this.state.color}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Size</Text>
              <Text style={{...styles.right}}>{this.state.size}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Material</Text>
              <Text style={{...styles.right}}>{this.state.material}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>Price</Text>
              <Text style={{...styles.right}}>{this.state.price}</Text>
            </View>
            <View style={styles.layout}>
              <Text style={styles.left}>In</Text>
              <FastImage resizeMode={'contain'} style={styles.checkImg} source={this.state.in ? checkImg : noCheckImg} />
            </View>

            <Text style={styles.left}>Caption</Text>
            <View style={{...styles.layout1, marginTop: mUtils.wScale(10)}}>
              <Text style={styles.desc}>Korean</Text>
            </View>
            <View style={{...styles.layout1, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(13)}}>
              <Text style={styles.desc}>English</Text>
            </View>
            <Text style={styles.left}>Etc</Text>
            <View style={{...styles.layout2, marginTop: mUtils.wScale(10), marginBottom: mUtils.wScale(30)}}>
              <Text style={styles.desc}>Contents</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(DigitalSRDetailScreen)
