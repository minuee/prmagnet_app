import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity, Pressable, Share} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import Loading from '../../common/Loading'
import API from '../../../common/aws-api'

const modelImg = require('../../../images/sample/model_1.png')
const newImg = require('../../../images/navi/new_1.png')

class LookBookDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      brandTitle: 'GUCCI WOMEN COLLECTION',
      page: 1,
      limit: 10,
      share_uuid: '',
    }
  }

  share = async () => {
    const {brandTitle, share_uuid} = this.state
    Share.share(
      {
        message: share_uuid,
        url: share_uuid,
        title: brandTitle,
      },
      {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      }
    )
  }

  getLookBookDetail = async () => {
    const {lookbook_no} = this.props.route.params
    const {page, limit, list} = this.state
    try {
      let response = await API.getLookBookDetail({lookbook_no: lookbook_no, page: page, limit: limit})
      console.log('getLookBookDetail>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({...this.state, list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
      console.log('getLookBookDetail>>>', error)
    }
  }

  getShare = async () => {
    const {lookbook_nm, lookbook_no} = this.props.route.params
    try {
      let response = await API.getShare({lookbook_no: lookbook_no, lookbook_nm: lookbook_nm})
      console.log('getShare>>>', response)
      if (response.success) {
        this.setState({...this.state, share_uuid: response.share_uuid})
      }
    } catch (error) {
      console.log('getShare>>>', error)
    }
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
    this.getShare()
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getLookBookDetail()
  }

  renderItem = ({item}) => {
    return (
      <View style={{width: '49%', height: mUtils.wScale(310)}}>
        <View style={{width: '100%', height: mUtils.wScale(275), backgroundColor: 'red'}}>
          <Pressable>
            {({pressed}) => (
              <FastImage resizeMode={'contain'} style={styles.modelImg} source={item.image_url}>
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
          {item.is_new ? <FastImage resizeMode={'contain'} style={styles.newImg} source={newImg} /> : null}
        </View>
        <Text style={styles.title1}>{item.showroom_nm}</Text>
      </View>
    )
  }

  render() {
    const {list, brandTitle} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>LookBook</Text>
          <TouchableOpacity
            style={styles.smallBox}
            onPress={() => {
              this.share()
            }}
          >
            <Text style={styles.rightSmall}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: mUtils.wScale(20)}}>
          <Text style={styles.brandTitle}>{brandTitle}</Text>
          <FlatList
            bounces={false}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.showroom_nm}_${Math.random()}`}
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
