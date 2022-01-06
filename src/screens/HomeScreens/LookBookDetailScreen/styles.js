import {StyleSheet} from 'react-native'

import mConst from '../../../common/constants'
import mUtils from '../../../common/utils'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mConst.white,
  },
  mainTitle: {
    flex:2,
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
    color: mConst.black,
  },
  shareWrap : {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  title1: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#070708',
    marginTop: mUtils.wScale(10),
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
  desc3: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: '#070708',
   
  },
  desc3Wrap : {
    marginTop: mUtils.wScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
  },
  layout1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: mUtils.wScale(20),
    paddingTop: mUtils.wScale(10),
    paddingBottom: mUtils.wScale(10),
    backgroundColor: mConst.white,
  },
  layout2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  layout3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBox2: {
    flex:1,
    height: mUtils.wScale(30),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  smallBox: {
    flex:1,
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
