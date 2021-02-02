import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'
import cBind, {callOnce} from '../../../../common/navigation'
import Text from '../../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const modelImg = require('../../../../images/navi/model_1.png')
const likeImg = require('../../../../images/navi/like_1.png')

class PressRelease extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      data: [
        {
          img: require('../../../../images/navi/model_1.png'),
          like: true,
          title: 'Look #1',
        },
        {img: require('../../../../images/navi/model_1.png'), new: false, title: 'Look #2'},
      ],
    }
  }
  componentDidMount() {
    this.pushOption('Favorites')
  }

  renderItem = ({item}) => {
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity activeOpacity={0.5} style={{width: '100%', height: mUtils.wScale(275)}}>
          <FastImage resizeMode={'contain'} style={styles.modelImg} source={modelImg} />
          {item.like ? <FastImage resizeMode={'contain'} style={styles.likeImg} source={likeImg} /> : null}
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    )
  }

  render() {
    const {data} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <FlatList
            bounces={false}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.title}_${Math.random()}`}
            contentContainerStyle={{paddingVertical: mUtils.wScale(15)}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(PressRelease)
