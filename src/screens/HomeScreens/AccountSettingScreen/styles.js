import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(25),
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
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'left',
    color: '#555555',
  },
  desc: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    color: mConst.black,
  },
  box: {
    width: '100%',
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1,
    paddingLeft: mUtils.wScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(10),
    marginTop: mUtils.wScale(10),
  },
  top: {
    marginTop: mUtils.wScale(25),
  },
  goImg: {width: mUtils.wScale(7), height: mUtils.wScale(14)},
  profileImg: {width: mUtils.wScale(95), height: mUtils.wScale(95)},
})
