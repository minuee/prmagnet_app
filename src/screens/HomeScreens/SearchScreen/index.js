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
        net_count_app: 0,
      },
      magazine: {
        showroom: [],
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
            <Text style={styles.dt}>{item.subtitle}</Text>
          </View>
        </View>
      )
    })
  }

  search = text => {
    if ( this.props.user.subScrbeStatus ) {
      this.setState({loading: true, keyword: text}, () => {
        this.getAllSearch()
      })
    }else{
      mUtils.fn_call_toast('구독 후 이용해 주세요');
    }
  }

  getAllSearch = async () => {
    const userType = mConst.getUserType()
    const {keyword} = this.state
    try {
      const response = await API.getAllSearch({
        search_text: keyword,
      })
      //console.log('getAllSearch>>>', response)
      if (response.success) {
        this.setState({loading: false})
        if (userType !== 'B') {
          this.setState({magazine: response})
        } else {
          this.setState({brand: response})
        }
      }
    } catch (error) {
      //console.log('getAllSearch>>>', error)
      await API.postErrLog({error: JSON.stringify(error), desc: 'getAllSearch'})
    }
  }

  componentDidMount() {
    this.pushOption('Search')
    this.getAllSearch('')
  }

  render() {
    const {keyword, brand, magazine, loading} = this.state
    const userType = mConst.getUserType()
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
          <Text style={styles.result}>총 {userType !== 'B' ? magazine.net_count_app : brand.net_count_app}건의 검색결과가 있습니다</Text>
          {loading ? (
            <Loading />
          ) : (
            <>
              {keyword ? (
                <>
                  {userType === 'B' ? (
                    _.size(brand.showroom) > 0 || _.size(brand.lookbook) > 0 ? (
                      <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={{flexGrow: 1, paddingBottom: mUtils.wScale(30)}}
                        showsVerticalScrollIndicator={false}
                      >
                        <>
                          <Text style={styles.subTitle}>Digital Showroom ({brand.showroom.length})</Text>
                          {this.mapList(brand.showroom)}
                          <Text numberOfLines={2} style={styles.subTitle}>
                            Lookbook ({brand.lookbook.length})
                          </Text>
                          {this.mapList(brand.lookbook)}
                        </>
                      </ScrollView>
                    ) : (
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: mConst.textGray, marginBottom: mUtils.wScale(100)}}>
                          {keyword}와 (과) 일치하는 검색 결과가 없습니다.
                        </Text>
                      </View>
                    )
                  ) : _.size(magazine.showroom) > 0 ? (
                    <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                      <>
                        <Text style={styles.subTitle}>Digital Showroom ({magazine.showroom.length})</Text>
                        {this.mapList(magazine.showroom)}
                      </>
                    </ScrollView>
                  ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 18, color: mConst.textGray, marginBottom: mUtils.wScale(100)}}>
                        {keyword}와 (과) 일치하는 검색 결과가 없습니다.
                      </Text>
                    </View>
                  )}
                </>
              ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, color: mConst.textGray, marginBottom: mUtils.wScale(100)}}>
                   {this.props.user.subScrbeStatus ? "검색어를 입력해 주세요." : "검색어를 입력해 주세요. \n   ( 구독후 이용가능 )"}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({user: state.user,}),
  dispatch => ({})
)(SearchScreen)
