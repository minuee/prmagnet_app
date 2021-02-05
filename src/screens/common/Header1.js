import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'

const searchImage = require('../../images/common/search.png')
const bellImage = require('../../images/common/bell_1.png')
const profileImage = require('../../images/common/profile_2.png')
const likeImage = require('../../images/common/like_2.png')

export default class CommonHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
    }
  }
  render() {
    const {keyword} = this.state
    return (
      <View style={styles.upperWrapper}>
        <TouchableWithoutFeedback onPress={() => this.keywordInput.focus()}>
          <View style={styles.inputTextWrapper}>
            <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
              <FastImage source={searchImage} style={styles.inputIcon} />
            </TouchableOpacity>
            <TextInput
              ref={comp => (this.keywordInput = comp)}
              style={styles.input}
              placeholderTextColor={mConst.textPhColor}
              value={keyword}
              onChangeText={text => this.setState({keyword: text})}
              placeholder="검색어를 입력해주세요."
              returnKeyType={mConst.bAndroid ? 'default' : 'done'}
              onSubmitEditing={null}
              autoCompleteType="off"
              autoCapitalize="none"
              maxLength={100}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
            <FastImage resizeMode={'contain'} source={likeImage} style={styles.inputIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
            <FastImage resizeMode={'contain'} source={bellImage} style={styles.inputIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
            <FastImage resizeMode={'contain'} source={profileImage} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  upperWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: mConst.wWidth - mUtils.wScale(40),
    marginVertical: mConst.bAndroid ? mUtils.wScale(10) : mUtils.wScale(5),
  },
  inputTextWrapper: {
    width: mConst.wWidth - mConst.wGapUnit * 3.3,
    height: mUtils.wScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.black,
    borderRadius: mUtils.wScale(5),
    paddingHorizontal: mUtils.wScale(5),
    backgroundColor: '#f1f2ea',
  },
  input: {
    width: mConst.wWidth - mConst.wGapUnit * 4,
    fontSize: mUtils.wScale(15),
    padding: 0,
    color: mConst.textBaseColor,
  },
  inputIconWrapper: {
    marginHorizontal: 5,
  },
  inputIcon: {
    width: mUtils.wScale(20),
    height: mUtils.wScale(19),
  },
})
