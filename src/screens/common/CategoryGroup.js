import React, {PureComponent} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Row} from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import _ from 'lodash'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import Text from './Text'

const foldImage = require('../../images/common/fold.png')
const unfoldImage = require('../../images/common/unfold.png')
const selectedImage = require('../../images/common/selected.png')

export default class CategoryGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fold: true,
      selectedItems: [],
    }
  }
  componentDidUpdate(prevProps) {
    const {value} = this.props
    if (prevProps.value !== value) {
      this.setState({selectedItems: this.props.value.each_list})
    }
  }
  toggleFold = () => {
    this.setState(prevstate => ({fold: !prevstate.fold}))
  }
  toggleSelectItem = (key, value) => {
    const {setFilter} = this.props
    this.setState(
      prevstate => {
        const selectedItems = prevstate.selectedItems.includes(value)
          ? prevstate.selectedItems.filter(item => item !== value)
          : prevstate.selectedItems.concat(value)
        return {selectedItems}
      },
      () => setFilter(key)(value)
    )
  }
  render() {
    const {fold, selectedItems} = this.state
    const {data} = this.props
    return (
      <>
        <TouchableOpacity onPress={this.toggleFold}>
          <Row style={styles.itemWrapper}>
            <Text style={styles.itemHeadText}>{data.sample_catgry_lrge_cl_nm}</Text>
            <FastImage source={fold ? foldImage : unfoldImage} style={styles.foldImage} />
          </Row>
        </TouchableOpacity>
        {_.map(data.each_list, (item, index) => {
          if (!fold) {
            return (
              <TouchableOpacity key={index} onPress={() => this.toggleSelectItem(data.sample_catgry_lrge_cl_cd, item.sample_catgry_middle_cl_cd)}>
                <Row style={styles.itemWrapper}>
                  <Text style={styles.itemText}>{item.sample_catgry_middle_cl_nm}</Text>
                  {selectedItems.includes(item.sample_catgry_middle_cl_cd) && <FastImage source={selectedImage} style={styles.selectedImage} />}
                </Row>
              </TouchableOpacity>
            )
          }
        })}
      </>
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
    paddingLeft: mUtils.wScale(12),
    paddingRight: mUtils.wScale(24),
    borderTopWidth: 1,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.borderGray,
  },
  itemHeadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemText: {
    fontSize: 14,
    color: '#555555',
  },
  foldImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13 / 2),
  },
  selectedImage: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
})
