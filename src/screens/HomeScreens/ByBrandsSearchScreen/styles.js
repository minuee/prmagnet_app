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
})
