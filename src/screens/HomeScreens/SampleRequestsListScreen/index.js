import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import Header from '../../common/Header'
import _ from 'lodash'
import API from '../../../common/aws-api'
import Loading from '../../common/Loading'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'

const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')

class SampleRequestsListScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      list: [],
      page: 1,
      limit: 10,
      search_text: '',
    }
  }

  getMagazineSample = async () => {
    const {list, page, limit, search_text} = this.state
    try {
      let response = await API.getMagazineSample({
        page: page,
        limit: limit,
        search_text: search_text,
      })
      console.log('getMagazineSample>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
      console.log('getMagazineSample>>>', error)
    }
  }

  handleLoadMore = async () => {
    this.getMagazineSample()
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getMagazineSample()
  }

  renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity style={styles.layout3}>
          <View style={styles.layout4}>
            <Text style={styles.title}>{item.brand_nm}</Text>
            <Menu>
              <MenuTrigger
                customStyles={{
                  TriggerTouchableComponent: TouchableOpacity,
                  triggerTouchable: {
                    activeOpacity: 90,
                    style: {
                      flex: 1,
                    },
                  },
                }}
                style={styles.layout5}
              >
                <FastImage resizeMode={'contain'} style={styles.moreImg} source={moreImage1} />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{marginTop: mUtils.wScale(35)}}>
                <MenuOption
                  style={{paddingTop: mUtils.wScale(17), paddingBottom: mUtils.wScale(12), paddingHorizontal: mUtils.wScale(15)}}
                  onSelect={() => {}}
                >
                  <Text style={styles.delete}>Edit</Text>
                </MenuOption>
                <MenuOption
                  style={{paddingTop: mUtils.wScale(12), paddingBottom: mUtils.wScale(17), paddingHorizontal: mUtils.wScale(15)}}
                  onSelect={() => {
                    this.alert('샘플요청 삭제', '선택하신 샘플을 삭제 하시겠습니까?', [
                      {
                        onPress: () => {
                          setTimeout(() => {
                            this.alert('요청삭제 완료', '요청이 삭제되었습니다.', [{onPress: () => null}])
                          }, 100)
                        },
                      },
                      {onPress: () => null},
                    ])
                  }}
                >
                  <Text style={styles.delete}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: mUtils.wScale(5)}}>
            <View>
              <Text style={{...styles.dt}}>
                Filming date{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>
                  {mUtils.getShowDate(item.expected_photograph_date, 'YYYY-MM-DD')}
                </Text>
              </Text>
              <Text style={{...styles.dt, marginTop: mUtils.wScale(6)}}>
                Request date{'  '}
                <Text style={{color: '#555555', fontFamily: 'Roboto-Regular'}}>{mUtils.getShowDate(item.request_date, 'YYYY-MM-DD')}</Text>
              </Text>
            </View>
            <View style={styles.smallBox}>
              <Text style={styles.status}>{item.req_status_nm}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.emptyBar} />
      </>
    )
  }

  render() {
    const {user} = this.props
    const {list} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header pushTo={this.pushTo} userType={user.userType} />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>My Requests</Text>
        </View>
        {list ? (
          <FlatList
            bounces={false}
            style={styles.list}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.req_no}_${Math.random()}`}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={1}
          />
        ) : (
          <Loading />
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({})
)(SampleRequestsListScreen)
