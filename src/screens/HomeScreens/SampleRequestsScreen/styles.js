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
  boxText1: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#999999',
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
    width: '100%',
    paddingVertical: mUtils.wScale(18),
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: mUtils.wScale(35),
    //backgroundColor: 'red',
  },
  layout2: {
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
    fontSize: 12,
    textAlign: 'left',
    color: '#555555',
    paddingHorizontal: mUtils.wScale(8),
    paddingVertical: Platform.OS === 'ios' ? mUtils.wScale(7) : mUtils.wScale(1.2),
  },
  inputBox1: {
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
    marginRight: mUtils.wScale(5),
  },
  plusImg: {
    width: mUtils.wScale(35),
    height: mUtils.wScale(35),
  },
  checkImg2: {
    width: mUtils.wScale(12),
    height: mUtils.wScale(12),
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
  delImg: {
    width: mUtils.wScale(20),
    height: mUtils.wScale(20),
  },
  del: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
  },
  contactText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: '#555555',
  },
  contactList: {
    padding: mUtils.wScale(10),
  },
  calendar: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    top: mUtils.wScale(247),
    width: '100%',
  },
  text1: {
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
  },
})
