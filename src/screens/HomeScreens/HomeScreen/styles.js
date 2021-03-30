import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  screenTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: mUtils.wScale(30),
    paddingHorizontal: mUtils.wScale(20),
  },
  brandImg: {
    width: mUtils.wScale(52.5),
    height: mUtils.wScale(18),
  },
  name: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: mConst.black,
  },
  dt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    textAlign: 'left',
    color: mConst.black,
  },
  custom: {
    fontSize: 11,
    textAlign: 'left',
    color: '#999999',
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  layout2: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(5),
    marginTop: mUtils.wScale(11),
  },
  layout3: {
    width: '48%',
    borderRadius: mUtils.wScale(5),
    backgroundColor: mConst.white,
    marginVertical: mUtils.wScale(5),
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: mUtils.wScale(10),
  },
  new: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    textAlign: 'left',
    color: mConst.black,
  },
  more: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    textAlign: 'left',
    color: '#999999',
  },
  moreImg: {
    width: mUtils.wScale(10),
    height: mUtils.wScale(10),
  },
})
