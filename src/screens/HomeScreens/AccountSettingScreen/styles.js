import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(25),
  },
})
