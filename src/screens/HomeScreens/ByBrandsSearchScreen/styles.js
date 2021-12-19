import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: mConst.white,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(30),
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: mConst.borderGray,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: mConst.wWidth,
    height: mUtils.wScale(50),
  },
  leftButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.borderGray,
    paddingVertical: mUtils.wScale(16),
  },
  rightButton: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.textBaseColor,
    paddingVertical: mUtils.wScale(16),
  },
  circle: {
    width: mUtils.wScale(16),
    height: mUtils.wScale(16),
    marginRight: mUtils.wScale(5),
  },
  heartImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
    marginRight: mUtils.wScale(5),
  },
  checkImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  rightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: mConst.white,
  },
  leftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070708',
  },
  topText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    textAlign: 'left',
  },
  brandText: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    textAlign: 'left',
    color: '#555555',
  },
})
