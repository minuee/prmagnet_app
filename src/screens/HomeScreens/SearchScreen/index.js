import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import DropDown from '../../common/DropDown'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import {Grid, Col, Row} from 'react-native-easy-grid'
import styles from './styles'
import {multicastChannel} from 'redux-saga'

const searchImage = require('../../../images/common/search.png')
const modelImg = require('../../../images/sample/model_3.png')

class SearchScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      keyword: '',
    }
  }
  componentDidMount() {
    this.pushOption('Search')
  }

  render() {
    const {keyword} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.keywordInput.focus()}>
          <View style={{paddingHorizontal: mUtils.wScale(20)}}>
            <View style={styles.inputTextWrapper}>
              <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
                <FastImage source={searchImage} style={styles.inputIcon} />
              </TouchableOpacity>
              <TextInput
                ref={comp => (this.keywordInput = comp)}
                style={styles.input}
                placeholderTextColor={mConst.textPhColor}
                value={keyword}
                onChangeText={text => this.setState({keyword: text})}
                placeholder="검색어를 입력해주세요."
                returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                onSubmitEditing={null}
                autoCompleteType="off"
                autoCapitalize="none"
                maxLength={100}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.result}>총 12건의 검색결과가 있습니다</Text>
          <ScrollView style={styles.scroll}>
            <Text style={styles.subTitle}>Digital Showroom (2)</Text>
            <View style={styles.layout}>
              <FastImage resizeMode={'contain'} style={styles.modelImg} source={modelImg} />
              <View style={styles.layout1}>
                <Text style={styles.brand}>GUCCI 20FW 602204 가죽 브라운 홀스빗 1955 숄더백</Text>
                <Text style={styles.dt}>2020 F/W</Text>
              </View>
            </View>
            <Text numberOfLines={2} style={styles.subTitle}>
              Sample Requests (2)
            </Text>
            <Text style={styles.subTitle}>Scheduler (1)</Text>
            <Text style={styles.subTitle}>Pickup (2)</Text>
            <Text style={styles.subTitle}>Press Release (2)</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(SearchScreen)
