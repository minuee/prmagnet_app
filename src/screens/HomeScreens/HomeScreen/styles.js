import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
    paddingHorizontal: mUtils.wScale(20),
  },
  screenTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: mUtils.wScale(30),
    paddingHorizontal: mUtils.wScale(20),
  },
})
