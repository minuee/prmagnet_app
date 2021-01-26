import {StyleSheet, Platform} from 'react-native'

import mConst from '../../../../common/constants'
import mUtils from '../../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
    justifyContent: 'space-between',
  },
  title: {
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 13 : 11,
    paddingLeft: mUtils.wScale(20),
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
    marginTop: mUtils.wScale(20),
    fontSize: 14,
    fontWeight: 'normal',
    color: mConst.black,
  },
  desc: {
    flex: 1,
    width: '100%',
    paddingLeft: mUtils.wScale(20),
    fontSize: 14,
    fontWeight: 'normal',
    color: mConst.black,
  },
  bottom: {
    width: '100%',
    height: mUtils.hScale(50),
    backgroundColor: mConst.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: mConst.white,
  },
})
