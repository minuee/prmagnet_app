import React, {PureComponent} from 'react'
import {SafeAreaView, FlatList, View, TouchableOpacity, ListView} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import moment from 'moment'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

const userType = mConst.getUserType()

class HomeDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {data: [], next_token: '', has_next: true, total_count: 0}
  }

  getHomeNR = async () => {
    const {next_token, data} = this.state
    try {
      let response = await API.getHomeNR({next_token: next_token})
      console.log('getHomeNR>>>', response)
      this.setState({
        data: data.concat(response.new_request),
        next_token: response.next_token,
        has_next: response.has_next,
        total_count: response.total_count,
      })
    } catch (error) {
      console.log('getHomeNR>>>1', error)
    }
  }

  getHomeTR = async () => {
    const date = Math.floor(new Date().getTime() / 1000)
    const {next_token, data} = this.state
    try {
      let response = await API.getHomeTR({date: date, next_token: next_token})
      console.log('getHomeTR>>>', response)
      this.setState({
        data: data.concat(response.new_request),
        next_token: response.next_token,
        has_next: response.has_next,
        total_count: response.total_count,
      })
    } catch (error) {
      console.log('getHomeTR>>>1', error)
    }
  }

  handleLoadMore = async () => {
    const {has_next} = this.state
    const {type} = this.props.route.params
    if (has_next && type) {
      this.getHomeNR()
    } else if (has_next && !type) {
      this.getHomeTR()
    }
  }

  componentDidMount() {
    const {title} = this.props.route.params
    this.pushOption(title)
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    const {type} = this.props.route.params
    if (type) {
      this.getHomeNR()
    } else {
      this.getHomeTR()
    }
  }

  renderItem = ({item}) => {
    const {type} = this.props.route.params
    return (
      <View style={styles.layout3}>
        <FastImage resizeMode={'contain'} style={styles.brandImg} source={{uri: item.mgzn_logo_url_adres}} />
        <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>{item.editor_nm}</Text>
        <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>{mUtils.getShowDate(item.brand_cnfirm_dt, 'YYYY-MM-DD')}</Text>
        <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
          {item.mgzn_nm} • {item.photogrf_modl_nm}
        </Text>
      </View>
    )
  }

  render() {
    const {data, total_count} = this.state
    const {type} = this.props.route.params
    return (
      <>
        <SafeAreaView style={styles.container}>
          {type ? (
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                {userType === 'M' ? 'Confirmed' : 'New'} <Text style={{fontFamily: 'Roboto-Medium'}}>Requests : </Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#7ea1b2'}}>{total_count}</Text>
              </Text>
            </View>
          ) : (
            <View style={{...styles.layout1, paddingHorizontal: mUtils.wScale(20), marginTop: mUtils.wScale(30)}}>
              <Text style={styles.new}>
                Today's <Text style={{fontFamily: 'Roboto-Medium'}}>{userType === 'M' ? 'PickUps' : 'Send-Outs'} : </Text>
                <Text style={{fontFamily: 'Roboto-Bold', color: '#b27e7e'}}>{total_count}</Text>
              </Text>
            </View>
          )}
          <View
            style={{
              ...styles.layout2,
              backgroundColor: type ? 'rgba(126, 161, 178, 0.2)' : 'rgba(178, 126, 126, 0.2)',
            }}
          >
            <FlatList
              style={{flexDirection: 'column'}}
              contentContainerStyle={{paddingBottom: mUtils.wScale(50)}}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              renderItem={this.renderItem}
              keyExtractor={item => `_${item.req_no}_${Math.random()}`}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
            />
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(HomeDetailScreen)
