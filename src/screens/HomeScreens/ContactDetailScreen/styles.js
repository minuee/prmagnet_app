import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(15),
    paddingHorizontal: mUtils.wScale(20),
    width: '100%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  descBox: {
    paddingVertical: mUtils.wScale(20),
    paddingHorizontal: mUtils.wScale(20),
  },
  list: {
    paddingHorizontal: mUtils.wScale(20),
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
  box: {
    width: mUtils.wScale(70),
    height: mUtils.wScale(27),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxtext: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  desc: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#767676',
  },
})
