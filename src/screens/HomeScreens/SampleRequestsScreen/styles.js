import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    textAlign: 'left',
    color: mConst.black,
  },
  mainTitle1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    textAlign: 'left',
    color: mConst.black,
  },
  subTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: mConst.black,
  },
})
