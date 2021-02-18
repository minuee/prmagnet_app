import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  scroll: {
    paddingBottom: mUtils.wScale(30),
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mUtils.wScale(15),
  },
  layout1: {
    marginLeft: mUtils.wScale(16),
  },
  inputTextWrapper: {
    width: '100%',
    height: mUtils.wScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: mUtils.wScale(5),
    paddingHorizontal: mUtils.wScale(5),
    backgroundColor: '#f3f3f3',
  },
  input: {
    width: mConst.wWidth - mConst.wGapUnit * 4,
    fontSize: mUtils.wScale(15),
    padding: 0,
    color: mConst.textBaseColor,
  },
  inputIconWrapper: {
    padding: 6,
    marginLeft: 0,
  },
  inputIcon: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
  },
  modelImg: {
    width: 100,
    height: 100,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
  },
  result: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
    marginTop: mUtils.wScale(25),
  },
  subTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
    marginTop: mUtils.wScale(30),
  },
  brand: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: mConst.black,
    width: '75%',
  },
  dt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#999999',
    marginTop: mUtils.wScale(8),
  },
})
