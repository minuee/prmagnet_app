import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  redTitle: {    
    fontSize: 13,
    textAlign: 'center',
    color: '#ff0000',
    marginTop: mUtils.wScale(5),
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#070708',
    marginTop: mUtils.wScale(10),
  },
  chargeTitle : {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    color: '#070708',
    paddingBottom:mUtils.wScale(5),
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
  mainImg: {
    width: mUtils.wScale(25),
    height: mUtils.wScale(25),
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
  },

  hideImg: {
    width: mUtils.wScale(25),
    height: mUtils.wScale(25),
    position: 'absolute',
    bottom: 50,
    left: 6,
    zIndex: 1,
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
  select: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectImg: {
    width: mUtils.wScale(45),
    height: mUtils.wScale(45),
    marginBottom: mUtils.wScale(10),
  },
  bottomSheet: {
    width: '100%',
    paddingHorizontal: mUtils.wScale(20),
    paddingVertical: mUtils.wScale(10),
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: mConst.white,
  },
  bottomText1: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  bottomText2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    textAlign: 'left',
    color: '#7ea1b2',
  },
  bottomText3: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: mConst.white,
  },
  selectText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  menuText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: '#070708',
  },
  menuTextSmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    textAlign: 'left',
    color: '#070708',
  },
  brandText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
    marginBottom: mUtils.wScale(4),
  },
  bottomButton: {
    borderRadius: mUtils.wScale(7),
    backgroundColor: mConst.black,
    paddingVertical: mUtils.wScale(12),
    paddingHorizontal: mUtils.wScale(12),
  },
  selectBox: {
    borderRadius: mUtils.wScale(1),
    paddingHorizontal: mUtils.wScale(10),
    paddingVertical: mUtils.wScale(7),
    borderWidth: 0.7,
    borderColor: mConst.borderGray,
  },
  menuOptions: {
    marginTop: mUtils.wScale(20),
    width: mUtils.wScale(233),
    paddingVertical: mUtils.wScale(15),
  },
  menuOption: {
    paddingHorizontal: mUtils.wScale(15),
    paddingVertical: mUtils.wScale(8),
  },
})
