import React, {PureComponent} from 'react'
import {SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, FlatList, ScrollView, Pressable} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import 'moment/locale/ko'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import Header from '../../common/Header'
import styles from './styles'

const moreImg = require('../../../images/navi/more_4.png')
const fixImg = require('../../../images/navi/fix_1.png')
const schedulerImg = require('../../../images/navi/scheduler_1.png')
const modelImg = require('../../../images/navi/model_2.png')
const dollarImg1 = require('../../../images/navi/dollar_1.png')
const airplaneImg = require('../../../images/navi/airplane_1.png')
const dollarImg2 = require('../../../images/navi/dollar_2.png')
const plusImg = require('../../../images/navi/plus_1.png')
const memoImg = require('../../../images/navi/memo_1.png')
const linkImg = require('../../../images/navi/link_1.png')

class BrandSchedulerScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {}
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={{...styles.layout, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(20), marginBottom: mUtils.wScale(30)}}>
          <Text style={styles.mainTitle}>Scheduler</Text>
          <View style={styles.layout1}>
            <TouchableOpacity style={styles.layout2}>
              <Text style={styles.celLook}>Celeb</Text>
              <FastImage resizeMode={'contain'} style={styles.moreImg1} source={moreImg} />
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.layout2, marginLeft: mUtils.wScale(5)}}>
              <Text style={styles.celLook}>By LOOK</Text>
              <FastImage resizeMode={'contain'} style={styles.moreImg1} source={moreImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.layout, paddingHorizontal: mUtils.wScale(20), marginBottom: mUtils.wScale(10)}}>
          <TouchableOpacity style={styles.layout1}>
            <Text style={styles.dateSeason}>2020 F/W</Text>
            <FastImage resizeMode={'contain'} style={styles.moreImg2} source={moreImg} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FastImage resizeMode={'contain'} style={styles.fixImg} source={fixImg} />
          </TouchableOpacity>
        </View>
        <View style={{...styles.layout, backgroundColor: '#f6f6f6', paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(10)}}>
          <View style={styles.layout1}>
            <FastImage resizeMode={'contain'} style={styles.schedulerImg} source={schedulerImg} />
            <Text style={styles.date}>8/2(SUN)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.change}>변경</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: mUtils.wScale(20), paddingVertical: mUtils.wScale(25)}}>
          <View style={{...styles.layout4}}>
            <View style={{width: '49%'}}>
              <FastImage resizeMode={'cover'} style={styles.modelImg} source={modelImg} />
              <Text style={{...styles.title, marginVertical: mUtils.wScale(10)}}>Look #1</Text>
              <View style={{...styles.layout3}}>
                <Text style={styles.smallTitle}>Look #1</Text>
                <Text style={{...styles.smallDesc}}>수선중</Text>
              </View>
            </View>
            <View style={{width: '49%'}}>
              <Pressable
                onLongPress={() => {
                  this.alert('메모 삭제', '해당 메모를 삭제하시겠습니까?', [
                    {
                      onPress: () => {
                        setTimeout(() => {
                          this.alert('삭제 완료', '메모를 삭제 하였습니다.', [{onPress: () => null}])
                        }, 100)
                      },
                    },
                    {onPress: () => null},
                  ])
                }}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.3 : 1,
                  },
                  styles.layout5,
                ]}
              >
                <View style={styles.layout6}>
                  <Text style={styles.title}>VOGUE</Text>
                  <View style={styles.layout}>
                    <FastImage resizeMode={'contain'} style={styles.dollarImg1} source={dollarImg1} />
                    <FastImage resizeMode={'contain'} style={styles.airplaneImg} source={airplaneImg} />
                  </View>
                </View>
                <View style={styles.layout7}>
                  <Text style={{...styles.name}}>이진선 ed</Text>
                  <Text style={{...styles.brandDate, marginTop: mUtils.wScale(3)}}>VOGUE / 2020-08-02</Text>
                  <Text style={{...styles.desc, marginTop: mUtils.wScale(8)}}>
                    박현구 스튜디오{'\n'}
                    강남구 신사동 542-7 B1
                  </Text>

                  <Text style={{...styles.desc, marginTop: mUtils.wScale(3)}}>
                    김지영 as{'\n'}
                    010-7104-5568
                  </Text>
                </View>
              </Pressable>
              <TouchableOpacity>
                <FastImage resizeMode={'contain'} style={styles.plusImg} source={plusImg} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={{...styles.layout8}}>
          <FastImage resizeMode={'contain'} style={styles.memoImg} source={memoImg} />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(BrandSchedulerScreen)
