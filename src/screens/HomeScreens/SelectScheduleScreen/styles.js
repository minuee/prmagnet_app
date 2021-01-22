import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mConst.white,
  },
  calder: {
    width: mConst.wWidth,
  },
  bottom: {
    width: mConst.wWidth,
    height: mUtils.wScale(50),
  },
  leftButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.borderGray,
  },
  leftText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#070708',
  },
  rightButton: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mConst.textBaseColor,
  },
  rightText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: mConst.white,
  },
})
