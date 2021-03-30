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
import Empty from '../../common/Empty'

const userType = mConst.getUserType()

class HomeDetailScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {data: [], page: 1, limit: 30, total_count: 0}
  }

  getHomeNR = async () => {
    const {page, limit, data} = this.state
    try {
      let response = mConst.getUserType() === 'B' ? await API.getHomeNR({page: page, limit}) : await API.getHomeCR({page: page, limit})
      console.log('getHomeNR>>>', response)
      if (response.success) {
        if (mConst.getUserType() === 'B') {
          if (response.new_request.length > 0) {
            this.setState({
              data: data.concat(response.new_request),
              page: page + 1,
              total_count: response.total_count,
            })
          }
        } else {
          if (response.list.length > 0) {
            this.setState({
              data: data.concat(response.list),
              page: page + 1,
              total_count: response.total_count,
            })
          }
        }
      }
    } catch (error) {
      console.log('getHomeNR>>>1', JSON.stringify(error))
    }
  }

  getHomeTR = async () => {
    const date = Math.floor(new Date().getTime() / 1000)
    const {page, limit, data} = this.state
    try {
      let response = await API.getHomeTR({date: date, page: page, limit: limit})
      console.log('getHomeTR>>>', response)
      if (response.success) {
        if (mConst.getUserType() === 'B') {
          if (response.today_request.length > 0) {
            this.setState({
              data: data.concat(response.today_request),
              page: page + 1,
              total_count: response.total_count,
            })
          }
        } else {
          if (response.list.length > 0) {
            this.setState({
              data: data.concat(response.list),
              page: page + 1,
              total_count: response.total_count,
            })
          }
        }
      }
    } catch (error) {
      console.log('getHomeTR>>>1', error)
    }
  }

  handleLoadMore = async () => {
    const {type} = this.props.route.params
    if (type) {
      this.getHomeNR()
    } else {
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
        <FastImage
          resizeMode={'contain'}
          style={styles.brandImg}
          source={{uri: userType === 'B' ? item.mgzn_logo_url_adres : item.brand_logo_url_adres}}
        />
        <Text style={{...styles.name, marginTop: mUtils.wScale(6)}}>
          {item.editor_nm} {item.editor_posi}
        </Text>
        <Text style={{...styles.dt, marginTop: mUtils.wScale(2)}}>
          {' '}
          {mUtils.getShowDate(userType === 'B' ? item.req_dt : item.brand_cnfirm_dt, 'YYYY-MM-DD')}
        </Text>
        {userType === 'B' ? (
          <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>
            {item.mgzn_nm} • {item.celeb_list ? item.celeb_list[0] : item.model_list[0]}
          </Text>
        ) : (
          <Text style={{...styles.custom, marginTop: mUtils.wScale(5)}}>{item.brand_nm}</Text>
        )}
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
              marginBottom: mUtils.wScale(50),
              flex: data.length === 0 ? 1 : 0,
            }}
          >
            {data.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                style={{flexDirection: 'column'}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={item => `_${item.req_no}_${Math.random()}`}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={1}
              />
            )}
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
