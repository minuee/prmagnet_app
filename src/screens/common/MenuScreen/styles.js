import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: mConst.white,
  },
  headerWrapper: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftWrapper: {
    paddingHorizontal: 12,
  },
  headerLeftImage: {
    width: 30,
    height: 30,
  },
  headerRightWrapper: {
    marginRight: (mConst.wGapUnit * 3) / 5,
  },
  headerRightText: {
    fontSize: 23,
    color: mConst.baseColor,
  },
  menuGroupWrapper: {
    justifyContent: 'space-around',
    paddingHorizontal: (mConst.wGapUnit * 3) / 5,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mConst.hGapUnit / 1.5,
    paddingLeft: mUtils.wScale(12),
  },
  menuTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: mConst.hGapUnit / 1.5,
  },
  menuSubTitleText: {
    fontSize: 18,
    color: mConst.darkGray,
    lineHeight: mConst.hGapUnit / 1.5,
  },
  menuHorizonLine: {
    width: mConst.wWidth,
    height: 2,
    backgroundColor: mConst.lightGray,
  },
  goImage: {
    width: 20,
    height: 20,
  },
})
