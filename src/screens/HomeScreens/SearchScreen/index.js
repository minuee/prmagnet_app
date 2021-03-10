import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const searchImage = require('../../../images/common/search.png')
const modelImg = require('../../../images/sample/model_3.png')
const userType = mConst.getUserType()

class SearchScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      keyword: '',
      loading: false,
      brand: {
        showroom: [],
        lookbook: [],
        scheduler: [],
        net_count_app: 0,
      },
      magazine: {
        showroom: [],
        sample_request: [],
        scheduler: [],
        pickup: [],
        net_count_app: 0,
      },
    }
  }

  mapList = list => {
    return list.map((item, index) => {
      return (
        <View key={index} style={styles.layout}>
          <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.img_url_adres}} />
          <View style={styles.layout1}>
            <Text style={styles.brand}>{item.title}</Text>
            <Text style={styles.dt}>{mUtils.getShowDate(item.reg_dt, 'YYYY-MM-DD')}</Text>
          </View>
        </View>
      )
    })
  }

  search = text => {
    console.log('4545454545', text)
    this.setState({keyword: text})
    this.getAllSearch(text)
  }

  getAllSearch = async text => {
    try {
      let response = await API.getAllSearch({
        search_text: text,
      })
      console.log('getAllSearch>>>', response)
      if (userType === 'M') {
        this.setState({magazine: response})
      } else {
        this.setState({brand: response})
      }
    } catch (error) {
      console.log('getAllSearch>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getAllSearch'})
    }
  }

  componentDidMount() {
    this.pushOption('Search')
    this.getAllSearch('')
  }

  render() {
    const {keyword, brand, magazine} = this.state
    console.log('67676767', brand, magazine)
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
                onChangeText={text => this.search(text)}
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
        <View style={{paddingHorizontal: mUtils.wScale(20), flex: 1}}>
          <Text style={styles.result}>총 {userType === 'M' ? magazine.net_count_app : brand.net_count_app}건의 검색결과가 있습니다</Text>
          <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
            {userType === 'M' ? (
              <>
                <Text style={styles.subTitle}>Digital Showroom ({magazine.showroom.length})</Text>
                {this.mapList(magazine.showroom)}
                <Text numberOfLines={2} style={styles.subTitle}>
                  Sample Requests ({magazine.sample_request.length})
                </Text>
                {this.mapList(magazine.sample_request)}
                <Text style={styles.subTitle}>Scheduler ({magazine.scheduler.length})</Text>
                {this.mapList(magazine.scheduler)}
                <Text style={styles.subTitle}>Pickup ({magazine.pickup.length})</Text>
                {this.mapList(magazine.pickup)}
              </>
            ) : (
              <>
                <Text style={styles.subTitle}>Digital Showroom ({brand.showroom.length})</Text>
                {this.mapList(brand.showroom)}
                <Text numberOfLines={2} style={styles.subTitle}>
                  Lookbook ({brand.lookbook.length})
                </Text>
                {this.mapList(brand.lookbook)}
                <Text style={styles.subTitle}>Scheduler ({brand.scheduler.length})</Text>
                {this.mapList(brand.scheduler)}
              </>
            )}
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
