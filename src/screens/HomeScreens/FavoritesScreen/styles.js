import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#070708',
    marginTop: mUtils.wScale(10),
  },
  modelImg: {
    width: '100%',
    height: '100%',
  },
  likeTouch: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
    width: mUtils.wScale(30),
    height: mUtils.wScale(30),
    alignItems: 'flex-end',
  },
  likeImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
  },
})
