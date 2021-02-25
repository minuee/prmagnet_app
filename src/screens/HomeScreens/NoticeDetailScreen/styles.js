import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  itemBox: {
    paddingVertical: mUtils.wScale(20),
    paddingHorizontal: mUtils.wScale(20),
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  title: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  dt: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: mConst.gray,
    marginTop: mUtils.wScale(3.5),
  },
  desc: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#767676',
    paddingVertical: mUtils.wScale(20),
    paddingHorizontal: mUtils.wScale(20),
  },
})
