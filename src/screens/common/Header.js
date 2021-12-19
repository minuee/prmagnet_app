import React, {PureComponent} from 'react'
import {View, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import mConst from '../../common/constants'
import mUtils from '../../common/utils'
import API from '../../common/aws-api'
import cBind from '../../common/navigation'

const searchImage = require('../../images/common/search.png')
const bellImage = require('../../images/common/bell.png')
const bell_offImage = require('../../images/navi/bell_off.png')
const bell2Image = require('../../images/common/bell_2.png')
const bell_off2Image = require('../../images/navi/bell_off2.png')
const profileImage = require('../../images/common/profile.png')
const profile2Image = require('../../images/common/profile_2.png')
const like2Image = require('../../images/common/like_2.png')

export default class CommonHeader extends PureComponent {
  constructor(props) {
    super(props)
    cBind(this)
    this.state = {
      keyword: '',
      alarmYN: false,
    }
  }

  render() {
    const {keyword, alarmYN} = this.state
    const {like, pushTo, userType, alarmSet} = this.props
    const mUserType = userType || mConst.getUserType()
    return (
      <View style={styles.upperWrapper}>
        <TouchableWithoutFeedback onPress={() => this.keywordInput.focus()}>
          <View style={styles.inputTextWrapper(mUserType !== 'B')}>
            <TouchableOpacity style={styles.inputIconWrapper} onPress={null}>
              <FastImage source={searchImage} style={styles.inputIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                pushTo('SearchScreen')
              }}
            >
              <TextInput
                editable={false}
                ref={comp => (this.keywordInput = comp)}
                style={styles.input(mUserType !== 'B')}
                placeholderTextColor={mConst.textPhColor}
                value={keyword}
                onChangeText={text => this.setState({keyword: text})}
                placeholder="검색어를 입력해주세요."
                returnKeyType={mConst.bAndroid ? 'default' : 'done'}
                onSubmitEditing={null}
                autoCompleteType="off"
                autoCapitalize="none"
                maxLength={100}
                onTouchStart={() => {
                  pushTo('SearchScreen')
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {mUserType !== 'B' && (
            <TouchableOpacity style={styles.inputIconWrapper} onPress={() => pushTo('FavoritesScreen')}>
              <FastImage resizeMode={'contain'} source={like2Image} style={styles.inputIcon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.inputIconWrapper} onPress={() => pushTo('NotificationScreen')}>
            <FastImage
              resizeMode={'contain'}
              source={mUserType === 'B' ? (alarmSet ? bellImage : bell_offImage) : alarmSet ? bell2Image : bell_off2Image}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIconWrapper} onPress={() => pushTo('MyPageScreen')}>
            <FastImage resizeMode={'contain'} source={mUserType === 'B' ? profileImage : profile2Image} style={styles.inputIcon} />
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
  inputTextWrapper: threeIcons => ({
    width: mConst.wWidth - mConst.wGapUnit * (threeIcons ? 3.5 : 2.8),
    height: mUtils.wScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: StyleSheet.hairlineWidth,
    borderColor: mConst.black,
    borderRadius: mUtils.wScale(5),
    paddingHorizontal: mUtils.wScale(5),
    backgroundColor: '#f1f2ea',
  }),
  input: threeIcons => ({
    width: mConst.wWidth - mConst.wGapUnit * (threeIcons ? 4.3 : 4),
    fontSize: mUtils.wScale(15),
    padding: 0,
    color: mConst.textBaseColor,
  }),
  inputIconWrapper: {
    padding: 6,
    marginLeft: 0,
  },
  inputIcon: {
    width: mUtils.wScale(20),
    height: mUtils.wScale(20),
  },
})
