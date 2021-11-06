import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: mUtils.wScale(20),
  },
  layout1: {
    width: '100%',
    minHeight: mUtils.wScale(124),
    borderColor: mConst.borderGray,
    borderRadius: mUtils.wScale(3),
    borderWidth: 0.5,
    padding: mUtils.wScale(5),
  },
  layout2: {
    width: '100%',
    minHeight: mUtils.wScale(60),
    borderColor: mConst.borderGray,
    borderRadius: mUtils.wScale(3),
    borderWidth: 0.5,
    padding: mUtils.wScale(5),
  },
  layout3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyBar: {
    width: '100%',
    height: 1,
    backgroundColor: mConst.black,
    marginTop: mUtils.wScale(14),
  },
  checkImg: {
    width: mUtils.wScale(14),
    height: mUtils.wScale(14),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: mConst.black,
  },
  left: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: mConst.black,
  },
  right: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'right',
    color: '#555555',
  },
  rightRed: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'right',
    color: '#ff0000',
  },
  desc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    textAlign: 'left',
    color: '#999999',
  },
  swipeDot: {
    borderRadius: 0,
    height: mUtils.wScale(3),
    width: mUtils.wScale(40),
    marginLeft: 0,
    marginRight: 0,
  },
  swipeActiveDot: {
    borderRadius: 0,
    height: mUtils.wScale(3),
    width: mUtils.wScale(45),
    marginLeft: 0,
    marginRight: 0,
  },
  shareImg: {
    width: mUtils.wScale(20),
    height: mUtils.wScale(20),
  },
  shareTouch: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: mUtils.wScale(20),
    paddingBottom: mUtils.wScale(60),
    paddingHorizontal: mUtils.wScale(20),
    alignItems: 'center',
  },
  closeImg: {
    width: mUtils.wScale(18),
    height: mUtils.wScale(18),
  },
  urlBox: {
    width: mUtils.wScale(300),
    borderRadius: 1.3,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mUtils.wScale(4),
  },
  urlButton: {
    borderRadius: 1.3,
    backgroundColor: '#7ea1b2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: mUtils.wScale(5),
    paddingHorizontal: mUtils.wScale(10),
    paddingVertical: mUtils.wScale(5),
  },
  buttonText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: mUtils.wScale(12),
    textAlign: 'center',
    color: '#ffffff',
  },
  urlText: {
    fontFamily: 'Roboto-Regular',
    fontSize: mUtils.wScale(16),
    textAlign: 'center',
    color: '#000000',
  },
  shareText: {
    fontFamily: 'Roboto-Bold',
    fontSize: mUtils.wScale(20),
    textAlign: 'center',
    color: '#000000',
    marginBottom: mUtils.wScale(14),
    marginTop: mUtils.wScale(2),
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
})
