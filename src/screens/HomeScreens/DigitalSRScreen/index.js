import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'
import Modal from 'react-native-modal'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const modelImg = require('../../../images/sample/model_1.png')
const newImg = require('../../../images/navi/new_1.png')
const notiImg = require('../../../images/navi/noti_1.png')
const telImg = require('../../../images/navi/tel_1.png')
const fixImg = require('../../../images/navi/fix_1.png')
const settingImg = require('../../../images/navi/setting_1.png')
const bookImg = require('../../../images/navi/book_1.png')
const moreImg = require('../../../images/navi/more_4.png')
const crownImg = require('../../../images/navi/crown_1.png')
const selectImg1 = require('../../../images/navi/select_1.png')
const selectImg2 = require('../../../images/navi/select_2.png')

class DigitalSRScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          img: require('../../../images/sample/model_1.png'),
          new: true,
          title: 'Look #1',
        },
        {img: require('../../../images/sample/model_1.png'), new: false, title: 'Look #2'},
      ],
      select: [],
      isvisible: false,
    }
  }

  componentDidUpdate() {
    if (this.state.select.length === 0) {
      console.log('11')
      this.setState({...this.state, isvisible: false})
    } else {
      console.log('22')
      this.setState({...this.state, isvisible: true})
    }
  }

  renderItem = ({item}) => {
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.select.includes(item)) {
              let copy = [...this.state.select]
              let idx = copy.indexOf(item)
              copy.splice(idx, 1)
              this.setState({...this.state, select: copy})
            } else {
              this.setState({...this.state, select: this.state.select.concat(item)})
            }
          }}
          activeOpacity={0.5}
          style={{width: '100%', height: mUtils.wScale(275)}}
        >
          <FastImage resizeMode={'contain'} style={styles.modelImg} source={modelImg} />
          {item.new ? (
            <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} />
          ) : (
            <FastImage resizeMode={'contain'} style={styles.newImg} source={crownImg} />
          )}
          {this.state.select.includes(item) ? (
            <View style={styles.select}>
              <FastImage resizeMode={'contain'} style={styles.selectImg} source={selectImg2} />
            </View>
          ) : null}
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    )
  }

  render() {
    const {data} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <View style={{...styles.layout, justifyContent: 'space-between', marginTop: mUtils.wScale(25)}}>
            <View>
              <Text style={{...styles.mainTitle}}>Digital</Text>
              <Text style={styles.mainTitle1}>Showroom</Text>
            </View>
            <TouchableOpacity style={{...styles.selectBox}}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(10)}}>
            <FastImage resizeMode={'contain'} style={styles.notiImg} source={notiImg} />
            <Text style={styles.noti}>9/20 디지털쇼룸 이용 시 공지사항을 안내해 드립니다.</Text>
          </View>
          <View style={{...styles.layout, marginTop: mUtils.wScale(3)}}>
            <FastImage resizeMode={'contain'} style={styles.telImg} source={telImg} />
            <Text style={styles.tel}>02-2222-3131</Text>
          </View>
          <View style={{...styles.layout, justifyContent: 'space-between', paddingTop: mUtils.wScale(20), paddingBottom: mUtils.wScale(15)}}>
            <TouchableOpacity style={{...styles.layout}}>
              <Text style={styles.season}>2020 F/W</Text>
              <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImg} />
            </TouchableOpacity>
            <View style={{...styles.layout}}>
              <TouchableOpacity>
                <FastImage resizeMode={'contain'} style={styles.bookImg} source={bookImg} />
              </TouchableOpacity>
              <View style={{...styles.emptyBar}} />
              <TouchableOpacity>
                <FastImage resizeMode={'contain'} style={styles.settingImg} source={settingImg} />
              </TouchableOpacity>
              <View style={{...styles.emptyBar}} />
              <TouchableOpacity>
                <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            bounces={false}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.title}_${Math.random()}`}
            contentContainerStyle={{}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
          />
        </View>
        {this.state.isvisible ? (
          <View style={styles.bottomSheet}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{...styles.bottomText1}}>Total Number of </Text>
                <Text style={{...styles.bottomText1, fontFamily: 'Roboto-Bold'}}>Sample Selectsd : </Text>
              </View>
              <Text style={{...styles.bottomText2, marginLeft: mUtils.wScale(3)}}>{this.state.select.length}</Text>
            </View>
            <TouchableOpacity style={styles.bottomButton}>
              <Text style={{...styles.bottomText3}}>Request Samples</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(DigitalSRScreen)
