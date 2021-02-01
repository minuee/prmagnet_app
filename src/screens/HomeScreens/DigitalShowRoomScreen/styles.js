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
  mainTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 22,
    textAlign: 'left',
    color: mConst.black,
  },
  mainTitle1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    textAlign: 'left',
    color: mConst.black,
  },
  noti: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
    marginLeft: mUtils.wScale(5),
  },
  tel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: mConst.black,
    marginLeft: mUtils.wScale(5),
  },
  season: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'right',
    color: mConst.black,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  layout2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
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
  notiImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
  },
  telImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
  },
  moreImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
    marginLeft: mUtils.wScale(5),
  },
  bookImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
    marginHorizontal: mUtils.wScale(7),
  },
  settingImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
    marginHorizontal: mUtils.wScale(7),
  },
  fixImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
    marginHorizontal: mUtils.wScale(7),
  },
  emptyBar: {
    width: 1,
    height: 14,
    backgroundColor: mConst.borderGray,
  },
})
