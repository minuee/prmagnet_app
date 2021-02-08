import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout1: {
    borderRadius: mUtils.wScale(5),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
  },
  byBox: {
    paddingHorizontal: mUtils.wScale(10),
    paddingVertical: mUtils.wScale(6),
  },
  calendarImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  modelImg: {
    width: '49%',
    height: mUtils.wScale(290),
  },
  airplaneImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  listImg: {
    width: mUtils.wScale(60),
    height: mUtils.wScale(60),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#dddddd',
    backgroundColor: '#f6f6f6',
    marginRight: mUtils.wScale(5),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: mConst.black,
  },
  titleDt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  change: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    color: '#7ea1b2',
  },
  by: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: mConst.white,
  },
  dt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  name: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 11,
    textAlign: 'left',
    color: '#999999',
  },
  desc: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
  },
  address: {
    fontFamily: 'NotoSansKR-Light',
    fontSize: 12,
    textAlign: 'left',
    color: '#555555',
  },
})
