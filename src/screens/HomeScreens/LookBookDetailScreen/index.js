import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const modelImg = require('../../../images/navi/model_1.png')
const newImg = require('../../../images/navi/new_1.png')

class LookBookDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          img: require('../../../images/navi/model_1.png'),
          new: true,
          title: 'Look #1',
          desc: 'ALL IN',
          desc1: 'Jacket',
          desc2: 'Cardigan',
          desc3: 'Shirt',
          desc4: 'Pants',
        },
        {img: require('../../../images/navi/model_1.png'), new: false, title: 'Look #2'},
      ],
      brandTitle: 'GUCCI WOMEN COLLECTION',
    }
  }

  renderItem = ({item}) => {
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <View style={{width: '100%', height: mUtils.wScale(275), backgroundColor: 'red'}}>
          <Pressable>
            {({pressed}) => (
              <FastImage resizeMode={'contain'} style={styles.modelImg} source={modelImg}>
                {pressed ? (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(126, 161, 178, 0.8)',

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc1}>{item.desc}</Text>
                    <Text style={styles.desc2}>{item.desc1}</Text>
                    <Text style={styles.desc2}>{item.desc2}</Text>
                    <Text style={styles.desc2}>{item.desc3}</Text>
                    <Text style={styles.desc2}>{item.desc4}</Text>
                  </View>
                ) : null}
              </FastImage>
            )}
          </Pressable>
          {item.new ? <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} /> : null}
        </View>
        <Text style={styles.title1}>{item.title}</Text>
      </View>
    )
  }

  render() {
    const {data, brandTitle} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>LookBook</Text>
          <TouchableOpacity style={styles.smallBox}>
            <Text style={styles.rightSmall}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.brandTitle}>{brandTitle}</Text>
          <FlatList
            bounces={false}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.title}_${Math.random()}`}
            contentContainerStyle={{paddingVertical: mUtils.wScale(20)}}
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
)(LookBookDetailScreen)
