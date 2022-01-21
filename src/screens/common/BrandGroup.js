import React, {PureComponent} from 'react'
import {TouchableOpacity, View, StyleSheet, TextInput} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'
import API from '../../common/aws-api'

const heartImage = require('../../images/common/heart.png')
const heartOnImage = require('../../images/common/heart_on.png')
const selectedImage = require('../../images/common/selected.png')
const circleImg1 = require('../../images/navi/circle_1.png')
const circleImg2 = require('../../images/navi/circle_2.png')
const searchImg = require('../../images/common/search.png')
const arr = [
  {id: '1', name: '등록 순'},
  {id: '2', name: '검색하기'},
]

export default class BrandGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      favoriteItems: [],
      select: '1',
      searchText: '',
      searchResult: [],
    }
  }
  searchBrand = text => {
    this.setState({searchText: text})
    this.getBrandSearch(text)
  }
  getBrandSearch = async search => {
    if (search) {
      try {
        const response = await API.getBrandSearch(search)
        //console.log('getBrandSearch>>>', response)
        this.setState({searchResult: response.list})
      } catch (error) {
        //console.log('getBrandSearch>>>', JSON.stringify(error))
        await API.postErrLog({error: error, desc: 'getBrandSearch'})
      }
    } else {
      this.setState({searchResult: []})
    }
  }
  toggleFavoriteItem = val => {
    this.setState(prevstate => {
      const favoriteItems = prevstate.favoriteItems.includes(val)
        ? prevstate.favoriteItems.filter(item => item !== val)
        : prevstate.favoriteItems.concat(val)
      return {favoriteItems}
    })
  }
  toggleSelectItem = val => {
    const {brandId, setBrand} = this.props
    val !== brandId ? setBrand(val) : setBrand('')
  }
  render() {
    const {favoriteItems, select} = this.state;
    const {data, brandId, hide} = this.props;
    console.log('getBrandSearch>>>', brandId)
    if (hide) return null
    return (
      <View style={styles.layout}>
        <Row style={styles.top}>
          {_.map(arr, (item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({select: item.id, brandId: '', favoriteItems: []})
                }}
                key={index}
                style={{...styles.layout1}}
              >
                <FastImage resizeMode={'contain'} style={styles.circle} source={select === item.id ? circleImg1 : circleImg2} />
                <Text style={{...styles.topText, color: select === item.id ? '#555555' : '#999999'}}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </Row>
        {select === '1' ? (
          <>
            {_.map(favoriteItems, (item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item.brand_id)}>
                  <Row style={styles.itemWrapper}>
                    <View style={styles.itemSubWrapper}>
                      <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item)} style={styles.touch}>
                        <FastImage resizeMode={'contain'} source={heartOnImage} style={styles.heartImage} />
                      </TouchableOpacity>
                      <Text style={styles.itemText}>{item.brand_nm}</Text>
                    </View>
                    {brandId === item.brand_id && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
                  </Row>
                </TouchableOpacity>
              )
            })}

            <TouchableOpacity onPress={() => this.toggleSelectItem('all')}>
              <Row style={styles.itemWrapper}>
                <View style={[styles.itemSubWrapper,{paddingLeft:30}]}>
                  <Text style={styles.itemText}>브랜드 전체보기</Text>
                </View>
                {brandId === 'all' && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
              </Row>
            </TouchableOpacity>
            {_.map(data, (item, index) => {
              return _.map(
                _.filter(item.each_list, e => !favoriteItems.includes(e)),
                (item1, index1) => {
                  return (
                    <TouchableOpacity key={index1} onPress={() => this.toggleSelectItem(item1.brand_id)}>
                      <Row style={styles.itemWrapper}>
                        <View style={styles.itemSubWrapper}>
                          <TouchableOpacity onPress={() => this.toggleFavoriteItem(item1)} style={styles.touch}>
                            <FastImage resizeMode={'contain'} source={heartImage} style={styles.heartImage} />
                          </TouchableOpacity>
                          <Text style={styles.itemText}>{item1.brand_nm}</Text>
                        </View>
                        {brandId === item1.brand_id && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
                      </Row>
                    </TouchableOpacity>
                  )
                }
              )
            })}
          </>
        ) : (
          <>
            <View style={{paddingHorizontal: mUtils.wScale(15), paddingVertical: mUtils.wScale(15)}}>
              <View
                style={{
                  ...styles.itemSubWrapper,
                  backgroundColor: 'rgba(241, 242, 234, 0.74)',
                  paddingHorizontal: mUtils.wScale(8),
                  borderRadius: mUtils.wScale(7),
                }}
              >
                <FastImage resizeMode={'contain'} source={searchImg} style={styles.searchImg} />
                <TextInput
                  style={styles.inputStyle}
                  placeholder={'브랜드명을 입력해주세요.'}
                  placeholderTextColor={'rgba(0, 0, 0, 0.2)'}
                  value={this.state.searchText}
                  onChangeText={text => {
                    this.searchBrand(text)
                  }}
                />
              </View>
            </View>

            {_.map(favoriteItems, (item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item.brand_id)}>
                  <Row style={styles.itemWrapper}>
                    <View style={[styles.itemSubWrapper,{paddingLeft:30}]}>
                      <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item)} style={styles.touch}>
                        <FastImage resizeMode={'contain'} source={heartOnImage} style={styles.heartImage} />
                      </TouchableOpacity>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                    {brandId === 'all' && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
                  </Row>
                </TouchableOpacity>
              )
            })}
            {_.map(
              this.state.searchResult.filter((e, i) => !favoriteItems.includes(e.brand_nm)),
              (item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(item.brand_id)}>
                    <Row style={styles.itemWrapper}>
                      <View style={styles.itemSubWrapper}>
                        <TouchableOpacity key={index} onPress={() => this.toggleFavoriteItem(item.brand_nm)} style={styles.touch}>
                          <FastImage resizeMode={'contain'} source={heartImage} style={styles.heartImage} />
                        </TouchableOpacity>
                        <Text style={styles.itemText}>{item.brand_nm}</Text>
                      </View>
                      {brandId === item.brand_id && <FastImage resizeMode={'contain'} source={selectedImage} style={styles.selectedImage} />}
                    </Row>
                  </TouchableOpacity>
                )
              }
            )}
          </>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mUtils.wScale(50),
    alignItems: 'center',
    paddingRight: mUtils.wScale(24),
    borderBottomWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemSubWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartImage: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  itemText: {
    fontSize: 14,
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
  touch: {
    height: mUtils.wScale(30),
    justifyContent: 'center',
    paddingRight: mUtils.wScale(8),
    paddingLeft: mUtils.wScale(12),
  },
  layout: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: mConst.borderGray,
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: mUtils.wScale(16),
  },
  circle: {
    width: mUtils.wScale(16),
    height: mUtils.wScale(16),
    marginRight: mUtils.wScale(5),
  },
  top: {
    paddingLeft: mUtils.wScale(12),
    height: mUtils.wScale(50),
    backgroundColor: '#f6f6f6',
  },
  inputStyle: {
    textAlign: 'left',
    color: '#000000',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? mUtils.wScale(9) : mUtils.wScale(3.2),
    paddingLeft: mUtils.wScale(7),
    fontSize: 11,
  },
  searchImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
  },
})
