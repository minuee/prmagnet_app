import React, {PureComponent} from 'react'
import {SafeAreaView, View, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import Header from '../../common/Header'
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind, {callOnce} from '../../../common/navigation'
import Text from '../../common/Text'
import styles from './styles'
import Loading from '../../common/Loading'
import API from '../../../common/aws-api'

const moreImage1 = require('../../../images/navi/more_1.png')
const moreImage3 = require('../../../images/navi/more_3.png')

class LookBookScreen extends PureComponent {
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

  getLookBook = async () => {
    const {list, page, limit, search_text} = this.state
    try {
      let response = await API.getLookBook({page: page, limit: limit, search_text: search_text})
      console.log('getLookBook>>>', response)
      if (response.success) {
        if (response.list.length > 0) {
          this.setState({...this.state, list: list.concat(response.list), page: page + 1})
        }
      }
    } catch (error) {
      console.log('getLookBook>>>', error)
    }
  }

  handleLoadMore = async () => {
    this.getLookBook()
  }

  componentDidMount() {
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }

  handleOnFocus = () => {
    this.getLookBook()
  }

  renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity style={styles.layout3}>
          <View style={styles.layout4}>
            <Text style={styles.title}>{item.lookbook_nm}</Text>
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
                  style={{paddingVertical: mUtils.wScale(15), paddingHorizontal: mUtils.wScale(15)}}
                  onSelect={() => {
                    this.alert('룩북 삭제', '해당 룩북을 삭제하시겠습니까?', [
                      {
                        onPress: () => {
                          setTimeout(() => {
                            this.alert('삭제 완료', '룩북을 삭제 하였습니다.')
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
              <Text style={styles.seasonGen}>
                {item.season} • {item.gender}
              </Text>
              <Text style={styles.dt}>Date Created • {mUtils.getShowDate(item.dt, 'YYYY-MM-DD')}</Text>
            </View>
            <View style={styles.smallBox}>
              <Text style={styles.brand}>{item.made_for}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.emptyBar} />
      </>
    )
  }

  render() {
    const {list} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.layout1}>
          <Text style={styles.mainTitle}>LookBook</Text>
          <TouchableOpacity style={styles.layout2}>
            <Text style={styles.rightSmall}>Latest</Text>
            <FastImage resizeMode={'contain'} style={styles.latestImg} source={moreImage3} />
          </TouchableOpacity>
        </View>
        {list ? (
          <FlatList
            bounces={false}
            style={styles.list}
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.dt}_${Math.random()}`}
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
  state => ({}),
  dispatch => ({})
)(LookBookScreen)
