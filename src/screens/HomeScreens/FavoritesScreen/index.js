import React, {PureComponent} from 'react'
import {SafeAreaView, View, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'
import cBind from '../../../common/navigation'
import API from '../../../common/aws-api'
import Text from '../../common/Text'
import Tabs from '../../common/Tabs'
import Loading from '../../common/Loading'
import styles from './styles'

const modelImg = require('../../../images/sample/model_1.png')
const likeImg = require('../../../images/navi/like_1.png')

class FavoritesScreen extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      favShowroom: [],
      favPress: [],
      // favShowroom: [ // TODO 테스트 데이타 주석 처리
      //   {
      //     img: require('../../../images/sample/model_1.png'),
      //     like: true,
      //     title: 'Look #1',
      //   },
      //   {img: require('../../../images/sample/model_1.png'), new: false, title: 'Look #2'},
      // ],
      // favPress: [
      //   {img: require('../../../images/sample/model_1.png'), new: false, title: 'Look #2'},
      //   {
      //     img: require('../../../images/sample/model_1.png'),
      //     like: true,
      //     title: 'Look #1',
      //   },
      // ],
      tabIndex: 0,
      loading: false,
    }
  }

  deleteFavShowroom = async no => {
    const {favShowroom} = this.state
    try {
      let response = await API.deleteFavShowroom({
        showroom_no: no,
      })
      console.log('deleteFavShowroom>>>>>', response)
      if (response.success) {
        this.setState(state => {
          const list = state.favShowroom.filter((e, i) => e.showroom_no !== no)
          return {
            favShowroom: list,
          }
        })
        //this.handleOnFocus()
      }
    } catch (error) {
      console.log('deleteFavShowroom>>>>>', error)
    }
  }

  componentDidMount() {
    this.pushOption('Favorites')
    this.onFocus(this.handleOnFocus)
  }
  componentWillUnmount() {
    this.removeFocus()
  }
  handleOnFocus = () => {
    this.setState({loading: true}, async () => {
      try {
        const response = await API.getFavShowroom()
        this.setState({favShowroom: _.get(response, 'list', []), loading: false})
        console.log('쇼룸 즐겨찾기 조회 성공', JSON.stringify(response))
      } catch (error) {
        this.setState({loading: false})
        console.log('쇼룸 즐겨찾기 조회 실패', error)
      }
      //try {
      //  const response = await API.getFavPress()
      //  this.setState({favPress: _.get(response, 'list', []), loading: false})
      //  console.log('프레스 즐겨찾기 조회 성공', JSON.stringify(response))
      //} catch (error) {
      //  this.setState({loading: false})
      //  console.log('프레스 즐겨찾기 조회 실패', error)
      //}
    })
  }
  render() {
    const {tabIndex, loading} = this.state
    return (
      <SafeAreaView style={styles.container}>
        {/*<Tabs type="text" data={['Digital Showroom', 'Press Release']} getIndex={index => this.setState({tabIndex: index})} />*/}
        {loading ? (
          <Loading />
        ) : (
          <>
            {/*{tabIndex === 0 ? (*/}
            <View style={{paddingHorizontal: mUtils.wScale(20)}}>
              <FlatList
                bounces={false}
                data={this.state.favShowroom}
                renderItem={({item}) => {
                  return (
                    <View style={{width: '49%', height: mUtils.wScale(310), marginBottom: mUtils.wScale(20)}}>
                      <TouchableOpacity
                        onPress={() => this.pushTo('DigitalSRDetailScreen', {no: item.showroom_no})}
                        activeOpacity={0.5}
                        style={{width: '100%', height: mUtils.wScale(275)}}
                      >
                        <FastImage resizeMode={'contain'} style={styles.modelImg} source={{uri: item.img_url_adres}} />
                        <TouchableOpacity
                          style={styles.likeTouch}
                          onPress={() => {
                            this.deleteFavShowroom(item.showroom_no)
                          }}
                        >
                          <FastImage resizeMode={'contain'} style={styles.likeImg} source={likeImg} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                      <Text style={styles.title}>{item.showroom_nm}</Text>
                    </View>
                  )
                }}
                keyExtractor={item => `${item.title}_${Math.random()}`}
                contentContainerStyle={{paddingVertical: mUtils.wScale(15)}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />
            </View>
            {/*) : (
              <View style={{paddingHorizontal: mUtils.wScale(20)}}>
                <FlatList
                  bounces={false}
                  data={this.state.favPress}
                  renderItem={({item}) => {
                    return (
                      <View style={{width: '49%', height: mUtils.wScale(310)}}>
                        <TouchableOpacity activeOpacity={0.5} style={{width: '100%', height: mUtils.wScale(275)}}>
                          <FastImage resizeMode={'contain'} style={styles.modelImg} source={modelImg} />
                          <FastImage resizeMode={'contain'} style={styles.likeImg} source={likeImg} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{item.title}</Text>
                      </View>
                    )
                  }}
                  keyExtractor={item => `${item.title}_${Math.random()}`}
                  contentContainerStyle={{paddingVertical: mUtils.wScale(15)}}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  numColumns={2}
                />
              </View>
            )}*/}
          </>
        )}
      </SafeAreaView>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(FavoritesScreen)
