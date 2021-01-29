import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
    color: mConst.black,
  },
  rightSmall: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    textAlign: 'left',
    color: '#000000',
  },
  brandTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
    marginTop: mUtils.wScale(20),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
  },
  desc1: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: '#ffffff',
    marginTop: mUtils.wScale(10),
  },
  desc2: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#ffffff',
    marginTop: mUtils.wScale(5),
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: mUtils.wScale(20),
    paddingTop: mUtils.wScale(35),
    paddingBottom: mUtils.wScale(10),
    backgroundColor: mConst.white,
  },
  layout2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  smallBox: {
    width: mUtils.wScale(55),
    height: mUtils.wScale(30),
    borderRadius: mUtils.wScale(2.5),
    backgroundColor: mConst.white,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelImg: {
    width: '100%',
    height: '100%',
  },
  newImg: {
    width: mUtils.wScale(25),
    height: mUtils.wScale(25),
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
  },
})
