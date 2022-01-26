import {Platform, StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  headerWrapper: {
    width: mConst.wWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(15),
    paddingVertical: mUtils.wScale(15),
    borderTopWidth: 1,
    borderTopColor: mConst.black,
  },
  headerText: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 15,
    color: mConst.gray,
  },
  headerTextOn: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 15,
  },
  desc: {
    flex: 1,
    width: '100%',
    paddingLeft: mUtils.wScale(20),
    paddingTop: mUtils.wScale(15),
    fontSize: 14,
    color: mConst.black,
    borderTopWidth: 1,
    borderTopColor: mConst.borderGray,
  },
  numberBox: {
    width: '100%',
    paddingLeft: mUtils.wScale(20),
    fontSize: 14,
    color: mConst.black,
    borderTopWidth: 1,
    borderTopColor: mConst.borderGray,
    borderBottomWidth: 1,
    borderBottomColor: mConst.borderGray,
    paddingVertical: Platform.OS === 'ios' ? mUtils.wScale(10) : mUtils.wScale(7),
  },
  headerBorder: {
    paddingVertical: mUtils.wScale(5),
    marginHorizontal: mUtils.wScale(10),
    borderBottomColor: 'transparent',
    borderBottomWidth: 1.5,
    borderStyle: 'solid',
  },
  headerBorderOn: {
    paddingVertical: mUtils.wScale(3),
    marginHorizontal: mUtils.wScale(10),
    borderBottomColor: mConst.black,
    borderBottomWidth: Platform.OS === 'ios' ? 1.5 : 2,
    borderStyle: 'solid',
  },
  leftButton: {
    width: '30%',
    paddingVertical: mUtils.wScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.borderGray,
  },
  leftText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: '#070708',
  },
  rightButton: {
    paddingVertical: mUtils.wScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7ea1b2',
  },
  rightText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    color: mConst.white,
  },
})
