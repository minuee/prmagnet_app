import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    paddingVertical: mUtils.wScale(15),
  },
  img: {
    shadowColor: mConst.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    color: mConst.black,
  },
  info: {
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'left',
    color: mConst.gray,
    marginTop: mUtils.wScale(5),
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: mConst.black,
  },
  text2: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  version: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: mUtils.wScale(40),
  },
  profileImg: {width: mUtils.wScale(60), height: mUtils.wScale(60)},
})
