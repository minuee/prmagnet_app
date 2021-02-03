import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  select: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    textAlign: 'left',
    color: '#555555',
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  layout1: {
    width: '100%',
  },
  colorBox: {
    width: '100%',
    height: mUtils.wScale(411.2),
  },
  color: {
    width: mUtils.wScale(59.5),
    height: mUtils.wScale(59),
  },
  bottom: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: mConst.white,
  },
  box: {
    width: '100%',
    backgroundColor: '#7ea1b2',
    paddingVertical: mUtils.wScale(20),
  },
  desc: {
    flex: 1,
    width: '100%',
    paddingLeft: mUtils.wScale(20),
    fontSize: 14,
    fontWeight: 'normal',
    color: mConst.black,
  },
})
