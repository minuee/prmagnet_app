import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: mConst.black,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
  },
  change: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#7ea1b2',
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
    marginLeft: mUtils.wScale(10),
  },
  schedulerImg: {
    width: mUtils.wScale(15),
    height: mUtils.wScale(15),
    marginRight: mUtils.wScale(5),
  },
})
