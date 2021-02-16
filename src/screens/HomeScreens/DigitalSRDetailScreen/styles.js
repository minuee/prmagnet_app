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
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(20),
  },
  layout1: {
    width: '100%',
    minHeight: mUtils.wScale(124),
    borderColor: mConst.borderGray,
    borderRadius: mUtils.wScale(3),
    borderWidth: 0.5,
    padding: mUtils.wScale(5),
  },
  layout2: {
    width: '100%',
    minHeight: mUtils.wScale(60),
    borderColor: mConst.borderGray,
    borderRadius: mUtils.wScale(3),
    borderWidth: 0.5,
    padding: mUtils.wScale(5),
  },
  emptyBar: {
    width: '100%',
    height: 1,
    backgroundColor: mConst.black,
    marginTop: mUtils.wScale(14),
  },
  checkImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: mConst.black,
  },
  left: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  right: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'right',
    color: '#555555',
  },
  desc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    textAlign: 'left',
    color: '#999999',
  },
  swipeDot: {
    borderRadius: 0,
    height: mUtils.wScale(3),
    width: mUtils.wScale(40),
    marginLeft: 0,
    marginRight: 0,
  },
  swipeActiveDot: {
    borderRadius: 0,
    height: mUtils.wScale(3),
    width: mUtils.wScale(45),
    marginLeft: 0,
    marginRight: 0,
  },
})
