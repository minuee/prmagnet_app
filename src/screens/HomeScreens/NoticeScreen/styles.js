import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
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
    marginTop: mUtils.wScale(30),
  },
})
