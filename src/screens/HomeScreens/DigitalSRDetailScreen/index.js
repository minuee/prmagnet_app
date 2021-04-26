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
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const noCheckImg = require('../../../images/navi/no_check_1.png')
const checkImg = require('../../../images/navi/check_1.png')

class DigitalSRDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {data: ''}
  }
  getSRDetail = async () => {
    const {no} = this.props.route.params
    try {
      let response = await API.getSRDetail(no)
      console.log('getSRDetail>>>', JSON.stringify(response))
      this.setState({data: response})
    } catch (error) {
      console.log('getSRDetail>>>', error)
    }
  }

  componentDidMount() {
    this.pushOption('')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getSRDetail()
  }

  render() {
    const {data} = this.state
    return data ? (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {data.sample_list.map((item, index) => {
            return (
              <React.Fragment key={index}>
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
                  {item.sample_image_list.map((item, index) => {
                    return (
                      <FastImage
                        key={index}
                        resizeMode={'contain'}
                        style={{width: '100%', height: mUtils.wScale(500)}}
                        source={{uri: item.full_url}}
                      />
                    )
                  })}
                </Swiper>

                <View style={{paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(25)}}>
                  {index === 0 ? <Text style={styles.title}>{data.showroom_nm}</Text> : null}

                  <View style={styles.emptyBar} />
                  <View style={styles.layout}>
                    <Text style={styles.left}>Sample name</Text>
                    <Text style={{...styles.right}}>{item.sample_nm}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Season</Text>
                    <Text style={{...styles.right}}>{data.season_text}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Gender</Text>
                    <Text style={{...styles.right}}>{item.gender_text}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Category</Text>
                    <Text style={{...styles.right}}>{item.category_middle_text}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Color</Text>
                    <Text style={{...styles.right}}>{item.color_text}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Size</Text>
                    <Text style={{...styles.right}}>{item.size_direct_input}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Material</Text>
                    <Text style={{...styles.right}}>{item.material_text}</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>Price</Text>
                    <Text style={{...styles.right}}>{mUtils.numberWithCommas(item.price)}원</Text>
                  </View>
                  <View style={styles.layout}>
                    <Text style={styles.left}>샘플 입고</Text>
                    <FastImage resizeMode={'contain'} style={styles.checkImg} source={item.in_yn ? checkImg : noCheckImg} />
                  </View>

                  <Text style={styles.left}>Caption</Text>
                  <View style={{...styles.layout1, marginTop: mUtils.wScale(10)}}>
                    <Text style={styles.desc}>{item.caption_korean}</Text>
                  </View>
                  <View style={{...styles.layout1, marginTop: mUtils.wScale(6), marginBottom: mUtils.wScale(13)}}>
                    <Text style={styles.desc}>{item.caption_english}</Text>
                  </View>
                  <Text style={styles.left}>기타 사항</Text>
                  <View style={{...styles.layout2, marginTop: mUtils.wScale(10), marginBottom: mUtils.wScale(30)}}>
                    <Text style={styles.desc}>{item.etc}</Text>
                  </View>
                </View>
              </React.Fragment>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    ) : (
      <Loading />
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(DigitalSRDetailScreen)
