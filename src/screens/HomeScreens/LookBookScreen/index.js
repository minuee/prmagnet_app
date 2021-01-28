import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')

class LookBookScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {title: 'GUCCI WOMEN COLLECTION', brand: 'VOGUE', season: 'Pre-Spring', gender: 'Women', dt: '2020-08-05'},
        {title: 'GUCCI WOMEN COLLECTION', brand: 'VOGUE', season: 'Pre-Spring', gender: 'Women', dt: '2020-08-05'},
        {title: 'GUCCI WOMEN COLLECTION', brand: 'VOGUE', season: 'Pre-Spring', gender: 'Women', dt: '2020-08-05'},
      ],
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.layout3}>
        <View style={styles.layout4}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity>
            <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImage1} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mUtils.wScale(15)}}>
          <View>
            <Text style={styles.seasonGen}>
              {item.season} • {item.gender}
            </Text>
            <Text style={styles.dt}>Date Created • {item.dt}</Text>
          </View>
          <View style={styles.smallBox}>
            <Text style={styles.brand}>{item.brand}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.layout1}>
            <Text style={styles.mainTitle}>LookBook</Text>
            <TouchableOpacity style={styles.layout2} hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}>
              <Text style={styles.rightSmall}>Latest</Text>
              <FastImage resizeMode={'contain'} style={styles.latestImg} source={moreImage3} />
            </TouchableOpacity>
          </View>
          <FlatList
            bounces={false}
            style={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.dt}_${Math.random()}`}
          />
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LookBookScreen)
