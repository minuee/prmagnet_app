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
  headerWrapper: {
    height: mUtils.wScale(40),
  },
  headerText: {
    padding: mUtils.wScale(10),
    fontSize: 15,
    // fontWeight: 'bold',
    borderColor: mConst.black,
  },
  sectionHeadWrapper: {
    width: mConst.wWidth / 2 - mUtils.wScale(20),
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionWrapper: {
    width: mConst.wWidth / 2 - mUtils.wScale(20),
    borderWidth: StyleSheet.hairlineWidth,
  },
  numberWrapper: {
    width: mUtils.wScale(40),
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
})
