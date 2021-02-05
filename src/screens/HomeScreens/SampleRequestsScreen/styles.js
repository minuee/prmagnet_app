import {Platform} from 'react-native'
import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
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
  subTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: mConst.black,
  },
  modelTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#070708',
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  smallTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
    marginBottom: mUtils.wScale(8),
  },
  boxText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#555555',
  },
  postCode: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: mConst.white,
  },
  yesNo: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
  },
  yesNoBox: {
    width: '49%',
    paddingVertical: mUtils.wScale(10),
    borderStyle: 'solid',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(10),
  },
  postBox: {
    backgroundColor: mConst.black,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: mUtils.wScale(8),
  },
  emptyBar: {
    width: '100%',
    height: mUtils.wScale(6),
    backgroundColor: '#f6f6f6',
    marginVertical: mUtils.wScale(30),
  },
  bottomButton: {
    width: '50%',
    paddingVertical: mUtils.wScale(18),
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box1: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: mUtils.wScale(8),
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: mUtils.wScale(8),
  },
  inputBox: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: mConst.borderGray,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#555555',
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: Platform.OS === 'ios' ? mUtils.wScale(7) : mUtils.wScale(1.2),
  },
  modelImg: {
    width: mUtils.wScale(157.5),
    height: mUtils.wScale(236.5),
  },
  moreImg: {
    width: mUtils.wScale(13),
    height: mUtils.wScale(13),
  },
  starImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
    marginTop: mUtils.wScale(1),
  },
  checkImg: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
  },
  plusImg: {
    width: mUtils.wScale(35),
    height: mUtils.wScale(35),
  },
  checkImg2: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
  },
})
