import React, {PureComponent} from 'react'
import {SafeAreaView, ScrollView, FlatList, View, TouchableOpacity, Linking} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import SendOutScreen from '../SendOutScreen'
import PickupsScreen from '../PickupsScreen'
import ReturnScreen from '../ReturnScreen'
import styles from './styles'

const goLeftImage = require('../../../images/navi/go_left.png')
const goRightImage = require('../../../images/navi/go_right.png')

class LinkSheetDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
  }
  componentDidMount() {
    const {selectTitle} = this.params
    this.pushOption(selectTitle, false)
  }
  render() {
    const {selectTitle, selectEachList} = this.params
    const maxIndex = _.size(selectEachList) - 1
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={ref => (this.swiperRef = ref)}
          horizontal={true}
          pagingEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          data={selectEachList}
          renderItem={({item, index}) => {
            if (selectTitle === 'Send Out') {
              return (
                <SendOutScreen
                  key={index}
                  reqNo={item.req_no}
                  moveLeft={() => this.swiperRef.scrollToIndex({index: index > 0 ? index - 1 : 0, animated: true})}
                  moveRight={() => this.swiperRef.scrollToIndex({index: index < maxIndex ? index + 1 : maxIndex, animated: true})}
                />
              )
            } else if (selectTitle === 'Pickups') {
              return (
                <PickupsScreen
                  key={index}
                  reqNo={item.req_no}
                  moveLeft={() => this.swiperRef.scrollToIndex({index: index > 0 ? index - 1 : 0, animated: true})}
                  moveRight={() => this.swiperRef.scrollToIndex({index: index < maxIndex ? index + 1 : maxIndex, animated: true})}
                />
              )
            } else if (selectTitle === 'Return') {
              return (
                <ReturnScreen
                  key={index}
                  reqNo={item.req_no}
                  moveLeft={() => this.swiperRef.scrollToIndex({index: index > 0 ? index - 1 : 0, animated: true})}
                  moveRight={() => this.swiperRef.scrollToIndex({index: index < maxIndex ? index + 1 : maxIndex, animated: true})}
                />
              )
            }
          }}
        />
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(LinkSheetDetailScreen)
